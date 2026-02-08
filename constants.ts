import { SEOProject, Pillar, Category, Task, TodoItem, ToolCategory, MarketingTool } from './types';

// Helper to generate IDs
const uid = () => Math.random().toString(36).substr(2, 9);

// Mapped data from the provided "223 Point Audit", "100 Tips", and "GMB Checklist"
export const technicalPillar: Pillar = {
  id: 'tech_seo',
  title: 'Technical SEO',
  description: 'Foundation, Crawlability, Performance, and Security.',
  iconName: 'Server',
  categories: [
    {
      id: 'tech_checklist_2025',
      title: '2025 Technical Checklist',
      description: 'Critical technical items from the 2025 Cheat Sheet.',
      tasks: [
        { id: uid(), category_id: 'tech_checklist_2025', question: 'Optimize Page Speed', completed: false, impact: 'Critical' },
        { id: uid(), category_id: 'tech_checklist_2025', question: 'Fix Indexing Errors in GSC', completed: false, impact: 'Critical' },
        { id: uid(), category_id: 'tech_checklist_2025', question: 'Use Mobile-Friendly Themes', completed: false, impact: 'High' },
        { id: uid(), category_id: 'tech_checklist_2025', question: 'Minify JavaScript and CSS', completed: false, impact: 'Medium' },
        { id: uid(), category_id: 'tech_checklist_2025', question: 'Avoid Orphan Pages', completed: false, impact: 'Medium' }
      ]
    },
    {
      id: 'google_foundation',
      title: 'Google Foundation',
      description: 'Essential setup for Google tools.',
      tasks: [
        { id: uid(), category_id: 'google_foundation', question: 'Is Google Analytics 4 (GA4) Installed?', completed: true, impact: 'Critical', resourceUrl: 'https://analytics.google.com/' },
        { id: uid(), category_id: 'google_foundation', question: 'Is Search Console setup and verified?', completed: true, impact: 'Critical', resourceUrl: 'https://search.google.com/search-console' },
        { id: uid(), category_id: 'google_foundation', question: 'Is there a sitemap.xml file submitted?', completed: true, impact: 'High' },
        { id: uid(), category_id: 'google_foundation', question: 'Is there a Google News sitemap (if applicable)?', completed: false, impact: 'Medium' },
        { id: uid(), category_id: 'google_foundation', question: 'Check for manual actions in GSC', completed: false, impact: 'Critical' },
      ]
    },
    {
      id: 'architecture',
      title: 'Site Architecture & Crawlability',
      description: 'Ensuring bots can read your site.',
      tasks: [
        { id: uid(), category_id: 'architecture', question: 'Robots.txt present and configured correctly?', completed: false, impact: 'High' },
        { id: uid(), category_id: 'architecture', question: 'Check for Pagination Loops', completed: false, impact: 'Medium' },
        { id: uid(), category_id: 'architecture', question: 'Ensure no Redirect Chains exist', completed: false, impact: 'High' },
        { id: uid(), category_id: 'architecture', question: 'Verify Canonical Tags on all pages', completed: false, impact: 'High' },
        { id: uid(), category_id: 'architecture', question: 'Custom 404 Error Page configured?', completed: true, impact: 'Medium' },
        { id: uid(), category_id: 'architecture', question: 'Are URL structures clean (no uppercase, readable)?', completed: false, impact: 'Medium' },
      ]
    },
    {
      id: 'performance',
      title: 'Performance & Speed',
      description: 'Core Web Vitals and loading times.',
      tasks: [
        { id: uid(), category_id: 'performance', question: 'Passes Core Web Vitals (LCP, FID, CLS)?', completed: false, impact: 'High', resourceUrl: 'https://pagespeed.web.dev/' },
        { id: uid(), category_id: 'performance', question: 'Is GZIP/Brotli compression enabled?', completed: false, impact: 'High' },
        { id: uid(), category_id: 'performance', question: 'Is Caching enabled (e.g., WP Rocket)?', completed: false, impact: 'High' },
        { id: uid(), category_id: 'performance', question: 'Are images optimized (Next-Gen formats)?', completed: false, impact: 'Medium' },
      ]
    },
    {
      id: 'security',
      title: 'Security',
      description: 'SSL and safety.',
      tasks: [
        { id: 'ssl_task', category_id: 'security', question: 'Is HTTPS/SSL Certificate active?', completed: false, impact: 'Critical' },
        { id: uid(), category_id: 'security', question: 'Is HSTS policy in place?', completed: false, impact: 'Medium' },
        { id: uid(), category_id: 'security', question: 'Check for Malware in GSC', completed: true, impact: 'Critical' },
      ]
    }
  ]
};

