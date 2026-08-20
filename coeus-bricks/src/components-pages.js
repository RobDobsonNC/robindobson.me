/**
 * Inner-page component classes: the expertise/audience page shell, service
 * accordions, sidebars, bullet lists and callouts.
 *
 * Extends the same registry as classes.js / components.js.
 */

const { c, clr, box, TAB, MOB } = require('./classes');
const { v, raw: tokenRaw } = require('./tokens');

/* =========================================================================
   INNER PAGE SHELL
   ========================================================================= */
const PAGE = 'Inner page';

// Expertise hero is the page hero with a phase-specific ground colour.
c('c-page-hero--phase-01', PAGE, { _background: { color: clr('clr-phase-01') } });
c('c-page-hero--phase-02', PAGE, { _background: { color: clr('clr-phase-02') } });
c('c-page-hero--phase-03', PAGE, { _background: { color: clr('clr-phase-03') } });
c('c-page-hero--phase-04', PAGE, { _background: { color: clr('clr-phase-04') } });
c('c-page-hero--tall',     PAGE, { _height: '18rem' });
c('c-page-hero__lead', PAGE, {
  _typography: { 'font-size': v('fs-sm'), 'line-height': v('lh-body'), color: clr('clr-on-dark-55') },
  _widthMax: '36rem', _margin: { top: v('sp-2xs') },
});

// Two-column article + sidebar.
c('c-layout', PAGE, {
  _display: 'grid', _gap: v('sp-2xl'),
  _gridTemplateColumns: '2fr 1fr',
  ['_gridTemplateColumns' + TAB]: '1fr',
});
c('c-layout__main', PAGE, { _display: 'flex', _direction: 'column' });
c('c-layout__aside', PAGE, { _display: 'flex', _direction: 'column', _gap: v('sp-md') });

c('c-page-intro', PAGE, { _margin: { bottom: v('sp-xl') } });
c('c-page-intro__title', PAGE, {
  _typography: { 'font-size': '1.3rem', 'font-weight': v('fw-bold'), color: clr('clr-petrol'), 'line-height': v('lh-snug') },
  _margin: { top: v('sp-3xs'), bottom: v('sp-sm') },
});

/* =========================================================================
   SERVICE INDEX + ACCORDION
   ========================================================================= */
const SVC = 'Services';

c('c-service-index', SVC, {
  _border: { width: box('1px'), style: 'solid', color: clr('clr-border') },
  _margin: { bottom: v('sp-xl') },
});
c('c-service-index__item', SVC, {
  _display: 'flex', _alignItems: 'center', _gap: v('sp-sm'),
  _padding: { top: v('sp-sm'), bottom: v('sp-sm'), left: v('sp-md'), right: v('sp-md') },
  _background: { color: clr('clr-white') },
  _typography: { 'text-decoration': 'none' },
  _transition: `all ${v('transition')} ease`,
  _cssCustom:
    '%root% + %root% { border-top: 1px solid var(--clr-border); }'
    + '%root%:hover { background: var(--clr-muted); }',
});
c('c-service-index__num', SVC, {
  _width: '1.25rem', _flexShrink: '0',
  _typography: { 'font-size': v('fs-eyebrow'), 'font-weight': v('fw-bold'), color: clr('clr-ember') },
});
c('c-service-index__label', SVC, {
  _flex: '1',
  _typography: { 'font-size': v('fs-sm'), 'font-weight': v('fw-medium'), color: clr('clr-ink') },
});

/**
 * Service accordion. Rendered as native <details>/<summary> so it opens and
 * closes with no JavaScript and stays keyboard accessible; the marker is
 * replaced with a rotating chevron.
 */
