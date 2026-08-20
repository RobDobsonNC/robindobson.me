/** 404 — assigned to the "Error Page" template type in Bricks. */

const b = require('../builder');
const { iconButton } = require('../partials');

module.exports = {
  slug: 'not-found',
  title: 'Coeus — 404',
  type: 'error-page',

  build() {
    return [
      b.section(['c-404', 'l-section--white'], [
        b.block(['c-404__inner'], [
          b.text(['c-eyebrow', 'c-eyebrow--muted'], '404 — Page not found'),
          b.heading(['c-404__title'], 'We could not find that page.', 'h1'),
          b.text(['c-prose', 'u-mb-lg'],
            'The page you are looking for does not exist or has been moved. Return to the homepage or get in touch if you need assistance.'),
          b.block(['c-btn-group', 'c-btn-group--center'], [
            iconButton(['c-btn', 'c-btn--primary'], 'Back to home', '/'),
            b.button(['c-btn', 'c-btn--outline'], 'Contact us', '/contact/'),
          ]),
        ]),
      ], { label: '404' }),
    ];
  },
};
