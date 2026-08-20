/**
 * The four lifecycle pages — Innovate, Design, Build, Protect.
 *
 * They share one layout (phase-tinted hero, article + sticky sidebar, service
 * accordion, closing band), so the shell is built once and driven by data.
 * Adding a service is a data edit; the client can equally add one in Bricks.
 *
 * The React source drives the service detail with useState. Here each service
 * is a native <details>/<summary>, which gives the same open/close behaviour
 * with no JavaScript and proper keyboard and screen-reader support.
 */

const b = require('../builder');
const { CONTACT, ICON, iconButton, pageHero } = require('../partials');

const PHASE_LINKS = [
  { label: 'Innovate', url: '/expertise/innovate/', key: 'innovate' },
  { label: 'Design',   url: '/expertise/design/',   key: 'design' },
  { label: 'Build',    url: '/expertise/build/',    key: 'build' },
  { label: 'Protect',  url: '/expertise/protect/',  key: 'protect' },
];

const AUDIENCE_LINKS = {
  developers:     { label: 'Developers &amp; Contractors',            url: '/who-we-help/developers/' },
  owners:         { label: 'Building Owners &amp; Housing Providers', url: '/who-we-help/building-owners/' },
  agents:         { label: 'Managing Agents',                         url: '/who-we-help/managing-agents/' },
  legal:          { label: 'Legal Teams',                             url: '/who-we-help/legal-teams/' },
};

/** One service, rendered as a disclosure. */
function service(svc, index) {
  return b.el('block', {
    classes: ['c-service'],
    settings: { tag: 'details', ...(index === 0 ? { _attributes: [{ name: 'open', value: '' }] } : {}) },
    label: svc.label,
    children: [
      b.el('block', {
        classes: ['c-service__summary'],
        settings: { tag: 'summary' },
        children: [
          b.block([], [
            svc.badgeLabel ? b.text(['c-eyebrow'], svc.badgeLabel, 'span') : null,
            b.heading(['c-service__title'], svc.label, 'h2'),
          ]),
        ],
      }),
      b.block(['c-service__body'], [
        svc.callout
          ? b.block(['c-callout'], [
              b.text(['c-callout__title'], svc.callout.title),
              b.text(['c-callout__body'], svc.callout.body),
            ])
          : null,
        ...svc.paragraphs.map((p) => b.text(['c-prose'], p)),
        b.block(['c-bullets'], svc.bullets.map((item) => b.text(['c-bullets__item'], item, 'span'))),
        svc.footCallout
          ? b.block(['c-callout'], [
              b.text(['c-callout__title'], svc.footCallout.title),
              b.text(['c-callout__body'], svc.footCallout.body),
            ])
          : null,
        svc.link
          ? iconButton(['c-btn', 'c-btn--quiet'], svc.link.label, svc.link.url)
          : null,
      ]),
    ],
  });
}

