/** How We Work — process, principles and fee transparency. */

const b = require('../builder');
const { CONTACT, ICON, sectionHeading, ctaBand } = require('../partials');

const PRACTICE_POINTS = [
  'One point of contact, start to finish',
  'Written scope and clearly defined fee — retainers available where appropriate',
  'Senior, Chartered oversight on every project',
  'Reports written to be understood, not impressed',
  'Direct access — no internal process to navigate',
];

const STEPS = [
  { num: '01', heading: 'A direct conversation first.',
    body: 'We start every engagement with a short call — no forms, no sales process. We want to understand the project before we say whether we are the right people for it. If we are not, we will say so.' },
  { num: '02', heading: 'A clear scope and fee.',
    body: 'We provide a written scope of services and a clearly defined fee. Retainer arrangements are available where they suit the client. What we do not do is leave the arrangement ambiguous — you know what you are getting before we start.' },
  { num: '03', heading: 'Senior oversight throughout.',
    body: 'Every project carries senior, Chartered oversight. Jacob stays involved in and in touch with every commission — not just the complex ones. Every deliverable is reviewed, signed off and stood behind at the level the project demands.' },
  { num: '04', heading: 'Clear, written advice.',
    body: 'Our reports and strategies are written to be understood — by contractors, building control officers, lenders and regulators, not just other fire engineers. If it cannot be explained clearly, it has not been understood clearly.' },
  { num: '05', heading: 'Available when you need us.',
    body: 'We are a small practice, which means you deal with us directly. Queries on site, questions from building control, last-minute design changes — we respond quickly because there is no internal process to navigate.' },
  { num: '06', heading: 'Transparent if something changes.',
    body: 'If scope changes, we tell you before we absorb the cost or issue an unexpected invoice. If the engineering position shifts, we explain why. No surprises.' },
];

const PRINCIPLES = [
  { label: 'Proportionate', desc: 'We do not over-engineer. A fire strategy should be as complex as the building demands — no more.' },
  { label: 'Defensible',    desc: 'Every recommendation we make is one we can stand behind — in front of a regulator, a judge or a lender.' },
  { label: 'Buildable',     desc: 'We come from construction. Our advice accounts for how buildings actually go together, not just how they look on a drawing.' },
  { label: 'Grounded',      desc: 'We use performance-based methods where they serve the project. We do not use them to avoid accountability.' },
];

const FAQS = [
  { q: 'Do you work on fixed fees?',
    a: 'Yes, wherever the scope allows it. For clearly defined pieces of work — a fire strategy, a FRAEW assessment, a fire risk assessment — we quote a fixed fee. Retainer arrangements are available where they suit the client. What we do not offer is ambiguity — the arrangement is always clear before we begin.' },
  { q: 'Do you work outside Portsmouth?',
    a: 'Yes. We are based in Portsmouth but work across the UK. Site visits, inspections and meetings are charged at cost; desk-based work — strategies, reports, advisory support — is location-agnostic.' },
  { q: 'How quickly can you turn work around?',
    a: 'It depends on what you need and our current commitments. We will always be straight with you about availability. If we cannot meet your timescale, we will say so at the first conversation — not after you have instructed us.' },
];

