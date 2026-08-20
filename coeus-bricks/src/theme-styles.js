/**
 * Bricks Theme Styles — the site-wide defaults that sit *beneath* the BEM
 * classes. Anything a bare element should inherit (body text, headings, link
 * colour, default button, form controls, container width) belongs here rather
 * than in a class, so unstyled content added later by the client still looks
 * like the rest of the site.
 */

const { v } = require('./tokens');
const { clr } = require('./classes');

const styles = {
  coeus: {
    label: 'Coeus Technical',
    conditions: [{ main: 'entireWebsite' }],
    settings: {
      general: {
        // Bricks' own container/section defaults, aligned to our tokens.
        sectionPaddingTop: v('sp-section'),
        sectionPaddingBottom: v('sp-section'),
        containerWidth: v('container-max'),
        containerPaddingLeft: v('container-pad'),
        containerPaddingRight: v('container-pad'),
      },

      colors: {
        bodyBackgroundColor: clr('clr-white'),
        linkColor: clr('clr-petrol'),
        linkColorHover: clr('clr-ember'),
        selectionBackgroundColor: clr('clr-petrol'),
        selectionColor: clr('clr-white'),
      },

      typography: {
        typographyBody: {
          'font-family': v('font-sans'),
          'font-size': v('fs-base'),
          'font-weight': v('fw-normal'),
          'line-height': v('lh-body'),
          color: clr('clr-ink'),
        },
        typographyH1: {
          'font-family': v('font-sans'),
          'font-size': v('fs-page-hero'),
          'font-weight': v('fw-black'),
          'line-height': v('lh-tight'),
          color: clr('clr-petrol'),
        },
        typographyH2: {
          'font-family': v('font-sans'),
          'font-size': v('fs-h2'),
          'font-weight': v('fw-bold'),
          'line-height': v('lh-tight'),
          color: clr('clr-petrol'),
        },
        typographyH3: {
          'font-family': v('font-sans'),
          'font-size': v('fs-h3'),
          'font-weight': v('fw-bold'),
          'line-height': v('lh-snug'),
          color: clr('clr-petrol'),
        },
        typographyH4: {
          'font-family': v('font-sans'),
          'font-size': v('fs-h4'),
          'font-weight': v('fw-semibold'),
          'line-height': v('lh-snug'),
          color: clr('clr-petrol'),
        },
        typographyH5: {
          'font-family': v('font-sans'),
          'font-size': v('fs-base'),
          'font-weight': v('fw-semibold'),
          color: clr('clr-petrol'),
        },
        typographyH6: {
          'font-family': v('font-sans'),
          'font-size': v('fs-sm'),
          'font-weight': v('fw-semibold'),
          'letter-spacing': v('ls-wide'),
          'text-transform': 'uppercase',
          color: clr('clr-muted-ink'),
        },
      },

      button: {
        // Bricks' default button — matched to c-btn--primary so a plain
        // button dropped on a page is already on-brand.
        buttonPaddingTop: '0.875rem',
        buttonPaddingBottom: '0.875rem',
        buttonPaddingLeft: v('sp-xl'),
        buttonPaddingRight: v('sp-xl'),
        buttonBorderRadius: v('radius'),
        buttonTypography: {
          'font-size': v('fs-sm'),
          'font-weight': v('fw-semibold'),
        },
        buttonPrimaryBackground: clr('clr-petrol'),
        buttonPrimaryText: clr('clr-white'),
        buttonSecondaryBackground: clr('clr-muted'),
        buttonSecondaryText: clr('clr-petrol'),
      },

      form: {
        formFieldBackgroundColor: clr('clr-muted'),
        formFieldBorder: {
          width: { top: '1px', right: '1px', bottom: '1px', left: '1px' },
          style: 'solid',
          color: clr('clr-border'),
          radius: { top: v('radius'), right: v('radius'), bottom: v('radius'), left: v('radius') },
        },
        formFieldTypography: {
          'font-size': v('fs-sm'),
          color: clr('clr-ink'),
        },
        formLabelTypography: {
          'font-size': v('fs-sm'),
          'font-weight': v('fw-medium'),
          color: clr('clr-petrol'),
        },
        formFieldFocusBorderColor: clr('clr-petrol'),
      },
    },
  },
};

module.exports = { styles };