/** Build one expertise page from its data. */
function expertisePage(data) {
  return {
    slug: `expertise-${data.key}`,
    title: `Coeus — ${data.name}`,
    type: 'content',

    build() {
      return [
        /* ── Hero ─────────────────────────────────────────────────────── */
        b.section(['c-page-hero', `c-page-hero--phase-${data.phase}`, 'c-page-hero--tall'], [
          b.block(['c-page-hero__scrim'], []),
          b.block(['c-page-hero__inner'], [
            b.block(['c-breadcrumb'], [
              b.el('text-basic', {
                classes: ['c-breadcrumb__link'],
                settings: { text: 'Home', tag: 'a', link: { type: 'external', url: '/' } },
              }),
              b.text([], '/', 'span'),
              b.text([], 'Expertise', 'span'),
              b.text([], '/', 'span'),
              b.text(['c-breadcrumb__current'], data.name, 'span'),
            ]),
            b.text(['c-eyebrow'], `Phase ${data.phase}`),
            b.heading(['c-page-hero__title'], data.name, 'h1'),
            b.text(['c-page-hero__lead'], data.tagline),
          ]),
        ], { label: 'Hero' }),

        /* ── Article + sidebar ────────────────────────────────────────── */
        b.section(['l-section', 'l-section--white'], [
          b.container(['l-container'], [
            b.block(['c-layout'], [

              /* Main column */
              b.block(['c-layout__main'], [
                b.block(['c-page-intro'], [
                  b.text(['c-eyebrow'], data.eyebrow, 'span'),
                  b.heading(['c-page-intro__title'], data.introTitle, 'h2'),
                  b.block(['c-rule', 'c-rule--sm'], []),
                  ...data.introParagraphs.map((p) => b.text(['c-prose', 'u-mt-md'], p)),
                ]),

                // Service index — jump list mirroring the accordion below.
                b.text(['c-eyebrow', 'c-eyebrow--muted', 'u-mb-lg'], 'Services in this phase'),
                b.block(['c-service-index'],
                  data.services.map((svc, i) =>
                    b.linkBlock(['c-service-index__item'], `#service-${i + 1}`, [
                      b.text(['c-service-index__num'], String(i + 1).padStart(2, '0'), 'span'),
                      b.text(['c-service-index__label'], svc.label, 'span'),
                      svc.badge ? b.text(['c-badge'], svc.badge, 'span') : null,
                    ])
                  )
                ),

                // Photography slot — artwork pending (Part C).
                b.block(['c-figure'], [
                  b.image(['c-figure__img'], data.figureImage, data.figureAlt),
                  b.block(['c-figure__scrim'], []),
                  b.text(['c-figure__caption'], 'Photography to be supplied — see Part C'),
                ]),

                b.block([], data.services.map(service)),

                data.note
                  ? b.block(['c-note'], [
                      b.text(['c-note__title'], data.note.title),
                      b.text(['c-note__body'], data.note.body),
                    ])
                  : null,
              ]),

              /* Sidebar */
              b.block(['c-layout__aside'], [
                b.block(['c-sidebar-cta'], [
                  b.heading(['c-sidebar-cta__title'], 'Discuss a project', 'h3'),
                  b.text(['c-sidebar-cta__text'],
                    'Tell us about your building and where you are in the process.'),
                  b.button(['c-btn', 'c-btn--white', 'c-btn--block'], 'Get in touch', '/contact/'),
                  b.button(['c-btn', 'c-btn--outline-light', 'c-btn--block', 'u-mt-md'],
                    CONTACT.phone, CONTACT.phoneHref),
                ]),

                data.highlight
                  ? b.block(['c-sidebar-box', 'c-sidebar-box--accent'], [
                      b.text(['c-eyebrow'], data.highlight.eyebrow, 'span'),
                      b.heading(['c-sidebar-box__title', 'u-mt-md'], data.highlight.title, 'h3'),
                      b.text(['c-sidebar-box__note'], data.highlight.body),
                      iconButton(['c-btn', 'c-btn--quiet', 'u-mt-md'],
                        data.highlight.linkLabel, data.highlight.linkUrl),
                    ])
                  : null,

                b.block(['c-sidebar-box'], [
                  b.heading(['c-sidebar-box__title'], 'Our phases', 'h3'),
                  b.block([], PHASE_LINKS.map((phase) =>
                    b.el('text-basic', {
                      classes: phase.key === data.key
                        ? ['c-sidebar-box__link', 'c-sidebar-box__link--active']
                        : ['c-sidebar-box__link'],
                      settings: {
                        text: phase.label, tag: 'a',
                        link: { type: 'external', url: phase.url },
                        icon: { library: 'themify', icon: ICON.arrowRight },
                      },
                    })
                  )),
                ]),

                b.block(['c-sidebar-box'], [
                  b.heading(['c-sidebar-box__title'], 'Who we help', 'h3'),
                  b.block([], data.audiences.map((key) =>
                    b.el('text-basic', {
                      classes: ['c-sidebar-box__link'],
                      settings: {
                        text: AUDIENCE_LINKS[key].label, tag: 'a',
                        link: { type: 'external', url: AUDIENCE_LINKS[key].url },
                        icon: { library: 'themify', icon: ICON.arrowRight },
                      },
                    })
                  )),
                ]),
              ]),
            ]),
          ]),
        ], { label: 'Services' }),

        /* ── Closing band ─────────────────────────────────────────────── */
        b.section(['l-section', 'l-section--sm', 'l-section--muted', 'l-section--border-y'], [
          b.container(['l-container'], [
            b.block(['c-band'], [
              b.block([], [
                b.heading(['c-band__title'], data.bandTitle, 'h2'),
                b.text(['c-band__text'], data.bandText),
              ]),
              iconButton(['c-btn', 'c-btn--primary'], 'Discuss a project', '/contact/'),
            ]),
          ]),
        ], { label: 'Closing band' }),
      ];
    },
  };
}

