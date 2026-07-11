/**
 * Site content as typed constants. Icon names refer to <symbol> ids defined
 * in the SVG sprite in app.html.
 */

export interface Service {
  slug: string;
  icon: string;
  image: string;
  title: string;
  summary: string;
  features: string[];
}

export interface Stat {
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
}

export interface Milestone {
  year: string;
  title: string;
  text: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface ValueItem {
  icon: string;
  title: string;
  text: string;
}

export interface ProcessStep {
  title: string;
  text: string;
}

export const SERVICES: Service[] = [
  {
    slug: 'managed-it',
    image: '/images/support.webp',
    icon: 'headset',
    title: 'Managed IT Support',
    summary:
      'Proactive monitoring, maintenance and helpdesk for your entire IT estate, so problems are fixed before your team notices them.',
    features: [
      '24/7 monitoring and alerting',
      'Unlimited remote and on-site helpdesk',
      'Patch management and asset lifecycle',
      'SLA-backed response times',
    ],
  },
  {
    slug: 'cloud',
    image: '/images/datacenter.webp',
    icon: 'cloud',
    title: 'Cloud Solutions',
    summary:
      'Migration, architecture and cost optimization across AWS, Azure and Google Cloud — from a single workload to your whole datacenter.',
    features: [
      'Cloud readiness assessment and migration',
      'Hybrid and multi-cloud architecture',
      'Infrastructure as code and automation',
      'FinOps cost monitoring and optimization',
    ],
  },
  {
    slug: 'cybersecurity',
    image: '/images/security.webp',
    icon: 'shield',
    title: 'Cybersecurity',
    summary:
      'Layered defense that keeps your data, endpoints and people safe, with compliance support for the standards your industry demands.',
    features: [
      'Security audits and penetration testing',
      'Endpoint protection and zero-trust access',
      'Employee security awareness training',
      'SOC 2, ISO 27001 and GDPR compliance',
    ],
  },
  {
    slug: 'software',
    image: '/images/code.webp',
    icon: 'code',
    title: 'Custom Software Development',
    summary:
      'Web, mobile and integration projects delivered by senior engineers — built to fit your workflows instead of forcing you into someone else’s.',
    features: [
      'Web and mobile application development',
      'API design and system integration',
      'Legacy application modernization',
      'Dedicated delivery teams',
    ],
  },
  {
    slug: 'consulting',
    image: '/images/meeting.webp',
    icon: 'compass',
    title: 'IT Consulting & Strategy',
    summary:
      'A virtual CIO on your side: technology roadmaps, vendor selection and budgeting that align IT investment with business goals.',
    features: [
      'Technology roadmaps and vCIO services',
      'Vendor evaluation and procurement',
      'IT budgeting and governance',
      'Digital transformation programs',
    ],
  },
  {
    slug: 'data',
    image: '/images/analytics.webp',
    icon: 'chart',
    title: 'Data & Analytics',
    summary:
      'Turn scattered data into decisions with modern pipelines, warehousing and dashboards your whole company can actually use.',
    features: [
      'Data warehousing and ETL pipelines',
      'Business intelligence dashboards',
      'Data governance and quality',
      'Machine learning and AI enablement',
    ],
  },
];

export const STATS: Stat[] = [
  { value: 12, suffix: '+', label: 'Years in business' },
  { value: 340, suffix: '+', label: 'Projects delivered' },
  { value: 99.9, decimals: 1, suffix: '%', label: 'Uptime guaranteed' },
  { value: 24, suffix: '/7', label: 'Support coverage' },
];

export const MILESTONES: Milestone[] = [
  {
    year: '2014',
    title: 'Somniation founded',
    text: 'Three engineers, one rented office and a promise: enterprise-grade IT for companies that aren’t enterprises yet.',
  },
  {
    year: '2017',
    title: 'First 100 clients',
    text: 'Our managed services practice crosses 100 active clients and we open our second office.',
  },
  {
    year: '2020',
    title: 'Cloud & security practices launch',
    text: 'Dedicated cloud migration and cybersecurity teams form as remote work reshapes what clients need.',
  },
  {
    year: '2023',
    title: 'ISO 27001 certified',
    text: 'Our own operations are certified to the same standard we help clients achieve.',
  },
  {
    year: '2026',
    title: 'Today',
    text: '60+ specialists supporting clients across three continents — still answering the phone on the second ring.',
  },
];

export const VALUES: ValueItem[] = [
  {
    icon: 'star',
    title: 'Dream big, ship real',
    text: 'Our name comes from somnium — dream. We chase ambitious ideas, then turn them into systems that run in production.',
  },
  {
    icon: 'shield',
    title: 'Security first',
    text: 'Every solution we deliver is designed with security in mind from the first whiteboard sketch, not bolted on later.',
  },
  {
    icon: 'users',
    title: 'People over tickets',
    text: 'Behind every ticket is a person trying to get work done. We measure ourselves on their day, not our queue.',
  },
  {
    icon: 'check',
    title: 'Radical transparency',
    text: 'Plain-language reporting, honest timelines and pricing without asterisks. If something goes wrong, you hear it from us first.',
  },
];

export const PROCESS: ProcessStep[] = [
  {
    title: 'Discover',
    text: 'We audit your current environment, listen to your team and map the gaps between where you are and where you want to be.',
  },
  {
    title: 'Design',
    text: 'You get a clear roadmap with architecture, timeline and a fixed budget — no surprises, no jargon.',
  },
  {
    title: 'Deliver',
    text: 'Senior engineers execute in short, visible iterations with progress you can check any day of the week.',
  },
  {
    title: 'Support',
    text: 'After launch we monitor, maintain and keep improving, backed by SLAs and a helpdesk that actually helps.',
  },
];

export const TECH_PARTNERS: string[] = [
  'AWS',
  'Microsoft Azure',
  'Google Cloud',
  'Kubernetes',
  'Cisco',
  'VMware',
];

export const FAQS: Faq[] = [
  {
    question: 'How quickly can you take over our IT support?',
    answer:
      'A typical onboarding takes two to four weeks. We run discovery, document your environment and shadow your current provider (if any) so the handover is invisible to your staff.',
  },
  {
    question: 'Do you work with small businesses or only enterprises?',
    answer:
      'Both. Most of our clients are companies with 20–500 employees. Our plans scale by seat and by service, so you only pay for what you actually use.',
  },
  {
    question: 'What are your support hours and response times?',
    answer:
      'Our monitoring runs 24/7 and critical incidents are answered around the clock. Standard helpdesk hours are 7am–7pm on business days, with SLA-backed response times from 15 minutes for critical issues.',
  },
  {
    question: 'Can you help with compliance requirements?',
    answer:
      'Yes. We regularly guide clients through SOC 2, ISO 27001, GDPR and HIPAA programs — from gap assessment to audit support — and we hold ISO 27001 certification ourselves.',
  },
  {
    question: 'Do we have to sign a long-term contract?',
    answer:
      'No. Managed services run month-to-month after an initial three-month period. Project work is quoted with a fixed scope and price. We keep clients by being good, not by locking them in.',
  },
];

// Contact details intentionally do not live here as plaintext: they are
// obfuscated and decoded browser-side in ContactInfoService so crawlers
// and harvesters never see them. Keep them out of this file.
