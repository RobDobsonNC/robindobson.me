/**
 * Component-level BEM classes. Extends the shared registry in classes.js.
 * Split purely for file length — `defs` is the same array in both modules.
 */

const { c, clr, box, TAB, MOB, SM } = require('./classes');
const { v, raw: tokenRaw } = require('./tokens');

/* =========================================================================
   SITE HEADER
   ========================================================================= */
const H = 'Site header';

c('c-header', H, {
  _position: 'sticky', _top: '0', _zIndex: '999',
  _background: { color: clr('clr-white') },
  _width: '100%',
  _border: { width: { bottom: '1px' }, style: 'solid', color: clr('clr-border') },
});
c('c-header__stripe', H, { _height: v('stripe-h'), _width: '100%', _background: { color: clr('clr-ember') } });
c('c-header__bar', H, {
  _display: 'flex', _alignItems: 'center', _justifyContent: 'space-between',
  _height: v('header-h'),
  _width: '100%', _widthMax: v('container-max'),
  _margin: { left: 'auto', right: 'auto' },
  _padding: { left: v('container-pad'), right: v('container-pad') },
});
c('c-header__logo', H, { _height: '3.5rem', _width: 'auto', _objectFit: 'contain' });
c('c-header__nav', H, {
  _display: 'flex', _alignItems: 'center', _gap: '0', _flex: '1',
  ['_display' + TAB]: 'none',
});
c('c-header__item', H, { _position: 'relative' });
c('c-header__link', H, {
  _display: 'flex', _alignItems: 'center', _gap: v('sp-3xs'),
  _padding: { top: v('sp-md'), bottom: v('sp-md'), left: v('sp-sm'), right: v('sp-sm') },
  _typography: {
    'font-size': v('fs-sm'), 'font-weight': v('fw-medium'),
    color: clr('clr-ink'), 'text-decoration': 'none',
  },
  _border: { width: { bottom: '2px' }, style: 'solid', color: { raw: 'transparent' } },
  _transition: `color ${v('transition')} ease, border-color ${v('transition')} ease`,
  _cssCustom: '%root%:hover { color: var(--clr-petrol); }',
});
c('c-header__link--active', H, {
  _typography: { color: clr('clr-petrol') },
  _border: { width: { bottom: '2px' }, style: 'solid', color: clr('clr-petrol') },
});
c('c-header__dropdown', H, {
  _position: 'absolute', _top: '100%', _left: '0', _zIndex: '50',
  _background: { color: clr('clr-white') },
  _border: { width: box('1px'), style: 'solid', color: clr('clr-border') },
  _padding: { top: v('sp-2xs'), bottom: v('sp-2xs') },
  _width: 'max-content', _widthMin: '16rem',
  _boxShadow: { values: { offsetX: '0', offsetY: '12px', blur: '28px', spread: '-8px' }, color: { raw: 'rgba(5,43,59,.18)' } },
});
c('c-header__dropdown-item', H, {
  _display: 'flex', _direction: 'column',
  _padding: { top: '0.875rem', bottom: '0.875rem', left: v('sp-md'), right: v('sp-md') },
  _typography: { 'text-decoration': 'none' },
  _transition: `background ${v('transition')} ease`,
  _cssCustom: '%root%:hover { background: var(--clr-muted); }',
});
c('c-header__dropdown-label', H, {
  _typography: { 'font-size': v('fs-sm'), 'font-weight': v('fw-semibold'), color: clr('clr-ink') },
});
c('c-header__dropdown-sub', H, {
  _typography: { 'font-size': v('fs-xs'), color: clr('clr-muted-ink') },
  _margin: { top: '2px' },
});
c('c-header__cta', H, { ['_display' + TAB]: 'none' });
c('c-header__toggle', H, {
  _display: 'none', _padding: v('sp-2xs'),
  _typography: { color: clr('clr-ink') },
  _background: { color: { raw: 'transparent' } },
  ['_display' + TAB]: 'flex',
});
c('c-header__mobile', H, {
  _display: 'none', _direction: 'column',
  _background: { color: clr('clr-white') },
  _border: { width: { top: '1px' }, style: 'solid', color: clr('clr-border') },
  _padding: { left: v('container-pad'), right: v('container-pad'), bottom: v('sp-md') },
  _heightMax: '80vh', _overflow: 'auto',
});
c('c-header__mobile-group', H, {
  _typography: {
    'font-size': v('fs-xs'), 'font-weight': v('fw-bold'),
    'letter-spacing': v('ls-wide'), 'text-transform': 'uppercase',
    color: clr('clr-muted-ink'),
  },
  _padding: { top: v('sp-md'), bottom: v('sp-2xs') },
});
c('c-header__mobile-link', H, {
  _display: 'block',
  _padding: { top: v('sp-xs'), bottom: v('sp-xs') },
  _typography: { 'font-size': v('fs-sm'), 'font-weight': v('fw-medium'), color: clr('clr-ink'), 'text-decoration': 'none' },
  _border: { width: { bottom: '1px' }, style: 'solid', color: clr('clr-border') },
});