module.exports = {
  slug: 'how-we-work',
  title: 'Coeus — How We Work',
  type: 'content',

  build() {
    return [
      /* ── Hero (flat Abyss — no photography in this design) ──────────── */
      b.section(['c-page-hero'], [
        b.block(['c-page-hero__inner'], [
          b.block(['c-breadcrumb'], [
            b.el('text-basic', {
              classes: ['c-breadcrumb__link'],
              settings: { text: 'Home', tag: 'a', link: { type: 'external', url: '/' } },
            }),
            b.text([], '/', 'span'),
            b.text(['c-breadcrumb__current'], 'How We Work', 'span'),
          ]),
          b.heading(['c-page-hero__title'], 'How We Work', 'h1'),
          b.text(['c-page-hero__lead'], 'Clear process, direct relationships, no surprises.'),
        ]),
      ], { label: 'Hero' }),

      /* ── 01 Small practice ──────────────────────────────────────────── */
      b.section(['l-section', 'l-section--white', 'l-section--border-b'], [
        b.container(['l-container'], [
          b.block(['l-grid', 'l-grid--7-5', 'l-grid--top'], [
            b.block([], [
              sectionHeading({ num: '01', title: 'We are a small practice, deliberately so.', small: true }),
              b.block(['l-stack', 'l-stack--md'], [
                b.text(['c-prose'], "Coeus Technical takes on fewer projects than we could. That is a deliberate choice. It means every client gets a senior engineer's full attention — not a junior working to a template, not a tick-box exercise, not advice that arrives three weeks after you needed it."),
                b.text(['c-prose'], 'Every engagement starts with a short call. No forms, no sales process. We want to understand the project before we say whether we are the right people for it — and if we are not, we will tell you that at the outset, not after you have instructed us.'),
              ]),
            ]),
            b.block(['c-card', 'c-card--muted', 'c-card--pad-lg'], [
              b.text(['c-card__title'], 'What this means in practice'),
              b.block(['c-bullets', 'u-mt-md'],
                PRACTICE_POINTS.map((point) => b.text(['c-bullets__item'], point, 'span'))),
            ]),
          ]),
        ]),
      ], { label: '01 Small practice' }),

      /* ── 02 Six steps ───────────────────────────────────────────────── */
      b.section(['l-section', 'l-section--lg', 'l-section--muted', 'l-section--border-b'], [
        b.container(['l-container'], [
          sectionHeading({ num: '02', title: 'What working with us looks like.', small: true }),
          b.block(['l-grid', 'l-grid--3', 'l-grid--gap-md'],
            STEPS.map((step) =>
              b.block(['c-step-card'], [
                b.text(['c-step-card__num'], step.num),
                b.heading(['c-step-card__title'], step.heading, 'h3'),
                b.text(['c-prose'], step.body),
              ])
            )
          ),
        ]),
      ], { label: '02 Steps' }),

      /* ── 03 Principles ──────────────────────────────────────────────── */
      b.section(['l-section', 'l-section--lg', 'l-section--white', 'l-section--border-b'], [
        b.container(['l-container'], [
          sectionHeading({ num: '03', title: 'Four words that shape every piece of advice we give.', small: true }),
          b.block(['l-grid', 'l-grid--4', 'l-grid--gap-md'],
            PRINCIPLES.map((principle) =>
              b.block(['c-principle'], [
                b.block(['c-rule', 'c-rule--sm'], []),
                b.heading(['c-step-card__title', 'u-mt-lg'], principle.label, 'h3'),
                b.text(['c-prose'], principle.desc),
              ])
            )
          ),
        ]),
      ], { label: '03 Principles' }),

      /* ── 04 Fees ────────────────────────────────────────────────────── */
      b.section(['l-section', 'l-section--lg', 'l-section--muted', 'l-section--border-b'], [
        b.container(['l-container'], [
          b.block(['l-grid', 'l-grid--split', 'l-grid--top'], [
            b.block([], [
              b.text(['c-label'], 'On fees'),
              b.heading(['c-section-heading__title', 'c-section-heading__title--sm'],
                'We are not the cheapest, and we do not try to be.', 'h2'),
              b.block(['c-rule', 'u-mb-lg'], []),
              b.block(['l-stack', 'l-stack--md'], [
                b.text(['c-prose'], 'Clients come to us when the financial, legal or life-safety stakes are too high for anything less than expert advice. Our fees reflect that — senior time, proper thought and advice that holds up.'),
                b.text(['c-prose'], 'We provide fixed fees for defined scopes and clearly bounded estimates where scope may vary. We do not do loss-leaders, race-to-the-bottom tenders or fees that assume junior delivery. If our fee is not right for the project, we will tell you directly rather than win the job and cut corners to make the numbers work.'),
              ]),
            ]),
            b.block(['c-faq'],
              FAQS.map((faq) =>
                b.block(['c-faq__item'], [
                  b.text(['c-faq__question'], faq.q),
                  b.text(['c-prose'], faq.a),
                ])
              )
            ),
          ]),
        ]),
      ], { label: '04 Fees' }),

      /* ── CTA ────────────────────────────────────────────────────────── */
      ctaBand({
        title: 'Ready to start a conversation?',
        lead: 'Tell us about your project and we will come back to you with a clear view of whether we are the right fit — and what it would cost.',
        tone: 'dark',
        actions: [
          { classes: ['c-btn', 'c-btn--white'], label: 'Discuss a project', url: '/contact/' },
          { classes: ['c-btn', 'c-btn--outline-light'], label: CONTACT.phone, url: CONTACT.phoneHref, icon: ICON.phone },
        ],
      }),
    ];
  },
};
