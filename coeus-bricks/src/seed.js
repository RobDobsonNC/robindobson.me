/**
 * Seed content.
 *
 * The Figma source hard-codes the case study and insight cards. Those became
 * query loops here, which would leave both pages blank on a fresh import — so
 * the designed entries ship as CPT posts. The importer creates them once and
 * never touches them again, so client edits are safe.
 */

const caseStudies = [
  {
    title: 'Gateway 2 approval secured for 14-storey residential block',
    excerpt: 'Performance-based fire strategy prepared for a Higher-Risk Building under the Building Safety Act. Full Gateway 2 submission prepared and approved by the Building Safety Regulator.',
    service: 'Fire Strategy & Design',
    meta: { coeus_location: 'Southampton, Hampshire' },
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'FRAEW report that unblocked lender funding for 48-flat scheme',
    excerpt: "External wall assessment to PAS 9980:2022. Clearly evidenced report accepted by the lender's valuer, enabling mortgage transactions to proceed across the block.",
    service: 'PAS 9980 Assessment',
    meta: { coeus_location: 'Portsmouth, Hampshire' },
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Technical report accepted by court in cladding liability dispute',
    excerpt: 'CPR Part 35 expert witness report on external wall system specification and fire performance. Evidence accepted by the court; matter settled at mediation.',
    service: 'Expert Witness',
    meta: { coeus_location: 'England' },
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Construction-stage fire engineering support on 220-unit residential scheme',
    excerpt: 'Ongoing site support including compartmentation inspections, design change reviews and Regulation 38 handover documentation for a large mixed-tenure residential development.',
    service: 'Construction Support',
    meta: { coeus_location: 'Hampshire' },
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Fire risk assessment programme for mixed-use commercial portfolio',
    excerpt: 'Type 1 and Type 2 assessments across 12 managed commercial and residential properties. Prioritised action plans produced for each building.',
    service: 'Fire Risk Assessment',
    meta: { coeus_location: 'South of England' },
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Building Safety Case preparation for occupied Higher-Risk Building',
    excerpt: 'Safety case preparation for an occupied HRB under the Building Safety Act. Evidence gathering, gap analysis and resident engagement support.',
    service: 'Building Safety Act',
    meta: { coeus_location: 'Hampshire' },
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&auto=format&fit=crop&q=80',
  },
];

const insights = [
  {
    title: 'Gateway 2: what fire engineers need to submit, and why it matters',
    excerpt: 'A clear account of what the Building Safety Regulator expects at Gateway 2, how the assessment process works in practice, and where applications typically run into difficulty.',
    topic: 'Building Safety Act',
    date: '2025-06-15',
    meta: { coeus_reading_time: '8 min read' },
  },
  {
    title: 'What makes a good FRAEW report — and why lenders reject the weak ones',
    excerpt: 'PAS 9980:2022 sets out the framework for external wall assessment. But the quality of reports varies enormously. This piece looks at what makes a FRAEW report credible and defensible.',
    topic: 'PAS 9980',
    date: '2025-04-15',
    meta: { coeus_reading_time: '6 min read' },
  },
  {
    title: 'Performance-based fire engineering: when it helps, and when it does not',
    excerpt: 'Performance-based design offers genuine opportunities for better, more proportionate fire strategies. It is also sometimes used to justify shortcuts. Understanding the difference matters.',
    topic: 'Fire Strategy',
    date: '2025-02-15',
    meta: { coeus_reading_time: '7 min read' },
  },
  {
    title: 'The Golden Thread: what it is, what you need to do, and how it works in practice',
    excerpt: 'The Golden Thread is a legal requirement for Higher-Risk Buildings. This piece explains what it means practically — what information to capture, how to maintain it, and who is responsible.',
    topic: 'Building Safety Act',
    date: '2024-12-15',
    meta: { coeus_reading_time: '9 min read' },
  },
  {
    title: 'Responsible Persons: what the Fire Safety (England) Regulations 2022 actually require',
    excerpt: 'The 2022 regulations introduced new duties for responsible persons in residential buildings. This piece cuts through the guidance to explain what you actually need to do.',
    topic: 'Fire Risk Assessment',
    date: '2024-10-15',
    meta: { coeus_reading_time: '5 min read' },
  },
  {
    title: 'CPR Part 35 and fire engineering evidence: common errors and how to avoid them',
    excerpt: 'Expert witness reports in fire engineering matters are sometimes prepared without proper regard for CPR Part 35. The consequences can be serious — for the expert and the instructing party.',
    topic: 'Expert Witness',
    date: '2024-08-15',
    meta: { coeus_reading_time: '6 min read' },
  },
];

module.exports = {
  posts: [
    ...caseStudies.map((cs) => ({
      post_type: 'case_study',
      title: cs.title,
      excerpt: cs.excerpt,
      content: '',
      terms: { service: [cs.service] },
      meta: cs.meta,
      remote_image: cs.image,
    })),
    ...insights.map((post) => ({
      post_type: 'insight',
      title: post.title,
      excerpt: post.excerpt,
      content: '',
      date: post.date,
      terms: { insight_topic: [post.topic] },
      meta: post.meta,
    })),
  ],
};