/* =========================================================================
   SITE FOOTER
   ========================================================================= */
const F = 'Site footer';

c('c-footer', F, {
  _background: { color: clr('clr-abyss') },
  _typography: { color: clr('clr-white') },
});
c('c-footer__inner', F, {
  _width: '100%', _widthMax: v('container-max'),
  _margin: { left: 'auto', right: 'auto' },
  _padding: { left: v('container-pad'), right: v('container-pad'), top: v('sp-2xl'), bottom: v('sp-lg') },
});
c('c-footer__grid', F, {
  _display: 'grid', _gap: v('sp-xl'),
  _gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  ['_gridTemplateColumns' + TAB]: 'repeat(2, minmax(0, 1fr))',
  ['_gridTemplateColumns' + SM]: '1fr',
  _padding: { bottom: v('sp-2xl') },
  _border: { width: { bottom: '1px' }, style: 'solid', color: clr('clr-on-dark-10') },
});
c('c-footer__logo', F, { _height: '3rem', _width: 'auto', _objectFit: 'contain', _margin: { bottom: v('sp-md') } });
c('c-footer__lockup', F, {
  _width: '220px', _heightMin: '80px',
  _display: 'flex', _alignItems: 'center', _justifyContent: 'center',
  _border: { width: box('1px'), style: 'dashed', color: clr('clr-on-dark-25') },
  _margin: { bottom: v('sp-md') },
  _typography: {
    'font-size': v('fs-xs'), 'font-weight': v('fw-semibold'), 'font-style': 'italic',
    'text-align': 'center', color: clr('clr-on-dark-25'),
  },
});
c('c-footer__note', F, {
  _typography: { 'font-size': v('fs-xs'), 'line-height': v('lh-body'), color: clr('clr-on-dark-40') },
  _margin: { bottom: v('sp-md') },
});
c('c-footer__heading', F, {
  _typography: {
    'font-size': v('fs-xs'), 'font-weight': v('fw-bold'),
    'letter-spacing': v('ls-wide'), 'text-transform': 'uppercase', color: clr('clr-white'),
  },
  _margin: { bottom: v('sp-md') },
});
c('c-footer__list', F, { _display: 'flex', _direction: 'column', _gap: '0.625rem' });
c('c-footer__link', F, {
  _display: 'flex', _alignItems: 'center', _gap: v('sp-2xs'),
  _typography: { 'font-size': v('fs-sm'), color: clr('clr-on-dark-55'), 'text-decoration': 'none' },
  _transition: `color ${v('transition')} ease`,
  _cssCustom:
    '%root%:hover { color: #fff; }'
    + '%root%::before { content:""; display:block; width:.75rem; height:1px; background:rgba(255,255,255,.2); transition:all .2s ease; }'
    + '%root%:hover::before { background:#fff; width:1rem; }',
});
c('c-footer__contact-item', F, {
  _display: 'flex', _alignItems: 'flex-start', _gap: v('sp-xs'),
  _typography: { 'font-size': v('fs-sm'), color: clr('clr-on-dark-55'), 'text-decoration': 'none' },
});
c('c-footer__legal', F, {
  _margin: { top: v('sp-lg') }, _padding: { top: v('sp-lg') },
  _border: { width: { top: '1px' }, style: 'solid', color: clr('clr-on-dark-10') },
  _typography: { 'font-size': v('fs-xs'), 'line-height': v('lh-body'), color: clr('clr-on-dark-25') },
});
c('c-footer__bottom', F, {
  _display: 'flex', _alignItems: 'center', _justifyContent: 'space-between',
  _flexWrap: 'wrap', _gap: v('sp-sm'), _padding: { top: v('sp-lg') },
  _typography: { 'font-size': v('fs-xs'), color: clr('clr-on-dark-25') },
  ['_direction' + MOB]: 'column',
});
c('c-footer__policy', F, {
  _typography: { 'font-size': v('fs-xs'), color: clr('clr-on-dark-25'), 'text-decoration': 'none' },
  _cssCustom: '%root%:hover { color: rgba(255,255,255,.6); }',
});