/* =========================================================================
   CONTENT
   ========================================================================= */

const INNOVATE = {
  key: 'innovate', phase: '01', name: 'Innovate',
  tagline: 'Early thinking done right — feasibility, options and first strategies, worked from the building, not the checklist.',
  eyebrow: 'Early thinking',
  introTitle: 'Fire engineering decisions taken early cost a fraction of those taken late',
  introParagraphs: [
    'The Innovate phase is where the fire engineering relationship begins. Before a strategy is written or a specification is set, we work with your design team to understand the building, what it needs to achieve and the constraints the project must accommodate. This early involvement shapes everything that follows. A fire strategy developed around the building from the outset can be proportionate, defensible and buildable. When fire engineering is introduced later, the available options are often more limited, disruptive and costly.',
  ],
  figureImage: 'https://images.unsplash.com/photo-1541888046-f1d7ae0f31e9?w=1400&auto=format&fit=crop&q=75',
  figureAlt: 'Architectural plans and drawings',
  audiences: ['developers', 'owners'],
  bandTitle: 'Ready to talk about your project?',
  bandText: 'Early conversations cost nothing. Late changes cost a great deal.',
  services: [
    {
      label: 'Feasibility &amp; fire engineering input',
      paragraphs: ['Before you commit to a design, we tell you what is achievable and what the fire strategy will ask of the building. You start with a realistic picture, not a costly surprise once the design is set.'],
      bullets: [
        'Feasibility appraisals and fire engineering input',
        'Comparative regulatory assessment (ADB vs. BS 9999 vs. BS 9991)',
        'Preliminary fire strategies and concept-stage input',
        'Peer review of existing strategies at early design stage',
        'Performance-based design intent and basis of design',
      ],
      footCallout: {
        title: 'When to call us',
        body: 'As early as possible — ideally before planning, and certainly before the concept design is fixed. The call is free; the cost of retrofitting a fire strategy is not.',
      },
    },
    {
      label: 'Concept fire strategies',
      paragraphs: ['We shape the fire strategy around your building from the first sketches, so the design grows on solid foundations. Getting this right early keeps your options open and avoids expensive redesign later.'],
      bullets: [
        'Concept fire strategy aligned to early design intent',
        'Regulatory route selection (ADB, BS 9999, BS 9991, performance-based)',
        'Fire strategy parameters for the design team',
        'Gateway 1 readiness for Higher-Risk Buildings',
        'Interface with Principal Designer on fire safety in design',
      ],
    },
    {
      label: 'Options appraisal &amp; early advice',
      paragraphs: ['Where there is more than one route, we weigh them on cost, buildability and risk and tell you which one genuinely stacks up. You make early decisions with the trade-offs set out plainly, not hidden.'],
      bullets: [
        'Comparative options appraisal across regulatory routes',
        'Heritage and listed building fire strategy input',
        'Mixed-use and complex occupancy advice',
        'Pre-application engagement with building control',
        'Support to Principal Designer on fire safety in design',
      ],
    },
    {
      label: 'Planning-stage fire statements',
      paragraphs: ['We prepare the fire statement your planning application needs, written to satisfy the authority first time. Clear, defensible and pitched to keep your submission moving.'],
      bullets: [
        'Fire statement for planning applications',
        'Fire safety considerations in the design and access statement',
        'Pre-application engagement with the local planning authority',
        'Gateway 1 fire safety documentation (Higher-Risk Buildings)',
        'Stage report for end of RIBA Stage 1 / Stage 2',
      ],
    },
  ],
};