export const onPagePillar: Pillar = {
  id: 'on_page',
  title: 'On-Page SEO',
  description: 'Content quality, keywords, and HTML tags.',
  iconName: 'FileText',
  categories: [
    {
      id: '01_keyword_research',
      title: '01 Keyword Research',
      description: 'Foundation of On-Page Strategy.',
      tasks: [
        { id: uid(), category_id: '01_keyword_research', question: 'Target One Keyword Per Page', completed: false, impact: 'Critical' },
        { id: uid(), category_id: '01_keyword_research', question: 'Choose Less Competitive Keywords', completed: false, impact: 'High' },
        { id: uid(), category_id: '01_keyword_research', question: 'Align Keywords with User Intent', completed: false, impact: 'Critical' },
        { id: uid(), category_id: '01_keyword_research', question: 'Check Monthly Search Volume', completed: false, impact: 'Medium' },
        { id: uid(), category_id: '01_keyword_research', question: 'Analyze Keyword Trends on Google Trends', completed: false, impact: 'Low' },
        { id: uid(), category_id: '01_keyword_research', question: 'Research Long-Tail Keywords', completed: false, impact: 'High' }
      ]
    },
    {
      id: '02_content',
      title: '02 Content',
      description: 'Quality and structure of the main content.',
      tasks: [
        { id: uid(), category_id: '02_content', question: '1000+ Words (Content Depth)', completed: false, impact: 'High' },
        { id: uid(), category_id: '02_content', question: 'Paragraphs < 20 Words', completed: false, impact: 'Medium' },
        { id: uid(), category_id: '02_content', question: 'Use Bullet Points and Subheadings', completed: false, impact: 'Medium' },
        { id: uid(), category_id: '02_content', question: 'Content is Unique, Accurate, and Human-Like', completed: false, impact: 'Critical' },
        { id: uid(), category_id: '02_content', question: 'Content is Actionable and Value-Adding', completed: false, impact: 'High' },
        { id: uid(), category_id: '02_content', question: 'Include Numbers, Facts, and Figures', completed: false, impact: 'Medium' },
        { id: uid(), category_id: '02_content', question: 'Highlight Key Information', completed: false, impact: 'Low' },
        { id: uid(), category_id: '02_content', question: 'Use Info Boxes / Callouts', completed: false, impact: 'Low' }
      ]
    },
    {
      id: '03_page_title',
      title: '03 Page Title',
      description: 'Optimizing the Title Tag.',
      tasks: [
        { id: uid(), category_id: '03_page_title', question: 'Target One Keyword in Title', completed: false, impact: 'Critical' },
        { id: uid(), category_id: '03_page_title', question: 'Limit to 60 Characters', completed: false, impact: 'High' },
        { id: uid(), category_id: '03_page_title', question: 'Deliver Promised Content', completed: false, impact: 'Medium' },
        { id: uid(), category_id: '03_page_title', question: 'Use Odd Numbers and Emotional Words', completed: false, impact: 'Low' },
        { id: uid(), category_id: '03_page_title', question: 'Localize for Location-Based Searches', completed: false, impact: 'Medium' }
      ]
    },
    {
      id: '04_url',
      title: '04 URL Structure',
      description: 'Clean and descriptive URLs.',
      tasks: [
        { id: uid(), category_id: '04_url', question: 'Include Main Keyword in URL', completed: false, impact: 'High' },
        { id: uid(), category_id: '04_url', question: "Use Hyphens ('-') for Spaces", completed: false, impact: 'Medium' }
      ]
    },
    {
      id: '05_meta_description',
      title: '05 Meta Description',
      description: 'Optimizing for CTR.',
      tasks: [
        { id: uid(), category_id: '05_meta_description', question: '150 Characters or Less', completed: false, impact: 'Medium' },
        { id: uid(), category_id: '05_meta_description', question: 'Include Target Keyword Naturally', completed: false, impact: 'High' },
        { id: uid(), category_id: '05_meta_description', question: 'Add CTA and Provide Value', completed: false, impact: 'Medium' }
      ]
    },
    {
      id: '06_keyword_placement',
      title: '06 Keyword Placement',
      description: 'Strategic locations for keywords.',
      tasks: [
        { id: uid(), category_id: '06_keyword_placement', question: 'In H1 Tag', completed: false, impact: 'Critical' },
        { id: uid(), category_id: '06_keyword_placement', question: 'In URL', completed: false, impact: 'High' },
        { id: uid(), category_id: '06_keyword_placement', question: 'In First 100 Words', completed: false, impact: 'High' },
        { id: uid(), category_id: '06_keyword_placement', question: 'In Image File Names', completed: false, impact: 'Medium' },
        { id: uid(), category_id: '06_keyword_placement', question: 'In H2 and H3 Headings', completed: false, impact: 'High' },
        { id: uid(), category_id: '06_keyword_placement', question: 'In Meta Description', completed: false, impact: 'Medium' },
        { id: uid(), category_id: '06_keyword_placement', question: 'In Title Tag', completed: false, impact: 'Critical' },
        { id: uid(), category_id: '06_keyword_placement', question: 'In Alt Text of Images', completed: false, impact: 'Medium' },
        { id: uid(), category_id: '06_keyword_placement', question: 'Naturally Distributed in Body Content', completed: false, impact: 'High' },
        { id: uid(), category_id: '06_keyword_placement', question: 'At End of Content / Conclusion', completed: false, impact: 'Low' }
      ]
    },
    {
      id: '07_images',
      title: '07 Images',
      description: 'Visual content optimization.',
      tasks: [
        { id: uid(), category_id: '07_images', question: 'Use WebP Format', completed: false, impact: 'High' },
        { id: uid(), category_id: '07_images', question: 'File Size < 100 KB', completed: false, impact: 'High' },
        { id: uid(), category_id: '07_images', question: 'Include 4-5 High-Quality Images', completed: false, impact: 'Medium' },
        { id: uid(), category_id: '07_images', question: 'Use Infographics and Unique Visuals', completed: false, impact: 'Medium' },
        { id: uid(), category_id: '07_images', question: 'Width < 1280x720 Pixels (for content width)', completed: false, impact: 'Low' },
        { id: uid(), category_id: '07_images', question: 'Alt Text and File Names with Keywords', completed: false, impact: 'High' }
      ]
    },
    {
      id: '08_schema_markup',
      title: '08 Schema Markup',
      description: 'Structured data implementation.',
      tasks: [
        { id: uid(), category_id: '08_schema_markup', question: 'Go to Google\'s schema helper / Generator', completed: false, impact: 'Medium' },
        { id: uid(), category_id: '08_schema_markup', question: 'Add Relevant Schemas (Article, FAQ, Product, etc.)', completed: false, impact: 'High' },
        { id: uid(), category_id: '08_schema_markup', question: 'Place code in Header', completed: false, impact: 'High' },
        { id: uid(), category_id: '08_schema_markup', question: 'Use Schema on Every Page', completed: false, impact: 'Medium' },
        { id: uid(), category_id: '08_schema_markup', question: 'Test Your Schema', completed: false, impact: 'Critical' }
      ]
    },
    {
      id: '09_internal_external',
      title: '09 Internal & External Links',
      description: 'Connecting content.',
      tasks: [
        { id: uid(), category_id: '09_internal_external', question: '3-5 Internal Links per page', completed: false, impact: 'High' },
        { id: uid(), category_id: '09_internal_external', question: 'Exact or Partial Match Anchor Texts', completed: false, impact: 'Medium' },
        { id: uid(), category_id: '09_internal_external', question: 'External Links Open in New Tabs', completed: false, impact: 'Low' },
        { id: uid(), category_id: '09_internal_external', question: '3+ Keyword-Matched Internal Links', completed: false, impact: 'High' },
        { id: uid(), category_id: '09_internal_external', question: '1-3 High-Quality Do-Follow/No-Follow External Links', completed: false, impact: 'Medium' }
      ]
    }
  ]
};