/* =========================================================================
   HERO  (home) and PAGE HERO (inner pages)
   ========================================================================= */
const HERO = 'Hero';

c('c-hero', HERO, {
  _position: 'relative', _display: 'flex', _alignItems: 'center',
  _heightMin: '86vh', _overflow: 'hidden',
  _background: { color: clr('clr-abyss') },
});
c('c-hero__media', HERO, {
  _position: 'absolute', _top: '0', _left: '0', _width: '100%', _height: '100%',
  _objectFit: 'cover', _opacity: '0.45',
});
c('c-hero__scrim', HERO, {
  _position: 'absolute', _top: '0', _left: '0', _width: '100%', _height: '100%',
  _background: { color: { raw: v('clr-hero-scrim') } },
});
c('c-hero__inner', HERO, {
  _position: 'relative', _zIndex: '10',
  _width: '100%', _widthMax: v('container-max'),
  _margin: { left: 'auto', right: 'auto' },
  _padding: { left: v('container-pad'), right: v('container-pad'), top: v('sp-4xl'), bottom: v('sp-4xl') },
});
c('c-hero__body', HERO, { _widthMax: '48rem' });
c('c-hero__eyebrow', HERO, {
  _typography: {
    'font-size': v('fs-eyebrow'), 'font-weight': v('fw-bold'),
    'letter-spacing': v('ls-eyebrow'), 'text-transform': 'uppercase', color: clr('clr-ember'),
  },
  _margin: { bottom: v('sp-xl') },
});
c('c-hero__title', HERO, {
  _typography: {
    'font-size': v('fs-hero'), 'font-weight': v('fw-black'),
    'line-height': '1.08', color: clr('clr-white'),
  },
  _margin: { bottom: v('sp-xl') },
});
c('c-hero__lead', HERO, {
  _typography: { 'font-size': v('fs-lead'), 'line-height': v('lh-body'), color: clr('clr-on-dark-55') },
  _widthMax: '42rem', _margin: { bottom: v('sp-2xl') },
});

c('c-page-hero', HERO, {
  _position: 'relative', _height: '20rem', _overflow: 'hidden',
  _background: { color: clr('clr-abyss') },
  ['_height' + MOB]: '18rem',
});
c('c-page-hero__media', HERO, {
  _position: 'absolute', _top: '0', _left: '0', _width: '100%', _height: '100%',
  _objectFit: 'cover', _opacity: '0.12',
});
c('c-page-hero__scrim', HERO, {
  _position: 'absolute', _top: '0', _left: '0', _width: '100%', _height: '100%',
  _background: { color: { raw: v('clr-page-hero-scrim') } },
});
c('c-page-hero__inner', HERO, {
  _position: 'relative', _zIndex: '10', _height: '100%',
  _display: 'flex', _direction: 'column', _justifyContent: 'flex-end',
  _width: '100%', _widthMax: v('container-max'),
  _margin: { left: 'auto', right: 'auto' },
  _padding: { left: v('container-pad'), right: v('container-pad'), bottom: v('sp-xl') },
});
c('c-page-hero__title', HERO, {
  _typography: {
    'font-size': v('fs-page-hero'), 'font-weight': v('fw-black'),
    'line-height': v('lh-tight'), color: clr('clr-white'),
  },
});
c('c-breadcrumb', HERO, {
  _display: 'flex', _alignItems: 'center', _gap: v('sp-2xs'), _flexWrap: 'wrap',
  _typography: { 'font-size': v('fs-xs'), color: clr('clr-on-dark-40') },
  _margin: { bottom: v('sp-sm') },
});
c('c-breadcrumb__link', HERO, {
  _typography: { color: clr('clr-on-dark-40'), 'text-decoration': 'none' },
  _cssCustom: '%root%:hover { color: #fff; }',
});
c('c-breadcrumb__current', HERO, { _typography: { color: clr('clr-on-dark-70') } });

