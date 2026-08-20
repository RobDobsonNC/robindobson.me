/**
 * Site header template.
 *
 * Built as Bricks elements rather than a WP nav menu because the "What We Do"
 * dropdown carries a description line per item, which a standard menu cannot
 * express. Everything here is editable in the Bricks builder; the open/close
 * behaviour is bound by the small script in inc/assets.php.
 */

const b = require('../builder');
const { ASSET, CONTACT, ICON, ul, li, tagged, iconButton } = require('../partials');

const WHAT_WE_DO = [
  { label: 'Innovate', sub: 'Feasibility & first strategies',      url: '/expertise/innovate/' },
  { label: 'Design',   sub: 'Performance-based fire strategies',   url: '/expertise/design/' },
  { label: 'Build',    sub: 'Construction-stage support',          url: '/expertise/build/' },
  { label: 'Protect',  sub: 'Risk assessments & safety cases',     url: '/expertise/protect/' },
];

const WHO_WE_HELP = [
  { label: 'Developers & Contractors',            url: '/who-we-help/developers/' },
  { label: 'Building Owners & Housing Providers', url: '/who-we-help/building-owners/' },
  { label: 'Managing Agents',                     url: '/who-we-help/managing-agents/' },
  { label: 'Legal Teams',                         url: '/who-we-help/legal-teams/' },
  { label: 'Architects & Principal Designers',    url: '/who-we-help/architects/' },
  { label: 'Facilities & Asset Managers',         url: '/who-we-help/facilities-managers/' },
];

const SIMPLE_LINKS = [
  { label: 'How We Work', url: '/how-we-work/' },
  { label: 'Our Story',   url: '/about/' },
  { label: 'Case Studies', url: '/case-studies/' },
  { label: 'Contact',     url: '/contact/' },
];

/** A top-level nav item that owns a dropdown panel. */
function dropdownItem(label, items, withSub) {
  return li(['c-header__item'], [
    b.el('text-basic', {
      classes: ['c-header__link'],
      settings: {
        text: label,
        tag: 'button',
        icon: { library: 'themify', icon: ICON.chevronDown },
        iconPosition: 'right',
      },
    }),
    b.block(['c-header__dropdown'],
      items.map((item) =>
        b.linkBlock(['c-header__dropdown-item'], item.url, [
          b.text(['c-header__dropdown-label'], item.label, 'span'),
          withSub ? b.text(['c-header__dropdown-sub'], item.sub, 'span') : null,
        ])
      )
    ),
  ]);
}

module.exports = {
  slug: 'coeus-header',
  title: 'Coeus — Header',
  type: 'header',

  build() {
    return [
      tagged('header', ['c-header'], [
        // Ember stripe — the brand's identity accent.
        b.block(['c-header__stripe'], []),

        tagged('nav', ['c-header__bar'], [
          b.linkBlock([], '/', [
            b.image(['c-header__logo'], ASSET.logoDark, 'Coeus Technical'),
          ], { label: 'Logo' }),

          ul(['c-header__nav'], [
            dropdownItem('What We Do', WHAT_WE_DO, true),
            dropdownItem('Who We Help', WHO_WE_HELP, false),
            ...SIMPLE_LINKS.map((link) =>
              li(['c-header__item'], [
                b.el('text-basic', {
                  classes: ['c-header__link'],
                  settings: { text: link.label, tag: 'a', link: { type: 'external', url: link.url } },
                }),
              ])
            ),
          ]),

          iconButton(['c-btn', 'c-btn--primary', 'c-btn--sm', 'c-header__cta'],
            'Discuss a project', '/contact/'),

          b.el('button', {
            classes: ['c-header__toggle'],
            settings: {
              tag: 'button',
              icon: { library: 'themify', icon: ICON.menu },
              text: '',
              _attributes: [{ name: 'aria-label', value: 'Toggle menu' }],
            },
            label: 'Mobile toggle',
          }),
        ]),

        // Mobile panel — same links, grouped and stacked.
        b.block(['c-header__mobile'], [
          b.text(['c-header__mobile-group'], 'What We Do'),
          ...WHAT_WE_DO.map((item) =>
            b.el('text-basic', {
              classes: ['c-header__mobile-link'],
              settings: { text: item.label, tag: 'a', link: { type: 'external', url: item.url } },
            })
          ),

          b.text(['c-header__mobile-group'], 'Who We Help'),
          ...WHO_WE_HELP.map((item) =>
            b.el('text-basic', {
              classes: ['c-header__mobile-link'],
              settings: { text: item.label, tag: 'a', link: { type: 'external', url: item.url } },
            })
          ),

          b.text(['c-header__mobile-group'], 'More'),
          ...SIMPLE_LINKS.map((item) =>
            b.el('text-basic', {
              classes: ['c-header__mobile-link'],
              settings: { text: item.label, tag: 'a', link: { type: 'external', url: item.url } },
            })
          ),

          b.el('text-basic', {
            classes: ['c-footer__contact-item', 'u-mt-md'],
            settings: {
              text: CONTACT.phone,
              tag: 'a',
              link: { type: 'external', url: CONTACT.phoneHref },
              icon: { library: 'themify', icon: ICON.phone },
            },
          }),

          iconButton(['c-btn', 'c-btn--primary', 'c-btn--block', 'u-mt-md'],
            'Discuss a project', '/contact/'),
        ]),
      ]),
    ];
  },
};