export const offPagePillar: Pillar = {
  id: 'off_page',
  title: 'Off-Page SEO',
  description: 'Backlinks, Social Signals, and PR.',
  iconName: 'Globe',
  isLocked: true,
  categories: [
    {
      id: 'backlinks',
      title: 'Link Building',
      description: 'Acquiring authority links.',
      tasks: [] // Hidden content
    }
  ]
};

export const localPillar: Pillar = {
  id: 'local_seo',
  title: 'Local / GMB SEO',
  description: 'Ranking in the Map Pack.',
  iconName: 'MapPin',
  isLocked: true,
  categories: [
    {
      id: 'gmb_basics',
      title: 'Google Business Profile',
      description: 'Setup and verification.',
      tasks: []
    }
  ]
};

// --- New Pillars ---

export const seoAuditPillar: Pillar = {
  id: 'seo_audit',
  title: 'SEO Audit',
  description: 'Initial site assessment and health check.',
  iconName: 'ClipboardList',
  categories: [
    {
      id: 'audit_basics',
      title: 'Initial Assessment',
      description: 'High-level site overview.',
      tasks: [
        { id: uid(), category_id: 'audit_basics', question: 'Check Domain Authority', completed: false, impact: 'High' },
        { id: uid(), category_id: 'audit_basics', question: 'Check Total Indexed Pages', completed: false, impact: 'Critical' },
        { id: uid(), category_id: 'audit_basics', question: 'Identify Organic Traffic Base', completed: false, impact: 'Medium' }
      ]
    }
  ]
};

