# Coeus Technical — Figma Make → Bricks

Converts the Figma Make React prototype (`I4wyW13cIhMN3QcDADQjGK`) into a Bricks
WordPress theme: 18 pages, a header and footer, a BEM global-class library and
the brand tokens behind it.

The governing constraint: **the client must be able to restyle the site from
the Bricks UI.** So there is essentially no CSS in the theme. Every visual
decision is a Bricks *global variable* or a Bricks *global class*, both editable
in the builder. Editing `c-btn--primary` restyles every primary button on the
site; editing `--clr-petrol` reskins the brand.

---

## What's in the box

```
coeus-bricks/
├── src/                  Build source — edit here, never edit dist/
│   ├── tokens.js         72 brand tokens → Bricks global variables
│   ├── classes.js        Layout, typography, button BEM classes
│   ├── components.js     Header, footer, hero, cards, lists, media
│   ├── components-pages.js  Inner-page shell, services, sidebars, forms
│   ├── theme-styles.js   Bricks Theme Styles (site-wide defaults)
│   ├── builder.js        Nested tree → Bricks flat element array
│   ├── partials.js       Shared section builders
│   ├── seed.js           12 seed posts (6 case studies, 6 insights)
│   ├── pages/            One module per template
│   ├── build.js          Emits dist/
│   └── validate.js       Offline structural checks
├── dist/                 Generated — do not hand-edit
│   ├── coeus-bundle.json      Everything, for the PHP importer
│   ├── global-variables.json
│   ├── global-classes.json
│   ├── theme-styles.json
│   └── templates/*.json       One importable file per template
└── theme/coeus-child/    The WordPress child theme
```

Current output: **20 templates, 1,805 elements, 279 global classes, 72 variables.**

---

## Install

Bricks 2.x. Run from the WordPress root.

```bash
# 1. Build and copy the bundle into the theme
cd coeus-bricks
npm run install-theme

# 2. Copy the child theme into WordPress
cp -r theme/coeus-child /path/to/wp-content/themes/

# 3. Activate it, then import
wp theme activate coeus-child
wp coeus import --dry-run     # see what would happen
wp coeus import               # do it
```

No WP-CLI? **Appearance → Coeus Import** does the same thing, with the same
dry-run option.

The import is **idempotent**. Every variable, class and template carries a
deterministic id, so re-running updates in place rather than duplicating.
Anything the client created themselves is preserved, and seed posts already
present are left completely untouched.

### After importing

1. **Bricks → Templates** — set the header and footer template conditions to
   *Entire Website*, and the 404 template to *Error Page*.
2. Create a WordPress page for each route below and set its content template,
   or set each template's own condition. Routes must match the header links:

   | Route | Template |
   |---|---|
   | `/` | `home` |
   | `/expertise/innovate|design|build|protect/` | `expertise-*` |
   | `/who-we-help/developers|building-owners|managing-agents|legal-teams|architects|facilities-managers/` | `who-we-help-*` |
   | `/how-we-work/` `/about/` `/our-people/` `/case-studies/` `/insights/` `/contact/` | matching slug |

3. **Settings → Permalinks** → Save, so the CPT rewrites take effect.
4. Point the contact form's recipient at the right inbox
   (currently `info@coeus-technical.co.uk`).

---

## How the styling is organised

**Variables** (Bricks → Settings → Variables) — five categories: Brand colours,
Phase colours, Typography, Spacing, Layout. Fluid type is pre-computed, so the
client picks `--fs-h2`, never a raw `clamp()`.

**Global classes** (Bricks class manager) — strict BEM in 23 categories:

| Prefix | Meaning | Example |
|---|---|---|
| `l-` | layout primitive | `l-grid--3` |
| `c-` | component | `c-phase-card__title` |
| `u-` | single-purpose utility | `u-mt-lg` |

`c-block`, `c-block__element`, `c-block--modifier`. Templates carry **no inline
styling** — an element gets classes and nothing else. That is what makes
"change one class, change the site" true here.

**Theme styles** — the defaults beneath the classes (body text, headings, link
colour, container width, form controls), so content the client adds later still
looks right without touching a class.