c('c-service', SVC, {
  _border: { width: { top: '1px' }, style: 'solid', color: clr('clr-border') },
  _padding: { top: v('sp-xl'), bottom: v('sp-xl') },
  _cssCustom:
    '%root%[open] { border-left: 2px solid var(--clr-ember); padding-left: var(--sp-md); }'
    + '%root% > summary::-webkit-details-marker { display: none; }'
    + '%root% > summary { list-style: none; }',
});
c('c-service__summary', SVC, {
  _display: 'flex', _alignItems: 'center', _justifyContent: 'space-between',
  _gap: v('sp-sm'), _cursor: 'pointer',
  _margin: { bottom: v('sp-md') },
  _cssCustom:
    '%root%::after { content: "\\203A"; display:block; font-size:1.5rem; line-height:1;'
    + ' color: var(--clr-muted-ink); transform: rotate(90deg); transition: transform .2s ease; }'
    + 'details[open] > %root%::after { transform: rotate(-90deg); }',
});
c('c-service__title', SVC, {
  _typography: { 'font-size': '1.2rem', 'font-weight': v('fw-bold'), color: clr('clr-petrol') },
});
c('c-service__body', SVC, { _display: 'flex', _direction: 'column', _gap: v('sp-sm') });

/* =========================================================================
   BULLET LIST + CALLOUT
   ========================================================================= */
const BUL = 'Bullets & callouts';

c('c-bullets', BUL, { _display: 'flex', _direction: 'column', _gap: v('sp-2xs') });
c('c-bullets__item', BUL, {
  _display: 'flex', _alignItems: 'flex-start', _gap: v('sp-xs'),
  _typography: { 'font-size': v('fs-sm'), 'line-height': v('lh-body'), color: clr('clr-ink') },
  _cssCustom:
    '%root%::before { content:""; flex:none; width:4px; height:4px; border-radius:50%;'
    + ' background: var(--clr-petrol); margin-top: .6em; }',
});

c('c-callout', BUL, {
  _background: { color: clr('clr-muted') },
  _padding: box(v('sp-md')),
  _border: { width: { left: '2px' }, style: 'solid', color: { raw: 'rgba(8,64,88,.2)' } },
});
c('c-callout__title', BUL, {
  _typography: { 'font-size': v('fs-sm'), 'font-weight': v('fw-semibold'), color: clr('clr-petrol') },
  _margin: { bottom: v('sp-3xs') },
});
c('c-callout__body', BUL, {
  _typography: { 'font-size': v('fs-xs'), 'line-height': v('lh-body'), color: clr('clr-muted-ink') },
});

/* =========================================================================
   SIDEBAR
   ========================================================================= */
const SIDE = 'Sidebar';

c('c-sidebar-cta', SIDE, {
  _background: { color: clr('clr-petrol') },
  _padding: box(v('sp-md')),
  _position: 'sticky', _top: '6rem',
  ['_position' + TAB]: 'static',
});
c('c-sidebar-cta__title', SIDE, {
  _typography: { 'font-size': v('fs-sm'), 'font-weight': v('fw-bold'), color: clr('clr-white') },
  _margin: { bottom: v('sp-2xs') },
});
c('c-sidebar-cta__text', SIDE, {
  _typography: { 'font-size': v('fs-xs'), 'line-height': v('lh-body'), color: clr('clr-on-dark-55') },
  _margin: { bottom: v('sp-md') },
});

c('c-sidebar-box', SIDE, {
  _border: { width: box('1px'), style: 'solid', color: clr('clr-border') },
  _padding: box(v('sp-md')),
});
c('c-sidebar-box--muted', SIDE, { _background: { color: clr('clr-muted') } });
c('c-sidebar-box__title', SIDE, {
  _typography: { 'font-size': v('fs-sm'), 'font-weight': v('fw-bold'), color: clr('clr-petrol') },
  _margin: { bottom: v('sp-sm') },
});
c('c-sidebar-box__link', SIDE, {
  _display: 'flex', _alignItems: 'center', _gap: v('sp-2xs'),
  _padding: { top: v('sp-xs'), bottom: v('sp-xs') },
  _typography: { 'font-size': v('fs-sm'), 'font-weight': v('fw-medium'), color: clr('clr-muted-ink'), 'text-decoration': 'none' },
  _cssCustom:
    '%root% + %root% { border-top: 1px solid var(--clr-border); }'
    + '%root%:hover { color: var(--clr-petrol); }',
});
c('c-sidebar-box__link--active', SIDE, {
  _typography: { 'font-weight': v('fw-semibold'), color: clr('clr-petrol') },
});
c('c-sidebar-box__note', SIDE, {
  _typography: { 'font-size': v('fs-xs'), 'line-height': v('lh-body'), color: clr('clr-muted-ink') },
});

