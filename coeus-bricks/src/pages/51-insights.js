/** Insights — query loop over the `insight` CPT. */

const b = require('../builder');
const { ICON, ctaBand } = require('../partials');

module.exports = {
  slug: 'insights',
  title: 'Coeus — Insights',
  type: 'content',

  build() {
    return [
      b.section(['c-page-hero', 'c-page-hero--phase-02'], [
        b.block(['c-page-hero__inner'], [
          b.block(['c-breadcrumb'], [
            b.el('text-basic', { classes: ['c-breadcrumb__link'], settings: { text: 'Home', tag: 'a', link: { type: 'external', url: '/' } } }),
            b.text([], '/', 'span'),
            b.text(['c-breadcrumb__current'], 'Insights', 'span'),
          ]),
          b.heading(['c-page-hero__title'], 'Insights', 'h1'),
          b.text(['c-page-hero__lead'],
            'Technical commentary and practical guidance on fire engineering and building safety.'),
        ]),
      ], { label: 'Hero' }),

      b.section(['l-section', 'l-section--white'], [
        b.container(['l-container'], [
          b.text(['c-prose', 'u-mb-lg'],
            'Plain-English guidance on fire engineering, the Building Safety Act and fire risk — written for building professionals, owners and legal teams, not for other fire engineers.'),

          b.block(['l-grid', 'l-grid--3', 'l-grid--gap-md'], [
            b.el('block', {
              classes: ['c-post-card', 'c-card--pad-lg'],
              settings: {
                tag: 'a',
                link: { type: 'external', url: '{post_url}' },
                hasLoop: true,
                query: { post_type: ['insight'], posts_per_page: 12, orderby: 'date', order: 'DESC' },
              },
              label: 'Insight (loop)',
              children: [
                b.block(['l-row', 'l-row--between'], [
                  b.el('text-basic', {
                    classes: ['c-post-card__meta'],
                    settings: { text: '{post_terms_insight_topic}', tag: 'span' },
                  }),
                  b.el('text-basic', {
                    classes: ['c-card__body'],
                    settings: { text: '{post_date}', tag: 'span' },
                  }),
                ]),
                b.el('heading', {
                  classes: ['c-post-card__title', 'u-mt-md'],
                  settings: { text: '{post_title}', tag: 'h2' },
                }),
                b.el('text-basic', {
                  classes: ['c-post-card__excerpt'],
                  settings: { text: '{post_excerpt}', tag: 'p' },
                }),
                b.block(['l-row', 'l-row--between', 'u-mt-md'], [
                  b.el('text-basic', {
                    classes: ['c-card__body'],
                    settings: { text: '{cf_coeus_reading_time}', tag: 'span' },
                  }),
                  b.el('text-basic', {
                    classes: ['c-post-card__more'],
                    settings: {
                      text: 'Read more', tag: 'span',
                      icon: { library: 'themify', icon: ICON.arrowRight }, iconPosition: 'right',
                    },
                  }),
                ]),
              ],
            }),
          ]),
        ]),
      ], { label: 'Insight loop' }),

      ctaBand({
        title: 'Have a specific question?',
        lead: 'If there is a topic you would like us to cover, or a question you cannot find an answer to here, we would be happy to help and look forward to your call.',
        tone: 'light',
        actions: [{ classes: ['c-btn', 'c-btn--primary'], label: 'Get in touch', url: '/contact/' }],
      }),
    ];
  },
};
