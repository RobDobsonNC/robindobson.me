/**
 * Our People.
 *
 * The design shows the founder's profile in full. Below it sits a query loop
 * over the `person` CPT: it renders nothing while the CPT is empty — so the
 * page matches the design today — and grows into a team grid the moment the
 * client adds a person, with no layout editing.
 */

const b = require('../builder');
const { ASSET, ICON, iconButton } = require('../partials');

const CREDENTIALS = [
  { label: 'Chartered Engineer (CEng)', detail: 'UK Engineering Council — via CABE and IET' },
  { label: 'Chartered Building Engineer (C.Build E)', detail: 'Chartered through the Chartered Association of Building Engineers' },
  { label: 'FCABE', detail: 'Fellow — Chartered Association of Building Engineers' },
  { label: 'FIET',   detail: 'Fellow — Institution of Engineering and Technology' },
  { label: 'FIFireE', detail: 'Fellow — Institution of Fire Engineers' },
  { label: 'MSFPE',  detail: 'Member — Society of Fire Protection Engineers' },
  { label: 'MIFSM',  detail: 'Member — Institution of Fire Safety Managers' },
  { label: 'IFE International General Assembly Leader', detail: 'International representation in fire safety standards' },
  { label: 'STEM Ambassador', detail: 'Promoting engineering pathways in education' },
];

module.exports = {
  slug: 'our-people',
  title: 'Coeus — Our People',
  type: 'content',

  build() {
    return [
      b.section(['c-page-hero'], [
        b.block(['c-page-hero__inner'], [
          b.block(['c-breadcrumb'], [
            b.el('text-basic', { classes: ['c-breadcrumb__link'], settings: { text: 'Home', tag: 'a', link: { type: 'external', url: '/' } } }),
            b.text([], '/', 'span'),
            b.el('text-basic', { classes: ['c-breadcrumb__link'], settings: { text: 'About', tag: 'a', link: { type: 'external', url: '/about/' } } }),
            b.text([], '/', 'span'),
            b.text(['c-breadcrumb__current'], 'Our People', 'span'),
          ]),
          b.heading(['c-page-hero__title'], 'Our People', 'h1'),
        ]),
      ], { label: 'Hero' }),

      b.section(['l-section', 'l-section--white'], [
        b.container(['l-container'], [
          b.block(['l-grid', 'l-grid--4-8', 'l-grid--top'], [

            /* Photo, chips, contact */
            b.block([], [
              b.image(['c-profile__photo'], ASSET.founder, 'Jacob Derrick'),
              b.heading(['c-profile__name', 'u-mt-md'], 'Jacob Derrick', 'h2'),
              b.text(['c-profile__role'], 'Managing Director &amp; Principal Fire Engineer'),
              b.block(['u-divide-top', 'u-mt-md'], [
                b.text(['c-label'], 'Professional memberships'),
                b.block(['c-profile__badges'],
                  ['CEng', 'FCABE', 'FIFireE', 'FIET', 'MSFPE', 'MIFSM']
                    .map((cred) => b.text(['c-chip'], cred, 'span'))),
              ]),
              iconButton(['c-btn', 'c-btn--quiet', 'u-mt-md'],
                'info@coeus-technical.co.uk', 'mailto:info@coeus-technical.co.uk'),
            ]),

            /* Biography */
            b.block([], [
              b.text(['c-label'], 'Managing Director &amp; Principal Fire Engineer'),
              b.heading(['c-section-heading__title', 'c-section-heading__title--sm'],
                '14+ years in fire engineering and construction', 'h2'),
              b.block(['c-rule', 'u-mb-lg'], []),

              b.block(['l-stack', 'l-stack--md'], [
                b.text(['c-prose'], 'Jacob founded Coeus Technical after more than a decade working in fire engineering, building control and construction. His background spans residential, commercial and mixed-use schemes — from feasibility through to handover — and gives him a practical understanding of how fire engineering decisions play out on site.'),
                b.text(['c-prose'], 'He is a Chartered Engineer (CEng) and Chartered Building Engineer (C.Build E), a Fellow of the Chartered Association of Building Engineers, the Institution of Engineering and Technology and the Institution of Fire Engineers. He has served as an IFE International General Assembly Leader, representing UK fire engineering practice in international standards work, and as a STEM Ambassador promoting engineering careers in education.'),
                b.text(['c-prose'], 'Jacob leads every Coeus Technical project personally. There is no model here in which a senior engineer sells a job and hands it to a junior. Every deliverable is reviewed, signed off and stood behind by a Chartered and Fellow-level engineer.'),
                b.text(['c-prose'], 'He has particular experience in: performance-based fire engineering; Higher-Risk Buildings and Building Safety Act compliance; PAS 9980 external wall assessment; expert witness work in fire engineering disputes; and construction-stage fire engineering support.'),
              ]),

              b.block(['u-divide-top', 'u-mt-xl'], [
                b.text(['c-label'], 'Credentials &amp; registrations'),
                b.block(['l-stack', 'l-stack--md'],
                  CREDENTIALS.map((cred) =>
                    b.block(['c-cred'], [
                      b.block([], [
                        b.text(['c-cred__label'], cred.label),
                        b.text(['c-cred__detail'], cred.detail),
                      ]),
                    ])
                  )
                ),
              ]),
            ]),
          ]),

          /* Team grid — empty until `person` entries exist, then it fills. */
          b.block(['l-grid', 'l-grid--4', 'l-grid--gap-md', 'u-mt-xl'], [
            b.el('block', {
              classes: ['c-person-card'],
              settings: {
                hasLoop: true,
                query: { post_type: ['person'], posts_per_page: 12, orderby: 'menu_order', order: 'ASC' },
              },
              label: 'Team member (loop)',
              children: [
                b.el('image', {
                  classes: ['c-person-card__photo'],
                  settings: { image: { useDynamicData: '{featured_image}' } },
                }),
                b.el('heading', {
                  classes: ['c-person-card__name'],
                  settings: { text: '{post_title}', tag: 'h3' },
                }),
                b.el('text-basic', {
                  classes: ['c-person-card__role'],
                  settings: { text: '{cf_coeus_role}', tag: 'p' },
                }),
                b.el('text-basic', {
                  classes: ['c-profile__creds'],
                  settings: { text: '{cf_coeus_credentials}', tag: 'p' },
                }),
              ],
            }),
          ]),
        ]),
      ], { label: 'Profile' }),

      b.section(['l-section', 'l-section--sm', 'l-section--muted', 'l-section--border-y'], [
        b.container(['l-container'], [
          b.block(['c-band'], [
            b.block([], [
              b.heading(['c-band__title'], 'Interested in working with us?', 'h2'),
              b.text(['c-band__text'], 'Tell us about your project and we will come back to you.'),
            ]),
            iconButton(['c-btn', 'c-btn--primary'], 'Discuss a project', '/contact/'),
          ]),
        ]),
      ], { label: 'Closing band' }),
    ];
  },
};
