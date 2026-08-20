/**
 * Coeus Technical — design tokens.
 *
 * Single source of truth. Everything downstream (global variables, global
 * classes, theme styles) is derived from this file, so a brand change here
 * propagates through the whole generated theme.
 *
 * Values are lifted from the Figma Make source (src/styles/theme.css plus the
 * inline clamp() values used across the page components).
 */

/** Brand palette. Names match the language the client already uses. */
const colours = [
  // Core brand
  { name: 'clr-petrol',        value: '#084058', label: 'Petrol (primary)' },
  { name: 'clr-abyss',         value: '#052B3B', label: 'Abyss (deep background)' },
  { name: 'clr-ember',         value: '#C45A2B', label: 'Ember (accent)' },
  { name: 'clr-teal-coastal',  value: '#2C6E83', label: 'Coastal Teal' },
  { name: 'clr-teal-mid',      value: '#1A5C73', label: 'Mid Teal' },

  // Neutrals
  { name: 'clr-white',         value: '#ffffff', label: 'White' },
  { name: 'clr-ink',           value: '#14201F', label: 'Ink (body text)' },
  { name: 'clr-muted',         value: '#F4F7F8', label: 'Muted surface' },
  { name: 'clr-muted-ink',     value: '#5C686D', label: 'Muted text' },
  { name: 'clr-border',        value: '#D6DDDF', label: 'Border' },
  { name: 'clr-secondary',     value: '#DCE6E9', label: 'Secondary surface' },

  // Derived / transparency ramp used on dark sections
  { name: 'clr-on-dark-90',    value: 'rgba(255,255,255,0.90)', label: 'On dark 90%' },
  { name: 'clr-on-dark-70',    value: 'rgba(255,255,255,0.70)', label: 'On dark 70%' },
  { name: 'clr-on-dark-55',    value: 'rgba(255,255,255,0.55)', label: 'On dark 55%' },
  { name: 'clr-on-dark-40',    value: 'rgba(255,255,255,0.40)', label: 'On dark 40%' },
  { name: 'clr-on-dark-25',    value: 'rgba(255,255,255,0.25)', label: 'On dark 25%' },
  { name: 'clr-on-dark-10',    value: 'rgba(255,255,255,0.10)', label: 'On dark 10%' },

  // Hero scrim — kept as a variable so the client can retune contrast
  { name: 'clr-hero-scrim',
    value: 'linear-gradient(to right, rgba(5,43,59,0.97) 0%, rgba(5,43,59,0.88) 55%, rgba(5,43,59,0.40) 100%)',
    label: 'Hero gradient scrim' },
  { name: 'clr-page-hero-scrim',
    value: 'linear-gradient(to right, rgba(5,43,59,0.97), rgba(5,43,59,0.70))',
    label: 'Page hero gradient scrim' },
];

/**
 * Fluid type scale. Every clamp() that appeared inline in the React source is
 * promoted to a named step so the client never edits a raw clamp in Bricks.
 */