// Helper for Premium Pillars
const createLockedPillar = (id: string, title: string, iconName: string = 'Lock'): Pillar => ({
  id,
  title,
  description: 'Premium Checklist Strategy',
  iconName,
  isLocked: true,
  categories: [{ id: id + '_cat', title: title + ' Checklist', description: 'Unlock to view tasks', tasks: [] }]
});

export const imageSeoPillar = createLockedPillar('image_seo', 'Image SEO', 'Image');
export const videoSeoPillar = createLockedPillar('video_seo', 'Video SEO', 'Video');
export const aioSeoPillar = createLockedPillar('aio_seo', 'AIO SEO', 'Bot');
export const sgeSeoPillar = createLockedPillar('sge_seo', 'SGE SEO', 'Search');
export const geoSeoPillar = createLockedPillar('geo_seo', 'GEO SEO', 'Globe');
export const aeoSeoPillar = createLockedPillar('aeo_seo', 'AEO SEO', 'Mic'); // Answer Engine Optimization
export const progSeoPillar = createLockedPillar('prog_seo', 'Programmatic SEO', 'Database');
export const youtubeSeoPillar = createLockedPillar('youtube_seo', 'YouTube SEO', 'Youtube');
export const wordpressSeoPillar = createLockedPillar('wp_seo', 'WordPress SEO', 'Layout');
export const shopifySeoPillar = createLockedPillar('shopify_seo', 'Shopify SEO', 'ShoppingBag');
export const ecommerceSeoPillar = createLockedPillar('ecom_seo', 'Ecommerce SEO', 'ShoppingCart');
export const saasSeoPillar = createLockedPillar('saas_seo', 'SaaS SEO', 'Cloud');

const defaultBasicDetails = {
  companyName: '',
  website: '',
  businessType: 'Service',
  industry: '',
  targetLocation: 'Global',
  projectDescription: '',
  mainProducts: '',
  targetKeywords: '',
  priorityPages: '',
  contactName: '',
  email: '',
  phone: '',
  whatsapp: '',
  address: '',
  socialHandles: {
    facebook: '', instagram: '', twitter: '', linkedin: '', youtube: '',
    pinterest: '', reddit: '', quora: '', medium: '', substack: ''
  },
  cms: '',
  hasPastSeo: false,
  accessGsc: null,
  accessGa4: null,
  accessGbp: null,
  accessGtm: null,
  monthlyReportRequired: false,
  robotsTxtUrl: '',
  sitemapUrl: '',
  competitors: ['', '', '']
};