const DESIGN = {
  key: 'design', phase: '02', name: 'Design',
  tagline: 'The strategy in full — performance-based fire strategies and modelling that stand up to scrutiny and to construction.',
  eyebrow: 'Developed design',
  introTitle: 'Fire strategy and performance-based design',
  introParagraphs: [
    'The design phase is when the fire engineering is fully developed. We produce fire strategies, fire engineering reports and specialist design input that are proportionate to the building, defensible to the regulator and practical for the contractor to implement. Where performance-based methods offer a better outcome — through a more appropriate design, lower costs, or greater flexibility for the architect — we use them. But never as a means of sidestepping responsibility. Our strategies are written to be understood, implemented and defended.',
  ],
  figureImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&auto=format&fit=crop&q=75',
  figureAlt: 'Building design and architecture',
  audiences: ['developers', 'owners'],
  bandTitle: 'Ready to talk about your project?',
  bandText: 'Early conversations cost nothing. Late changes cost a great deal.',
  highlight: {
    eyebrow: 'Reference',
    title: 'Referenced standards',
    body: 'BS 9999 · BS 9991 · Approved Document B · BR 187 · BS 7974 · BS 8414 · BS 5839 · BS EN 54 · SFPE Handbook · Building Safety Act 2022 · Building Regulations 2010',
    linkLabel: 'How we work',
    linkUrl: '/how-we-work/',
  },
  services: [
    {
      label: 'Detailed fire strategies',
      paragraphs: ['We develop the full fire strategy that governs the design, proportionate to your building and written to be understood, built and defended. It gives your whole team one clear reference to work to.'],
      bullets: [
        'Fire engineering strategies — full and concept',
        'Performance-based fire engineering and comparative assessment',
        'Fire safety report (Regulation 10 / Approved Document B compliance)',
        'Design-stage peer review and technical audit',
        'Structural fire engineering input and design basis',
      ],
      footCallout: {
        title: 'Referenced standards',
        body: 'BS 9999 · BS 9991 · Approved Document B · BR 187 · BS 7974 · SFPE Handbook · BRE reports · Building Safety Act 2022',
      },
    },
    {
      label: 'Means of escape &amp; compartmentation',
      paragraphs: ['We design how people get out and how fire is contained, resolving the detail others leave vague. The result protects occupants and holds up under regulator review.'],
      bullets: [
        'Means of escape design and travel distance assessment',
        'Compartmentation strategy and fire separation detail',
        'Simultaneous and phased evacuation strategy',
        'Human behaviour and evacuation modelling',
        'Refuge and evacuation lift strategy',
        'Life safety systems integration',
      ],
    },
    {
      label: 'Technical notes &amp; design advice',
      paragraphs: ['As questions arise, we give your architects and engineers quick, reasoned answers they can design against. You keep momentum instead of waiting on vague guidance.'],
      bullets: [
        'Technical notes resolving specific design queries',
        'Fire engineering input to team meetings and workshops',
        'Fire detection and alarm design to BS 5839',
        'Smoke control design and system selection',
        "Design review of M&amp;E specialist's proposals",
      ],
    },
    {
      label: 'Performance-based design',
      paragraphs: ['Where the prescriptive route does not fit, we use engineering analysis, including modelling and CFD where it helps, to prove a safe and more workable solution. It can unlock better designs, lower cost and more flexibility, on evidence that stands up to scrutiny.'],
      bullets: [
        'Performance-based fire engineering analysis',
        'CFD and zone modelling where appropriate',
        'Smoke and fire modelling for complex buildings',
        'Gateway 2 preparation and submission support (Higher-Risk Buildings)',
        'Fire engineering case report for the BSR',
        'Peer review of fire engineering submissions',
      ],
    },
  ],
};