/* =========================================================================
   CARDS
   ========================================================================= */
const CARD = 'Cards';

// Lifecycle phase card — graduated teal fill, ghost numeral, hover rule.
c('c-phase-card', CARD, {
  _position: 'relative', _overflow: 'hidden',
  _display: 'flex', _direction: 'column',
  _padding: box(v('sp-lg')), _heightMin: '360px',
  _typography: { 'text-decoration': 'none' },
  _transition: `all ${v('transition-slow')} ease`,
  _cssCustom:
    '%root%::after { content:""; position:absolute; left:0; right:0; bottom:0; height:2px;'
    + ' background:var(--clr-ember); transform:scaleX(0); transform-origin:left;'
    + ' transition:transform .3s ease; }'
    + '%root%:hover::after { transform:scaleX(1); }',
});
c('c-phase-card--01', CARD, { _background: { color: clr('clr-phase-01') } });
c('c-phase-card--02', CARD, { _background: { color: clr('clr-phase-02') } });
c('c-phase-card--03', CARD, { _background: { color: clr('clr-phase-03') } });
c('c-phase-card--04', CARD, { _background: { color: clr('clr-phase-04') } });
c('c-phase-card__ghost', CARD, {
  _position: 'absolute', _bottom: '0', _right: v('sp-xs'), _zIndex: '0',
  _typography: {
    'font-size': '9rem', 'font-weight': '900', 'line-height': '1',
    color: { raw: 'rgba(255,255,255,.07)' },
  },
  _pointerEvents: 'none',
});
c('c-phase-card__icon', CARD, {
  _position: 'relative', _zIndex: '1',
  _width: '2.5rem', _height: '2.5rem',
  _display: 'flex', _alignItems: 'center', _justifyContent: 'center',
  _border: { width: box('1px'), style: 'solid', color: clr('clr-on-dark-25') },
  _margin: { bottom: v('sp-md') },
  _typography: { 'font-size': '0.4375rem', 'font-weight': v('fw-bold'), 'text-transform': 'uppercase', color: clr('clr-on-dark-25') },
});
c('c-phase-card__category', CARD, {
  _position: 'relative', _zIndex: '1',
  _typography: {
    'font-size': v('fs-micro'), 'font-weight': v('fw-bold'),
    'letter-spacing': '0.35em', 'text-transform': 'uppercase', color: clr('clr-on-dark-40'),
  },
});
c('c-phase-card__spacer', CARD, { _flex: '1' });
c('c-phase-card__step', CARD, {
  _position: 'relative', _zIndex: '1',
  _typography: { 'font-size': v('fs-eyebrow'), 'font-weight': v('fw-bold'), 'letter-spacing': v('ls-wide'), color: clr('clr-on-dark-25') },
  _margin: { bottom: v('sp-2xs') },
});
c('c-phase-card__title', CARD, {
  _position: 'relative', _zIndex: '1',
  _typography: { 'font-size': v('fs-h3'), 'font-weight': v('fw-bold'), 'line-height': v('lh-tight'), color: clr('clr-white') },
  _margin: { bottom: v('sp-xs') },
});
c('c-phase-card__desc', CARD, {
  _position: 'relative', _zIndex: '1',
  _typography: { 'font-size': v('fs-sm'), 'line-height': v('lh-body'), color: clr('clr-on-dark-55') },
});
c('c-phase-card__more', CARD, {
  _position: 'relative', _zIndex: '1',
  _display: 'flex', _alignItems: 'center', _gap: v('sp-3xs'),
  _margin: { top: v('sp-md') },
  _typography: { 'font-size': v('fs-xs'), 'font-weight': v('fw-semibold'), color: clr('clr-on-dark-40') },
});

