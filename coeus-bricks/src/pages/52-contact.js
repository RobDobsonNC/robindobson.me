/**
 * Contact.
 *
 * The React source fakes submission with local state. Here the form is a
 * native Bricks form element, so it actually sends — and the client can edit
 * fields, recipient and success message from the builder.
 */

const b = require('../builder');
const { CONTACT, ICON } = require('../partials');

const PROJECT_TYPES = [
  'Fire strategy / performance-based design',
  'Building Safety Act / Gateway support',
  'PAS 9980 / FRAEW assessment',
  'Fire risk assessment',
  'Construction-stage support',
  'Expert witness / litigation support',
  'Peer review / technical audit',
  'Other',
];

const contactRow = (icon, label, value, url, note) =>
  b.el('block', {
    classes: ['c-contact-item'],
    settings: url ? { tag: 'a', link: { type: 'external', url } } : {},
    children: [
      b.el('icon', {
        classes: ['c-contact-item__icon'],
        settings: { icon: { library: 'themify', icon: icon } },
      }),
      b.block([], [
        b.text(['c-contact-item__label'], label),
        b.text(['c-contact-item__value'], value),
        note ? b.text(['c-card__body'], note) : null,
      ]),
    ],
  });

module.exports = {
  slug: 'contact',
  title: 'Coeus — Contact',
  type: 'content',

  build() {
    return [
      b.section(['c-page-hero', 'c-page-hero--phase-02'], [
        b.block(['c-page-hero__inner'], [
          b.block(['c-breadcrumb'], [
            b.el('text-basic', { classes: ['c-breadcrumb__link'], settings: { text: 'Home', tag: 'a', link: { type: 'external', url: '/' } } }),
            b.text([], '/', 'span'),
            b.text(['c-breadcrumb__current'], 'Contact', 'span'),
          ]),
          b.heading(['c-page-hero__title'], 'Discuss a project', 'h1'),
        ]),
      ], { label: 'Hero' }),

      b.section(['l-section', 'l-section--muted'], [
        b.container(['l-container'], [
          b.block(['l-grid', 'l-grid--5-7', 'l-grid--top'], [

            /* Direct contact card */
            b.block(['c-panel'], [
              b.block(['c-panel__body'], [
                b.text(['c-eyebrow'], 'Direct contact'),
                b.heading(['c-feature__title', 'c-feature__title--sm'], 'Get in touch', 'h2'),
                b.block(['c-rule', 'u-mb-lg'], []),
                b.text(['c-prose'],
                  'Tell us about your project and we will come back to you with a clear view of how we can help — and whether we are the right fit.'),
                b.block(['l-stack', 'l-stack--md', 'u-mt-xl'], [
                  contactRow(ICON.phone, 'Phone', CONTACT.phone, CONTACT.phoneHref),
                  contactRow(ICON.mail, 'Email', CONTACT.email, CONTACT.emailHref),
                  contactRow(ICON.pin, 'Location', 'Portsmouth, Hampshire', null, 'Working across the UK'),
                ]),
              ]),
            ]),

            /* Form panel */
            b.block(['c-panel'], [
              b.text(['c-panel__header'], 'Send us a message', 'h2'),
              b.block(['c-panel__body'], [
                b.el('form', {
                  classes: [],
                  label: 'Enquiry form',
                  settings: {
                    fields: [
                      { id: 'name',    type: 'text',     label: 'Name',        placeholder: 'Your name',                   required: true,  width: 50 },
                      { id: 'company', type: 'text',     label: 'Company',     placeholder: 'Organisation (if applicable)', required: false, width: 50 },
                      { id: 'email',   type: 'email',    label: 'Email',       placeholder: 'your@email.com',              required: true,  width: 50 },
                      { id: 'phone',   type: 'tel',      label: 'Phone',       placeholder: '07xxx xxxxxx',                required: false, width: 50 },
                      { id: 'ptype',   type: 'select',   label: 'Project type', required: false, width: 100,
                        options: PROJECT_TYPES.join('\n'), placeholder: 'Select a project type' },
                      { id: 'message', type: 'textarea', label: 'Tell us about your project', required: true, width: 100, rows: 6,
                        placeholder: 'Building type, location, stage of the project, what you need — the more you tell us, the more useful our response will be.' },
                    ],
                    submitButtonText: 'Send message',
                    submitButtonIcon: { library: 'themify', icon: ICON.arrowRight },
                    actions: ['email'],
                    emailSubject: 'Website enquiry — Coeus Technical',
                    emailTo: CONTACT.email,
                    emailReplyToUser: true,
                    successMessage: 'Thank you for getting in touch. We will come back to you within one working day.',
                  },
                }),
              ]),
            ]),
          ]),
        ]),
      ], { label: 'Contact' }),
    ];
  },
};
