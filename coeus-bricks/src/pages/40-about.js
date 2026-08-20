/**
 * Our Story (About) — the longest editorial page: purpose, values, services,
 * founder profile, professional registrations and working practices.
 */

const b = require('../builder');
const { ASSET, CONTACT, ICON, sectionHeading, ctaBand, iconButton } = require('../partials');

const WHY_COEUS = [
  { label: 'Proportionate, defensible, buildable advice',
    body: 'Our advice serves your building and the people in it, not a product or a contractor.' },
  { label: 'Performance-based fire engineering',
    body: 'Fire engineering, fire safety law and building regulations — the technically hardest questions are the ones we are built for.' },
  { label: 'Built on engineering evidence, not opinion',
    body: 'Our conclusions are evidenced and built to withstand scrutiny — from the Building Safety Regulator, an insurer, or a court.' },
  { label: 'Positions that stand up to scrutiny, supported by that evidence',
    body: 'We translate complex fire safety into decisions and actions you can actually take — supported by the evidence.' },
];

const VALUES = [
  { num: '01', label: 'Honesty',
    desc: "Straight answers. If the proportionate route is the cheaper, simpler one, that's what we'll tell you — even when it's less work for us." },
  { num: '02', label: 'Transparency',
    desc: 'Our reasoning is on the page, not in a black box — which is what makes the advice defensible.' },
  { num: '03', label: 'Collaboration',
    desc: 'We work inside the team — designers, contractors, regulators — solving problems together, before they become delays.' },
  { num: '04', label: 'Innovation',
    desc: "When the prescriptive route doesn't fit the building, we find a safe, sensible way through with performance-based design. Never novelty for its own sake." },
  { num: '05', label: 'Respect',
    desc: 'For the people in the building, for your programme and budget, and for everyone we work alongside. Safety without gold-plating.' },
];

const PHASE_CARDS = [
  { label: 'Innovate', sub: 'Feasibility, options appraisal, first fire strategies and Gateway 1 support.', url: '/expertise/innovate/' },
  { label: 'Design',   sub: 'Fire strategy, statements and technical notes for planning and building control.', url: '/expertise/design/' },
  { label: 'Build',    sub: 'Construction-stage support and Regulation 38 handover documentation.', url: '/expertise/build/' },
  { label: 'Protect',  sub: 'Risk assessment, FRAEW, safety-case support and expert witness.', url: '/expertise/protect/' },
];

const FACTS = [
  { label: 'IFE International General Assembly Leader', detail: 'International representation in fire safety standards' },
  { label: 'STEM Ambassador', detail: 'Promoting engineering pathways in education' },
  { label: '14+ years in fire safety', detail: 'Across design, construction and the operation of buildings' },
  { label: 'Founded Coeus Technical', detail: 'Specialist independent practice based in Portsmouth' },
];

const REGISTRATIONS = [
  {
    category: 'Professional Registration',
    items: [
      { title: 'Chartered Engineer (CEng)', body: "Registered with the Engineering Council via CABE and IET — the UK's licensing authority for the engineering profession." },
      { title: 'Chartered Building Engineer (C.Build E)', body: 'Chartered through the Chartered Association of Building Engineers.' },
    ],
  },
  {
    category: 'Professional Fellowships &amp; Memberships',
    items: [
      { title: 'Fellow, Chartered Association of Building Engineers (FCABE)', body: 'Fellow-grade membership of CABE.' },
      { title: 'Fellow, Institution of Engineering and Technology (FIET)', body: "Fellow-grade membership of one of the world's largest engineering institutions." },
      { title: 'Fellow, Institution of Fire Engineers (FIFireE)', body: 'Fellow-grade membership of the leading international professional body for fire engineering.' },
      { title: 'Member, Society of Fire Protection Engineers (MSFPE)', body: 'The leading international organisation for fire protection engineering professionals.' },
      { title: 'Member, Institution of Fire Safety Managers (MIFSM)', body: 'The professional body for fire safety managers in the UK.' },
    ],
  },
  {
    category: 'Voluntary &amp; Ambassadorial Roles',
    items: [
      { title: 'IFE International General Assembly Leader', body: "Representing the UK at the IFE's international standards body." },
      { title: 'STEM Ambassador', body: 'Promoting engineering and science pathways in schools and colleges.' },
    ],
  },
  {
    category: 'Company Accreditations',
    items: [
      { title: 'BSI Member', body: 'Member of the British Standards Institution.' },
      { title: 'Safe Contractor Approved', body: 'Annual third-party health and safety audit.' },
      { title: 'EAL Qualified', body: 'EAL-certified qualifications in fire safety disciplines.' },
    ],
  },
];