/* =========================================================================
   FIGURE (mid-page photography slot)
   ========================================================================= */
const FIG = 'Figure';

c('c-figure', FIG, {
  _position: 'relative', _height: '13rem', _overflow: 'hidden',
  _margin: { bottom: v('sp-2xl') },
});
c('c-figure__img', FIG, { _width: '100%', _height: '100%', _objectFit: 'cover' });
c('c-figure__scrim', FIG, {
  _position: 'absolute', _top: '0', _left: '0', _width: '100%', _height: '100%',
  _background: { color: { raw: 'linear-gradient(to right, rgba(5,43,59,.6), rgba(5,43,59,.1))' } },
});
c('c-figure__caption', FIG, {
  _position: 'absolute', _bottom: v('sp-sm'), _left: v('sp-md'),
  _typography: { 'font-size': v('fs-xs'), 'font-weight': v('fw-medium'), color: clr('clr-on-dark-70') },
});

/* =========================================================================
   CLOSING BAND (compact CTA row)
   ========================================================================= */
const BAND = 'Closing band';

c('c-band', BAND, {
  _display: 'flex', _alignItems: 'center', _justifyContent: 'space-between',
  _gap: v('sp-md'), _flexWrap: 'wrap',
  ['_direction' + MOB]: 'column',
  ['_alignItems' + MOB]: 'flex-start',
});
c('c-band__title', BAND, {
  _typography: { 'font-size': '1.2rem', 'font-weight': v('fw-bold'), color: clr('clr-petrol') },
});
c('c-band__text', BAND, {
  _typography: { 'font-size': v('fs-sm'), color: clr('clr-muted-ink') },
  _margin: { top: v('sp-3xs') },
});

/* =========================================================================
   BADGES & NOTES
   ========================================================================= */
const BADGE = 'Badges & notes';

c('c-badge', BADGE, {
  _padding: { top: '2px', bottom: '2px', left: '6px', right: '6px' },
  _border: { width: box('1px'), style: 'solid', color: clr('clr-ember') },
  _typography: {
    'font-size': v('fs-micro'), 'font-weight': v('fw-bold'),
    'letter-spacing': v('ls-wide'), 'text-transform': 'uppercase', color: clr('clr-ember'),
  },
  _flexShrink: '0',
});

c('c-note', BADGE, {
  _background: { color: clr('clr-muted') },
  _padding: box(v('sp-lg')),
  _border: { width: { top: '1px' }, style: 'solid', color: clr('clr-border') },
  _margin: { top: v('sp-xl') },
});
c('c-note__title', BADGE, {
  _typography: { 'font-size': v('fs-sm'), 'font-weight': v('fw-semibold'), color: clr('clr-petrol') },
  _margin: { bottom: v('sp-2xs') },
});
c('c-note__body', BADGE, {
  _typography: { 'font-size': v('fs-xs'), 'line-height': v('lh-body'), color: clr('clr-muted-ink') },
});

// Sidebar variant with the Ember spine, used to flag a specialist service.
c('c-sidebar-box--accent', BADGE, {
  _background: { color: clr('clr-muted') },
  _border: { width: { left: '2px' }, style: 'solid', color: clr('clr-ember') },
});

/* =========================================================================
   CHECKLIST & FEATURE CARD  (audience pages)
   ========================================================================= */
const CHK = 'Checklist & feature';

c('c-checklist', CHK, { _display: 'flex', _direction: 'column', _gap: v('sp-xs') });
c('c-checklist__item', CHK, {
  _display: 'flex', _alignItems: 'flex-start', _gap: v('sp-xs'),
  _typography: { 'font-size': v('fs-sm'), 'line-height': v('lh-body'), color: clr('clr-ink') },
  _cssCustom:
    '%root%::before { content: "\\2713"; flex: none; color: var(--clr-petrol);'
    + ' font-weight: 700; font-size: .875em; line-height: 1.6; }',
});