export const INITIAL_PROJECTS: SEOProject[] = [
  {
    id: 'proj_1',
    name: 'Acme Corp Main Site',
    domain: 'https://acme-corp.com',
    logo: 'https://www.google.com/s2/favicons?domain=google.com&sz=128',
    lastAuditDate: '2023-10-24',
    score: 42,
    pillars: [
      JSON.parse(JSON.stringify(seoAuditPillar)),
      JSON.parse(JSON.stringify(technicalPillar)),
      JSON.parse(JSON.stringify(onPagePillar)),
      JSON.parse(JSON.stringify(offPagePillar)),
      JSON.parse(JSON.stringify(localPillar)),
      JSON.parse(JSON.stringify(imageSeoPillar)),
      JSON.parse(JSON.stringify(videoSeoPillar)),
      JSON.parse(JSON.stringify(aioSeoPillar)),
      JSON.parse(JSON.stringify(sgeSeoPillar)),
      JSON.parse(JSON.stringify(geoSeoPillar)),
      JSON.parse(JSON.stringify(aeoSeoPillar)),
      JSON.parse(JSON.stringify(progSeoPillar)),
      JSON.parse(JSON.stringify(youtubeSeoPillar)),
      JSON.parse(JSON.stringify(wordpressSeoPillar)),
      JSON.parse(JSON.stringify(shopifySeoPillar)),
      JSON.parse(JSON.stringify(ecommerceSeoPillar)),
      JSON.parse(JSON.stringify(saasSeoPillar))
    ],
    basicDetails: {
      ...defaultBasicDetails,
      companyName: 'Acme Corporation Inc.',
      website: 'https://acme-corp.com',
      contactName: 'Client Name',
      email: 'contact@acme.com',
      industry: 'Technology'
    }
  }
];

const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split('T')[0];

export const INITIAL_TODOS: TodoItem[] = [
  // Today's Tasks
  { id: '1', text: 'Welcome! Create your first task', date: today, completed: false },
  { id: '2', text: 'Create tasks as Personal or Project-based', date: today, completed: false },
  { id: '3', text: 'Personal tasks → Show only in To-Do', date: today, completed: false },
  { id: '4', text: 'Project tasks → Show inside your Project Workspace', date: today, completed: false },
  { id: '5', text: 'Check how the 30-day consistency tracker works', date: today, completed: false },

  // Yesterday's Tasks
  { id: '6', text: 'See how pending tasks are highlighted', date: yesterday, completed: false },
  { id: '7', text: 'Learn how to rearrange tasks by priority', date: yesterday, completed: true },
];

export const ONBOARDING_TODOS: TodoItem[] = [
  // Today's Onboarding Tasks
  { id: 'ob_1', text: 'Complete your Profile Details', date: today, completed: false },
  { id: 'ob_2', text: 'Create your First Project', date: today, completed: false },
  { id: 'ob_3', text: 'Explore the SEO Tools Directory', date: today, completed: false },

  // Overdue Task (to demonstrate "Pending" state and give a push)
  { id: 'ob_4', text: 'Verify your Account Email', date: yesterday, completed: false },
];