const WORKING_WITH_US = [
  { label: 'Direct access to senior expertise', body: 'The engineer you speak to at the start is the engineer on your project throughout.' },
  { label: 'Fixed fees, agreed in advance', body: 'No surprise invoices. Scope, fee and programme agreed before work begins.' },
  { label: 'Response within a working day', body: 'We are a small practice. Your project gets the attention it deserves.' },
  { label: 'Transparent reasoning', body: 'Our conclusions are explained, not asserted. You understand how we got there.' },
  { label: 'Independence guaranteed', body: 'No commercial relationships with contractors or product manufacturers. Our opinions are our own.' },
];

const tickItem = (item) =>
  b.block(['c-tick'], [
    b.block(['c-tick__bar'], []),
    b.block([], [
      b.text(['c-tick__label'], item.label),
      b.text(['c-tick__body'], item.body),
    ]),
  ]);

module.exports = {
  slug: 'about',
  title: 'Coeus — Our Story',
  type: 'content',

  build() {
    return [
      /* ── Hero ───────────────────────────────────────────────────────── */
      b.section(['c-page-hero'], [
        b.image(['c-page-hero__media'], ASSET.hero, 'Coeus Technical'),
        b.block(['c-page-hero__scrim'], []),
        b.block(['c-page-hero__inner'], [
          b.block(['c-breadcrumb'], [
            b.el('text-basic', {
              classes: ['c-breadcrumb__link'],
              settings: { text: 'Home', tag: 'a', link: { type: 'external', url: '/' } },
            }),
            b.text([], '/', 'span'),
            b.text(['c-breadcrumb__current'], 'Our Story', 'span'),
          ]),
          b.text(['c-eyebrow'], 'About us'),
          b.heading(['c-page-hero__title'], 'Our Story', 'h1'),
        ]),
      ], { label: 'Hero' }),

      /* ── 01 Purpose ─────────────────────────────────────────────────── */
      b.section(['l-section', 'l-section--lg', 'l-section--white', 'l-section--border-b'], [
        b.container(['l-container'], [
          b.block(['l-grid', 'l-grid--7-5', 'l-grid--top'], [
            b.block([], [
              sectionHeading({
                num: '01',
                title: 'Specialist fire engineering, where engineering, construction and the law meet.',
                small: true,
              }),
              b.block(['l-stack', 'l-stack--md'], [
                b.text(['c-prose'], 'Coeus Technical is a specialist fire engineering and fire safety consultancy based in Portsmouth, working across the UK. We help developers, building owners, housing providers, managing agents and legal teams navigate fire safety — from the earliest design stage through construction, occupation and beyond.'),
                b.text(['c-prose'], 'We are a small practice, deliberately so. Every project has senior, Chartered oversight, and Jacob stays involved throughout. We take on fewer projects so we can give each one the attention it deserves.'),
                b.text(['c-prose'], 'Our background is in construction, not in compliance for its own sake. That means the advice we give is grounded in how buildings actually get built — proportionate, defensible, and practical at every stage.'),
              ]),
            ]),
            b.block(['c-card', 'c-card--muted', 'c-card--pad-lg'], [
              b.text(['c-eyebrow', 'u-mb-lg'], 'Why clients choose Coeus'),
              b.block(['l-stack', 'l-stack--md'], WHY_COEUS.map(tickItem)),
            ]),
          ]),
        ]),
      ], { label: '01 Purpose' }),

      /* ── 02 Values ──────────────────────────────────────────────────── */
      b.section(['l-section', 'l-section--lg', 'l-section--muted', 'l-section--border-b'], [
        b.container(['l-container'], [
          sectionHeading({
            num: '02', title: 'Our values', small: true,
            subtitle: 'Integrity is the through-line. These five values are how it shows up in every project, every conversation, every report.',
          }),
          b.block(['l-grid', 'l-grid--5', 'l-grid--gap-md'],
            VALUES.map((value) =>
              b.block(['c-value-card'], [
                b.text(['c-value-card__num'], value.num, 'span'),
                b.block(['c-rule', 'c-rule--sm'], []),
                b.heading(['c-value-card__title', 'u-mt-md'], value.label, 'h3'),
                b.text(['c-card__body'], value.desc),
              ])
            )
          ),
        ]),
      ], { label: '02 Values' }),

      /* ── 03 What we do ──────────────────────────────────────────────── */
      b.section(['l-section', 'l-section--lg', 'l-section--white', 'l-section--border-b'], [
        b.container(['l-container'], [
          b.block(['l-grid', 'l-grid--5-7', 'l-grid--top'], [
            b.block([], [
              sectionHeading({ num: '03', title: 'What we do', small: true }),
              b.block(['l-stack', 'l-stack--md'], [
                b.text(['c-prose'], 'We operate as a focused specialist practice, drawing on an established network of fire engineers, assessors and technical associates so we can match the right expertise to each commission.'),
                b.text(['c-prose'], 'Whatever the scale of the project, every client has direct access to senior, hands-on expertise — the person advising you is the person who understands your building. That is deliberate, and it is why clients return to us and recommend us.'),
              ]),
            ]),
            b.block(['l-grid', 'l-grid--2', 'l-grid--gap-md'],
              PHASE_CARDS.map((phase, i) =>
                b.linkBlock(['c-card', 'c-card--hover', 'c-card--link', 'c-card--pad-lg'], phase.url, [
                  b.text(['c-eyebrow'], `Phase ${String(i + 1).padStart(2, '0')}`, 'span'),
                  b.heading(['c-card__title', 'u-mt-md'], phase.label, 'h4'),
                  b.text(['c-card__body'], phase.sub),
                  b.el('text-basic', {
                    classes: ['c-post-card__more'],
                    settings: {
                      text: 'Learn more', tag: 'span',
                      icon: { library: 'themify', icon: ICON.arrowRight }, iconPosition: 'right',
                    },
                  }),
                ])
              )
            ),
          ]),
        ]),
      ], { label: '03 What we do' }),

      /* ── 04 Meet the founder ────────────────────────────────────────── */
      b.section(['l-section', 'l-section--lg', 'l-section--muted', 'l-section--border-b'], [
        b.container(['l-container'], [
          b.block(['l-grid', 'l-grid--4-8', 'l-grid--top'], [

            b.block([], [
              b.image(['c-profile__photo'], ASSET.founder,
                'Jacob Derrick — Managing Director & Principal Fire Engineer'),
              b.block(['u-mt-md'], [
                b.text(['c-profile__name'], 'Jacob Derrick'),
                b.text(['c-profile__role'], 'Managing Director &amp; Principal Fire Engineer'),
                b.text(['c-profile__creds'],
                  'BEng (Hons) · CEng · C.Build E · FCABE · FIET · FIFireE · MSFPE · MIFSM'),
                b.block(['c-profile__badges'],
                  ['CEng', 'FCABE', 'FIFireE', 'FIET', 'MSFPE', 'MIFSM']
                    .map((cred) => b.text(['c-profile__badge'], cred, 'span'))),
              ]),
              b.block(['l-stack', 'u-mt-md'], [
                b.button(['c-btn', 'c-btn--outline-petrol', 'c-btn--sm', 'c-btn--block'],
                  "Request Jacob's CV", 'mailto:jacob@coeus-technical.co.uk?subject=CV%20Request', {
                    settings: { icon: { library: 'themify', icon: ICON.download } },
                  }),
                iconButton(['c-btn', 'c-btn--primary', 'c-btn--sm', 'c-btn--block'],
                  'Discuss a project', '/contact/'),
              ]),
            ]),

            b.block([], [
              sectionHeading({ num: '04', title: 'Meet the founder', small: true }),

              b.block(['c-quote', 'u-mb-lg'], [
                b.text(['c-quote__text'],
                  '"Fire safety advice should be technically rigorous, genuinely independent, and clear enough to act on — never hedged, never generic, and never compromised by commercial pressure."'),
                b.text(['c-quote__attrib'], '— Jacob Derrick, Founder'),
              ]),

              b.block(['l-stack', 'l-stack--md'], [
                b.text(['c-prose'], 'Jacob founded Coeus Technical after a career spanning fire engineering, building control and construction. He began on site, managing the installation, commissioning and remediation of fire and security systems — including active and passive fire safety works in live NHS clinical environments — before moving into consultancy. That hands-on grounding is what makes his advice buildable, not just compliant on paper.'),
                b.text(['c-prose'], 'He established the practice on a simple principle: fire-engineering advice should be genuinely useful, practical and buildable. He leads fire strategies from concept through construction to occupation, acts as a Client Design Guardian protecting clients from unnecessary cost and over-engineering, and undertakes expert witness and technical advisory work.'),
                b.text(['c-prose'], "The Coeus team is genuinely supported and encouraged in their projects by Jacob's leadership and mentoring; this ensures we do not lose sight of the client and their objectives. Jacob stays involved in and in touch with every project, with senior oversight from the first conversation through to completion."),
              ]),

              b.block(['l-grid', 'l-grid--2', 'l-grid--gap-md', 'u-mt-xl'],
                FACTS.map((fact) =>
                  b.block(['c-card'], [
                    b.text(['c-card__label'], fact.label),
                    b.text(['c-card__body'], fact.detail),
                  ])
                )
              ),
            ]),
          ]),
        ]),
      ], { label: '04 Founder' }),

      /* ── 05 Registrations ───────────────────────────────────────────── */
      b.section(['l-section', 'l-section--lg', 'l-section--white', 'l-section--border-b'], [
        b.container(['l-container'], [
          sectionHeading({
            num: '05', title: 'Professional registrations &amp; accreditations', small: true,
            subtitle: 'Every registration below is current and independently maintained. They reflect the minimum standard we hold ourselves to — not a marketing claim.',
          }),
          b.block(['l-grid', 'l-grid--2', 'l-grid--gap-lg'],
            REGISTRATIONS.map((group) =>
              b.block([], [
                b.text(['c-reg__group-label'], group.category),
                b.block(['l-stack'], group.items.map((item) =>
                  b.block(['c-reg'], [
                    b.text(['c-reg__title'], item.title),
                    b.text(['c-reg__body'], item.body),
                  ])
                )),
              ])
            )
          ),
          b.block(['l-row', 'l-row--gap-lg', 'u-divide-top', 'u-mt-xl'], [
            b.image(['c-accred__logo', 'c-accred__logo--lg'], ASSET.bsi, 'BSI Member'),
            b.image(['c-accred__logo', 'c-accred__logo--lg'], ASSET.eal, 'EAL Qualified'),
            b.image(['c-accred__logo', 'c-accred__logo--lg'], ASSET.safeContractor, 'Safe Contractor Approved'),
          ]),
        ]),
      ], { label: '05 Registrations' }),

      /* ── 06 Working with us ─────────────────────────────────────────── */
      b.section(['l-section', 'l-section--lg', 'l-section--muted', 'l-section--border-b'], [
        b.container(['l-container'], [
          b.block(['l-grid', 'l-grid--split', 'l-grid--top'], [
            b.block([], [
              sectionHeading({ num: '06', title: 'Working with us', small: true }),
              b.block(['l-stack', 'l-stack--md'], [
                b.text(['c-prose'], 'Every engagement starts with a direct conversation — not a scoping form, not a template proposal. We want to understand the building and the situation before we say anything about how we can help.'),
                b.text(['c-prose'], 'We work on fixed fees, agreed in advance, so there are no surprises on the invoice. We respond to client messages within a working day. We tell clients when we cannot meet a deadline — and we do not take on instructions we cannot deliver to the standard required.'),
                b.text(['c-prose'], 'If we are not the right people for a particular commission, we will tell you that too, and point you towards someone who is.'),
              ]),
            ]),
            b.block(['l-stack', 'l-stack--md'], [
              ...WORKING_WITH_US.map((item) =>
                b.block(['c-card'], [tickItem(item)])),
              iconButton(['c-btn', 'c-btn--quiet'], 'How we work in detail', '/how-we-work/'),
            ]),
          ]),
        ]),
      ], { label: '06 Working with us' }),

      /* ── CTA ────────────────────────────────────────────────────────── */
      ctaBand({
        eyebrow: "Let's talk",
        title: "Fire engineering with integrity.<br>Let's talk about your building.",
        lead: 'Tell us about your project and we will come back to you with a clear view of how we can help.',
        tone: 'dark',
        actions: [
          { classes: ['c-btn', 'c-btn--white'], label: 'Discuss a project', url: '/contact/' },
          { classes: ['c-btn', 'c-btn--outline-light'], label: "Request Jacob's CV", url: 'mailto:jacob@coeus-technical.co.uk?subject=CV%20Request', icon: ICON.download },
          { classes: ['c-btn', 'c-btn--outline-light'], label: CONTACT.phone, url: CONTACT.phoneHref, icon: ICON.phone },
        ],
      }),
    ];
  },
};