const BUILD = {
  key: 'build', phase: '03', name: 'Build',
  tagline: 'On site, not just on paper — support, inspections and handover that make sure what was designed is what gets built.',
  eyebrow: 'On site',
  introTitle: 'A fire strategy that is not implemented correctly is not a fire strategy.',
  introParagraphs: [
    'The build phase is when we ensure that what was agreed in design — every installation detail, compartmentation decision, and critical junction — is delivered on site as intended.',
    'We work directly with contractors, site managers and building control officers to review, advise and verify fire-critical elements of the build. Our approach is practical and clear: we resolve issues on site rather than simply passing them back to the design team.',
  ],
  figureImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&auto=format&fit=crop&q=75',
  figureAlt: 'Construction site',
  audiences: ['developers', 'owners'],
  bandTitle: 'Ready to talk about your project?',
  bandText: 'Construction-stage fire engineering, inspections and the Client Guardian service.',
  note: {
    title: 'Our background is on site.',
    body: "We understand how construction projects run, what contractors need and how problems get resolved in the real world. That means our site involvement adds value rather than friction — and our Client Guardian service gives clients direct visibility of fire safety delivery without having to rely on the contractor alone.",
  },
  highlight: {
    eyebrow: 'New service',
    title: 'Client Guardian',
    body: "Independent fire engineering oversight on behalf of the client throughout construction — not the contractor's view, yours.",
    linkLabel: 'Learn more',
    linkUrl: '#service-5',
  },
  services: [
    {
      label: 'Construction-phase support',
      paragraphs: ['We stay involved as the building goes up, so the strategy on paper becomes the building in reality. Issues get resolved on site, not passed back and forth while the programme slips.'],
      bullets: [
        'Construction-stage fire engineering advice and query resolution',
        'Compartmentation and passive fire protection review',
        'Contractor information and specification queries',
        'Interface with building control throughout the build',
        'Attendance at site meetings and design reviews',
      ],
    },
    {
      label: 'Regulatory liaison &amp; approvals',
      paragraphs: ['We deal directly with building control and the Building Safety Regulator, presenting the evidence they need to approve the work. It takes the regulatory weight off you and keeps approvals on track.'],
      bullets: [
        'Building control liaison and approval management',
        'Gateway 3 submission support (Higher-Risk Buildings)',
        'Regulation 38 documentation preparation and coordination',
        'Fire safety information handover pack',
        'Golden Thread contribution (Higher-Risk Buildings)',
        'Interface with Principal Designer on handover obligations',
      ],
    },
    {
      label: 'Design-change review',
      paragraphs: ['When the design changes on site, we check the fire implications before they become problems. You avoid nasty surprises at handover and keep the strategy intact.'],
      bullets: [
        'Assessment of design changes and their fire strategy implications',
        'Formal change management for fire-critical variations',
        'Updated fire strategy documentation where required',
        "Review of contractor's proposed substitutions and alternatives",
        'Reporting to the client on cumulative change impact',
      ],
    },
    {
      label: 'Site coordination &amp; inspection',
      paragraphs: ['We inspect and verify the fire-critical work — every compartment line, penetration and junction — against the strategy. You get documented assurance that what was designed is what was actually built.'],
      bullets: [
        'Site inspections and fire-critical element monitoring',
        'Compartmentation verification and penetration seal checks',
        'Passive fire protection installation review',
        'Fire system testing and commissioning oversight',
        'Inspection reports and photographic record',
      ],
    },
    {
      label: 'Client-side technical assurance (client guardian)',
      badge: 'New', badgeLabel: 'New service',
      callout: {
        title: 'Client Guardian — independent fire engineering oversight',
        body: 'Acting on behalf of the employer throughout the construction process',
      },
      paragraphs: ['We act as your technical guardian, holding suppliers and contractors to account on the fire-critical detail. We witness and challenge the testing and commissioning of systems such as fire alarms, sprinklers and smoke control, so you can prove they perform rather than take a certificate on trust.'],
      bullets: [
        'Independent technical oversight of fire-critical construction elements',
        'Regular site visits and inspection reporting to the client',
        "Review of contractor's fire safety submissions and sign-offs",
        'Witnessing and challenging fire system commissioning',
        'Early identification of non-compliance and variation',
        "Interface with building control and the BSR on the client's behalf",
      ],
    },
  ],
};