// Audience card — muted panel, italic question, petrol CTA.
c('c-audience-card', CARD, {
  _display: 'flex', _direction: 'column', _padding: '1.75rem',
  _background: { color: clr('clr-muted') },
  _border: { width: box('1px'), style: 'solid', color: clr('clr-border') },
});
c('c-audience-card__title', CARD, {
  _typography: { 'font-size': v('fs-h4'), 'font-weight': v('fw-bold'), 'line-height': v('lh-tight'), color: clr('clr-petrol'), 'white-space': 'pre-line' },
  _margin: { bottom: v('sp-sm') },
});
c('c-audience-card__question', CARD, {
  _flex: '1',
  _typography: { 'font-size': v('fs-sm'), 'font-style': 'italic', 'line-height': v('lh-body'), color: clr('clr-muted-ink') },
});

// Generic surface card used across About / How We Work / inner pages.
c('c-card', CARD, {
  _background: { color: clr('clr-white') },
  _border: { width: box('1px'), style: 'solid', color: clr('clr-border') },
  _padding: box(v('sp-md')),
  _display: 'flex', _direction: 'column',
});
c('c-card--muted',  CARD, { _background: { color: clr('clr-muted') } });
c('c-card--pad-lg', CARD, { _padding: box(v('sp-lg')) });
c('c-card--hover',  CARD, {
  _transition: `all ${v('transition')} ease`,
  _cssCustom: '%root%:hover { border-color: var(--clr-petrol); background: var(--clr-muted); }',
});
c('c-card--link', CARD, { _typography: { 'text-decoration': 'none' } });
c('c-card__label', CARD, {
  _typography: { 'font-size': v('fs-xs'), 'font-weight': v('fw-semibold'), color: clr('clr-petrol') },
  _margin: { bottom: v('sp-3xs') },
});
c('c-card__title', CARD, {
  _typography: { 'font-size': v('fs-sm'), 'font-weight': v('fw-bold'), color: clr('clr-petrol') },
  _margin: { bottom: v('sp-2xs') },
});
c('c-card__body', CARD, {
  _typography: { 'font-size': v('fs-xs'), 'line-height': v('lh-body'), color: clr('clr-muted-ink') },
});

// Value card (About) — ember numeral + short rule.
c('c-value-card', CARD, {
  _display: 'flex', _direction: 'column', _padding: '1.75rem',
  _background: { color: clr('clr-white') },
  _border: { width: box('1px'), style: 'solid', color: clr('clr-border') },
  _transition: `box-shadow ${v('transition')} ease`,
  _cssCustom: '%root%:hover { box-shadow: 0 6px 20px -8px rgba(5,43,59,.25); }',
});
c('c-value-card__num', CARD, {
  _typography: { 'font-size': v('fs-micro'), 'font-weight': v('fw-bold'), 'letter-spacing': v('ls-eyebrow'), 'text-transform': 'uppercase', color: clr('clr-ember') },
  _margin: { bottom: v('sp-sm') },
});
c('c-value-card__title', CARD, {
  _typography: { 'font-size': v('fs-sm'), 'font-weight': v('fw-bold'), color: clr('clr-petrol') },
  _margin: { bottom: v('sp-xs') },
});

/* =========================================================================
   LISTS / RULE-MARKED ITEMS
   ========================================================================= */
const LIST = 'Lists';

// Numbered "why" row on the petrol band.
c('c-why', LIST, { _display: 'flex', _direction: 'column' });
c('c-why__item', LIST, {
  _display: 'flex', _gap: v('sp-md'),
  _padding: { top: v('sp-lg'), bottom: v('sp-lg'), left: v('sp-md'), right: v('sp-md') },
  _margin: { left: `calc(-1 * ${tokenRaw['sp-md']})`, right: `calc(-1 * ${tokenRaw['sp-md']})` },
  _border: { width: { top: '1px' }, style: 'solid', color: clr('clr-on-dark-10') },
  _transition: `background ${v('transition')} ease`,
  _cssCustom: '%root%:hover { background: rgba(255,255,255,.05); }',
});
c('c-why__num', LIST, {
  _typography: { 'font-size': v('fs-sm'), 'font-weight': v('fw-bold'), color: clr('clr-ember') },
  _flexShrink: '0',
});
c('c-why__heading', LIST, {
  _typography: { 'font-size': v('fs-base'), 'font-weight': v('fw-semibold'), color: clr('clr-white') },
  _margin: { bottom: v('sp-2xs') },
});
c('c-why__body', LIST, {
  _typography: { 'font-size': v('fs-sm'), 'line-height': v('lh-body'), color: clr('clr-on-dark-55') },
});

