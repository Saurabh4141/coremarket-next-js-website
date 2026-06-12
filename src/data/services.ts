import {
    PieChart,
    BarChart3,
    Brain,
    TrendingUp,
    Lightbulb,
    DollarSign,
    Heart,
    Target,
    MessageCircle,
    LucideIcon
} from "lucide-react";

export interface Service {
    icon: LucideIcon;
    title: string;
    description: string;
    href: string;
    slug: string;
    color: string;
}

export interface ServiceDetail {
    slug: string;
    title: string;
    subtitle: string;
    overview: string[];
    methodology: {
        step: number;
        title: string;
        description: string;
    }[];
    benefits: {
        title: string;
        description: string;
    }[];
    useCases: string[];
}

export const services: Service[] = [
    {
        icon: PieChart,
        title: "Market Segmentation Analysis",
        description: "Identify and understand target segments",
        href: "/services/market-segmentation-analysis",
        slug: "market-segmentation-analysis",
        color: "from-purple-500 to-pink-500",
    },
    {
        icon: BarChart3,
        title: "Competitor Analysis",
        description: "Stay ahead of competition",
        href: "/services/competitor-analysis",
        slug: "competitor-analysis",
        color: "from-sky-500 to-blue-500",
    },
    {
        icon: Brain,
        title: "Consumer Behavior Analysis",
        description: "Understand customer decisions",
        href: "/services/consumer-behavior-analysis",
        slug: "consumer-behavior-analysis",
        color: "from-rose-500 to-pink-500",
    },
    {
        icon: TrendingUp,
        title: "Industry Trends & Forecasting",
        description: "Predict market shifts and opportunities",
        href: "/services/industry-trends-forecasting",
        slug: "industry-trends-forecasting",
        color: "from-teal-500 to-cyan-500",
    },
    {
        icon: Lightbulb,
        title: "Product and Brand Research",
        description: "Product insights and brand perception",
        href: "/services/product-brand-research",
        slug: "product-brand-research",
        color: "from-orange-500 to-red-500",
    },
    {
        icon: DollarSign,
        title: "Pricing Strategy Research",
        description: "Optimize pricing for profitability",
        href: "/services/pricing-strategy-research",
        slug: "pricing-strategy-research",
        color: "from-emerald-500 to-teal-500",
    },
    {
        icon: Heart,
        title: "Customer Satisfaction and Loyalty Research",
        description: "Measure NPS and customer loyalty",
        href: "/services/customer-satisfaction-loyalty-research",
        slug: "customer-satisfaction-loyalty-research",
        color: "from-amber-500 to-orange-500",
    },
    {
        icon: Target,
        title: "Market Opportunity Identification",
        description: "Discover growth opportunities",
        href: "/services/market-opportunity-identification",
        slug: "market-opportunity-identification",
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: MessageCircle,
        title: "Social Media and Sentiment Analysis",
        description: "Monitor brand perception online",
        href: "/services/social-media-sentiment-analysis",
        slug: "social-media-sentiment-analysis",
        color: "from-violet-500 to-purple-500",
    },
];