// Section within the article column, separated by a hairline.
c('c-block', CHK, {
  _padding: { top: v('sp-xl') },
  _border: { width: { top: '1px' }, style: 'solid', color: clr('clr-border') },
  _margin: { top: v('sp-xl') },
});
c('c-block__title', CHK, {
  _typography: { 'font-size': '1.3rem', 'font-weight': v('fw-bold'), color: clr('clr-petrol') },
  _margin: { bottom: v('sp-md') },
});

// Prominent Ember-spined feature card (Legal Teams, FRAEW callouts).
c('c-feature', CHK, {
  _background: { color: clr('clr-muted') },
  _padding: box(v('sp-lg')),
  _border: { width: { left: '4px' }, style: 'solid', color: clr('clr-ember') },
});
c('c-feature--slim', CHK, {
  _padding: box(v('sp-md')),
  _border: { width: { left: '2px' }, style: 'solid', color: clr('clr-ember') },
});
c('c-feature__title', CHK, {
  _typography: { 'font-size': '1.4rem', 'font-weight': v('fw-bold'), color: clr('clr-petrol') },
  _margin: { top: v('sp-xs'), bottom: v('sp-xs') },
});
c('c-feature__title--sm', CHK, { _typography: { 'font-size': '1.2rem' } });
c('c-feature__note', CHK, {
  _typography: { 'font-size': v('fs-xs'), 'line-height': v('lh-body'), color: clr('clr-muted-ink') },
  _margin: { top: v('sp-sm') },
});

// Italic question that sits under an audience page title.
c('c-page-hero__question', CHK, {
  _typography: {
    'font-size': v('fs-sm'), 'font-style': 'italic',
    'line-height': v('lh-body'), color: clr('clr-on-dark-55'),
  },
  _widthMax: '36rem', _margin: { top: v('sp-2xs') },
});

/* =========================================================================
   HOW WE WORK / ABOUT / CONTACT / 404
   ========================================================================= */
const MISC = 'Page components';

// Numbered process card with an Ember bar that grows on hover.
c('c-step-card', MISC, {
  _background: { color: clr('clr-white') },
  _border: { width: box('1px'), style: 'solid', color: clr('clr-border') },
  _padding: box(v('sp-lg')),
  _display: 'flex', _direction: 'column',
  _transition: `all ${v('transition')} ease`,
  _cssCustom:
    '%root%:hover { border-color: var(--clr-petrol); box-shadow: 0 4px 16px -8px rgba(5,43,59,.3); }'
    + '%root%::before { content:""; display:block; width:2px; height:0; background:var(--clr-ember);'
    + ' margin-bottom: var(--sp-md); transition: height .3s ease; }'
    + '%root%:hover::before { height: 2rem; }',
});
c('c-step-card__num', MISC, {
  _typography: {
    'font-size': v('fs-eyebrow'), 'font-weight': v('fw-bold'),
    'letter-spacing': v('ls-wide'), 'text-transform': 'uppercase', color: clr('clr-ember'),
  },
  _margin: { bottom: v('sp-sm') },
});
c('c-step-card__title', MISC, {
  _typography: { 'font-size': v('fs-base'), 'font-weight': v('fw-bold'), color: clr('clr-petrol') },
  _margin: { bottom: v('sp-xs') },
});

// Principle tile — rule widens on hover.
c('c-principle', MISC, {
  _border: { width: box('1px'), style: 'solid', color: clr('clr-border') },
  _padding: box(v('sp-lg')),
  _transition: `all ${v('transition')} ease`,
  _cssCustom:
    '%root%:hover { border-color: var(--clr-petrol); box-shadow: 0 4px 16px -8px rgba(5,43,59,.3); }'
    + '%root% .c-rule { transition: width .3s ease; }'
    + '%root%:hover .c-rule { width: 2.5rem; }',
});

// Question / answer row.
c('c-faq', MISC, { _display: 'flex', _direction: 'column' });
c('c-faq__item', MISC, {
  _padding: { top: v('sp-md'), bottom: v('sp-md') },
  _cssCustom: '%root% + %root% { border-top: 1px solid var(--clr-border); }',
});
c('c-faq__question', MISC, {
  _typography: { 'font-size': v('fs-sm'), 'font-weight': v('fw-semibold'), color: clr('clr-petrol') },
  _margin: { bottom: v('sp-2xs') },
});

