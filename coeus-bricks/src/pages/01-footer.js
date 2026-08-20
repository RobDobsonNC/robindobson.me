/**
 * Site footer template — four columns on Abyss, with the brand lockup slot
 * left as a placeholder until the artwork is supplied.
 */

const b = require('../builder');
const { ASSET, CONTACT, ICON, ul, li, tagged } = require('../partials');

const SERVICES = [
  { label: 'Innovate',       url: '/expertise/innovate/' },
  { label: 'Design',         url: '/expertise/design/' },
  { label: 'Build',          url: '/expertise/build/' },
  { label: 'Protect',        url: '/expertise/protect/' },
  { label: 'Expert Witness', url: '/who-we-help/legal-teams/' },
];

const COMPANY = [
  { label: 'Our Story',    url: '/about/' },
  { label: 'Our People',   url: '/our-people/' },
  { label: 'How We Work',  url: '/how-we-work/' },
  { label: 'Case Studies', url: '/case-studies/' },
  { label: 'Contact',      url: '/contact/' },
];

const linkColumn = (heading, links) =>
  b.block([], [
    b.heading(['c-footer__heading'], heading, 'h4'),
    ul(['c-footer__list'], links.map((link) =>
      li([], [
        b.el('text-basic', {
          classes: ['c-footer__link'],
          settings: { text: link.label, tag: 'a', link: { type: 'external', url: link.url } },
        }),
      ])
    )),
  ]);

module.exports = {
  slug: 'coeus-footer',
  title: 'Coeus — Footer',
  type: 'footer',

  build() {
    return [
      tagged('footer', ['c-footer'], [
        b.block(['c-footer__inner'], [
          b.block(['c-footer__grid'], [

            // Brand column
            b.block([], [
              b.image(['c-footer__logo'], ASSET.logoWhite, 'Coeus Technical'),
              // Replace this placeholder with the supplied lockup artwork.
              b.text(['c-footer__lockup'], 'Fire engineering<br>with integrity'),
              b.text(['c-footer__note'], 'Based in Portsmouth. Working across the UK.'),
              b.button(['c-btn', 'c-btn--outline-light', 'c-btn--sm'],
                'Discuss a project', '/contact/', {
                  settings: { icon: { library: 'themify', icon: ICON.arrowRight }, iconPosition: 'right' },
                }),
            ]),

            linkColumn('What We Do', SERVICES),
            linkColumn('Company', COMPANY),

            // Contact column
            b.block([], [
              b.heading(['c-footer__heading'], 'Contact', 'h4'),
              b.block(['l-stack', 'l-stack--md'], [
                b.el('text-basic', {
                  classes: ['c-footer__contact-item'],
                  settings: {
                    text: CONTACT.phone, tag: 'a',
                    link: { type: 'external', url: CONTACT.phoneHref },
                    icon: { library: 'themify', icon: ICON.phone },
                  },
                }),
                b.el('text-basic', {
                  classes: ['c-footer__contact-item'],
                  settings: {
                    text: CONTACT.email, tag: 'a',
                    link: { type: 'external', url: CONTACT.emailHref },
                    icon: { library: 'themify', icon: ICON.mail },
                  },
                }),
                b.el('text-basic', {
                  classes: ['c-footer__contact-item'],
                  settings: {
                    text: CONTACT.address, tag: 'span',
                    icon: { library: 'themify', icon: ICON.pin },
                  },
                }),
              ]),
              b.text(['c-footer__legal'],
                'Registered in England &amp; Wales.<br>Company No. 10987648'),
            ]),
          ]),

          b.block(['c-footer__bottom'], [
            b.text([], '© Coeus Technical Ltd. All rights reserved.'),
            b.block(['l-row'], [
              b.el('text-basic', {
                classes: ['c-footer__policy'],
                settings: { text: 'Privacy Policy', tag: 'a', link: { type: 'external', url: '/privacy-policy/' } },
              }),
              b.el('text-basic', {
                classes: ['c-footer__policy'],
                settings: { text: 'Cookie Policy', tag: 'a', link: { type: 'external', url: '/cookie-policy/' } },
              }),
            ]),
          ]),
        ]),
      ]),
    ];
  },
};