export const serviceDetails: Record<string, ServiceDetail> = {
    "market-segmentation-analysis": {
        slug: "market-segmentation-analysis",
        title: "Market Segmentation Analysis",
        subtitle: "Identify and understand target segments within a market to tailor your marketing and product strategies effectively.",
        overview: [
            "Understanding and identifying distinct segments of a market is crucial for tailored marketing and product strategies.",
            "Our Market Segmentation Analysis service helps businesses pinpoint different customer groups within a market based on various criteria such as demographics, psychographics, behaviors, and geographic location.",
            "By identifying these segments, companies can develop targeted marketing campaigns, create tailored products, and enhance customer engagement."
        ],
        methodology: [
            { step: 1, title: "Data Collection", description: "Gather relevant data from surveys, interviews, and market research databases" },
            { step: 2, title: "Segment Identification", description: "Analyze data to identify meaningful customer segments based on shared characteristics" },
            { step: 3, title: "Strategy Development", description: "Develop targeted strategies based on segment insights and market positioning" }
        ],
        benefits: [
            { title: "Targeted Marketing", description: "Tailor marketing campaigns to specific segments for higher conversion rates" },
            { title: "Improved Product Positioning", description: "Develop products that resonate with your target audience's needs" },
            { title: "Enhanced Customer Engagement", description: "Create personalized experiences that drive customer loyalty" }
        ],
        useCases: [
            "New market entry strategy development",
            "Product launch targeting",
            "Marketing campaign optimization",
            "Customer retention programs"
        ]
    },
    "competitor-analysis": {
        slug: "competitor-analysis",
        title: "Competitor Analysis",
        subtitle: "Stay ahead of competition with comprehensive intelligence on competitor strategies, strengths, and market positioning.",
        overview: [
            "In today's dynamic business environment, understanding your competitive landscape is essential for strategic planning.",
            "Our Competitor Analysis service provides in-depth insights into your competitors' strategies, market positioning, product offerings, and operational capabilities.",
            "We help you identify competitive advantages, potential threats, and opportunities to differentiate your business in the marketplace."
        ],
        methodology: [
            { step: 1, title: "Competitor Identification", description: "Map direct and indirect competitors across your market segments" },
            { step: 2, title: "Intelligence Gathering", description: "Collect data on competitor products, pricing, marketing, and operations" },
            { step: 3, title: "Strategic Analysis", description: "Analyze findings to identify opportunities and competitive positioning strategies" }
        ],
        benefits: [
            { title: "Strategic Positioning", description: "Identify gaps in the market and position your offerings effectively" },
            { title: "Informed Decision Making", description: "Make data-driven decisions based on competitive intelligence" },
            { title: "Risk Mitigation", description: "Anticipate competitor moves and prepare proactive responses" }
        ],
        useCases: [
            "Market entry assessment",
            "Competitive benchmarking",
            "Strategic planning sessions",
            "Product development roadmaps"
        ]
    },
    "consumer-behavior-analysis": {
        slug: "consumer-behavior-analysis",
        title: "Consumer Behavior Analysis",
        subtitle: "Understand the psychology behind customer decisions to build more effective business strategies.",
        overview: [
            "Consumer behavior analysis goes beyond what customers buy to understand why they make purchasing decisions.",
            "Our service examines the psychological, social, and cultural factors that influence consumer choices, helping you predict and influence buying patterns.",
            "We provide actionable insights that enable you to align your products, services, and marketing with customer motivations."
        ],
        methodology: [
            { step: 1, title: "Behavioral Research", description: "Conduct qualitative and quantitative studies on consumer decision-making" },
            { step: 2, title: "Pattern Analysis", description: "Identify recurring behaviors, preferences, and purchase triggers" },
            { step: 3, title: "Insight Generation", description: "Translate findings into actionable business recommendations" }
        ],
        benefits: [
            { title: "Customer-Centric Products", description: "Design offerings that align with actual customer needs and desires" },
            { title: "Optimized Customer Journey", description: "Create seamless experiences that guide customers to conversion" },
            { title: "Predictive Capabilities", description: "Anticipate shifts in consumer preferences and behaviors" }
        ],
        useCases: [
            "Customer journey mapping",
            "Product feature prioritization",
            "Marketing message development",
            "User experience optimization"
        ]
    },
    "industry-trends-forecasting": {
        slug: "industry-trends-forecasting",
        title: "Industry Trends & Forecasting",
        subtitle: "Predict market shifts and opportunities with expert trend analysis and forecasting models.",
        overview: [
            "Staying ahead of industry trends is crucial for long-term business success and strategic planning.",
            "Our Industry Trends & Forecasting service combines historical data analysis, expert insights, and predictive modeling to identify emerging trends and forecast market developments.",
            "We help you anticipate changes in your industry, enabling proactive strategy development and competitive advantage."
        ],
        methodology: [
            { step: 1, title: "Trend Identification", description: "Monitor and identify emerging patterns across industry sectors" },
            { step: 2, title: "Data Modeling", description: "Apply statistical models and AI to forecast future developments" },
            { step: 3, title: "Strategic Roadmapping", description: "Develop actionable plans based on trend projections" }
        ],
        benefits: [
            { title: "Future-Ready Strategy", description: "Prepare your business for upcoming market changes" },
            { title: "Investment Guidance", description: "Make informed decisions about resource allocation" },
            { title: "Competitive Advantage", description: "Stay ahead of competitors by anticipating market shifts" }
        ],
        useCases: [
            "Strategic planning initiatives",
            "Investment decision support",
            "Innovation roadmap development",
            "Risk assessment and mitigation"
        ]
    },
    "product-brand-research": {
        slug: "product-brand-research",
        title: "Product and Brand Research",
        subtitle: "Gain deep insights into product perception and brand positioning from your target audience.",
        overview: [
            "Understanding how customers perceive your products and brand is essential for effective positioning and growth.",
            "Our Product and Brand Research service provides comprehensive insights into brand awareness, perception, loyalty, and product satisfaction.",
            "We help you understand your brand's strengths and weaknesses, identify improvement opportunities, and develop strategies to enhance brand equity."
        ],
        methodology: [
            { step: 1, title: "Brand Audit", description: "Assess current brand perception, awareness, and market positioning" },
            { step: 2, title: "Customer Research", description: "Gather insights through surveys, focus groups, and interviews" },
            { step: 3, title: "Strategy Formulation", description: "Develop brand enhancement and product optimization strategies" }
        ],
        benefits: [
            { title: "Brand Equity Growth", description: "Build stronger emotional connections with your target audience" },
            { title: "Product Excellence", description: "Optimize products based on genuine customer feedback" },
            { title: "Market Differentiation", description: "Establish unique positioning that sets you apart" }
        ],
        useCases: [
            "Brand repositioning initiatives",
            "New product development",
            "Marketing campaign planning",
            "Customer experience enhancement"
        ]
    },
    "pricing-strategy-research": {
        slug: "pricing-strategy-research",
        title: "Pricing Strategy Research",
        subtitle: "Optimize your pricing for maximum profitability while maintaining competitive market position.",
        overview: [
            "Pricing is one of the most critical factors affecting profitability and market competitiveness.",
            "Our Pricing Strategy Research service helps businesses understand customer price sensitivity, competitive pricing landscapes, and optimal price points.",
            "We provide data-driven recommendations that balance revenue maximization with market share objectives."
        ],
        methodology: [
            { step: 1, title: "Price Sensitivity Analysis", description: "Assess customer willingness to pay across different segments" },
            { step: 2, title: "Competitive Benchmarking", description: "Analyze competitor pricing strategies and market positioning" },
            { step: 3, title: "Optimization Modeling", description: "Develop pricing models that maximize revenue and profitability" }
        ],
        benefits: [
            { title: "Revenue Optimization", description: "Capture maximum value while maintaining sales volume" },
            { title: "Competitive Positioning", description: "Price strategically relative to market alternatives" },
            { title: "Profit Margin Growth", description: "Identify opportunities to improve pricing efficiency" }
        ],
        useCases: [
            "New product pricing",
            "Price optimization initiatives",
            "Promotional strategy development",
            "Value proposition refinement"
        ]
    },
    "customer-satisfaction-loyalty-research": {
        slug: "customer-satisfaction-loyalty-research",
        title: "Customer Satisfaction and Loyalty Research",
        subtitle: "Measure and improve customer loyalty with actionable satisfaction insights and NPS benchmarks.",
        overview: [
            "Customer satisfaction and loyalty are key drivers of sustainable business growth and profitability.",
            "Our Customer Satisfaction and Loyalty Research service measures key metrics like Net Promoter Score (NPS), customer satisfaction (CSAT), and customer effort score (CES).",
            "We help you understand the factors driving customer loyalty and identify opportunities to enhance the customer experience."
        ],
        methodology: [
            { step: 1, title: "Metric Assessment", description: "Measure NPS, CSAT, CES, and other loyalty indicators" },
            { step: 2, title: "Driver Analysis", description: "Identify factors that most influence customer satisfaction" },
            { step: 3, title: "Action Planning", description: "Develop targeted initiatives to improve loyalty metrics" }
        ],
        benefits: [
            { title: "Customer Retention", description: "Reduce churn by addressing satisfaction pain points" },
            { title: "Revenue Growth", description: "Increase lifetime value through enhanced loyalty" },
            { title: "Referral Generation", description: "Turn satisfied customers into brand advocates" }
        ],
        useCases: [
            "Customer experience programs",
            "Service quality improvement",
            "Retention strategy development",
            "Voice of customer initiatives"
        ]
    },
    "market-opportunity-identification": {
        slug: "market-opportunity-identification",
        title: "Market Opportunity Identification",
        subtitle: "Discover untapped growth opportunities and new market possibilities for your business.",
        overview: [
            "Identifying new market opportunities is essential for business growth and long-term success.",
            "Our Market Opportunity Identification service analyzes market gaps, emerging trends, and unmet customer needs to uncover growth potential.",
            "We help you evaluate and prioritize opportunities based on market attractiveness, competitive intensity, and organizational fit."
        ],
        methodology: [
            { step: 1, title: "Market Scanning", description: "Analyze market landscape to identify gaps and white spaces" },
            { step: 2, title: "Opportunity Assessment", description: "Evaluate potential opportunities based on strategic criteria" },
            { step: 3, title: "Entry Strategy", description: "Develop actionable plans for pursuing selected opportunities" }
        ],
        benefits: [
            { title: "Growth Acceleration", description: "Identify high-potential markets for expansion" },
            { title: "Resource Optimization", description: "Focus investments on the most promising opportunities" },
            { title: "First-Mover Advantage", description: "Capture emerging markets before competitors" }
        ],
        useCases: [
            "Business expansion planning",
            "New market entry",
            "Product portfolio expansion",
            "Strategic diversification"
        ]
    },
    "social-media-sentiment-analysis": {
        slug: "social-media-sentiment-analysis",
        title: "Social Media and Sentiment Analysis",
        subtitle: "Monitor brand perception and customer sentiment across social platforms and online channels.",
        overview: [
            "In the digital age, understanding online conversations about your brand is crucial for reputation management.",
            "Our Social Media and Sentiment Analysis service tracks mentions, analyzes sentiment, and identifies trends across social platforms and online channels.",
            "We provide real-time insights into brand perception, enabling proactive reputation management and customer engagement."
        ],
        methodology: [
            { step: 1, title: "Channel Monitoring", description: "Track brand mentions across social media and online platforms" },
            { step: 2, title: "Sentiment Analysis", description: "Analyze tone and sentiment of conversations about your brand" },
            { step: 3, title: "Insight Reporting", description: "Provide actionable insights and trend analysis" }
        ],
        benefits: [
            { title: "Brand Protection", description: "Identify and address negative sentiment quickly" },
            { title: "Customer Insights", description: "Understand unfiltered customer opinions and feedback" },
            { title: "Competitive Intelligence", description: "Monitor competitor brand perception" }
        ],
        useCases: [
            "Brand reputation monitoring",
            "Crisis management",
            "Campaign performance tracking",
            "Customer feedback analysis"
        ]
    }
};

export const getServiceBySlug = (slug: string): Service | undefined => {
    return services.find(service => service.slug === slug);
};

export const getServiceDetailBySlug = (slug: string): ServiceDetail | undefined => {
    return serviceDetails[slug];
};
