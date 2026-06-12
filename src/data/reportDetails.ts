/* =====================================================
   REPORT DETAILS DATA (API-FRIENDLY STRUCTURE)
   Maps to: report_master + report_media tables
===================================================== */

// Report media interface (matches report_media table)
export interface ReportMedia {
  id: number;
  report_id: number;
  media_type: "chart" | "table" | "infographic" | "thumbnail";
  title: string;
  description: string;
  url: string;
  sort_order: number;
  is_active: boolean;
}

// Report detail interface (matches report_master table)
export interface ReportDetail {
  id: number;
  industry_id: number;
  sub_industry_id: number | null;
  industry: string; // industry slug
  sub_industry: string; // sub-industry slug
  title: string;
  slug: string;

  // Core report info
  summary: string;
  base_year: number;
  forecast_year: number;

  // Market data
  base_year_value: string;
  forecast_year_value: string;
  cagr: string;

  // Report specifications
  pages: number;
  companies_mentioned: string[];
  regions_covered: string[];

  // Pricing
  price_single_user: string;
  price_multi_user: string;
  price_enterprise: string;

  // SEO fields
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];

  market_analysis: string;

  // Content sections
  key_findings: string[];
  market_drivers: string[];
  market_challenges: string[];
  market_opportunities: string[];

  // Segmentation
  segmentation: {
    by_type?: string[];
    by_application?: string[];
    by_end_user?: string[];
    by_region?: string[];
  };

  // Table of contents (simplified)
  toc_chapters: {
    number: number;
    title: string;
    sections: string[];
  }[];

  // Competitive landscape
  competitive_landscape: {
    company: string;
    market_share?: string;
    headquarters: string;
    key_strategies: string[];
  }[];

  // FAQ
  faq: {
    question: string;
    answer: string;
  }[];

  // Metadata
  publication_date: string;
  last_updated: string;
  is_active: boolean;
  created_by: string;

  // Related media (from report_media table)
  media: ReportMedia[];
}