// Ember-bar item: a 2px accent rule beside a label + body.
c('c-tick', LIST, { _display: 'flex', _gap: v('sp-sm'), _alignItems: 'flex-start' });
c('c-tick__bar', LIST, {
  _width: '2px', _heightMin: '2.5rem', _flexShrink: '0',
  _background: { color: clr('clr-ember') },
});
c('c-tick__label', LIST, {
  _typography: { 'font-size': v('fs-sm'), 'font-weight': v('fw-semibold'), color: clr('clr-petrol') },
  _margin: { bottom: '2px' },
});
c('c-tick__body', LIST, {
  _typography: { 'font-size': v('fs-xs'), 'line-height': v('lh-body'), color: clr('clr-muted-ink') },
});

// Registration entry — left hairline, title + body.
c('c-reg', LIST, {
  _border: { width: { left: '2px' }, style: 'solid', color: { raw: 'rgba(8,64,88,.15)' } },
  _padding: { left: v('sp-md'), top: v('sp-2xs'), bottom: v('sp-2xs') },
});
c('c-reg__group-label', LIST, {
  _typography: { 'font-size': v('fs-micro'), 'font-weight': v('fw-bold'), 'letter-spacing': v('ls-eyebrow'), 'text-transform': 'uppercase', color: clr('clr-ember') },
  _margin: { bottom: v('sp-sm') },
});
c('c-reg__title', LIST, { _typography: { 'font-size': v('fs-sm'), 'font-weight': v('fw-semibold'), color: clr('clr-petrol') } });
c('c-reg__body',  LIST, { _typography: { 'font-size': v('fs-xs'), 'line-height': v('lh-body'), color: clr('clr-muted-ink') }, _margin: { top: '2px' } });

/* =========================================================================
   MEDIA / CREDIBILITY STRIPS
   ========================================================================= */
const MEDIA = 'Media & credibility';

c('c-accred', MEDIA, {
  _display: 'flex', _alignItems: 'center', _justifyContent: 'space-between',
  _flexWrap: 'wrap', _gap: v('sp-md'),
});
c('c-accred__label', MEDIA, {
  _typography: { 'font-size': v('fs-eyebrow'), 'font-weight': v('fw-bold'), 'letter-spacing': v('ls-wide'), 'text-transform': 'uppercase', color: clr('clr-muted-ink') },
  _flexShrink: '0',
});
c('c-accred__logos', MEDIA, { _display: 'flex', _alignItems: 'center', _flexWrap: 'wrap', _gap: '3.5rem' });
c('c-accred__logo', MEDIA, {
  _height: '2.25rem', _width: 'auto', _objectFit: 'contain',
  _cssFilter: { grayscale: '100' }, _opacity: '0.55',
  _transition: `all ${v('transition-slow')} ease`,
  _cssCustom: '%root%:hover { filter: grayscale(0); opacity: .9; }',
});
c('c-accred__logo--lg', MEDIA, { _height: '3.5rem' });
c('c-accred__creds', MEDIA, { _display: 'flex', _direction: 'column', _gap: '2px' });
c('c-accred__cred', MEDIA, { _typography: { 'font-size': v('fs-xs'), 'font-weight': v('fw-semibold'), color: clr('clr-ink') } });
c('c-accred__cred--muted', MEDIA, { _typography: { 'font-weight': v('fw-normal'), color: clr('clr-muted-ink') } });