export const SEO_TOOLS_CATEGORIES: ToolCategory[] = [
  {
    id: 'keyword_research',
    title: 'Keyword Research',
    subtitle: 'Discovery & Analysis',
    iconName: 'Search',
    tools: [
      { id: uid(), name: 'Google Keyword Planner', description: 'The OG keyword research tool directly from Google Ads.', url: 'https://ads.google.com/aw/keywordplanner/home', priceModel: 'Free' },
      { id: uid(), name: 'Ahrefs Keywords Explorer', description: 'Deep keyword data including click metrics.', url: 'https://ahrefs.com/keywords-explorer', priceModel: 'Paid' },
      { id: uid(), name: 'SEMrush', description: 'Comprehensive keyword and competitive research.', url: 'https://www.semrush.com/', priceModel: 'Paid' },
      { id: uid(), name: 'Google Trends', description: 'Analyze keyword popularity over time.', url: 'https://trends.google.com/trends/', priceModel: 'Free' },
      { id: uid(), name: 'SpyFu', description: 'Competitor keyword research and PPC analysis.', url: 'https://www.spyfu.com/', priceModel: 'Paid' },
      { id: uid(), name: 'Exploding Topics', description: 'Discover rapidly growing topics before they peak.', url: 'https://explodingtopics.com/', priceModel: 'Freemium' },
      { id: uid(), name: 'AnswerThePublic', description: 'Visual search questions and prepositions.', url: 'https://answerthepublic.com/', priceModel: 'Freemium' },
      { id: uid(), name: 'Ubersuggest', description: 'Affordable keyword research by Neil Patel.', url: 'https://neilpatel.com/ubersuggest/', priceModel: 'Freemium' },
      { id: uid(), name: 'Ahrefs Keyword Generator', description: 'Generate keyword ideas for free.', url: 'https://ahrefs.com/keyword-generator', priceModel: 'Free' },
      { id: uid(), name: 'Ahrefs Keyword Difficulty', description: 'Check keyword difficulty score.', url: 'https://ahrefs.com/keyword-difficulty', priceModel: 'Free' }
    ]
  },
  {
    id: 'monitoring',
    title: 'Monitoring & Tracking',
    subtitle: 'Rankings & Uptime',
    iconName: 'Activity',
    tools: [
      { id: uid(), name: 'Google Search Console', description: 'Monitor search performance and index coverage.', url: 'https://search.google.com/search-console', priceModel: 'Free' },
      { id: uid(), name: 'Bing Webmaster Tools', description: 'Microsoft search performance insights.', url: 'https://www.bing.com/webmasters/', priceModel: 'Free' },
      { id: uid(), name: 'SE Ranking', description: 'All-in-one SEO software with accurate rank tracking.', url: 'https://seranking.com/', priceModel: 'Paid' },
      { id: uid(), name: 'Ahrefs Rank Tracker', description: 'Monitor keyword rankings over time.', url: 'https://ahrefs.com/keyword-rank-checker', priceModel: 'Paid' },
      { id: uid(), name: 'Ahrefs SERP Checker', description: 'Analyze top search results for any keyword.', url: 'https://ahrefs.com/serp-checker', priceModel: 'Paid' },
      { id: uid(), name: 'Traffic Checker (Similarweb)', description: 'Estimate website traffic and sources.', url: 'https://www.similarweb.com/', priceModel: 'Freemium' },
      { id: uid(), name: 'Siteliner', description: 'Identify duplicate content and broken links.', url: 'https://www.siteliner.com/', priceModel: 'Free' },
      { id: uid(), name: 'Broken Link Checker', description: 'Find broken links on any website.', url: 'https://www.brokenlinkcheck.com/', priceModel: 'Free' },
      { id: uid(), name: 'UptimeRobot', description: 'Website uptime monitoring.', url: 'https://uptimerobot.com/', priceModel: 'Freemium' }
    ]
  },
  {
    id: 'content_writing',
    title: 'Content & Writing',
    subtitle: 'Optimization & Quality',
    iconName: 'FileText',
    tools: [
      { id: uid(), name: 'Grammarly', description: 'AI-powered writing assistant for clarity and grammar.', url: 'https://www.grammarly.com/', priceModel: 'Freemium' },
      { id: uid(), name: 'Hemingway Editor', description: 'Make your writing bold and clear.', url: 'https://hemingwayapp.com/', priceModel: 'Free' },
      { id: uid(), name: 'QuillBot', description: 'Paraphrasing and summarizing tool.', url: 'https://quillbot.com/', priceModel: 'Freemium' },
      { id: uid(), name: 'ZeroGPT', description: 'Detect AI-generated content.', url: 'https://www.zerogpt.com/', priceModel: 'Free' },
      { id: uid(), name: 'Originality AI', description: 'AI content detector and plagiarism checker.', url: 'https://originality.ai/', priceModel: 'Paid' },
      { id: uid(), name: 'Markdown to HTML', description: 'Convert Markdown text to HTML code.', url: 'https://markdowntohtml.com/', priceModel: 'Free' },
      { id: uid(), name: 'SERP Preview', description: 'Visualize how your page looks in search results.', url: 'https://mangools.com/free-seo-tools/serp-simulator', priceModel: 'Free' },
    ]
  },
  {
    id: 'ai_seo',
    title: 'AI SEO Tools',
    subtitle: 'Automation & Ideas',
    iconName: 'Bot',
    tools: [
      { id: uid(), name: 'ChatGPT', description: 'OpenAI advanced conversational AI.', url: 'https://chat.openai.com/', priceModel: 'Freemium' },
      { id: uid(), name: 'Gemini (Google)', description: 'Google\'s largest reporting and AI model.', url: 'https://gemini.google/', priceModel: 'Free' },
      { id: uid(), name: 'AI SEO Outlines', description: 'Generate optimized content outlines.', url: 'https://ai-seo.com/', priceModel: 'Paid' },
    ]
  },
  {
    id: 'reporting',
    title: 'Analytics & Reporting',
    subtitle: 'Data Insights',
    iconName: 'BarChart3',
    tools: [
      { id: uid(), name: 'Google Analytics 4', description: 'Essential web analytics.', url: 'https://analytics.google.com/', priceModel: 'Free' },
      { id: uid(), name: 'Google Looker Studio', description: 'Turn data into customizable reports.', url: 'https://lookerstudio.google.com/', priceModel: 'Free' },
      { id: uid(), name: 'Clarity (Microsoft)', description: 'Heatmaps and session recording.', url: 'https://clarity.microsoft.com/', priceModel: 'Free' },
      { id: uid(), name: 'AgencyAnalytics', description: 'Reporting platform for agencies.', url: 'https://agencyanalytics.com/', priceModel: 'Paid' }
    ]
  },
  {
    id: 'wordpress',
    title: 'WordPress & CMS',
    subtitle: 'Plugins & Themes',
    iconName: 'Layout',
    tools: [
      { id: uid(), name: 'RankMath', description: 'The Swiss Army Knife of WordPress SEO.', url: 'https://rankmath.com/', priceModel: 'Freemium' },
      { id: uid(), name: 'Yoast SEO', description: 'The original SEO plugin for WordPress.', url: 'https://yoast.com/', priceModel: 'Freemium' }
    ]
  },
  {
    id: 'speed',
    title: 'Web Speed Tools',
    subtitle: 'Performance Optimization',
    iconName: 'Zap',
    tools: [
      { id: uid(), name: 'PageSpeed Insights', description: 'Google\'s tool to measure core web vitals.', url: 'https://pagespeed.web.dev/', priceModel: 'Free' },
      { id: uid(), name: 'GTmetrix', description: 'Website performance testing and monitoring.', url: 'https://gtmetrix.com/', priceModel: 'Freemium' },
      { id: uid(), name: 'WebPageTest', description: 'Deep performance analysis from multiple locations.', url: 'https://www.webpagetest.org/', priceModel: 'Free' }
    ]
  },
  {
    id: 'structured_data',
    title: 'Structured Data',
    subtitle: 'Schema & Rich Snippets',
    iconName: 'Code',
    tools: [
      { id: uid(), name: 'Schema Markup Generator', description: 'Generate JSON-LD schema markup easily.', url: 'https://technicalseo.com/tools/schema-markup-generator/', priceModel: 'Free' },
      { id: uid(), name: 'Rich Results Test', description: 'Test your public page to see which rich results can be generated.', url: 'https://search.google.com/test/rich-results', priceModel: 'Free' },
      { id: uid(), name: 'Schema.org Validator', description: 'Validate schema markup against standards.', url: 'https://validator.schema.org/', priceModel: 'Free' }
    ]
  }
];

export const SEO_EXTENSIONS_LIST: ToolCategory = {
  id: 'extensions',
  title: 'Browser Extensions',
  subtitle: 'Chrome & Edge Add-ons',
  iconName: 'Puzzle',
  tools: [
    { id: uid(), name: 'On-Page SEO Extension', description: 'Check technical SEO issues directly in Chrome.', url: 'https://chrome.google.com/webstore/', priceModel: 'Free' },
    { id: uid(), name: 'SEOquake', description: 'SEO metricsbar, SERP overlay, and more.', url: 'https://chrome.google.com/webstore/detail/seoquake/akdgnmcoglenhlplghghgglfeilllgnb', priceModel: 'Free' },
    { id: uid(), name: 'Detailed SEO Extension', description: 'Get detailed SEO insights in one click.', url: 'https://chrome.google.com/webstore/detail/detailed-seo-extension/pfjdepjjfctbkkjenheliggcnmorhhfx', priceModel: 'Free' },
    { id: uid(), name: 'Wappalyzer', description: 'Identify technologies used on websites.', url: 'https://www.wappalyzer.com/', priceModel: 'Freemium' }
  ]
};