const typography = [
  { name: 'fs-hero',      value: 'clamp(2.4rem, 5.5vw, 4rem)',    label: 'Hero title' },
  { name: 'fs-page-hero', value: 'clamp(2rem, 5vw, 3.2rem)',      label: 'Page hero title' },
  { name: 'fs-h2',        value: 'clamp(1.8rem, 3.5vw, 2.6rem)',  label: 'Section title' },
  { name: 'fs-h2-sm',     value: 'clamp(1.6rem, 3vw, 2.2rem)',    label: 'Section title (small)' },
  { name: 'fs-h2-cta',    value: 'clamp(1.8rem, 4vw, 3rem)',      label: 'CTA title' },
  { name: 'fs-h3',        value: '1.5rem',                        label: 'Card title' },
  { name: 'fs-h4',        value: '1.05rem',                       label: 'Sub-heading' },
  { name: 'fs-lead',      value: 'clamp(1rem, 1.4vw, 1.15rem)',   label: 'Lead paragraph' },
  { name: 'fs-intro',     value: 'clamp(1.05rem, 1.6vw, 1.2rem)', label: 'Intro paragraph' },
  { name: 'fs-base',      value: '1rem',                          label: 'Body' },
  { name: 'fs-sm',        value: '0.875rem',                      label: 'Small' },
  { name: 'fs-xs',        value: '0.75rem',                       label: 'Extra small' },
  { name: 'fs-eyebrow',   value: '0.625rem',                      label: 'Eyebrow / label' },
  { name: 'fs-micro',     value: '0.5625rem',                     label: 'Micro label' },

  { name: 'fw-normal',    value: '400', label: 'Weight normal' },
  { name: 'fw-medium',    value: '500', label: 'Weight medium' },
  { name: 'fw-semibold',  value: '600', label: 'Weight semibold' },
  { name: 'fw-bold',      value: '700', label: 'Weight bold' },
  { name: 'fw-black',     value: '800', label: 'Weight black' },

  { name: 'ls-eyebrow',   value: '0.3em',   label: 'Eyebrow tracking' },
  { name: 'ls-wide',      value: '0.15em',  label: 'Wide tracking' },
  { name: 'ls-tight',     value: '-0.02em', label: 'Tight tracking' },

  { name: 'lh-tight',     value: '1.1',  label: 'Line height tight' },
  { name: 'lh-snug',      value: '1.3',  label: 'Line height snug' },
  { name: 'lh-body',      value: '1.65', label: 'Line height body' },

  { name: 'font-sans',    value: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif", label: 'Body font stack' },
];

/** Spacing scale — section rhythm and inner gutters. */
const spacing = [
  { name: 'sp-3xs', value: '0.25rem',  label: '4px' },
  { name: 'sp-2xs', value: '0.5rem',   label: '8px' },
  { name: 'sp-xs',  value: '0.75rem',  label: '12px' },
  { name: 'sp-sm',  value: '1rem',     label: '16px' },
  { name: 'sp-md',  value: '1.5rem',   label: '24px' },
  { name: 'sp-lg',  value: '2rem',     label: '32px' },
  { name: 'sp-xl',  value: '2.75rem',  label: '44px' },
  { name: 'sp-2xl', value: '4rem',     label: '64px' },
  { name: 'sp-3xl', value: '5rem',     label: '80px' },
  { name: 'sp-4xl', value: '6rem',     label: '96px' },

  { name: 'sp-section',    value: 'clamp(3.5rem, 6vw, 5rem)', label: 'Section padding (default)' },
  { name: 'sp-section-lg', value: 'clamp(4rem, 8vw, 6rem)',   label: 'Section padding (large)' },
  { name: 'sp-section-sm', value: 'clamp(2.5rem, 5vw, 4rem)', label: 'Section padding (small)' },
];

/** Layout + surface tokens. */
const layout = [
  { name: 'container-max', value: '80rem',   label: 'Container max width' },
  { name: 'container-pad', value: '1.5rem',  label: 'Container gutter' },
  { name: 'container-narrow', value: '48rem', label: 'Narrow container' },
  { name: 'radius',        value: '0.25rem', label: 'Corner radius' },
  { name: 'rule-w',        value: '2rem',    label: 'Accent rule width' },
  { name: 'rule-h',        value: '2px',     label: 'Accent rule height' },
  { name: 'header-h',      value: '76px',    label: 'Header height' },
  { name: 'stripe-h',      value: '4px',     label: 'Ember stripe height' },
  { name: 'transition',    value: '200ms',   label: 'Transition duration' },
  { name: 'transition-slow', value: '300ms', label: 'Transition duration (slow)' },
];

/**
 * The four lifecycle phases carry hard-coded graduated fills in the design.
 * Promoted to variables so the client can retune the ramp in one place.
 */
const phases = [
  { name: 'clr-phase-01', value: '#052B3B', label: 'Phase 01 — Innovate' },
  { name: 'clr-phase-02', value: '#084058', label: 'Phase 02 — Design' },
  { name: 'clr-phase-03', value: '#1A5C73', label: 'Phase 03 — Build' },
  { name: 'clr-phase-04', value: '#2C6E83', label: 'Phase 04 — Protect' },
];

const categories = [
  { key: 'colour',     name: 'Brand colours',  vars: colours },
  { key: 'phase',      name: 'Phase colours',  vars: phases },
  { key: 'typography', name: 'Typography',     vars: typography },
  { key: 'spacing',    name: 'Spacing',        vars: spacing },
  { key: 'layout',     name: 'Layout',         vars: layout },
];

/** Convenience: `v('clr-petrol')` -> `var(--clr-petrol)` */
const v = (name) => `var(--${name})`;

/** Flat lookup of raw values, for places Bricks needs a literal. */
const raw = Object.fromEntries(
  categories.flatMap((c) => c.vars.map((x) => [x.name, x.value]))
);

module.exports = { categories, colours, phases, typography, spacing, layout, v, raw };
