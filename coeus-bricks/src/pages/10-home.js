/**
 * Home page.
 *
 * Section order follows the Figma Make source exactly:
 * hero, accreditations, intro, lifecycle phases, audience pathways,
 * why Coeus, case studies teaser, client logos, marquee, closing CTA.
 */

const b = require('../builder');
const {
  ASSET, CONTACT, ICON,
  sectionHeading, ctaBand, accreditationBar, iconButton,
} = require('../partials');

/** Graduated teal fills: Abyss -> Petrol -> mid teal -> Coastal Teal. */
const PHASES = [
  {
    num: '01', label: 'Innovate', category: 'Early Thinking', mod: 'c-phase-card--01',
    desc: 'Feasibility, options appraisal, first fire strategies and Gateway 1 support — worked from the building, not the checklist.',
    url: '/expertise/innovate/',
  },
  {
    num: '02', label: 'Design', category: 'Developed Design', mod: 'c-phase-card--02',
    desc: 'Fire strategy, statements and technical notes that hold up to scrutiny and stay buildable.',
    url: '/expertise/design/',
  },
  {
    num: '03', label: 'Build', category: 'On Site', mod: 'c-phase-card--03',
    desc: 'Support through construction, resolving the real-world detail as the building goes up.',
    url: '/expertise/build/',
  },
  {
    num: '04', label: 'Protect', category: 'In Use', mod: 'c-phase-card--04',
    desc: 'Risk assessment, FRAEW and safety-case support keeping the building safe in occupation.',
    url: '/expertise/protect/',
  },
];

const AUDIENCES = [
  { label: 'Developers &amp;\nContractors', url: '/who-we-help/developers/',
    question: 'Will this advice actually get the project through planning, the BSR and building control?' },
  { label: 'Building Owners\n&amp; Housing Providers', url: '/who-we-help/building-owners/',
    question: 'Can I defend these decisions to residents, members and the regulator?' },
  { label: 'Managing\nAgents', url: '/who-we-help/managing-agents/',
    question: 'What exactly must I do, and can I rely on this advice?' },
  { label: 'Legal\nTeams', url: '/who-we-help/legal-teams/',
    question: 'Can I put this expert in front of a judge?' },
  { label: 'Architects &amp;\nPrincipal Designers', url: '/who-we-help/architects/',
    question: 'Does this fire engineer understand design intent — and will they help me discharge my Principal Designer obligations?' },
  { label: 'Facilities &amp;\nAsset Managers', url: '/who-we-help/facilities-managers/',
    question: "Is this building actually safe as it stands, and do I know what I'm responsible for?" },
];

const WHY_POINTS = [
  { num: '01', heading: 'We come from construction.',
    body: 'We know whether a strategy can actually be built, so our advice is buildable, not just compliant on paper.' },
  { num: '02', heading: 'We challenge the checklist.',
    body: 'Proportionate and performance-based where it serves the project; never over- or under-engineered.' },
  { num: '03', heading: 'We stand behind our advice.',
    body: 'Every project carries senior, Chartered oversight, and we put our name to the position we give you — clear, defensible and yours to act on with confidence.' },
];

const CLIENT_PLACEHOLDERS = ['Client A', 'Client B', 'Client C', 'Client D', 'Client E', 'Client F'];

/** Logos and text marks that scroll in the accreditation marquee. */
const MARQUEE_ITEMS = [
  { type: 'img',  src: ASSET.bsi, alt: 'BSI Member' },
  { type: 'text', label: 'FIFireE' },
  { type: 'img',  src: ASSET.eal, alt: 'EAL Qualified' },
  { type: 'text', label: 'FCABE' },
  { type: 'img',  src: ASSET.safeContractor, alt: 'SafeContractor Approved' },
  { type: 'text', label: 'CEng · Eng Council' },
  { type: 'text', label: 'FIET' },
  { type: 'text', label: 'MIFSM' },
  { type: 'text', label: 'MSFPE' },
];

const marqueeItem = (item) =>
  b.block(['c-marquee__item'], [
    item.type === 'img'
      ? b.image(['c-marquee__logo'], item.src, item.alt)
      : b.text(['c-marquee__text'], item.label, 'span'),
  ]);