// Sample detailed report data
export const reportDetailsData: ReportDetail[] = [
  {
    id: 1,
    industry_id: 1,
    sub_industry_id: 6,
    industry: "healthcare",
    sub_industry: "pharmaceuticals",
    title: "Glutethimide Market Analysis",
    slug: "glutethimide",
    
    summary:
      "The global Glutethimide market is projected to witness steady growth during the forecast period, driven by increasing therapeutic applications and expanding pharmaceutical research activities.",
    base_year: 2024,
    forecast_year: 2030,

    base_year_value: "3.5 Billion",
    forecast_year_value: "5.8 Billion",
    cagr: "7.8%",

    pages: 180,
    companies_mentioned: [
      "Pfizer",
      "Roche",
      "Novartis",
      "Johnson & Johnson",
      "Merck",
      "GSK",
    ],
    regions_covered: [
      "North America",
      "Europe",
      "Asia Pacific",
      "Latin America",
      "Middle East & Africa",
    ],

    price_single_user: "$2,500",
    price_multi_user: "$3,500",
    price_enterprise: "$4,500",

    seo_title: "Glutethimide Market Size, Share & Growth Report 2024-2030",
    seo_description:
      "Comprehensive Glutethimide market analysis with industry trends, competitive landscape, regional insights, and forecast through 2030.",
    seo_keywords: [
      "glutethimide market",
      "pharmaceutical market research",
      "drug market analysis",
      "healthcare market report",
    ],

    market_analysis:
      "The global aircraft antenna market size is estimated to have reached approximately USD 540 million in 2025. Looking forward, CoreMarketResearch expects the market to reach around USD 960 million by 2034, exhibiting a compound annual growth rate (CAGR) of about 6.6% during the forecast period (2025–2034). Market growth is driven by increasing airline investments in onboard connectivity, regulatory requirements for advanced surveillance and communication systems, and the rising use of unmanned aerial platforms requiring continuous beyond-visual-line-of-sight connectivity. Aircraft OEMs and avionics suppliers are integrating antenna systems earlier in aircraft design cycles, shifting procurement forward and supporting demand for multi-band platforms compatible with geostationary, medium-Earth, and low-Earth orbit satellite networks, as well as emerging air-to-ground communication technologies. On the supply side, constraints in specialized RF materials and substrates continue to influence pricing, encouraging tier-one suppliers to adopt vertical integration and advanced manufacturing methods to deliver lightweight, conformal antenna solutions.",

    key_findings: [
      "Market expected to reach $5.8 Billion by 2030",
      "North America dominates with 35% market share",
      "Growing demand for therapeutic applications",
      "Increasing R&D investments by key players",
    ],
    market_drivers: [
      "Rising prevalence of sleep disorders globally",
      "Increasing investment in pharmaceutical R&D",
      "Growing geriatric population requiring therapeutic interventions",
      "Expansion of healthcare infrastructure in emerging markets",
    ],
    market_challenges: [
      "Stringent regulatory requirements for drug approval",
      "High cost of drug development and clinical trials",
      "Availability of alternative therapeutic options",
      "Potential side effects and safety concerns",
    ],
    market_opportunities: [
      "Untapped potential in emerging Asian markets",
      "Development of novel drug delivery systems",
      "Strategic partnerships and collaborations",
      "Personalized medicine approaches",
    ],

    segmentation: {
      by_type: ["Monovalent Vaccine", "Combination Vaccine"],
      by_application: ["Hospitals", "Clinics", "Research Institutions"],
      by_end_user: ["Adults", "Elderly", "Pediatric"],
      by_region: [
        "North America",
        "Europe",
        "Asia Pacific",
        "Latin America",
        "MEA",
      ],
    },

    toc_chapters: [
      {
        number: 1,
        title: "Introduction",
        sections: [
          "1.1 Research Objectives",
          "1.2 Market Definition",
          "1.3 Scope of Study",
        ],
      },
      {
        number: 2,
        title: "Executive Summary",
        sections: ["2.1 Key Findings", "2.2 Market Outlook"],
      },
      {
        number: 3,
        title: "Market Overview",
        sections: [
          "3.1 Market Description",
          "3.2 Value Chain Analysis",
          "3.3 Porter's Five Forces",
        ],
      },
      {
        number: 4,
        title: "Market Dynamics",
        sections: [
          "4.1 Drivers",
          "4.2 Restraints",
          "4.3 Opportunities",
          "4.4 Challenges",
        ],
      },
      {
        number: 5,
        title: "Competitive Landscape",
        sections: [
          "5.1 Company Profiles",
          "5.2 Market Share Analysis",
          "5.3 Strategic Developments",
        ],
      },
      {
        number: 6,
        title: "Regional Analysis",
        sections: [
          "6.1 North America",
          "6.2 Europe",
          "6.3 Asia Pacific",
          "6.4 Rest of World",
        ],
      },
      {
        number: 7,
        title: "Market Segmentation",
        sections: [
          "7.1 By Product",
          "7.2 By End User",
          "7.3 By Distribution Channel",
        ],
      },
    ],

    competitive_landscape: [
      {
        company: "Pfizer Inc.",
        market_share: "18%",
        headquarters: "New York, USA",
        key_strategies: [
          "R&D Investment",
          "Strategic Acquisitions",
          "Geographic Expansion",
        ],
      },
      {
        company: "Roche Holding AG",
        market_share: "15%",
        headquarters: "Basel, Switzerland",
        key_strategies: [
          "Innovation Focus",
          "Personalized Healthcare",
          "Digital Transformation",
        ],
      },
      {
        company: "Novartis AG",
        market_share: "12%",
        headquarters: "Basel, Switzerland",
        key_strategies: [
          "Pipeline Development",
          "Market Diversification",
          "Partnerships",
        ],
      },
      {
        company: "Johnson & Johnson",
        market_share: "10%",
        headquarters: "New Jersey, USA",
        key_strategies: [
          "Brand Building",
          "Product Portfolio Expansion",
          "Emerging Markets Focus",
        ],
      },
    ],

    faq: [
      {
        question: "What is the projected market size by 2030?",
        answer:
          "The market is expected to reach $5.8 Billion by 2030, growing at a CAGR of 7.8% during the forecast period.",
      },
      {
        question: "Which region dominates the market?",
        answer:
          "North America currently dominates the market with approximately 35% share, followed by Europe and Asia Pacific.",
      },
      {
        question: "Who are the key players in this market?",
        answer:
          "Major players include Pfizer, Roche, Novartis, Johnson & Johnson, Merck, and GSK.",
      },
      {
        question: "What are the main growth drivers?",
        answer:
          "Key drivers include rising prevalence of sleep disorders, increasing R&D investments, growing geriatric population, and healthcare infrastructure expansion.",
      },
    ],

    publication_date: "2023-10-15",
    last_updated: "2024-01-10",
    is_active: true,
    created_by: "system",

    media: [
      {
        id: 1,
        report_id: 1,
        media_type: "chart",
        title: "Market Size & Forecast",
        description: "Historical and projected market size from 2020-2030",
        url: "/placeholder.svg",
        sort_order: 1,
        is_active: true,
      },
      {
        id: 2,
        report_id: 1,
        media_type: "chart",
        title: "Regional Market Share",
        description: "Market share distribution by region",
        url: "/placeholder.svg",
        sort_order: 2,
        is_active: true,
      },
      {
        id: 3,
        report_id: 1,
        media_type: "infographic",
        title: "Competitive Landscape",
        description: "Key players and market positioning",
        url: "/placeholder.svg",
        sort_order: 3,
        is_active: true,
      },
    ],
  },

  // Generic template for other reports - in production, this would be populated from API
  {
    id: 2,
    industry_id: 1,
    sub_industry_id: 7,
    industry: "healthcare",
    sub_industry: "vaccines",
    title: "Global Vaccines Market Analysis",
    slug: "vaccines-market-analysis",
    
    summary:
      "The global vaccines market is experiencing robust growth driven by increased immunization programs and mRNA technology advancements.",
    base_year: 2024,
    forecast_year: 2030,

    base_year_value: "72 Billion",
    forecast_year_value: "138 Billion",
    cagr: "11.3%",

    pages: 265,
    companies_mentioned: [
      "Pfizer",
      "Moderna",
      "GSK",
      "Sanofi",
      "Merck",
      "Johnson & Johnson",
    ],
    regions_covered: [
      "North America",
      "Europe",
      "Asia Pacific",
      "Latin America",
      "Middle East & Africa",
    ],

    price_single_user: "$3,700",
    price_multi_user: "$4,700",
    price_enterprise: "$5,700",

    seo_title: "Vaccines Market Size, Share & Trends Analysis Report 2024-2030",
    seo_description:
      "Comprehensive vaccines market research report with industry analysis, competitive landscape, and growth forecast through 2030.",
    seo_keywords: [
      "vaccines market",
      "immunization market",
      "vaccine industry",
      "mRNA vaccines",
    ],

    market_analysis:
      "The global aircraft antenna market size is estimated to have reached approximately USD 540 million in 2025. Looking forward, CoreMarketResearch expects the market to reach around USD 960 million by 2034, exhibiting a compound annual growth rate (CAGR) of about 6.6% during the forecast period (2025–2034). Market growth is driven by increasing airline investments in onboard connectivity, regulatory requirements for advanced surveillance and communication systems, and the rising use of unmanned aerial platforms requiring continuous beyond-visual-line-of-sight connectivity. Aircraft OEMs and avionics suppliers are integrating antenna systems earlier in aircraft design cycles, shifting procurement forward and supporting demand for multi-band platforms compatible with geostationary, medium-Earth, and low-Earth orbit satellite networks, as well as emerging air-to-ground communication technologies. On the supply side, constraints in specialized RF materials and substrates continue to influence pricing, encouraging tier-one suppliers to adopt vertical integration and advanced manufacturing methods to deliver lightweight, conformal antenna solutions.",

    key_findings: [
      "mRNA vaccines driving market transformation",
      "Asia Pacific fastest growing region",
      "Pandemic preparedness investments increasing",
      "Pediatric vaccines segment remains largest",
    ],
    market_drivers: [
      "mRNA technology breakthrough",
      "Government immunization programs",
      "Rising infectious disease awareness",
      "Pandemic preparedness investments",
    ],
    market_challenges: [
      "Cold chain logistics requirements",
      "Vaccine hesitancy in certain regions",
      "High development costs",
      "Complex regulatory approval process",
    ],
    market_opportunities: [
      "Emerging markets expansion",
      "New therapeutic vaccine development",
      "Public-private partnerships",
      "Digital vaccine tracking solutions",
    ],

    segmentation: {
      by_type: [
        "Inactivated Vaccines",
        "Live Attenuated Vaccines",
        "mRNA Vaccines",
        "Subunit Vaccines",
      ],
      by_application: ["Pediatric", "Adult", "Travel"],
      by_end_user: ["Hospitals", "Clinics", "Government Programs"],
      by_region: [
        "North America",
        "Europe",
        "Asia Pacific",
        "Latin America",
        "MEA",
      ],
    },

    toc_chapters: [
      {
        number: 1,
        title: "Introduction",
        sections: [
          "1.1 Research Objectives",
          "1.2 Market Definition",
          "1.3 Scope of Study",
        ],
      },
      {
        number: 2,
        title: "Executive Summary",
        sections: ["2.1 Key Findings", "2.2 Market Outlook"],
      },
      {
        number: 3,
        title: "Market Overview",
        sections: ["3.1 Market Description", "3.2 Value Chain Analysis"],
      },
      {
        number: 4,
        title: "Market Dynamics",
        sections: ["4.1 Drivers", "4.2 Restraints", "4.3 Opportunities"],
      },
      {
        number: 5,
        title: "Competitive Landscape",
        sections: ["5.1 Company Profiles", "5.2 Market Share"],
      },
      {
        number: 6,
        title: "Regional Analysis",
        sections: ["6.1 North America", "6.2 Europe", "6.3 Asia Pacific"],
      },
    ],

    competitive_landscape: [
      {
        company: "Pfizer Inc.",
        market_share: "22%",
        headquarters: "New York, USA",
        key_strategies: ["mRNA Platform", "Global Distribution"],
      },
      {
        company: "Moderna Inc.",
        market_share: "18%",
        headquarters: "Massachusetts, USA",
        key_strategies: ["mRNA Innovation", "Pipeline Expansion"],
      },
      {
        company: "GSK plc",
        market_share: "12%",
        headquarters: "London, UK",
        key_strategies: ["Adjuvant Technology", "Emerging Markets"],
      },
    ],

    faq: [
      {
        question: "What is the market size forecast for 2030?",
        answer:
          "The vaccines market is expected to reach $138 Billion by 2030.",
      },
      {
        question: "Which technology is driving growth?",
        answer:
          "mRNA vaccine technology is the primary growth driver post-pandemic.",
      },
    ],

    publication_date: "2024-01-15",
    last_updated: "2024-01-15",
    is_active: true,
    created_by: "system",

    media: [
      {
        id: 4,
        report_id: 2,
        media_type: "chart",
        title: "Market Growth Trend",
        description: "Vaccines market growth from 2020-2030",
        url: "/placeholder.svg",
        sort_order: 1,
        is_active: true,
      },
    ],
  },
];