### Common edits

| Goal | Where |
|---|---|
| Rebrand a colour | Bricks → Variables → `--clr-petrol` |
| Retune the lifecycle card ramp | Variables → Phase colours |
| Change every primary button | Class manager → `c-btn--primary` |
| Change every section heading | `c-section-heading__title` |
| Adjust section rhythm sitewide | `--sp-section` |
| Speed up/slow every transition | `--transition`, `--transition-slow` |

To change the *system* rather than one value, edit `src/` and re-run
`npm run check`, then re-import.

---

## Content model

Registered by the child theme, no ACF required — plain post meta with
`show_in_rest`, so Bricks exposes each field as `{cf_*}` in dynamic data.

| CPT | Taxonomies | Fields |
|---|---|---|
| `case_study` | `sector`, `service` | client, location, value, challenge, approach, outcome |
| `insight` | `insight_topic` | reading time, standfirst |
| `person` | — | role, post-nominals, email, LinkedIn |

Case Studies and Insights are **Bricks query loops** — the card is authored once
and repeated, so adding an entry is a content task, not a layout one. The six
designed entries for each ship as seed content so the pages aren't blank on
arrival.

If ACF Pro gets installed later, point ACF field groups at the same meta keys
and delete the meta box in `inc/meta.php`. The templates keep working untouched.

---

## Honest notes on what is and isn't verified

**I could not test this against a running Bricks install.** The build was
produced in a sandboxed environment with no WordPress and no outbound network
access. So:

- ✅ **Verified offline** — `npm run validate` checks referential integrity of
  every element tree (parents, children, orphans, duplicate ids), that every
  class an element names exists, that every `var(--x)` resolves to a defined
  variable, and BEM naming. All 1,805 elements pass. All PHP passes `php -l`.
- ⚠️ **Not verified** — that Bricks accepts these option shapes byte-for-byte.
  Do the first import on a staging copy, with `--dry-run` first.

Two specific places where I hedged against that uncertainty:

1. **Colour bindings** are emitted as `{ raw: "var(--clr-petrol)", hex: "#084058" }`.
   If Bricks honours `raw`, the setting binds to the variable (what we want). If
   a build ignores `raw` and reads `hex`, the colour is still correct. Either
   way the site renders right; only the editability degrades.
2. **Templates are written directly to Bricks options and post meta** by the
   importer rather than fed through the UI's JSON import, because writing the
   options is more forgiving of schema drift and lets the import be idempotent.
   `dist/templates/*.json` is also emitted if you'd rather import by hand.

### Deliberate deviations from the React source

| Source | Here | Why |
|---|---|---|
| Service accordions driven by `useState` | Native `<details>`/`<summary>` | Same behaviour, no JS, keyboard and screen-reader accessible by default |
| Contact form fakes submission in state | Real Bricks form element | It actually sends, and the client can edit fields and recipient |
| Case studies / insights hard-coded | CPT + query loop | So the client adds entries without editing layout |
| lucide icons | Bricks' bundled Themify set | No extra icon library; mapping is in `partials.js` under `ICON` |
| Our People shows only the founder | Founder bio + empty `person` loop below | Matches the design exactly today; becomes a team grid the moment a person is added, with no layout editing |

### Outstanding assets (the design's "Part C")

These are placeholders in the design and remain placeholders here:

- Client logos on the home page — six marked tiles
- Lifecycle card icons — four marked squares
- Footer "Fire engineering with integrity" lockup — dashed slot
- Mid-page photography on the expertise and audience pages

Logos, the founder photo and accreditation badges currently point at
`coeus-technical.co.uk` URLs; hero imagery points at Unsplash. **Upload these to
the Media Library and repoint them** before launch — see `ASSET` in
`src/partials.js` for the single place they're defined.

---

## Development

```bash
npm run build      # regenerate dist/
npm run validate   # structural checks (exits non-zero on error)
npm run check      # both
```

Element ids are derived from a hash of each element's path in the tree, so a
rebuild is byte-identical and re-importing updates in place. `flatten()` throws
on an unknown class name, so a template can never ship referencing a class that
doesn't exist.