// Contact detail row: petrol icon tile, label, value.
c('c-contact-item', MISC, { _display: 'flex', _alignItems: 'flex-start', _gap: v('sp-sm'), _typography: { 'text-decoration': 'none' } });
c('c-contact-item__icon', MISC, {
  _width: '2.25rem', _height: '2.25rem', _flexShrink: '0',
  _display: 'flex', _alignItems: 'center', _justifyContent: 'center',
  _background: { color: clr('clr-petrol') },
  _typography: { color: clr('clr-white'), 'font-size': v('fs-sm') },
});
c('c-contact-item__label', MISC, {
  _typography: {
    'font-size': v('fs-eyebrow'), 'font-weight': v('fw-bold'),
    'letter-spacing': v('ls-wide'), 'text-transform': 'uppercase', color: clr('clr-muted-ink'),
  },
  _margin: { bottom: '2px' },
});
c('c-contact-item__value', MISC, {
  _typography: { 'font-size': v('fs-sm'), 'font-weight': v('fw-semibold'), color: clr('clr-ink') },
});

// Bordered panel with a petrol header bar (contact form).
c('c-panel', MISC, {
  _background: { color: clr('clr-white') },
  _border: { width: box('1px'), style: 'solid', color: clr('clr-petrol') },
});
c('c-panel__header', MISC, {
  _background: { color: clr('clr-petrol') },
  _padding: { top: v('sp-md'), bottom: v('sp-md'), left: v('sp-lg'), right: v('sp-lg') },
  _typography: { 'font-size': v('fs-sm'), 'font-weight': v('fw-bold'), color: clr('clr-white') },
});
c('c-panel__body', MISC, { _padding: box(v('sp-lg')) });

// Credential row (Our People).
c('c-cred', MISC, {
  _display: 'flex', _gap: v('sp-sm'), _alignItems: 'flex-start',
  _cssCustom:
    '%root%::before { content:""; flex:none; width:6px; height:6px; border-radius:50%;'
    + ' background: var(--clr-petrol); margin-top: .5em; }',
});
c('c-cred__label',  MISC, { _typography: { 'font-size': v('fs-sm'), 'font-weight': v('fw-semibold'), color: clr('clr-ink') } });
c('c-cred__detail', MISC, { _typography: { 'font-size': v('fs-xs'), color: clr('clr-muted-ink') }, _margin: { top: '2px' } });

// Soft credential chip.
c('c-chip', MISC, {
  _padding: { top: '4px', bottom: '4px', left: '10px', right: '10px' },
  _background: { color: { raw: 'rgba(8,64,88,.08)' } },
  _border: { width: box('1px'), style: 'solid', color: { raw: 'rgba(8,64,88,.15)' } },
  _typography: {
    'font-size': v('fs-eyebrow'), 'font-weight': v('fw-semibold'),
    'letter-spacing': v('ls-wide'), 'text-transform': 'uppercase', color: clr('clr-petrol'),
  },
});

// Section label above a divided block.
c('c-label', MISC, {
  _typography: {
    'font-size': v('fs-eyebrow'), 'font-weight': v('fw-bold'),
    'letter-spacing': v('ls-wide'), 'text-transform': 'uppercase', color: clr('clr-muted-ink'),
  },
  _margin: { bottom: v('sp-md') },
});

// 404.
c('c-404', MISC, {
  _heightMin: '60vh', _display: 'flex', _alignItems: 'center', _justifyContent: 'center',
  _padding: { left: v('container-pad'), right: v('container-pad') },
});
c('c-404__inner', MISC, { _widthMax: '32rem', _typography: { 'text-align': 'center' }, _display: 'flex', _direction: 'column', _alignItems: 'center' });
c('c-404__title', MISC, {
  _typography: {
    'font-size': 'clamp(2rem, 6vw, 3.5rem)', 'font-weight': v('fw-black'),
    'line-height': v('lh-tight'), color: clr('clr-petrol'),
  },
  _margin: { top: v('sp-sm'), bottom: v('sp-sm') },
});

module.exports = {};