/* =====================================================
   HELPER FUNCTIONS
===================================================== */

// Get report detail by full path
export const getReportDetailByPath = (
  industry: string,
  subIndustry: string,
  slug: string,
): ReportDetail | undefined => {
  return reportDetailsData.find(
    (r) =>
      r.industry === industry &&
      r.sub_industry === subIndustry &&
      r.slug === slug,
  );
};

// Get report detail by slug (simple lookup)
export const getReportDetailBySlug = (
  slug: string,
): ReportDetail | undefined => {
  return reportDetailsData.find((r) => r.slug === slug);
};

// Generate default report detail for reports not in detailed data
export const getDefaultReportDetail = (
  industry: string,
  subIndustry: string,
  slug: string,
  title: string,
  basicInfo: { date: string; growth: string; pages: number; price: string },
): ReportDetail => {
  return {
    id: 0,
    industry_id: 0,
    sub_industry_id: null,
    industry,
    sub_industry: subIndustry,
    title,
    slug,

    summary: `This report provides detailed insights into the ${title.toLowerCase()} market, including market size, key players, and future outlook.`,
    base_year: 2024,
    forecast_year: 2030,

    base_year_value: "3.5 Billion",
    forecast_year_value: "5.8 Billion",
    cagr: basicInfo.growth,

    pages: basicInfo.pages,
    companies_mentioned: [
      "Industry Leader 1",
      "Industry Leader 2",
      "Industry Leader 3",
      "Industry Leader 4",
    ],
    regions_covered: [
      "North America",
      "Europe",
      "Asia Pacific",
      "Latin America",
      "Middle East & Africa",
    ],

    price_single_user: basicInfo.price,
    price_multi_user: `$${parseInt(basicInfo.price.replace(/[^0-9]/g, "")) + 1000}`,
    price_enterprise: `$${parseInt(basicInfo.price.replace(/[^0-9]/g, "")) + 2000}`,

    seo_title: `${title} | Market Size, Share & Growth Analysis`,
    seo_description: `Comprehensive ${title.toLowerCase()} report with market trends, competitive analysis, and forecast.`,
    seo_keywords: [
      slug.replace(/-/g, " "),
      "market research",
      "industry analysis",
    ],

    market_analysis:
      "The global aircraft antenna market size is estimated to have reached approximately USD 540 million in 2025. Looking forward, CoreMarketResearch expects the market to reach around USD 960 million by 2034, exhibiting a compound annual growth rate (CAGR) of about 6.6% during the forecast period (2025–2034). Market growth is driven by increasing airline investments in onboard connectivity, regulatory requirements for advanced surveillance and communication systems, and the rising use of unmanned aerial platforms requiring continuous beyond-visual-line-of-sight connectivity. Aircraft OEMs and avionics suppliers are integrating antenna systems earlier in aircraft design cycles, shifting procurement forward and supporting demand for multi-band platforms compatible with geostationary, medium-Earth, and low-Earth orbit satellite networks, as well as emerging air-to-ground communication technologies. On the supply side, constraints in specialized RF materials and substrates continue to influence pricing, encouraging tier-one suppliers to adopt vertical integration and advanced manufacturing methods to deliver lightweight, conformal antenna solutions.",

    key_findings: [
      "Strong growth expected during forecast period",
      "Regional expansion driving market growth",
      "Technology innovation creating new opportunities",
      "Strategic partnerships increasing among key players",
    ],
    market_drivers: [
      "Growing demand across key industries",
      "Technological advancements and innovation",
      "Increasing investment in R&D",
      "Favorable regulatory environment",
    ],
    market_challenges: [
      "Intense market competition",
      "Regulatory compliance requirements",
      "Supply chain complexities",
      "Cost pressures and margin concerns",
    ],
    market_opportunities: [
      "Emerging market expansion",
      "Product innovation and development",
      "Strategic acquisitions and partnerships",
      "Sustainability and ESG initiatives",
    ],

    segmentation: {
      by_type: ["Type A", "Type B", "Type C"],
      by_application: ["Application 1", "Application 2", "Application 3"],
      by_end_user: ["End User 1", "End User 2", "End User 3"],
      by_region: [
        "North America",
        "Europe",
        "Asia Pacific",
        "Latin America",
        "MEA",
      ],
    },

    toc_chapters: [
      {
        number: 1,
        title: "Introduction",
        sections: [
          "1.1 Research Objectives",
          "1.2 Market Definition",
          "1.3 Scope of Study",
        ],
      },
      {
        number: 2,
        title: "Executive Summary",
        sections: ["2.1 Key Findings", "2.2 Market Outlook"],
      },
      {
        number: 3,
        title: "Market Overview",
        sections: ["3.1 Market Description", "3.2 Value Chain Analysis"],
      },
      {
        number: 4,
        title: "Market Dynamics",
        sections: ["4.1 Drivers", "4.2 Restraints", "4.3 Opportunities"],
      },
      {
        number: 5,
        title: "Competitive Landscape",
        sections: ["5.1 Company Profiles", "5.2 Market Share"],
      },
      {
        number: 6,
        title: "Regional Analysis",
        sections: ["6.1 North America", "6.2 Europe", "6.3 Asia Pacific"],
      },
      {
        number: 7,
        title: "Market Segmentation",
        sections: ["7.1 By Type", "7.2 By Application", "7.3 By End User"],
      },
    ],

    competitive_landscape: [
      {
        company: "Market Leader 1",
        market_share: "20%",
        headquarters: "Global",
        key_strategies: ["Innovation", "Expansion"],
      },
      {
        company: "Market Leader 2",
        market_share: "15%",
        headquarters: "Global",
        key_strategies: ["Partnerships", "R&D"],
      },
      {
        company: "Market Leader 3",
        market_share: "12%",
        headquarters: "Global",
        key_strategies: ["Diversification", "M&A"],
      },
    ],

    faq: [
      {
        question: "What is the market growth rate?",
        answer: `The market is growing at ${basicInfo.growth} CAGR during the forecast period.`,
      },
      {
        question: "How many pages does the report contain?",
        answer: `The report contains ${basicInfo.pages} pages of comprehensive analysis.`,
      },
    ],

    publication_date: basicInfo.date,
    last_updated: basicInfo.date,
    is_active: true,
    created_by: "system",

    media: [],
  };
};
