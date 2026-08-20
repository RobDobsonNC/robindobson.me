/**
 * Coeus Technical — BEM global class library for Bricks.
 *
 * Every visual decision in the site lives here as a Bricks *global class*.
 * Templates carry no inline styling: an element gets one or more of these
 * classes and nothing else. Editing `c-btn--primary` in the Bricks class
 * manager therefore restyles every primary button on the site at once, which
 * is the whole point of the exercise.
 *
 * Naming is strict BEM:
 *   c-block            component root
 *   c-block__element   part of a component
 *   c-block--modifier  variant of a component
 *   l-*                layout primitives
 *   u-*                single-purpose utilities (used sparingly)
 *
 * Colour values are emitted as `{ raw, hex }`. Bricks 2.x binds the setting to
 * the CSS variable via `raw`; if a build ignores `raw` it falls back to the
 * literal `hex`, so the site renders correctly either way.
 */

const crypto = require('crypto');
const { v, raw: tokenRaw } = require('./tokens');

const defs = [];
const byName = new Map();

/** Stable class id derived from the class name — safe to re-import. */
function classId(name) {
  const h = crypto.createHash('sha1').update('coeus-class:' + name).digest('hex');
  return 'abcdefghijklmnopqrstuvwxyz'[parseInt(h.slice(0, 2), 16) % 26] + h.slice(2, 7);
}

/**
 * Colour binding. Pass a token name; get a Bricks colour object that prefers
 * the variable but degrades to the literal.
 */
function clr(token) {
  const value = tokenRaw[token];
  if (!value) throw new Error(`Unknown colour token: ${token}`);
  return { raw: v(token), hex: value.startsWith('#') ? value : undefined };
}

/** Literal colour, for the handful of places a token would be overkill. */
const hex = (h) => ({ hex: h });

/** Register a class. */
function c(name, category, settings) {
  if (byName.has(name)) throw new Error(`Duplicate class: ${name}`);
  const def = { id: classId(name), name, category, settings };
  defs.push(def);
  byName.set(name, def);
  return name;
}

/** Uniform box shorthand: box('1rem') or box({top:'1rem',bottom:'2rem'}) */
const box = (val) =>
  typeof val === 'object' ? val : { top: val, right: val, bottom: val, left: val };

// Bricks breakpoint suffixes.
const TAB = ':tablet_portrait';   // <= 991px
const MOB = ':mobile_landscape';  // <= 767px
const SM  = ':mobile_portrait';   // <= 478px

/* =========================================================================
   LAYOUT PRIMITIVES
   ========================================================================= */
const CAT_LAYOUT = 'Layout';

c('l-section', CAT_LAYOUT, {
  _padding: { top: v('sp-section'), bottom: v('sp-section'), left: '0', right: '0' },
  _width: '100%',
});
c('l-section--lg',    CAT_LAYOUT, { _padding: { top: v('sp-section-lg'), bottom: v('sp-section-lg') } });
c('l-section--sm',    CAT_LAYOUT, { _padding: { top: v('sp-section-sm'), bottom: v('sp-section-sm') } });
c('l-section--flush', CAT_LAYOUT, { _padding: box('0') });

c('l-section--white',  CAT_LAYOUT, { _background: { color: clr('clr-white') } });
c('l-section--muted',  CAT_LAYOUT, { _background: { color: clr('clr-muted') } });
c('l-section--petrol', CAT_LAYOUT, { _background: { color: clr('clr-petrol') }, _typography: { color: clr('clr-white') } });
c('l-section--abyss',  CAT_LAYOUT, { _background: { color: clr('clr-abyss') },  _typography: { color: clr('clr-white') } });

c('l-section--border-b', CAT_LAYOUT, {
  _border: { width: { bottom: '1px' }, style: 'solid', color: clr('clr-border') },
});
c('l-section--border-y', CAT_LAYOUT, {
  _border: { width: { top: '1px', bottom: '1px' }, style: 'solid', color: clr('clr-border') },
});
c('l-section--clip', CAT_LAYOUT, { _overflow: 'hidden' });

c('l-container', CAT_LAYOUT, {
  _width: '100%',
  _widthMax: v('container-max'),
  _margin: { left: 'auto', right: 'auto' },
  _padding: { left: v('container-pad'), right: v('container-pad') },
});
c('l-container--narrow', CAT_LAYOUT, { _widthMax: v('container-narrow') });
c('l-container--center', CAT_LAYOUT, { _typography: { 'text-align': 'center' } });

