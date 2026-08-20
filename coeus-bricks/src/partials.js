/**
 * Shared section builders.
 *
 * The design repeats a small number of section shapes across all 18 pages
 * (numbered section heading, CTA band, inner-page hero, accreditation strip).
 * Building them once here means a change to the pattern updates every page on
 * the next build, and keeps the page modules readable.
 */

const b = require('./builder');

/** Bricks bundles Themify icons; these stand in for the lucide set in Figma. */
const ICON = {
  arrowRight: 'ti-arrow-right',
  chevronDown: 'ti-angle-down',
  phone: 'ti-mobile',
  mail: 'ti-email',
  pin: 'ti-location-pin',
  menu: 'ti-menu',
  close: 'ti-close',
  download: 'ti-download',
  quote: 'ti-quote-left',
};

/** Brand assets. Swap these for Media Library IDs after upload — see README. */
const ASSET = {
  logoDark: 'https://coeus-technical.co.uk/wp-content/uploads/coeus-logo-horizontal-large.jpg',
  logoWhite: 'https://coeus-technical.co.uk/wp-content/uploads/Coeus-Logo-Horizontal-White-Large.png',
  hero: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&auto=format&fit=crop&q=80',
  founder: 'https://coeus-technical.co.uk/wp-content/uploads/image_desktop.jpeg',
  bsi: 'https://coeus-technical.co.uk/wp-content/uploads/BSI-Membership-Badge.png',
  safeContractor: 'https://coeus-technical.co.uk/wp-content/uploads/safeContractor-approved.png',
  eal: 'https://coeus-technical.co.uk/wp-content/uploads/EAL_Qualified_Logo_Col_72dpi.jpg',
};

const CONTACT = {
  phone: '023 9211 7302',
  phoneHref: 'tel:02392117302',
  email: 'info@coeus-technical.co.uk',
  emailHref: 'mailto:info@coeus-technical.co.uk',
  address: 'Portsmouth, Hampshire, UK',
};

/** Semantic wrapper with an explicit HTML tag. */
const tagged = (tag, classes, children, settings = {}) =>
  b.el('block', { classes, settings: { tag, ...settings }, children });

const ul = (classes, children) => tagged('ul', classes, children);
const li = (classes, children) => tagged('li', classes, children);

/** Button carrying a trailing icon, matching the design's arrow affordance. */
const iconButton = (classes, label, url, iconName = ICON.arrowRight) =>
  b.button(classes, label, url, {
    settings: { icon: { library: 'themify', icon: iconName }, iconPosition: 'right' },
  });

/**
 * Numbered section heading: Ember eyebrow number, Petrol title, Ember rule,
 * optional subtitle.
 */
function sectionHeading({ num, title, subtitle, onDark = false, small = false, center = false }) {
  const headingClasses = ['c-section-heading'];
  if (center) headingClasses.push('c-section-heading--center');

  const titleClasses = ['c-section-heading__title'];
  if (small) titleClasses.push('c-section-heading__title--sm');
  if (onDark) titleClasses.push('c-section-heading__title--on-dark');

  const subtitleClasses = ['c-section-heading__subtitle'];
  if (onDark) subtitleClasses.push('c-section-heading__subtitle--on-dark');

  return b.block(headingClasses, [
    num ? b.text(['c-section-heading__num'], num, 'span') : null,
    b.heading(titleClasses, title, 'h2'),
    b.block(['c-section-heading__rule'], []),
    subtitle ? b.text(subtitleClasses, subtitle) : null,
  ]);
}

/** Inner-page hero: breadcrumb, eyebrow, title over a darkened image. */
function pageHero({ eyebrow, title, breadcrumb = [] }) {
  return b.section(['c-page-hero'], [
    b.image(['c-page-hero__media'], ASSET.hero, ''),
    b.block(['c-page-hero__scrim'], []),
    b.block(['c-page-hero__inner'], [
      breadcrumb.length
        ? b.block(['c-breadcrumb'], breadcrumb.flatMap((crumb, i) => {
            const isLast = i === breadcrumb.length - 1;
            const node = isLast
              ? b.text(['c-breadcrumb__current'], crumb.label, 'span')
              : b.el('text-basic', {
                  classes: ['c-breadcrumb__link'],
                  settings: { text: crumb.label, tag: 'a', link: { type: 'external', url: crumb.url } },
                });
            return isLast ? [node] : [node, b.text([], '/', 'span')];
          }))
        : null,
      eyebrow ? b.text(['c-eyebrow'], eyebrow, 'p') : null,
      b.heading(['c-page-hero__title'], title, 'h1'),
    ]),
  ], { label: 'Page hero' });
}

/** Closing call-to-action band. `tone` is 'light' (white) or 'dark' (abyss). */
function ctaBand({ eyebrow, title, lead, actions = [], tone = 'light' }) {
  const sectionClasses = ['l-section', 'l-section--lg', 'c-cta'];
  sectionClasses.push(tone === 'dark' ? 'l-section--abyss' : 'l-section--white');

  const titleClasses = ['c-cta__title'];
  const leadClasses = ['c-cta__lead'];
  if (tone === 'dark') {
    titleClasses.push('c-cta__title--on-dark');
    leadClasses.push('c-cta__lead--on-dark');
  }

  return b.section(sectionClasses, [
    b.block(['c-cta__inner'], [
      eyebrow ? b.text(['c-eyebrow'], eyebrow, 'span') : null,
      b.heading(titleClasses, title, 'h2'),
      b.block(['c-rule', 'c-rule--center'], []),
      lead ? b.text(leadClasses, lead) : null,
      b.block(['c-btn-group', 'c-btn-group--center'],
        actions.map((a) => iconButton(a.classes, a.label, a.url, a.icon))),
    ]),
  ], { label: 'CTA band' });
}

/** Registrations + affiliations strip that sits under the home hero. */
function accreditationBar() {
  return b.section(['l-section', 'l-section--sm', 'l-section--white', 'l-section--border-b'], [
    b.container(['l-container'], [
      b.block(['c-accred'], [
        b.text(['c-accred__label'], 'Registrations &amp; affiliations'),
        b.block(['c-accred__logos'], [
          b.image(['c-accred__logo'], ASSET.bsi, 'BSI Member'),
          b.image(['c-accred__logo'], ASSET.eal, 'EAL Qualified'),
          b.image(['c-accred__logo'], ASSET.safeContractor, 'SafeContractor Approved'),
          b.block(['c-accred__creds'], [
            b.text(['c-accred__cred'], 'CEng · FCABE · FIFireE', 'span'),
            b.text(['c-accred__cred', 'c-accred__cred--muted'], 'FIET · MSFPE · MIFSM', 'span'),
          ]),
        ]),
      ]),
    ]),
  ], { label: 'Accreditation bar' });
}

/** A simple prose section: heading block plus paragraphs. */
function proseSection({ num, title, subtitle, paragraphs = [], tone = 'white', small = true }) {
  return b.section(['l-section', `l-section--${tone}`, 'l-section--border-b'], [
    b.container(['l-container'], [
      sectionHeading({ num, title, subtitle, small }),
      b.block(['l-stack', 'l-stack--md'],
        paragraphs.map((p) => b.text(['c-prose'], p))),
    ]),
  ]);
}

module.exports = {
  ICON, ASSET, CONTACT,
  tagged, ul, li, iconButton,
  sectionHeading, pageHero, ctaBand, accreditationBar, proseSection,
};
