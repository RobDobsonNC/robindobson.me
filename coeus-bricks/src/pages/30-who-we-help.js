/**
 * The six "Who We Help" audience pages.
 *
 * Same shell as the expertise pages — hero, article + sticky sidebar, closing
 * band — but the article column is a sequence of typed content blocks so each
 * audience can mix prose, checklists, feature cards and imagery in its own
 * order without a bespoke template.
 */

const b = require('../builder');
const { CONTACT, ICON, iconButton } = require('../partials');

const AUDIENCE_NAV = [
  { key: 'developers',           label: 'Developers &amp; Contractors',            url: '/who-we-help/developers/' },
  { key: 'building-owners',      label: 'Building Owners &amp; Housing Providers', url: '/who-we-help/building-owners/' },
  { key: 'managing-agents',      label: 'Managing Agents',                         url: '/who-we-help/managing-agents/' },
  { key: 'legal-teams',          label: 'Legal Teams',                             url: '/who-we-help/legal-teams/' },
  { key: 'architects',           label: 'Architects &amp; Principal Designers',    url: '/who-we-help/architects/' },
  { key: 'facilities-managers',  label: 'Facilities &amp; Asset Managers',         url: '/who-we-help/facilities-managers/' },
];

const EXPERTISE = {
  innovate: { label: 'Innovate', url: '/expertise/innovate/' },
  design:   { label: 'Design',   url: '/expertise/design/' },
  build:    { label: 'Build',    url: '/expertise/build/' },
  protect:  { label: 'Protect',  url: '/expertise/protect/' },
};

/** Render one typed content block from an audience page's article column. */
function contentBlock(item) {
  switch (item.type) {
    case 'intro':
      return b.block([], [
        b.text(['c-eyebrow'], item.eyebrow, 'span'),
        b.heading(['c-page-intro__title'], item.title, 'h2'),
        b.block(['c-rule', 'c-rule--sm'], []),
        ...item.paragraphs.map((p) => b.text(['c-prose', 'u-mt-md'], p)),
      ]);

    case 'checklist':
      return b.block(['c-block'], [
        b.heading(['c-block__title'], item.title, 'h2'),
        b.block(['c-checklist'],
          item.items.map((line) => b.text(['c-checklist__item'], line, 'span'))),
      ]);

    case 'prose':
      return b.block(['c-block'], [
        b.heading(['c-block__title'], item.title, 'h2'),
        ...item.paragraphs.map((p) => b.text(['c-prose', 'u-mt-md'], p)),
      ]);

    case 'figure':
      return b.block(['c-figure', 'u-mt-xl'], [
        b.image(['c-figure__img'], item.image, item.alt),
        b.block(['c-figure__scrim'], []),
        b.text(['c-figure__caption'], 'Photography to be supplied — see Part C'),
      ]);

    case 'note':
      return b.block(['c-note'], [
        b.text(['c-note__title'], item.title),
        b.text(['c-note__body'], item.body),
      ]);

    case 'feature':
      return b.block(['c-feature', 'u-mt-xl'], [
        b.text(['c-eyebrow'], item.eyebrow, 'span'),
        b.heading(['c-feature__title'], item.title, 'h2'),
        b.block(['c-rule', 'c-rule--sm'], []),
        ...item.paragraphs.map((p) => b.text(['c-prose', 'u-mt-md'], p)),
        item.footnote ? b.richText(['c-feature__note'], item.footnote) : null,
      ]);

    case 'feature-slim':
      return b.block(['c-feature', 'c-feature--slim', 'u-mt-xl'], [
        b.text(['c-eyebrow'], item.eyebrow, 'span'),
        b.heading(['c-feature__title', 'c-feature__title--sm'], item.title, 'h2'),
        ...item.paragraphs.map((p) => b.text(['c-prose', 'u-mt-md'], p)),
        item.link ? iconButton(['c-btn', 'c-btn--quiet', 'u-mt-md'], item.link.label, item.link.url) : null,
      ]);

    default:
      throw new Error(`Unknown content block type: ${item.type}`);
  }
}