// Grids. Column counts collapse at Bricks' default breakpoints.
c('l-grid', CAT_LAYOUT, { _display: 'grid', _gap: v('sp-sm'), _gridTemplateColumns: '1fr' });
c('l-grid--2', CAT_LAYOUT, {
  _gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  ['_gridTemplateColumns' + MOB]: '1fr',
});
c('l-grid--3', CAT_LAYOUT, {
  _gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  ['_gridTemplateColumns' + TAB]: 'repeat(2, minmax(0, 1fr))',
  ['_gridTemplateColumns' + MOB]: '1fr',
});
c('l-grid--4', CAT_LAYOUT, {
  _gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  ['_gridTemplateColumns' + TAB]: 'repeat(2, minmax(0, 1fr))',
  ['_gridTemplateColumns' + SM]:  '1fr',
});
c('l-grid--5', CAT_LAYOUT, {
  _gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
  ['_gridTemplateColumns' + TAB]: 'repeat(2, minmax(0, 1fr))',
  ['_gridTemplateColumns' + SM]:  '1fr',
});
// Asymmetric editorial splits used on the inner pages.
c('l-grid--7-5', CAT_LAYOUT, {
  _gridTemplateColumns: '7fr 5fr',
  _gap: v('sp-2xl'),
  ['_gridTemplateColumns' + TAB]: '1fr',
});
c('l-grid--5-7', CAT_LAYOUT, {
  _gridTemplateColumns: '5fr 7fr',
  _gap: v('sp-2xl'),
  ['_gridTemplateColumns' + TAB]: '1fr',
});
c('l-grid--4-8', CAT_LAYOUT, {
  _gridTemplateColumns: '4fr 8fr',
  _gap: v('sp-2xl'),
  ['_gridTemplateColumns' + TAB]: '1fr',
});
c('l-grid--split', CAT_LAYOUT, {
  _gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  _gap: v('sp-2xl'),
  ['_gridTemplateColumns' + TAB]: '1fr',
});
c('l-grid--seam',  CAT_LAYOUT, { _gap: '2px' });   // hairline seam between phase cards
c('l-grid--gap-md', CAT_LAYOUT, { _gap: v('sp-md') });
c('l-grid--gap-lg', CAT_LAYOUT, { _gap: v('sp-lg') });
c('l-grid--top',   CAT_LAYOUT, { _alignItems: 'start' });

c('l-stack', CAT_LAYOUT, { _display: 'flex', _direction: 'column', _gap: v('sp-sm') });
c('l-stack--md', CAT_LAYOUT, { _gap: v('sp-md') });
c('l-stack--lg', CAT_LAYOUT, { _gap: v('sp-lg') });

c('l-row', CAT_LAYOUT, { _display: 'flex', _direction: 'row', _alignItems: 'center', _gap: v('sp-sm'), _flexWrap: 'wrap' });
c('l-row--between', CAT_LAYOUT, { _justifyContent: 'space-between' });
c('l-row--center',  CAT_LAYOUT, { _justifyContent: 'center' });
c('l-row--top',     CAT_LAYOUT, { _alignItems: 'flex-start' });
c('l-row--gap-lg',  CAT_LAYOUT, { _gap: v('sp-lg') });

/* =========================================================================
   TYPOGRAPHY / CONTENT
   ========================================================================= */
const CAT_TYPE = 'Typography';

c('c-eyebrow', CAT_TYPE, {
  _typography: {
    'font-size': v('fs-eyebrow'),
    'font-weight': v('fw-bold'),
    'letter-spacing': v('ls-eyebrow'),
    'text-transform': 'uppercase',
    color: clr('clr-ember'),
  },
});
c('c-eyebrow--muted', CAT_TYPE, { _typography: { color: clr('clr-muted-ink') } });
c('c-eyebrow--on-dark', CAT_TYPE, { _typography: { color: clr('clr-on-dark-40') } });

c('c-rule', CAT_TYPE, {
  _width: v('rule-w'),
  _height: v('rule-h'),
  _background: { color: clr('clr-ember') },
  _margin: { top: v('sp-sm'), bottom: '0' },
});
c('c-rule--center', CAT_TYPE, { _margin: { left: 'auto', right: 'auto' } });
c('c-rule--sm', CAT_TYPE, { _width: '1.25rem' });

c('c-prose', CAT_TYPE, {
  _typography: { 'font-size': v('fs-sm'), 'line-height': v('lh-body'), color: clr('clr-muted-ink') },
});
c('c-prose--on-dark', CAT_TYPE, { _typography: { color: clr('clr-on-dark-55') } });
c('c-prose--lead', CAT_TYPE, { _typography: { 'font-size': v('fs-lead') } });
c('c-prose--intro', CAT_TYPE, {
  _typography: { 'font-size': v('fs-intro'), color: clr('clr-ink'), 'line-height': v('lh-body') },
  _widthMax: '52rem',
});
c('c-prose--narrow', CAT_TYPE, { _widthMax: '36rem' });

/* =========================================================================
   SECTION HEADING  (Ember number → Petrol title → Ember rule → subtitle)
   ========================================================================= */
const CAT_SECTION = 'Section heading';