const PROTECT = {
  key: 'protect', phase: '04', name: 'Protect',
  tagline: 'Safe in use — fire risk assessments, FRAEW, building safety cases, expert witness and safety advisory for occupied buildings.',
  eyebrow: 'In use',
  introTitle: 'Fire safety for buildings in occupation',
  introParagraphs: [
    'The Protect phase covers the life of a building in occupation. Fire risk does not end at practical completion — it evolves as buildings age, usage evolves, residents and occupancy change. We help responsible persons, building owners, managing agents and housing providers understand, assess and manage fire risk throughout the life of their buildings — clearly, proportionately and in a way that stands up to scrutiny.',
  ],
  figureImage: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1400&auto=format&fit=crop&q=75',
  figureAlt: 'Residential building in occupation',
  audiences: ['owners', 'agents', 'legal'],
  bandTitle: 'Ready to talk about your building?',
  bandText: 'FRAEW, fire risk, building safety cases — clear advice from an experienced fire engineer.',
  highlight: {
    eyebrow: 'Specialist service',
    title: 'Expert witness &amp; litigation',
    body: 'CPR Part 35 compliant reports for court proceedings, cladding disputes and Building Safety Act litigation.',
    linkLabel: 'Legal Teams route',
    linkUrl: '/who-we-help/legal-teams/',
  },
  services: [
    {
      label: 'Fire risk assessments (FRA)',
      paragraphs: ['We assess the fire risk in your occupied building and tell you plainly what must be done, and in what order. No jargon, and no report that leaves you unsure of the next step. Our assessments are clear, proportionate and written to be used, not filed — Types 1 through 4 across residential, commercial and mixed-use buildings.'],
      bullets: [
        'Type 1–4 fire risk assessments',
        'Fire safety management systems and procedures',
        'Evacuation strategy review and update',
        'Responsible Person advisory support',
        'Remediation advice and prioritisation',
      ],
    },
    {
      label: 'PAS 9980 external wall reviews (FRAEW)',
      badge: 'Key', badgeLabel: 'Specialist service',
      callout: {
        title: 'Fire Risk Appraisal of External Walls (FRAEW)',
        body: 'PAS 9980:2022 · EWS1 · Lender-accepted assessments',
      },
      paragraphs: [
        'We appraise external walls and cladding to PAS 9980 with a proportionate, evidence-led judgement rather than a default worst case. Any recommendation is a proportionate response to the risk we actually identify, giving you a clear, defensible basis to decide what, if anything, needs to be done.',
        'Jacob Derrick leads all FRAEW assessments personally. He inspects, he reasons, he signs off. We do not produce reports we have not stood behind.',
      ],
      bullets: [
        'FRAEW assessments to PAS 9980:2022',
        'EWS1 form completion and sign-off',
        'External wall assessment and cladding review',
        'Pre-assessment advice and scope discussion',
        'Remediation specification and prioritisation',
      ],
      link: { label: 'See a FRAEW case study', url: '/case-studies/' },
    },
    {
      label: 'Building safety case support',
      paragraphs: ['We help accountable persons build and maintain the safety case that higher-risk buildings must hold. Clear, well-evidenced and ready for the Building Safety Regulator. We help accountable persons, building owners and their appointed representatives understand what is needed, gather the evidence and produce a Safety Case that is proportionate, accurate and defensible.'],
      bullets: [
        'Building Safety Case preparation and maintenance',
        'Safety Case Report writing',
        'Golden Thread information management',
        'Accountable Person support and advisory',
        'BSR engagement and interface',
      ],
    },
    {
      label: 'Expert witness &amp; technical advisory',
      badge: 'Key', badgeLabel: 'Specialist service',
      callout: {
        title: 'Expert witness — CPR Part 35 compliant',
        body: 'Also available via our Legal Teams route',
      },
      paragraphs: ['Jacob gives expert witness evidence in fire disputes, from cladding and external walls to building-safety and cause-and-origin matters, under CPR Part 35. Complex engineering, explained clearly and impartially so the court can follow it. Jacob has experience in court proceedings, mediation and arbitration, and his reports are written to be understood — not to obscure the engineering behind jargon.'],
      bullets: [
        'Expert witness reports — CPR Part 35 compliant',
        'Single joint expert appointments',
        'Technical review of opposing expert evidence',
        'Cladding and external wall system disputes',
        'Building Safety Act liability matters',
        'Fire cause and origin assessment',
        'Regulatory and enforcement proceedings',
      ],
      link: { label: 'See our Legal Teams route', url: '/who-we-help/legal-teams/' },
    },
  ],
};

module.exports = {
  pages: [INNOVATE, DESIGN, BUILD, PROTECT].map(expertisePage),
};