module.exports = {
  slug: 'home',
  title: 'Coeus — Home',
  type: 'content',

  build() {
    return [
      /* ── Hero ──────────────────────────────────────────────────────── */
      b.section(['c-hero'], [
        b.image(['c-hero__media'], ASSET.hero, 'Modern building facade'),
        b.block(['c-hero__scrim'], []),
        b.block(['c-hero__inner'], [
          b.block(['c-hero__body'], [
            b.text(['c-hero__eyebrow'], 'Fire Engineering with Integrity'),
            b.heading(['c-hero__title'],
              'Fire engineering that works on site, not just on paper.', 'h1'),
            b.text(['c-hero__lead'],
              'Fire engineering and fire safety consultants with a construction background — proportionate, defensible, buildable advice across the whole life of your building.'),
            b.block(['c-btn-group'], [
              iconButton(['c-btn', 'c-btn--white'], 'Talk to us', '/contact/'),
              b.button(['c-btn', 'c-btn--outline-light'], 'Our expertise', '/expertise/innovate/'),
            ]),
          ]),
        ]),
      ], { label: 'Hero' }),

      /* ── Accreditations ────────────────────────────────────────────── */
      accreditationBar(),

      /* ── Intro copy ────────────────────────────────────────────────── */
      b.section(['l-section', 'l-section--white', 'l-section--border-b'], [
        b.container(['l-container'], [
          b.block(['c-intro'], [
            b.block(['c-intro__bar'], []),
            b.text(['c-prose', 'c-prose--intro'],
              'Fire advice may look right in a report, only to unravel when design decisions meet the realities of construction. Our advice comes from a construction background, where we have spent our careers working within the built environment. We understand how buildings are designed, built, altered and occupied, so our advice is shaped by what can be delivered in practice. From first concept to occupied building, we deliver fire strategies that are practical, proportionate and buildable — while you work directly with a senior Chartered Engineer from start to finish.'),
          ]),
        ]),
      ], { label: 'Intro' }),

      /* ── 01 What we do ─────────────────────────────────────────────── */
      b.section(['l-section', 'l-section--lg', 'l-section--muted'], [
        b.container(['l-container'], [
          sectionHeading({
            num: '01',
            title: 'Across the whole life of your building.',
            subtitle: 'Coeus Technical are a fire engineering and safety consultancy. We help building projects stay safe, compliant, and buildable — from initial concept through construction and throughout occupancy.',
          }),
          b.block(['l-grid', 'l-grid--4', 'l-grid--seam'],
            PHASES.map((phase) =>
              b.linkBlock(['c-phase-card', phase.mod], phase.url, [
                b.text(['c-phase-card__ghost'], phase.num, 'span'),
                b.text(['c-phase-card__icon'], 'Icon', 'span'),
                b.text(['c-phase-card__category'], phase.category),
                b.block(['c-phase-card__spacer'], []),
                b.text(['c-phase-card__step'], phase.num),
                b.heading(['c-phase-card__title'], phase.label, 'h3'),
                b.text(['c-phase-card__desc'], phase.desc),
                b.el('text-basic', {
                  classes: ['c-phase-card__more'],
                  settings: {
                    text: 'Explore', tag: 'span',
                    icon: { library: 'themify', icon: ICON.arrowRight }, iconPosition: 'right',
                  },
                }),
              ], { label: `Phase ${phase.num} — ${phase.label}` })
            )
          ),
        ]),
      ], { label: '01 What we do' }),

      /* ── 02 Audience pathways ──────────────────────────────────────── */
      b.section(['l-section', 'l-section--lg', 'l-section--white', 'l-section--border-y'], [
        b.container(['l-container'], [
          sectionHeading({ num: '02', title: 'Find the right route in.' }),
          b.block(['l-grid', 'l-grid--3', 'l-grid--gap-md'],
            AUDIENCES.map((a) =>
              b.block(['c-audience-card'], [
                b.heading(['c-audience-card__title'], a.label, 'h3'),
                b.text(['c-audience-card__question'], `"${a.question}"`),
                iconButton(['c-btn', 'c-btn--primary', 'c-btn--sm', 'c-btn--block', 'u-mt-md'],
                  'Our approach', a.url),
              ])
            )
          ),
          b.richText(['c-prose', 'u-text-center', 'u-mt-lg', 'c-prose--narrow', 'l-container--center'],
            '<p>Don\'t see your role here? We work with anyone involved in the life of a building — <a href="/contact/">get in touch</a> and we\'ll tell you whether we\'re the right people.</p>'),
        ]),
      ], { label: '02 Audience pathways' }),

      /* ── 03 Why Coeus ──────────────────────────────────────────────── */
      b.section(['l-section', 'l-section--lg', 'l-section--petrol'], [
        b.container(['l-container'], [
          b.block(['l-grid', 'l-grid--split', 'l-grid--top'], [
            b.block([], [
              sectionHeading({
                num: '03',
                title: 'People-centred.\nBuildable.\nEffective.',
                onDark: true,
              }),
              b.text(['c-prose', 'c-prose--on-dark', 'c-prose--narrow'],
                'We know from experience that we are not the lowest-cost fire safety consultancy. Our value statement is quality, dependability and accountability for the advice we provide — and the confidence that brings our clients back to us.'),
              iconButton(['c-btn', 'c-btn--outline-light', 'u-mt-xl'],
                'About Coeus Technical', '/about/'),
            ]),
            b.block(['c-why'],
              WHY_POINTS.map((point) =>
                b.block(['c-why__item'], [
                  b.text(['c-why__num'], point.num, 'span'),
                  b.block([], [
                    b.heading(['c-why__heading'], point.heading, 'h3'),
                    b.text(['c-why__body'], point.body),
                  ]),
                ])
              )
            ),
          ]),
        ]),
      ], { label: '03 Why Coeus' }),

      /* ── 04 Case studies teaser ────────────────────────────────────── */
      b.section(['l-section', 'l-section--muted', 'l-section--border-b'], [
        b.container(['l-container'], [
          b.block(['l-row', 'l-row--between', 'l-row--top', 'l-row--gap-lg'], [
            b.block([], [
              sectionHeading({
                num: '04',
                title: 'Our work, in practice.',
                subtitle: 'From Gateway 2 approvals for high-rise residential schemes to FRAEW assessments that unlock lender funding and expert witness reports for court — a range of the projects we have led.',
                small: true,
              }),
            ]),
            iconButton(['c-btn', 'c-btn--primary'], 'View case studies', '/case-studies/'),
          ]),
        ]),
      ], { label: '04 Case studies' }),

      /* ── Who trusts us ─────────────────────────────────────────────── */
      b.section(['l-section', 'l-section--white', 'l-section--border-b'], [
        b.container(['l-container'], [
          b.text(['c-eyebrow', 'c-eyebrow--muted', 'u-text-center', 'u-mb-lg'], 'Who trusts us'),
          // Placeholder marks until client logo artwork is supplied.
          b.block(['c-clients'],
            CLIENT_PLACEHOLDERS.map((name) =>
              b.text(['c-clients__item'], name, 'span'))),
        ]),
      ], { label: 'Who trusts us' }),

      /* ── Accreditation marquee ─────────────────────────────────────── */
      b.section(['l-section', 'l-section--sm', 'l-section--muted', 'l-section--border-b', 'c-marquee'], [
        // Duplicated item run gives the track a seamless -50% loop.
        b.block(['c-marquee__track'],
          [...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(marqueeItem)),
      ], { label: 'Accreditation marquee' }),

      /* ── Closing CTA ───────────────────────────────────────────────── */
      ctaBand({
        eyebrow: 'Get in touch',
        title: "Fire engineering with integrity.<br>Let's talk about your building.",
        lead: 'Tell us about your project and we will come back to you with a clear view of how we can help — and whether we are the right fit.',
        tone: 'light',
        actions: [
          { classes: ['c-btn', 'c-btn--primary'], label: 'Start a conversation', url: '/contact/' },
          { classes: ['c-btn', 'c-btn--outline'], label: CONTACT.phone, url: CONTACT.phoneHref, icon: ICON.phone },
        ],
      }),
    ];
  },
};
