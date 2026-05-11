
export const INITIAL_KNOWLEDGE = {
  global: [
    {
      id: 'global-topic-industry-benchmarks',
      name: 'Industry Benchmarks',
      subtitle: 'Cross-market performance standards',
      aiSummary: 'Video consistently leads on brand recall globally (+32% vs display). CPC benchmarks vary widely by region — EMEA averages 18% higher than North America.',
      facts: [
        {
          id: 'global-f1',
          text: 'Video channels outperformed display in brand recall by +32% across all tracked markets in 2024.',
          priority: 'High',
          source: 'industry_benchmarks_q4.pdf',
          tags: ['#video', '#benchmarks'],
        },
        {
          id: 'global-f2',
          text: 'Average click-through rate for premium display formats is 0.35% globally; native ads average 0.8%.',
          priority: 'Medium',
          source: 'global_media_trends_2024.pdf',
          tags: ['#display', '#benchmarks'],
        },
        {
          id: 'global-f3',
          text: 'Connected TV (CTV) inventory grew 41% YoY across US, UK and DACH markets.',
          priority: 'Medium',
          source: 'global_media_trends_2024.pdf',
          tags: ['#ctv', '#trends'],
        },
      ],
    },
    {
      id: 'global-topic-digital-trends',
      name: 'Digital Trends',
      subtitle: 'Emerging channels, formats, tech',
      aiSummary: 'Retail media and CTV are the two fastest-growing channels globally. AI-driven creative personalisation is becoming a standard expectation in RFPs.',
      facts: [
        {
          id: 'global-f4',
          text: 'Retail media ad spend is projected to surpass linear TV globally by Q3 2027 (source: GroupM forecast).',
          priority: 'High',
          source: 'global_media_trends_2024.pdf',
          tags: ['#retail-media', '#forecast'],
        },
        {
          id: 'global-f5',
          text: 'Short-form video (under 15s) drives 2.4× higher completion rates than 30s pre-roll on mobile.',
          priority: 'Medium',
          source: 'industry_benchmarks_q4.pdf',
          tags: ['#video', '#mobile'],
        },
      ],
    },
    {
      id: 'global-topic-audience-insights',
      name: 'Audience Insights',
      subtitle: 'Global segments and behaviours',
      aiSummary: 'Gen Z media consumption is highly fragmented across 6+ platforms. Cross-device attribution remains the top measurement challenge cited by global clients.',
      facts: [
        {
          id: 'global-f6',
          text: 'Gen Z (18–26) spends an average of 4.2h/day on mobile — 58% on social video platforms.',
          priority: 'High',
          source: 'global_media_trends_2024.pdf',
          tags: ['#genz', '#mobile'],
        },
        {
          id: 'global-f7',
          text: 'Cookie deprecation has accelerated first-party data strategies — 67% of global advertisers now have a formal 1PD programme.',
          priority: 'Medium',
          source: 'industry_benchmarks_q4.pdf',
          tags: ['#data', '#privacy'],
        },
      ],
    },
  ],

  market: [
    {
      id: 'market-topic-market-landscape',
      name: 'Market Landscape',
      subtitle: 'Local media environment & dynamics',
      aiSummary: 'US digital ad market is the most competitive globally. Programmatic accounts for 91% of display spend. Linear TV is declining but still relevant for broad reach.',
      facts: [
        {
          id: 'market-f1',
          text: 'US programmatic display accounts for 91% of total digital display spend in 2025 (eMarketer).',
          priority: 'High',
          source: 'industry_benchmarks_q4.pdf',
          tags: ['#programmatic', '#us'],
        },
        {
          id: 'market-f2',
          text: 'Linear TV viewership declined 9% YoY in the US but still reaches 72% of adults 35+ weekly.',
          priority: 'Medium',
          source: 'global_media_trends_2024.pdf',
          tags: ['#tv', '#reach'],
        },
        {
          id: 'market-f3',
          text: 'Amazon Ads is now the #3 digital ad platform in the US, capturing 14.6% of digital ad revenue.',
          priority: 'Low',
          source: 'industry_benchmarks_q4.pdf',
          tags: ['#retail-media', '#us'],
        },
      ],
    },
    {
      id: 'market-topic-local-audience',
      name: 'Local Audience Profile',
      subtitle: 'US consumer behaviour & media habits',
      aiSummary: 'US consumers are highly receptive to personalised advertising. Hispanic and multicultural segments are fastest-growing and underserved by most media plans.',
      facts: [
        {
          id: 'market-f4',
          text: 'Hispanic adults in the US consume 30% more digital video than the general population average.',
          priority: 'High',
          source: 'global_media_trends_2024.pdf',
          tags: ['#audience', '#diversity'],
        },
        {
          id: 'market-f5',
          text: '62% of US adults say they prefer personalised ads over generic ones when the data use is transparent.',
          priority: 'Medium',
          source: 'manual',
          tags: ['#personalisation', '#trust'],
        },
      ],
    },
    {
      id: 'market-topic-competitive-activity',
      name: 'Competitive Activity',
      subtitle: 'Category spend & share of voice',
      aiSummary: 'Main competitor increased digital share of voice by 12pp in Q4 2025. Premium lifestyle category spend is up 18% YoY, with strong OOH investment in urban centres.',
      facts: [
        {
          id: 'market-f6',
          text: "Key competitor 'LuxeCraft' grew digital SOV from 22% to 34% in Q4 2025, primarily via YouTube and CTV.",
          priority: 'High',
          source: 'manual',
          tags: ['#competitive', '#sov'],
        },
        {
          id: 'market-f7',
          text: 'Premium lifestyle category total ad spend in the US grew 18% YoY to $2.4B in 2025.',
          priority: 'Medium',
          source: 'industry_benchmarks_q4.pdf',
          tags: ['#category', '#spend'],
        },
      ],
    },
  ],

  client: [
    {
      id: 'client-topic-brand-positioning',
      name: 'Brand Positioning',
      subtitle: 'Promise, pillars, differentiation',
      aiSummary: 'Client positions around craftsmanship and trust. Premium-yet-approachable tone is the proven anchor. Avoid aggressive price messaging — it conflicts with brand equity.',
      facts: [
        {
          id: 'client-f1',
          text: "Core brand promise: 'effortless craft' — reinforced in every touchpoint from DEI media brief v1.",
          priority: 'High',
          source: 'DEI media brief v1.pdf',
          tags: ['#brand', '#positioning'],
        },
        {
          id: 'client-f2',
          text: 'Avoid price-led messaging in any channel — client research shows it reduces brand preference by 11pts.',
          priority: 'High',
          source: 'manual',
          tags: ['#brand', '#rules'],
        },
        {
          id: 'client-f3',
          text: 'Brand colour palette: midnight navy + warm gold. Never use red — reserved for a competitor.',
          priority: 'Low',
          source: 'DEI media brief v1.pdf',
          tags: ['#creative', '#identity'],
        },
      ],
    },
    {
      id: 'client-topic-target-audience',
      name: 'Target Audience',
      subtitle: 'Approved segments and personas',
      aiSummary: 'Primary: urban professionals 28–44, HHI $90k+. Secondary: aspirational 22–27 segment growing fast. Client has explicit opt-out from targeting under-18s on any platform.',
      facts: [
        {
          id: 'client-f4',
          text: 'Primary target: 28–44, urban professionals, HHI $90k+, high design affinity — signed off in annual brief.',
          priority: 'High',
          source: 'DEI media brief v1.pdf',
          tags: ['#audience', '#approved'],
        },
        {
          id: 'client-f5',
          text: 'Client mandates zero targeting of users under 18 across all platforms, including contextual.',
          priority: 'High',
          source: 'manual',
          tags: ['#compliance', '#audience'],
        },
        {
          id: 'client-f6',
          text: 'Secondary emerging segment: aspirational 22–27 design-conscious buyers — approved for test-and-learn budget in H2 2026.',
          priority: 'Medium',
          source: 'DEI media brief v1.pdf',
          tags: ['#audience', '#emerging'],
        },
      ],
    },
    {
      id: 'client-topic-historical-performance',
      name: 'Historical Performance',
      subtitle: 'Past campaign results & learnings',
      aiSummary: 'Q3 2025 campaign over-delivered on reach but underperformed on brand uplift. Video creative under 20s drove the best results. Search ROAS consistently above 4.0×.',
      facts: [
        {
          id: 'client-f7',
          text: 'Q3 2025: video ads under 20s drove +19% brand recall vs 30s format at 40% lower CPM.',
          priority: 'High',
          source: 'industry_benchmarks_q4.pdf',
          tags: ['#video', '#creative', '#results'],
        },
        {
          id: 'client-f8',
          text: 'Search consistently delivers ROAS above 4.0× — never reduce search budget below 15% of total.',
          priority: 'High',
          source: 'manual',
          tags: ['#search', '#roas'],
        },
        {
          id: 'client-f9',
          text: 'OOH in Q2 2025 drove +6% unaided awareness in 3 key metro areas — recommend replication.',
          priority: 'Medium',
          source: 'manual',
          tags: ['#ooh', '#awareness'],
        },
      ],
    },
  ],

  brand: [
    {
      id: 'brand-topic-brand-identity',
      name: 'Brand Identity',
      subtitle: 'Visual language and tone of voice',
      aiSummary: 'Alpha Brand uses a refined, editorial visual style. Photography-first creative direction. Tone is confident and warm — never corporate or clinical.',
      facts: [
        {
          id: 'brand-f1',
          text: 'Primary visual style: editorial photography, natural lighting, lifestyle contexts — no studio white backgrounds.',
          priority: 'High',
          source: 'DEI media brief v1.pdf',
          tags: ['#creative', '#visual'],
        },
        {
          id: 'brand-f2',
          text: 'Tone of voice: confident, warm, slightly understated. Never use exclamation marks in copy.',
          priority: 'Medium',
          source: 'manual',
          tags: ['#tov', '#copy'],
        },
      ],
    },
    {
      id: 'brand-topic-product-portfolio',
      name: 'Product Portfolio',
      subtitle: 'Hero products and seasonal focus',
      aiSummary: 'Three hero SKUs account for 68% of revenue. Seasonal collections launch in March and September — media investment should front-load 3 weeks ahead of retail.',
      facts: [
        {
          id: 'brand-f3',
          text: 'Hero SKUs: Artisan Series, Classic Core, Limited Edition — together representing 68% of brand revenue.',
          priority: 'High',
          source: 'DEI media brief v1.pdf',
          tags: ['#product', '#portfolio'],
        },
        {
          id: 'brand-f4',
          text: 'Seasonal collections (Spring/Autumn) require media to launch 3 weeks before retail availability to build demand.',
          priority: 'High',
          source: 'manual',
          tags: ['#seasonal', '#timing'],
        },
        {
          id: 'brand-f5',
          text: 'Limited Edition drops are always surprise launches — no pre-announcement media allowed.',
          priority: 'Low',
          source: 'manual',
          tags: ['#product', '#rules'],
        },
      ],
    },
    {
      id: 'brand-topic-channel-guidelines',
      name: 'Channel Guidelines',
      subtitle: 'Approved placements and formats',
      aiSummary: 'Brand has strict placement exclusions — no UGC environments, no news adjacency. Instagram and Pinterest are primary social channels. TikTok is under review.',
      facts: [
        {
          id: 'brand-f6',
          text: 'Brand safety: exclude all UGC environments, news adjacency, and political content on all platforms.',
          priority: 'High',
          source: 'DEI media brief v1.pdf',
          tags: ['#brand-safety', '#compliance'],
        },
        {
          id: 'brand-f7',
          text: 'Approved social channels: Instagram, Pinterest, YouTube. TikTok currently under legal review — do not activate.',
          priority: 'High',
          source: 'manual',
          tags: ['#social', '#approved'],
        },
        {
          id: 'brand-f8',
          text: 'Minimum creative specs: video 1080p, static 300×600 and 970×250 as mandatory sizes for display.',
          priority: 'Low',
          source: 'DEI media brief v1.pdf',
          tags: ['#creative', '#specs'],
        },
      ],
    },
  ],
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