function audiencePage(data) {
  return {
    slug: `who-we-help-${data.key}`,
    title: `Coeus — ${data.plainTitle}`,
    type: 'content',

    build() {
      return [
        /* ── Hero ─────────────────────────────────────────────────────── */
        b.section(['c-page-hero', 'c-page-hero--tall'], [
          b.block(['c-page-hero__scrim'], []),
          b.block(['c-page-hero__inner'], [
            b.block(['c-breadcrumb'], [
              b.el('text-basic', {
                classes: ['c-breadcrumb__link'],
                settings: { text: 'Home', tag: 'a', link: { type: 'external', url: '/' } },
              }),
              b.text([], '/', 'span'),
              b.text([], 'Who We Help', 'span'),
              b.text([], '/', 'span'),
              b.text(['c-breadcrumb__current'], data.crumb, 'span'),
            ]),
            b.heading(['c-page-hero__title'], data.title, 'h1'),
            b.text(['c-page-hero__question'], `"${data.question}"`),
          ]),
        ], { label: 'Hero' }),

        /* ── Article + sidebar ────────────────────────────────────────── */
        b.section(['l-section', 'l-section--white'], [
          b.container(['l-container'], [
            b.block(['c-layout'], [
              b.block(['c-layout__main'], data.blocks.map(contentBlock)),

              b.block(['c-layout__aside'], [
                b.block(['c-sidebar-cta'], [
                  b.heading(['c-sidebar-cta__title'], data.ctaTitle, 'h3'),
                  b.text(['c-sidebar-cta__text'], data.ctaText),
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
                  b.heading(['c-sidebar-box__title'], 'Who we help', 'h3'),
                  b.block([], AUDIENCE_NAV.map((item) =>
                    b.el('text-basic', {
                      classes: item.key === data.key
                        ? ['c-sidebar-box__link', 'c-sidebar-box__link--active']
                        : ['c-sidebar-box__link'],
                      settings: {
                        text: item.label, tag: 'a',
                        link: { type: 'external', url: item.url },
                        icon: { library: 'themify', icon: ICON.arrowRight },
                      },
                    })
                  )),
                ]),

                data.expertise && data.expertise.length
                  ? b.block(['c-sidebar-box'], [
                      b.heading(['c-sidebar-box__title'], 'Relevant expertise', 'h3'),
                      b.block([], data.expertise.map((key) =>
                        b.el('text-basic', {
                          classes: ['c-sidebar-box__link'],
                          settings: {
                            text: EXPERTISE[key].label, tag: 'a',
                            link: { type: 'external', url: EXPERTISE[key].url },
                            icon: { library: 'themify', icon: ICON.arrowRight },
                          },
                        })
                      )),
                    ])
                  : null,
              ]),
            ]),
          ]),
        ], { label: 'Content' }),

        /* ── Closing band ─────────────────────────────────────────────── */
        b.section(['l-section', 'l-section--sm', 'l-section--muted', 'l-section--border-y'], [
          b.container(['l-container'], [
            b.block(['c-band'], [
              b.block([], [
                b.heading(['c-band__title'], data.bandTitle, 'h2'),
                b.text(['c-band__text'], data.bandText),
              ]),
              iconButton(['c-btn', 'c-btn--primary'], data.bandCta || 'Discuss a project', '/contact/'),
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

const DEVELOPERS = {
  key: 'developers', crumb: 'Developers &amp; Contractors',
  title: 'Developers &amp; Contractors', plainTitle: 'Developers & Contractors',
  question: 'Will this advice actually get the project through planning, the BSR and building control?',
  ctaTitle: 'Discuss your project',
  ctaText: 'Tell us where you are in the process and what you need.',
  expertise: ['innovate', 'design', 'build'],
  bandTitle: 'Ready to discuss your development?',
  bandText: 'Proportionate, defensible fire engineering from first concept to handover.',
  blocks: [
    {
      type: 'intro', eyebrow: 'Development &amp; construction',
      title: 'We understand what the project needs to do.',
      paragraphs: [
        'Developers and contractors need fire engineering advice that is accurate and that will stand firm — in front of building control, the Building Safety Regulator, lenders and planners. Advice that moves the project forward without creating additional risk.',
        'Coming from construction, we understand programme, we understand what contractors need on site, and we understand the pressure of a deadline. Our advice is proportionate, defensible and practical at every stage of a development.',
      ],
    },
    {
      type: 'checklist', title: 'What we do for developers',
      items: [
        'Feasibility and concept-stage fire engineering input',
        'Fire strategies for planning and building control',
        'Performance-based design and comparative assessment',
        'Gateway 1 and Gateway 2 support (Higher-Risk Buildings)',
        'Construction-stage monitoring and site inspections',
        'Design change review and query resolution on site',
        'Regulation 38 handover documentation',
        'Post-completion support and fire risk assessment',
      ],
    },
    {
      type: 'figure',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&auto=format&fit=crop&q=75',
      alt: 'Construction site',
    },
    {
      type: 'prose', title: 'Our credentials',
      paragraphs: [
        'Jacob Derrick leads every project personally. Chartered Engineer (CEng), Chartered Building Engineer (C.Build E) and Fellow of the Institution of Fire Engineers (FIFireE). 14+ years in fire engineering and construction.',
        'We carry professional indemnity and public liability insurance. We are BSI members, Safe Contractor approved and EAL qualified. We have experience working alongside major contractors and developers across residential, commercial and mixed-use schemes.',
      ],
    },
  ],
};

const BUILDING_OWNERS = {
  key: 'building-owners', crumb: 'Building Owners',
  title: 'Building Owners &amp; Housing Providers', plainTitle: 'Building Owners & Housing Providers',
  question: 'Can I defend these decisions to residents, members and the regulator?',
  ctaTitle: 'Discuss your building',
  ctaText: 'Tell us about your building and what you need.',
  expertise: ['protect', 'design'],
  bandTitle: 'Ready to discuss your building?',
  bandText: 'Independent, proportionate fire engineering advice for occupied buildings.',
  blocks: [
    {
      type: 'intro', eyebrow: 'Building owners &amp; registered providers',
      title: 'Independent advice you can stand behind.',
      paragraphs: [
        'Building owners and housing providers owe a legal duty of care to their residents and occupants. Since the introduction of the Building Safety Act, the personal obligations of accountable persons have sharpened considerably — and the consequences of poor advice or poorly documented decisions are serious.',
        'We provide independent fire engineering advice to building owners that is proportionate, clearly reasoned and documented in a way that stands up to scrutiny. Our advice is our own, informed by evidence and experience — not shaped by commercial relationships with contractors or product suppliers.',
      ],
    },
    {
      type: 'checklist', title: 'What we do for building owners',
      items: [
        'Fire risk assessments (Type 1–4)',
        'Fire Risk Appraisal of External Walls (FRAEW) — PAS 9980',
        'Building Safety Case preparation and review',
        'External wall system assessment and cladding advice',
        'Fire safety management framework and procedures',
        'Evacuation strategy review and update',
        'Responsible Person advisory support',
        'Remediation advice and prioritisation',
        'Lender and valuer technical support',
      ],
    },
    {
      type: 'figure',
      image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1400&auto=format&fit=crop&q=75',
      alt: 'Residential building',
    },
    {
      type: 'prose', title: 'EWS1 and lender acceptance',
      paragraphs: [
        'Where buildings require external wall assessment for mortgage purposes, we carry out FRAEW assessments to PAS 9980:2022. Our reports are clearly reasoned and evidenced, and written to be understood by lenders, valuers and the building owner — not just by fire engineers.',
        'Jacob Derrick leads every assessment personally and signs off on the report. We do not subcontract or delegate this work.',
      ],
    },
  ],
};

const MANAGING_AGENTS = {
  key: 'managing-agents', crumb: 'Managing Agents',
  title: 'Managing Agents', plainTitle: 'Managing Agents',
  question: 'What exactly must I do, and can I rely on this advice?',
  ctaTitle: 'Discuss your building',
  ctaText: 'Tell us what you manage and what you need.',
  expertise: ['protect'],
  bandTitle: 'Ready to talk about your buildings?',
  bandText: 'Clear, actionable fire safety advice that you can rely on.',
  blocks: [
    {
      type: 'intro', eyebrow: 'Property management',
      title: 'Clear advice. Clear actions. Clearly documented.',
      paragraphs: [
        'Managing agents carry significant fire-safety responsibilities that can feel personal, often without the technical background needed to critically assess specialist fire-engineering advice. We understand this position and tailor our advice accordingly.',
        'Our reports are written in plain English. They set out the lawful fire safety position, recommend appropriate action, and explain why it matters. We outline the priorities in the order they should be addressed. We do not produce fire risk assessments that leave you uncertain about what to do next, and we remain available for advice during the action plan works.',
      ],
    },
    {
      type: 'checklist', title: 'What we do for managing agents',
      items: [
        'Fire risk assessments — clear, actionable, prioritised',
        'Responsible Person advisory support and guidance',
        'Fire safety management system review and update',
        'Evacuation strategy review',
        'Common parts inspection and fire door assessment',
        'Follow-up and remediation progress review',
        'Resident communication support on fire safety matters',
        'Review of contractor fire safety work',
      ],
    },
    {
      type: 'figure',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&auto=format&fit=crop&q=75',
      alt: 'Building management office',
    },
    {
      type: 'prose', title: 'What good advice looks like',
      paragraphs: [
        'A fire risk assessment that is technically correct but practically unusable is not good advice. We produce assessments that tell you what needs to be done, why it needs to be done, what the risk is if it is not done, and what a proportionate response looks like.',
        'We are available after the report to answer questions and to help you communicate with leaseholders, freeholders and other parties. We do not disappear once the report is issued.',
      ],
    },
  ],
};

const LEGAL_TEAMS = {
  key: 'legal-teams', crumb: 'Legal Teams',
  title: 'Legal Teams', plainTitle: 'Legal Teams',
  question: 'Can I put this expert in front of a judge?',
  ctaTitle: 'Discuss an instruction',
  ctaText: 'Tell us about the matter and what you need from a fire engineering expert.',
  expertise: [],
  bandTitle: 'Ready to discuss an instruction?',
  bandText: 'Independent fire engineering expert witness — CPR Part 35 compliant.',
  bandCta: 'Get in touch',
  highlight: {
    eyebrow: 'Also listed under',
    title: 'Protect — in-use services',
    body: 'Expert witness is also available via the Protect phase, alongside FRAEW, fire risk assessments and building safety cases.',
    linkLabel: 'View Protect services',
    linkUrl: '/expertise/protect/',
  },
  blocks: [
    {
      type: 'feature', eyebrow: 'Specialist service',
      title: 'Expert witness work done properly.',
      paragraphs: [
        'Solicitors, barristers and legal teams that instruct fire-engineering experts need someone who understands CPR Part 35, can prepare evidence capable of withstanding rigorous scrutiny, and recognises that their overriding duty is to the court — not the instructing party.',
        'Jacob Derrick has acted as an expert witness in fire-engineering matters, including cladding and external-wall disputes, building-safety cases, fire cause-and-origin investigations and regulatory proceedings. His reports present complex engineering evidence clearly and impartially, enabling the court to understand the technical issues rather than obscuring them behind jargon.',
      ],
      footnote: '<p>This service is also listed under our <a href="/expertise/protect/">Protect phase</a> and can be reached via the service journey or the audience route.</p>',
    },
    {
      type: 'checklist', title: 'What we do for legal teams',
      items: [
        'Expert witness reports — CPR Part 35 compliant',
        'Single joint expert appointments',
        "Technical review of opposing expert's evidence",
        'Pre-action advice and causation assessment',
        'Cladding and external wall system disputes',
        'Building Safety Act liability matters',
        'Fire cause and origin assessment',
        'Regulatory and enforcement proceedings',
        'Mediation and arbitration support',
      ],
    },
    {
      type: 'prose', title: 'Independence and credibility',
      paragraphs: [
        'We are an independent practice with no commercial relationships with contractors, product manufacturers or management companies. Our opinions are our own, based on the evidence and the applicable technical standards. We will not move a position unless the evidence supports the move.',
        'Jacob is a Chartered Engineer (CEng), Chartered Building Engineer (C.Build E) and Fellow of the Institution of Fire Engineers (FIFireE). He has 14+ years of fire engineering and construction experience across residential, commercial and mixed-use buildings.',
      ],
    },
    {
      type: 'note', title: 'Available for urgent instructions',
      body: 'Where timescales are tight, we will always tell you whether we can meet them. We do not take on instructions we cannot deliver to the standard required.',
    },
  ],
};

const ARCHITECTS = {
  key: 'architects', crumb: 'Architects &amp; Principal Designers',
  title: 'Architects &amp; Principal Designers', plainTitle: 'Architects & Principal Designers',
  question: 'Does this fire engineer understand design intent — and will they help me discharge my Principal Designer obligations?',
  ctaTitle: 'Discuss your project',
  ctaText: 'Tell us about your scheme and what stage you are at.',
  expertise: ['innovate', 'design', 'build'],
  bandTitle: 'Ready to discuss your scheme?',
  bandText: 'Fire engineering that works with the design from the start.',
  blocks: [
    {
      type: 'intro', eyebrow: 'Design team',
      title: 'Fire engineering that integrates with your design, not against it.',
      paragraphs: [
        'Architects and Principal Designers need a fire engineer who understands the design intent, who can work within the concept rather than overriding it with prescriptive requirements, and who can produce fire strategies that are buildable.',
        'Under the Building Safety Act 2022, the Principal Designer has statutory obligations in relation to fire safety. We can work with you to understand those obligations, discharge them proportionately, and document what has been done.',
      ],
    },
    {
      type: 'checklist', title: 'What we do for architects and Principal Designers',
      items: [
        'Concept and design-stage fire strategy input',
        'Performance-based design and comparative assessment',
        'Fire engineering brief for the wider design team',
        'Principal Designer support under the Building Safety Act',
        'Gateway 1 and Gateway 2 fire safety documentation',
        'Design-stage peer review and technical check',
        'Smoke control, means of escape and compartmentation design',
        'Interface with structural and services engineers on fire requirements',
        'Design change assessment and Fire Safety Order compliance',
      ],
    },
    {
      type: 'figure',
      image: 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=1400&auto=format&fit=crop&q=75',
      alt: 'Architectural drawings and design',
    },
    {
      type: 'prose', title: 'Principal Designer obligations under the Building Safety Act',
      paragraphs: [
        'For Higher-Risk Buildings, the Principal Designer must coordinate fire safety design information throughout the design process and contribute to the Golden Thread.',
        'We can advise on what those obligations require in practice, produce the fire safety documentation needed to support Gateway submissions, and act as your technical resource on fire engineering throughout the design process.',
      ],
    },
    {
      type: 'note', title: 'We work with the design, not against it.',
      body: 'Our background includes working alongside architects on complex, performance-based schemes where the standard guidance does not fit. We understand what creative architecture demands of fire engineering, and we know how to find a solution that works for both.',
    },
  ],
};

const FACILITIES = {
  key: 'facilities-managers', crumb: 'Facilities &amp; Asset Managers',
  title: 'Facilities &amp; Asset Managers', plainTitle: 'Facilities & Asset Managers',
  question: "Is this building actually safe as it stands, and do I know what I'm responsible for?",
  ctaTitle: 'Discuss your portfolio',
  ctaText: 'Tell us about your buildings and the fire safety questions you are carrying.',
  expertise: ['protect', 'build'],
  bandTitle: 'Fire safety for the building you manage today.',
  bandText: 'Practical advice for facilities managers with statutory responsibilities.',
  blocks: [
    {
      type: 'intro', eyebrow: 'In-use buildings',
      title: 'Fire safety you can manage, evidence you can rely on.',
      paragraphs: [
        'Facilities and asset managers carry statutory responsibility for fire safety in occupied buildings under the Fire Safety Order 2005 and, where applicable, the Building Safety Act 2022. That responsibility is significant — and it requires more than a box-ticking exercise.',
        'We work with facilities and asset managers who want to understand what they own, what the fire risk is, and what they need to do about it — with evidence they can stand behind if challenged.',
      ],
    },
    {
      type: 'checklist', title: 'What we do for facilities and asset managers',
      items: [
        'Fire risk assessment — residential, commercial and mixed-use',
        'FRA review and upgrade where an existing assessment is deficient',
        'External wall system assessment (EWS1 / PAS 9980)',
        'FRAEW — Fire Risk Appraisal of External Walls',
        'Building safety case support for Higher-Risk Buildings',
        'Fire strategy review for in-use buildings',
        'Change of use and refurbishment fire engineering advice',
        'Fire door and compartmentation inspection',
        'Planned maintenance and remediation scope advice',
        'Client Guardian — client-side technical oversight during works',
      ],
    },
    {
      type: 'figure',
      image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1400&auto=format&fit=crop&q=75',
      alt: 'Building systems and facilities management',
    },
    {
      type: 'feature-slim', eyebrow: 'Key service',
      title: 'FRAEW &amp; EWS1 — external wall assessment',
      paragraphs: [
        'For residential buildings with external wall systems, FRAEW and EWS1 assessments are increasingly required by lenders, residents and regulators. We carry out these assessments to PAS 9980 and can advise on remediation options where deficiencies are found.',
      ],
      link: { label: 'View our Protect phase services', url: '/expertise/protect/' },
    },
    {
      type: 'prose', title: 'An ongoing fire safety relationship',
      paragraphs: [
        'Buildings change over time — tenants move, uses change, alterations are made, maintenance lapses. We can be your standing fire engineering resource, advising on changes before they create problems, reviewing fire risk assessments as they fall due, and acting as your technical point of contact when questions arise.',
        'For clients managing multiple assets, we can provide portfolio-level support — systematic risk assessment, consistent advice, and a single engineering point of contact across your estate.',
      ],
    },
  ],
};

module.exports = {
  pages: [DEVELOPERS, BUILDING_OWNERS, MANAGING_AGENTS, LEGAL_TEAMS, ARCHITECTS, FACILITIES]
    .map(audiencePage),
};
