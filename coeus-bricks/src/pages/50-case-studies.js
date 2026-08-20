/**
 * Case Studies — a Bricks query loop over the `case_study` CPT.
 *
 * The Figma source hard-codes six cards; here the card is authored once and
 * repeated by the loop, so adding a case study is a content task, not a
 * layout one. The six designed entries ship as seed content.
 */

const b = require('../builder');
const { ICON, ctaBand } = require('../partials');

module.exports = {
  slug: 'case-studies',
  title: 'Coeus — Case Studies',
  type: 'content',

  build() {
    return [
      b.section(['c-page-hero', 'c-page-hero--phase-02'], [
        b.block(['c-page-hero__inner'], [
          b.block(['c-breadcrumb'], [
            b.el('text-basic', { classes: ['c-breadcrumb__link'], settings: { text: 'Home', tag: 'a', link: { type: 'external', url: '/' } } }),
            b.text([], '/', 'span'),
            b.text(['c-breadcrumb__current'], 'Case Studies', 'span'),
          ]),
          b.heading(['c-page-hero__title'], 'Case Studies', 'h1'),
          b.text(['c-page-hero__lead'], 'Real projects, real buildings, real outcomes.'),
        ]),
      ], { label: 'Hero' }),

      b.section(['l-section', 'l-section--white'], [
        b.container(['l-container'], [
          b.text(['c-prose', 'u-mb-lg'],
            'A selection of the work we have done. Project details are summarised to protect client confidentiality. If you would like to discuss a specific type of project, get in touch directly.'),

          b.block(['l-grid', 'l-grid--3', 'l-grid--gap-md'], [
            b.el('block', {
              classes: ['c-post-card'],
              settings: {
                tag: 'a',
                link: { type: 'external', url: '{post_url}' },
                hasLoop: true,
                query: { post_type: ['case_study'], posts_per_page: 12, orderby: 'date', order: 'DESC' },
              },
              label: 'Case study (loop)',
              children: [
                b.el('image', {
                  classes: ['c-post-card__media'],
                  settings: { image: { useDynamicData: '{featured_image}' } },
                }),
                b.block(['c-post-card__body'], [
                  b.el('text-basic', {
                    classes: ['c-post-card__meta'],
                    settings: { text: '{post_terms_service}', tag: 'p' },
                  }),
                  b.el('heading', {
                    classes: ['c-post-card__title'],
                    settings: { text: '{post_title}', tag: 'h3' },
                  }),
                  b.el('text-basic', {
                    classes: ['c-card__body'],
                    settings: { text: '{cf_coeus_location}', tag: 'p' },
                  }),
                  b.el('text-basic', {
                    classes: ['c-post-card__excerpt'],
                    settings: { text: '{post_excerpt}', tag: 'p' },
                  }),
                  b.el('text-basic', {
                    classes: ['c-post-card__more'],
                    settings: {
                      text: 'Read the case study', tag: 'span',
                      icon: { library: 'themify', icon: ICON.arrowRight }, iconPosition: 'right',
                    },
                  }),
                ]),
              ],
            }),
          ]),
        ]),
      ], { label: 'Case study loop' }),

      ctaBand({
        title: 'Have a project in mind?',
        lead: 'Tell us about your building and we will come back to you with a clear view of how we can help.',
        tone: 'dark',
        actions: [{ classes: ['c-btn', 'c-btn--white'], label: 'Discuss a project', url: '/contact/' }],
      }),
    ];
  },
};