// Infinite accreditation marquee.
c('c-marquee', MEDIA, { _overflow: 'hidden', _width: '100%' });
c('c-marquee__track', MEDIA, {
  _display: 'flex', _alignItems: 'center', _width: 'max-content',
  _cssCustom:
    '@keyframes coeus-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }'
    + '%root% { animation: coeus-marquee 32s linear infinite; }'
    + '%root%:hover { animation-play-state: paused; }'
    + '@media (prefers-reduced-motion: reduce) { %root% { animation: none; } }',
});
c('c-marquee__item', MEDIA, { _display: 'flex', _alignItems: 'center', _flexShrink: '0' });
c('c-marquee__logo', MEDIA, {
  _height: '2rem', _width: 'auto', _objectFit: 'contain',
  _cssFilter: { grayscale: '100' }, _opacity: '0.5',
  _margin: { left: v('sp-xl'), right: v('sp-xl') },
});
c('c-marquee__text', MEDIA, {
  _typography: { 'font-size': v('fs-eyebrow'), 'font-weight': v('fw-bold'), 'letter-spacing': v('ls-eyebrow'), 'text-transform': 'uppercase', color: clr('clr-muted-ink'), 'white-space': 'nowrap' },
  _margin: { left: v('sp-xl'), right: v('sp-xl') },
});

// Client logo placeholder grid (artwork pending).
c('c-clients', MEDIA, { _display: 'flex', _flexWrap: 'wrap', _alignItems: 'center', _justifyContent: 'center', _gap: v('sp-lg') });
c('c-clients__item', MEDIA, {
  _width: '8rem', _height: '3rem',
  _display: 'flex', _alignItems: 'center', _justifyContent: 'center',
  _border: { width: box('1px'), style: 'solid', color: clr('clr-border') },
  _typography: { 'font-size': v('fs-micro'), 'font-weight': v('fw-bold'), 'letter-spacing': v('ls-wide'), 'text-transform': 'uppercase', color: clr('clr-muted-ink') },
});

/* =========================================================================
   EDITORIAL
   ========================================================================= */
const ED = 'Editorial';

c('c-intro', ED, { _display: 'flex', _gap: v('sp-md'), _alignItems: 'flex-start' });
c('c-intro__bar', ED, {
  _width: '2px', _alignSelf: 'stretch', _flexShrink: '0',
  _background: { color: clr('clr-border') },
  _transition: `background ${v('transition-slow')} ease`,
  ['_display' + MOB]: 'none',
});
c('c-quote', ED, {
  _position: 'relative', _padding: { left: '1.75rem' },
  _border: { width: { left: '2px' }, style: 'solid', color: clr('clr-ember') },
});
c('c-quote__text', ED, {
  _typography: { 'font-size': v('fs-base'), 'font-weight': v('fw-semibold'), 'font-style': 'italic', 'line-height': v('lh-snug'), color: clr('clr-petrol') },
});
c('c-quote__attrib', ED, {
  _typography: { 'font-size': v('fs-xs'), 'font-weight': v('fw-medium'), color: clr('clr-muted-ink') },
  _margin: { top: v('sp-xs') },
});

// Founder / person profile.
c('c-profile__photo', ED, { _width: '100%', _aspectRatio: '4 / 5', _objectFit: 'cover', _objectPosition: 'top' });
c('c-profile__name', ED, { _typography: { 'font-size': v('fs-base'), 'font-weight': v('fw-bold'), color: clr('clr-petrol') } });
c('c-profile__role', ED, { _typography: { 'font-size': v('fs-sm'), color: clr('clr-muted-ink') } });
c('c-profile__creds', ED, { _typography: { 'font-size': v('fs-xs'), color: clr('clr-muted-ink') }, _margin: { top: '2px' } });
c('c-profile__badges', ED, { _display: 'flex', _flexWrap: 'wrap', _gap: '6px', _margin: { top: v('sp-xs') } });
c('c-profile__badge', ED, {
  _padding: { top: '4px', bottom: '4px', left: v('sp-2xs'), right: v('sp-2xs') },
  _background: { color: clr('clr-petrol') },
  _typography: { 'font-size': v('fs-micro'), 'font-weight': v('fw-bold'), 'letter-spacing': v('ls-wide'), 'text-transform': 'uppercase', color: clr('clr-white') },
});

/* =========================================================================
   CTA BAND
   ========================================================================= */
const CTA = 'CTA band';

