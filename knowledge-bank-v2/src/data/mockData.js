export const TOPICS_TEMPLATE = [
  {
    id: 'topic-brand-positioning',
    name: 'Brand Positioning',
    subtitle: 'Promise, pillars, differentiation',
    aiSummary:
      'Client consistently positions around craftsmanship and trust. Premium-yet-approachable tone across all markets.',
    facts: [
      {
        id: 'f1',
        text: "Reinforces positioning around 'DEI media brief v1' — anchor on craftsmanship and trust.",
        priority: 'High',
        source: 'DEI media brief v1.pdf',
        tags: ['#brand'],
      },
      {
        id: 'f2',
        text: 'Positioned as the premium-yet-approachable choice; promise of effortless craft.',
        priority: 'High',
        source: 'manual',
        tags: ['#brand', '#positioning'],
      },
    ],
  },
  {
    id: 'topic-target-audience',
    name: 'Target Audience',
    subtitle: 'Segments, personas, behaviours',
    aiSummary:
      'Core audience skews urban professional 28–44. Emerging sub-segment of younger design-conscious buyers identified in recent brief.',
    facts: [
      {
        id: 'f3',
        text: 'Core audience: 28–44, urban professionals, household income $90k+, design-conscious.',
        priority: 'High',
        source: 'manual',
        tags: ['#brand'],
      },
      {
        id: 'f4',
        text: "Reference document highlights an emerging sub-audience surfaced in 'DEI media brief v1'.",
        priority: 'Medium',
        source: 'DEI media brief v1.pdf',
        tags: [],
      },
    ],
  },
  {
    id: 'topic-media-mix',
    name: 'Media Mix Preferences',
    subtitle: 'Channel priorities, budget split',
    aiSummary:
      'Strong preference for video and digital display. Search is mandatory. Out-of-home used selectively for awareness campaigns.',
    facts: [
      {
        id: 'f5',
        text: 'Video channels consistently outperform display in brand recall metrics across Q3 and Q4 2024.',
        priority: 'High',
        source: 'industry_benchmarks_q4.pdf',
        tags: ['#media', '#video'],
      },
      {
        id: 'f6',
        text: 'Search is a mandatory inclusion in every campaign due to high-intent audience capture.',
        priority: 'Medium',
        source: 'manual',
        tags: ['#search'],
      },
    ],
  },
];

const makeSectionTopics = (section) => {
  const prefixes = {
    global: 'Across all markets, ',
    market: 'In this market, ',
    client: 'For this client, ',
    brand: 'For this brand, ',
  };
  const prefix = prefixes[section] || '';
  return TOPICS_TEMPLATE.map((topic, ti) => ({
    ...topic,
    id: `${section}-${topic.id}`,
    aiSummary: prefix + topic.aiSummary.charAt(0).toLowerCase() + topic.aiSummary.slice(1),
    facts: topic.facts.map((f, fi) => ({
      ...f,
      id: `${section}-${f.id}`,
    })),
  }));
};

export const INITIAL_KNOWLEDGE = {
  global: makeSectionTopics('global'),
  market: makeSectionTopics('market'),
  client: makeSectionTopics('client'),
  brand: makeSectionTopics('brand'),
};

export const MOCK_FILES = [
  {
    id: 'file-1',
    name: 'global_media_trends_2024.pdf',
    date: '12 Jan 2026',
    author: 'Anna K.',
  },
  {
    id: 'file-2',
    name: 'industry_benchmarks_q4.pdf',
    date: '3 Mar 2026',
    author: 'Anna K.',
  },
];

export const MOCK_PLANS_US = [
  {
    id: '1',
    name: 'Q1 2026 Brand Awareness',
    brand: 'Alpha Brand',
    period: 'Jan 2026 – Mar 2026',
    created: '5 Jan 2026',
  },
  {
    id: '2',
    name: 'Q2 2026 Performance Drive',
    brand: 'Beta Product',
    period: 'Apr 2026 – Jun 2026',
    created: '20 Mar 2026',
  },
  {
    id: '3',
    name: 'Summer Seasonal Push',
    brand: 'Alpha Brand',
    period: 'Jun 2026 – Aug 2026',
    created: '1 Apr 2026',
  },
  {
    id: '4',
    name: 'Back to School 2026',
    brand: 'Gamma Line',
    period: 'Jul 2026 – Sep 2026',
    created: '15 Apr 2026',
  },
  {
    id: '5',
    name: 'Holiday 2026 Campaign',
    brand: 'Beta Product',
    period: 'Oct 2026 – Dec 2026',
    created: '1 May 2026',
  },
];

export const MOCK_PLANS_GLOBAL = [
  {
    id: 'g1',
    name: 'Global Brand Launch 2026',
    markets: 'US, UK, DE, FR',
    brand: 'Alpha Brand',
    period: 'Jan 2026 – Jun 2026',
    created: '10 Dec 2025',
  },
  {
    id: 'g2',
    name: 'EMEA Expansion Campaign',
    markets: 'UK, DE, FR, PL',
    brand: 'Gamma Line',
    period: 'Mar 2026 – Sep 2026',
    created: '15 Feb 2026',
  },
  {
    id: 'g3',
    name: 'Global Holiday 2026',
    markets: 'US, UK, DE, FR, PL',
    brand: 'Beta Product',
    period: 'Oct 2026 – Dec 2026',
    created: '1 May 2026',
  },
];

export const COPILOT_MESSAGES = [
  {
    id: 'cm1',
    text: 'Based on the client brief and historical data, I recommend allocating 45% of budget to video channels — they outperformed display by 32% in brand recall last year.',
    sources: [
      {
        level: 'Global',
        quote: 'Video channels outperformed display in 2024 across all markets — brand recall lift of +32%.',
        topicId: 'client-topic-media-mix',
        section: 'client',
      },
      {
        level: 'Client',
        quote: "Positioned as premium-yet-approachable; promise of effortless craft.",
        topicId: 'client-topic-brand-positioning',
        section: 'client',
      },
    ],
  },
  {
    id: 'cm2',
    text: 'Search should be included as a mandatory channel — the core audience (urban professionals 28–44) shows high purchase intent via search queries.',
    sources: [
      {
        level: 'Client',
        quote: 'Core audience: 28–44, urban professionals, household income $90k+, design-conscious.',
        topicId: 'client-topic-target-audience',
        section: 'client',
      },
      {
        level: 'Media Plan',
        quote: 'Brief: target audience Millennials 18–34, urban, design-conscious…',
        topicId: null,
        section: null,
        fromBrief: true,
      },
    ],
  },
  {
    id: 'cm3',
    text: 'Brand positioning should reinforce craftsmanship and trust across all creative executions. Premium-yet-approachable tone is the proven anchor for this client.',
    sources: [
      {
        level: 'Global',
        quote: "Global benchmark confirms 'craftsmanship + trust' drives +18% brand preference lift.",
        topicId: 'global-topic-brand-positioning',
        section: 'global',
      },
      {
        level: 'Client',
        quote: "Reinforces positioning around 'DEI media brief v1' — anchor on craftsmanship and trust.",
        topicId: 'client-topic-brand-positioning',
        section: 'client',
      },
    ],
  },
];