c('c-section-heading', CAT_SECTION, {
  _display: 'flex', _direction: 'column', _gap: v('sp-3xs'),
  _margin: { bottom: v('sp-2xl') },
});
c('c-section-heading--center', CAT_SECTION, { _alignItems: 'center', _typography: { 'text-align': 'center' } });
c('c-section-heading--flush',  CAT_SECTION, { _margin: { bottom: v('sp-lg') } });

c('c-section-heading__num', CAT_SECTION, {
  _typography: {
    'font-size': v('fs-eyebrow'), 'font-weight': v('fw-bold'),
    'letter-spacing': v('ls-eyebrow'), 'text-transform': 'uppercase',
    color: clr('clr-ember'),
  },
});
c('c-section-heading__title', CAT_SECTION, {
  _typography: {
    'font-size': v('fs-h2'), 'font-weight': v('fw-bold'),
    'line-height': v('lh-tight'), color: clr('clr-petrol'),
  },
  _margin: { top: v('sp-3xs') },
});
c('c-section-heading__title--sm',      CAT_SECTION, { _typography: { 'font-size': v('fs-h2-sm'), 'font-weight': v('fw-black') } });
c('c-section-heading__title--on-dark', CAT_SECTION, { _typography: { color: clr('clr-white') } });
c('c-section-heading__rule', CAT_SECTION, {
  _width: v('rule-w'), _height: v('rule-h'),
  _background: { color: clr('clr-ember') },
  _margin: { top: v('sp-sm') },
});
c('c-section-heading__subtitle', CAT_SECTION, {
  _typography: { 'font-size': v('fs-sm'), 'line-height': v('lh-body'), color: clr('clr-muted-ink') },
  _widthMax: '36rem', _margin: { top: v('sp-sm') },
});
c('c-section-heading__subtitle--on-dark', CAT_SECTION, { _typography: { color: clr('clr-on-dark-55') } });

/* =========================================================================
   BUTTONS
   ========================================================================= */
const CAT_BTN = 'Buttons';

c('c-btn', CAT_BTN, {
  _display: 'inline-flex', _alignItems: 'center', _gap: v('sp-2xs'),
  _padding: { top: '0.875rem', bottom: '0.875rem', left: v('sp-xl'), right: v('sp-xl') },
  _typography: { 'font-size': v('fs-sm'), 'font-weight': v('fw-semibold'), 'text-decoration': 'none' },
  _border: { radius: box(v('radius')) },
  _transition: `all ${v('transition')} ease`,
});
c('c-btn--primary', CAT_BTN, {
  _background: { color: clr('clr-petrol') },
  _typography: { color: clr('clr-white') },
  _cssCustom: '%root%:hover { opacity: .9; }',
});
c('c-btn--white', CAT_BTN, {
  _background: { color: clr('clr-white') },
  _typography: { color: clr('clr-petrol') },
  _cssCustom: '%root%:hover { opacity: .9; }',
});
c('c-btn--outline', CAT_BTN, {
  _background: { color: { raw: 'transparent' } },
  _typography: { color: clr('clr-ink') },
  _border: { width: box('1px'), style: 'solid', color: clr('clr-border') },
  _cssCustom: '%root%:hover { border-color: var(--clr-petrol); color: var(--clr-petrol); }',
});
c('c-btn--outline-light', CAT_BTN, {
  _background: { color: { raw: 'transparent' } },
  _typography: { color: clr('clr-on-dark-90') },
  _border: { width: box('1px'), style: 'solid', color: clr('clr-on-dark-25') },
  _cssCustom: '%root%:hover { border-color: #fff; color: #fff; }',
});
c('c-btn--outline-petrol', CAT_BTN, {
  _background: { color: { raw: 'transparent' } },
  _typography: { color: clr('clr-petrol') },
  _border: { width: box('1px'), style: 'solid', color: clr('clr-petrol') },
  _cssCustom: '%root%:hover { background: var(--clr-petrol); color: #fff; }',
});
c('c-btn--sm', CAT_BTN, {
  _padding: { top: v('sp-2xs'), bottom: v('sp-2xs'), left: v('sp-sm'), right: v('sp-sm') },
  _typography: { 'font-size': v('fs-xs') },
});
c('c-btn--block', CAT_BTN, { _display: 'flex', _justifyContent: 'center', _width: '100%' });
c('c-btn--quiet', CAT_BTN, {
  _padding: box('0'),
  _background: { color: { raw: 'transparent' } },
  _typography: { color: clr('clr-petrol'), 'font-size': v('fs-sm'), 'font-weight': v('fw-semibold') },
});

c('c-btn-group', CAT_BTN, { _display: 'flex', _flexWrap: 'wrap', _gap: v('sp-sm') });
c('c-btn-group--center', CAT_BTN, { _justifyContent: 'center' });

module.exports = { defs, byName, classId, clr, hex, box, c, CAT_LAYOUT, TAB, MOB, SM };