c('c-cta', CTA, { _typography: { 'text-align': 'center' } });
c('c-cta__inner', CTA, {
  _width: '100%', _widthMax: v('container-narrow'),
  _margin: { left: 'auto', right: 'auto' },
  _padding: { left: v('container-pad'), right: v('container-pad') },
  _display: 'flex', _direction: 'column', _alignItems: 'center',
});
c('c-cta__title', CTA, {
  _typography: { 'font-size': v('fs-h2-cta'), 'font-weight': v('fw-black'), 'line-height': v('lh-tight'), color: clr('clr-petrol') },
  _margin: { top: v('sp-2xs'), bottom: v('sp-md') },
});
c('c-cta__title--on-dark', CTA, { _typography: { color: clr('clr-white') } });
c('c-cta__lead', CTA, {
  _typography: { 'font-size': v('fs-sm'), 'line-height': v('lh-body'), color: clr('clr-muted-ink') },
  _widthMax: '36rem', _margin: { bottom: v('sp-2xl') },
});
c('c-cta__lead--on-dark', CTA, { _typography: { color: clr('clr-on-dark-55') } });

/* =========================================================================
   POST LOOPS (case studies, insights, people)
   ========================================================================= */
const LOOP = 'Post loops';

c('c-post-card', LOOP, {
  _display: 'flex', _direction: 'column', _height: '100%',
  _background: { color: clr('clr-white') },
  _border: { width: box('1px'), style: 'solid', color: clr('clr-border') },
  _typography: { 'text-decoration': 'none' },
  _transition: `all ${v('transition')} ease`,
  _cssCustom: '%root%:hover { border-color: var(--clr-petrol); box-shadow: 0 8px 24px -12px rgba(5,43,59,.3); }',
});
c('c-post-card__media', LOOP, { _width: '100%', _aspectRatio: '16 / 10', _objectFit: 'cover' });
c('c-post-card__body', LOOP, { _display: 'flex', _direction: 'column', _flex: '1', _padding: box(v('sp-md')) });
c('c-post-card__meta', LOOP, {
  _typography: { 'font-size': v('fs-micro'), 'font-weight': v('fw-bold'), 'letter-spacing': v('ls-eyebrow'), 'text-transform': 'uppercase', color: clr('clr-ember') },
  _margin: { bottom: v('sp-2xs') },
});
c('c-post-card__title', LOOP, {
  _typography: { 'font-size': v('fs-h4'), 'font-weight': v('fw-bold'), 'line-height': v('lh-snug'), color: clr('clr-petrol') },
  _margin: { bottom: v('sp-2xs') },
});
c('c-post-card__excerpt', LOOP, {
  _flex: '1',
  _typography: { 'font-size': v('fs-sm'), 'line-height': v('lh-body'), color: clr('clr-muted-ink') },
});
c('c-post-card__more', LOOP, {
  _display: 'flex', _alignItems: 'center', _gap: v('sp-3xs'), _margin: { top: v('sp-md') },
  _typography: { 'font-size': v('fs-xs'), 'font-weight': v('fw-semibold'), color: clr('clr-petrol') },
});

c('c-person-card', LOOP, { _display: 'flex', _direction: 'column' });
c('c-person-card__photo', LOOP, { _width: '100%', _aspectRatio: '4 / 5', _objectFit: 'cover', _objectPosition: 'top' });
c('c-person-card__name', LOOP, {
  _typography: { 'font-size': v('fs-h4'), 'font-weight': v('fw-bold'), color: clr('clr-petrol') },
  _margin: { top: v('sp-sm') },
});
c('c-person-card__role', LOOP, { _typography: { 'font-size': v('fs-sm'), color: clr('clr-muted-ink') } });

/* =========================================================================
   UTILITIES  (deliberately few — everything else is a component class)
   ========================================================================= */
const U = 'Utilities';

c('u-text-center', U, { _typography: { 'text-align': 'center' } });
c('u-mt-md',       U, { _margin: { top: v('sp-md') } });
c('u-mt-lg',       U, { _margin: { top: v('sp-lg') } });
c('u-mt-xl',       U, { _margin: { top: v('sp-xl') } });
c('u-mb-lg',       U, { _margin: { bottom: v('sp-lg') } });
c('u-divide-top',  U, {
  _padding: { top: v('sp-2xl') },
  _border: { width: { top: '1px' }, style: 'solid', color: clr('clr-border') },
});

module.exports = {};
