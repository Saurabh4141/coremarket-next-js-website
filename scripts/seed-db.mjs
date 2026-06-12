/**
 * One-off, idempotent DB seed (user-authorized writes to `core`):
 *   1. Insert demo blog posts into blog_master (was empty).
 *   2. Set dummy prices on active reports that have none.
 * Re-running is safe: blogs upsert on unique slug; prices only fill NULLs.
 *
 * Run: node scripts/seed-db.mjs
 */
import pkg from "@next/env";
pkg.loadEnvConfig(process.cwd());
const mysql = (await import("mysql2/promise")).default;

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  namedPlaceholders: true,
});

const AVATARS = {
  "Dr. Sarah Chen": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  "Michael Ross": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  "Emily Zhang": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  "David Park": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
};
const ROLES = {
  "Dr. Sarah Chen": "Chief Research Officer",
  "Michael Ross": "Senior Industry Analyst",
  "Emily Zhang": "Head of Research Methods",
  "David Park": "Principal Consultant",
};
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Mirrors the static demo list so the migrated site keeps its content.
const posts = [
  { title: "The Future of AI in Market Research: Trends to Watch in 2024", slug: "future-of-ai-market-research-2024", category: "AI & Technology", author: "Dr. Sarah Chen", date: "2024-01-20", readTime: "6 min read", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop", featured: true, excerpt: "Artificial intelligence is revolutionizing how we gather and analyze market data. Discover the key trends shaping the future of research and how to leverage AI for competitive advantage." },
  { title: "Understanding Consumer Behavior in the Post-Pandemic Era", slug: "consumer-behavior-post-pandemic", category: "Industry Insights", author: "Michael Ross", date: "2024-01-15", readTime: "4 min read", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop", featured: false, excerpt: "Consumer preferences have shifted dramatically. Learn how to adapt your research methodologies to capture these new behaviors and preferences." },
  { title: "5 Key Metrics Every Market Researcher Should Track", slug: "key-metrics-market-researchers", category: "Research Methods", author: "Emily Zhang", date: "2024-01-10", readTime: "5 min read", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop", featured: false, excerpt: "Data-driven decisions start with the right metrics. Here are the essential KPIs that can make or break your research success." },
  { title: "How We Helped a Fortune 500 Company Enter New Markets", slug: "fortune-500-market-entry-case-study", category: "Case Studies", author: "David Park", date: "2024-01-05", readTime: "8 min read", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop", featured: false, excerpt: "A detailed case study on our comprehensive market entry strategy that resulted in 40% revenue growth within the first year." },
  { title: "The Rise of Sentiment Analysis in Brand Research", slug: "sentiment-analysis-brand-research", category: "AI & Technology", author: "Dr. Sarah Chen", date: "2023-12-28", readTime: "5 min read", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop", featured: false, excerpt: "Social listening and sentiment analysis are becoming essential tools for understanding brand perception. Here's how to get started." },
  { title: "Building Effective Survey Questions: A Complete Guide", slug: "effective-survey-questions-guide", category: "Research Methods", author: "Emily Zhang", date: "2023-12-20", readTime: "7 min read", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop", featured: false, excerpt: "The quality of your research depends on asking the right questions. Learn best practices for survey design that drives actionable insights." },
  { title: "Global Market Trends: What to Expect in 2024", slug: "global-market-trends-2024", category: "Industry Insights", author: "Michael Ross", date: "2023-12-15", readTime: "6 min read", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop", featured: false, excerpt: "An in-depth analysis of emerging global market trends and their implications for businesses across industries." },
  { title: "Machine Learning in Predictive Analytics", slug: "machine-learning-predictive-analytics", category: "AI & Technology", author: "Dr. Sarah Chen", date: "2023-12-10", readTime: "7 min read", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=500&fit=crop", featured: false, excerpt: "How machine learning is transforming predictive analytics in market research and what it means for your business." },
  { title: "Case Study: Digital Transformation in Retail", slug: "digital-transformation-retail-case-study", category: "Case Studies", author: "David Park", date: "2023-12-05", readTime: "9 min read", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop", featured: false, excerpt: "How our research helped a major retailer navigate their digital transformation journey successfully." },
  { title: "The Art of Competitive Intelligence", slug: "art-of-competitive-intelligence", category: "Research Methods", author: "Emily Zhang", date: "2023-11-28", readTime: "6 min read", image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=500&fit=crop", featured: false, excerpt: "Master the techniques of gathering and analyzing competitive intelligence to stay ahead in your market." },
];

const buildSections = (p) => [
  {
    title: "Why This Matters Now",
    content: `${p.excerpt} In this piece we unpack the practical implications for research teams and decision-makers, drawing on recent engagements and CoreMarket's ongoing industry coverage.`,
    bullets: ["Shifting market dynamics", "New data sources and tooling", "Rising stakeholder expectations"],
    keyPoints: ["Context for 2024 planning", "Actionable, not theoretical", "Grounded in real engagements"],
  },
  {
    title: "What the Data Tells Us",
    content: "Our analysts reviewed primary and secondary signals across multiple sectors. The consistent thread is that organizations pairing rigorous methodology with modern analytics outperform peers on speed and accuracy of insight.",
    bullets: ["Quantitative and qualitative blend", "Faster time-to-insight", "Higher confidence in forecasts"],
    keyPoints: ["Methodology still wins", "Tooling amplifies, not replaces", "Measure what matters"],
  },
  {
    title: "Putting It Into Practice",
    content: "Start small, instrument your process, and iterate. Teams that operationalize these ideas see compounding returns as their data assets and institutional knowledge grow.",
    bullets: ["Define the decision first", "Choose metrics deliberately", "Review and refine quarterly"],
    keyPoints: ["Bias toward action", "Document your assumptions", "Close the loop with outcomes"],
  },
];

let blogInserted = 0;
for (const p of posts) {
  const sections = JSON.stringify(buildSections(p));
  const keyTakeaways = JSON.stringify([
    "AI and modern analytics are reshaping research workflows",
    "Methodology remains the foundation of trustworthy insight",
    "Operationalizing insight beats one-off analysis",
  ]);
  const intro = `${p.excerpt} As the market landscape evolves through 2024, ${p.author} examines what is changing and how research leaders can respond.`;
  const [res] = await db.query(
    `INSERT INTO blog_master
       (title, slug, category, category_slug, author_name, author_role, author_avatar,
        author_bio, publish_date, read_time, is_featured, featured_image, excerpt,
        introduction, sections, key_takeaways, quote, tags, meta_title, meta_description,
        status, views, created_at)
     VALUES
       (:title, :slug, :category, :category_slug, :author, :author_role, :author_avatar,
        :author_bio, :publish_date, :read_time, :is_featured, :image, :excerpt,
        :introduction, :sections, :key_takeaways, :quote, :tags, :meta_title, :meta_description,
        'published', 0, NOW())
     ON DUPLICATE KEY UPDATE
        title = VALUES(title), category = VALUES(category), excerpt = VALUES(excerpt),
        introduction = VALUES(introduction), sections = VALUES(sections),
        is_featured = VALUES(is_featured), status = 'published', updated_at = NOW()`,
    {
      title: p.title,
      slug: p.slug,
      category: p.category,
      category_slug: slugify(p.category),
      author: p.author,
      author_role: ROLES[p.author] ?? "Analyst",
      author_avatar: AVATARS[p.author] ?? "",
      author_bio: `${p.author} is part of CoreMarket Research's analyst team, focusing on ${p.category.toLowerCase()} with years of hands-on industry experience.`,
      publish_date: p.date,
      read_time: p.readTime,
      is_featured: p.featured ? 1 : 0,
      image: p.image,
      excerpt: p.excerpt,
      introduction: intro,
      sections,
      key_takeaways: keyTakeaways,
      // sections/key_takeaways/quote all carry json_valid() CHECK constraints.
      quote: JSON.stringify("The best research turns uncertainty into a decision you can defend."),
      tags: p.category,
      meta_title: p.title,
      meta_description: p.excerpt.slice(0, 300),
    }
  );
  if (res.affectedRows) blogInserted++;
}

// Dummy prices on active reports lacking them. Deterministic per id so they
// vary realistically rather than every report showing the same number.
const [priceRes] = await db.query(
  `UPDATE report_master
      SET single_user_price = 2500 + (id % 16) * 100,
          multi_user_price  = ROUND((2500 + (id % 16) * 100) * 1.6),
          corp_user_price   = ROUND((2500 + (id % 16) * 100) * 2.2),
          pages             = COALESCE(pages, 120 + (id % 40) * 5),
          updated_at        = NOW()
    WHERE is_active = 1 AND single_user_price IS NULL`
);

const [[blogCount]] = await db.query(`SELECT COUNT(*) n FROM blog_master WHERE status='published'`);
const [[pricedCount]] = await db.query(`SELECT COUNT(*) n FROM report_master WHERE is_active=1 AND single_user_price IS NOT NULL`);

console.log(JSON.stringify({
  blogUpserts: blogInserted,
  blogPublishedTotal: blogCount.n,
  reportsPricedThisRun: priceRes.affectedRows,
  reportsPricedTotal: pricedCount.n,
}, null, 2));

await db.end();
