import React, { useState, useEffect } from 'react';
import {
  Layers,
  Code,
  Link as LinkIcon,
  GraduationCap,
  PlayCircle,
  Clock,
  Target,
  Search,
  Server,
  FileText,
  Globe,
  ClipboardCheck,
  BarChart3,
  Cpu,
  Briefcase,
  ExternalLink
} from 'lucide-react';

const GUIDE_CATEGORIES = [
  {
    id: 'basics',
    title: 'SEO Basics',
    subtitle: 'Understanding the Fundamentals',
    icon: Layers,
    modules: [
      { title: "Search Engine Optimization (SEO) Starter Guide", author: "Google Search Central", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
      { title: "The Beginner's Guide to SEO", author: "Moz", url: "https://moz.com/beginners-guide-to-seo" },
      { title: "How Search Works", author: "Google", url: "https://www.google.com/search/howsearchworks/" },
      { title: "How Search Engines Work: Crawling Indexing and Ranking", author: "Ahrefs", url: "https://ahrefs.com/blog/how-search-engines-work/" },
      { title: "SEO Glossary: 200+ Terms Explained", author: "Search Engine Journal", url: "https://www.searchenginejournal.com/seo-glossary-terms/" }
    ]
  },
  {
    id: 'strategy',
    title: 'Strategy',
    subtitle: 'Planning & KPIs',
    icon: Target,
    modules: [
      { title: "How to Create an SEO Strategy for 2024", author: "HubSpot", url: "https://blog.hubspot.com/marketing/seo-strategy" },
      { title: "The Ultimate Guide to SEO Strategy", author: "Semrush", url: "https://www.semrush.com/blog/seo-strategy/" },
      { title: "SEO KPIs to Track", author: "Ahrefs", url: "https://ahrefs.com/blog/seo-kpis/" },
      { title: "How to Do an SEO Competitor Analysis", author: "Moz", url: "https://moz.com/blog/seo-competitive-analysis" }
    ]
  },
  {
    id: 'keyword_research',
    title: 'Keyword Research',
    subtitle: 'Intent & Discovery',
    icon: Search,
    modules: [
      { title: "Keyword Research: The Beginner's Guide", author: "Ahrefs", url: "https://ahrefs.com/blog/keyword-research/" },
      { title: "What is Search Intent? A Complete Guide", author: "Backlinko", url: "https://backlinko.com/search-intent" },
      { title: "Long Tail Keywords: What They Are", author: "Ahrefs", url: "https://ahrefs.com/blog/long-tail-keywords/" },
      { title: "Keyword Mapping: The Visual Guide", author: "Moz", url: "https://moz.com/blog/keyword-mapping" }
    ]
  },
  {
    id: 'technical',
    title: 'Technical SEO',
    subtitle: 'Crawl, Index, Rank',
    icon: Server,
    modules: [
      { title: "Googlebot: Everything You Need to Know", author: "Search Engine Journal", url: "https://www.searchenginejournal.com/googlebot/" },
      { title: "Robots.txt Introduction", author: "Google Search Central", url: "https://developers.google.com/search/docs/advanced/robots/intro" },
      { title: "What is a Sitemap?", author: "Google Search Central", url: "https://developers.google.com/search/docs/advanced/sitemaps/overview" },
      { title: "Noindex tag functionality", author: "Google Search Central", url: "https://developers.google.com/search/docs/advanced/crawling/block-indexing" },
      { title: "Understanding JavaScript SEO", author: "Onely", url: "https://www.onely.com/blog/ultimate-guide-javascript-seo/" },
      { title: "HTTP Status Codes for SEO", author: "ContentKing", url: "https://www.contentkingapp.com/academy/http-status-codes/" },
      { title: "Website Architecture for SEO", author: "Backlinko", url: "https://backlinko.com/hub/seo/architecture" },
      { title: "Internal Links for SEO: An Actionable Guide", author: "Ahrefs", url: "https://ahrefs.com/blog/internal-links/" },
      { title: "Core Web Vitals Report", author: "Google Search Central", url: "https://support.google.com/webmasters/answer/9205520" },
      { title: "Page Speed Optimization: The Guide", author: "Moz", url: "https://moz.com/learn/seo/page-speed" },
      { title: "Securing your site with HTTPS", author: "Google Search Central", url: "https://developers.google.com/search/docs/advanced/security/https" },
      { title: "Understand how structured data works", author: "Google Search Central", url: "https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data" },
      { title: "Schema.org Markup", author: "Schema.org", url: "https://schema.org/docs/gs.html" },
      { title: "Log File Analysis for SEO", author: "Screaming Frog", url: "https://www.screamingfrog.co.uk/log-file-analysis/" }
    ]
  },
  {
    id: 'content_seo',
    title: 'Content SEO',
    subtitle: 'On-Page Optimization',
    icon: FileText,
    modules: [
      { title: "On-Page SEO: The Beginner's Guide", author: "Ahrefs", url: "https://ahrefs.com/blog/on-page-seo/" },
      { title: "Title Tag SEO: Best Practices", author: "Moz", url: "https://moz.com/learn/seo/title-tag" },
      { title: "How to Write Meta Descriptions", author: "Semrush", url: "https://www.semrush.com/blog/meta-description/" },
      { title: "How to Use Header Tags for SEO", author: "Search Engine Journal", url: "https://www.searchenginejournal.com/header-tags-seo/" },
      { title: "Image SEO: 12 Actionable Tips", author: "Ahrefs", url: "https://ahrefs.com/blog/image-seo/" },
      { title: "Duplicate Content SEO Advice", author: "Google Search Central", url: "https://developers.google.com/search/docs/advanced/crawling/duplicate-content" },
      { title: "Canonical Tags: A Simple Guide", author: "Ahrefs", url: "https://ahrefs.com/blog/canonical-tags/" },
      { title: "Creating Helpful Reliable People-First Content (E-E-A-T)", author: "Google Search Central", url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" }
    ]
  },
  {
    id: 'link_building',
    title: 'Link Building',
    subtitle: 'Off-Page Strategy',
    icon: LinkIcon,
    modules: [
      { title: "What are Backlinks?", author: "Moz", url: "https://moz.com/learn/seo/backlinks" },
      { title: "The Beginner's Guide to Link Building", author: "Moz", url: "https://moz.com/beginners-guide-to-seo/growing-popularity-and-links" },
      { title: "Link Building for SEO: The Definitive Guide", author: "Backlinko", url: "https://backlinko.com/link-building" },
      { title: "Email Outreach for Link Building", author: "Ahrefs", url: "https://ahrefs.com/blog/email-outreach/" },
      { title: "Anchor Text: A Data-Driven Guide", author: "Ahrefs", url: "https://ahrefs.com/blog/anchor-text/" }
    ]
  },
  {
    id: 'specialized',
    title: 'Specialized SEO',
    subtitle: 'Local, Global, News',
    icon: Globe,
    modules: [
      { title: "The International SEO Guide", author: "Aleyda Solis", url: "https://www.aleydasolis.com/en/international-seo-guide/" },
      { title: "Hreflang: The Easy Guide", author: "Ahrefs", url: "https://ahrefs.com/blog/hreflang-tags/" },
      { title: "Local SEO: The Definitive Guide", author: "Backlinko", url: "https://backlinko.com/local-seo-guide" },
      { title: "Google Business Profile Help", author: "Google", url: "https://support.google.com/business/" },
      { title: "Ecommerce SEO Guide", author: "Shopify", url: "https://www.shopify.com/blog/ecommerce-seo" },
      { title: "Mobile-First Indexing Best Practices", author: "Google Search Central", url: "https://developers.google.com/search/docs/mobile-first-indexing" },
      { title: "Google News Publisher Help", author: "Google", url: "https://support.google.com/news/publisher-center/" }
    ]
  },
  {
    id: 'audits',
    title: 'SEO Audits',
    subtitle: 'Health Checks',
    icon: ClipboardCheck,
    modules: [
      { title: "The Ultimate SEO Audit Checklist", author: "Semrush", url: "https://www.semrush.com/blog/seo-audit-checklist/" },
      { title: "How to Perform a Technical SEO Audit", author: "Ahrefs", url: "https://ahrefs.com/blog/technical-seo-audit/" }
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics',
    subtitle: 'Reporting & Data',
    icon: BarChart3,
    modules: [
      { title: "Google Analytics 4 Guide for SEOs", author: "Search Engine Land", url: "https://searchengineland.com/google-analytics-4-guide-seo-343681" },
      { title: "Google Search Console Training", author: "Google Search Central YouTube", url: "https://www.youtube.com/playlist?list=PLKoqnv2vTMuNO_s9gX4u9s-25kG7l9T5h" },
      { title: "SEO Reporting: The Complete Guide", author: "Ahrefs", url: "https://ahrefs.com/blog/seo-reporting/" }
    ]
  },
  {
    id: 'automation',
    title: 'Automation',
    subtitle: 'Python & AI',
    icon: Cpu,
    modules: [
      { title: "Python for SEO: The Complete Guide", author: "Search Engine Journal", url: "https://www.searchenginejournal.com/python-seo-guide/" },
      { title: "ChatGPT for SEO: Use Cases", author: "Semrush", url: "https://www.semrush.com/blog/chatgpt-for-seo/" }
    ]
  },
  {
    id: 'careers',
    title: 'Careers',
    subtitle: 'Jobs & Freelancing',
    icon: Briefcase,
    modules: [
      { title: "How to Become an SEO Expert", author: "Ahrefs", url: "https://ahrefs.com/blog/how-to-become-an-seo-expert/" },
      { title: "The Freelance SEO Guide", author: "Aleyda Solis", url: "https://www.aleydasolis.com/en/freelance-seo-guide/" }
    ]
  }
];

interface NavigationTabProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const NavigationTab: React.FC<NavigationTabProps> = ({ title, subtitle, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all border ${active ? 'bg-purple-50 border-purple-200 shadow-sm' : 'bg-white border-transparent hover:bg-slate-50'}`}
  >
    <div className={`p-2 rounded-lg ${active ? 'bg-white text-purple-600 shadow-sm' : 'bg-slate-100 text-slate-500'}`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center mb-0.5">
        <span className={`text-sm font-bold truncate ${active ? 'text-purple-900' : 'text-slate-700'}`}>{title}</span>
      </div>
      <p className={`text-xs truncate ${active ? 'text-purple-600' : 'text-slate-400'}`}>{subtitle}</p>
    </div>
  </button>
);

const GuideView: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(GUIDE_CATEGORIES[0].id);

  // Initialize Google CSE script
  useEffect(() => {
    const scriptId = 'google-cse-script';
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = "https://cse.google.com/cse.js?cx=d39304b9953804803";
      script.async = true;
      script.id = scriptId;
      document.head.appendChild(script);
    } else {
      // If script exists, check if we need to re-initialize the search element
      // This is often needed in SPAs when navigation happens
      if ((window as any).google && (window as any).google.cse && (window as any).google.cse.element) {
        (window as any).google.cse.element.go();
      }
    }
  }, []);

  const activeCategory = GUIDE_CATEGORIES.find(c => c.id === activeCategoryId) || GUIDE_CATEGORIES[0];
  // Calculate total modules or points
  const totalModules = GUIDE_CATEGORIES.reduce((acc, cat) => acc + cat.modules.length, 0);

  return (
    <div className="animate-fade-in flex flex-col md:flex-row gap-8">
      {/* Left Sidebar */}
      <div className="w-full md:w-80 flex-shrink-0 space-y-6">
        {/* Summary Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col items-center relative overflow-hidden">
          <div className="text-center mb-4">
            <h3 className="font-bold text-slate-800 text-lg">Resources Board</h3>
          </div>
          <div className="relative w-32 h-32 flex items-center justify-center bg-purple-50 rounded-full mb-2">
            <GraduationCap size={48} className="text-purple-600" />
          </div>
          <div className="mt-2 text-center">
            <span className="text-3xl font-bold text-slate-800">
              {totalModules}
            </span>
            <p className="text-xs text-slate-400 mt-1">Total Resources</p>
          </div>
        </div>

        <nav className="space-y-1">
          {GUIDE_CATEGORIES.map(category => (
            <NavigationTab
              key={category.id}
              title={category.title}
              subtitle={category.subtitle}
              icon={<category.icon size={20} />}
              active={activeCategoryId === category.id}
              onClick={() => setActiveCategoryId(category.id)}
            />
          ))}
        </nav>
      </div>

      {/* Right Content */}
      <div className="flex-1">
        <div className="animate-fade-in">
          {/* Search Bar Container */}
          <div className="mb-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider flex items-center gap-2">
              <Search size={16} /> Search Resources
            </h3>
            <div className="gcse-search"></div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">{activeCategory.title}</h2>
            <p className="text-slate-500">{activeCategory.subtitle}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100">
              {activeCategory.modules.map((module: any, index) => (
                <div key={index} className="p-6 flex flex-col sm:flex-row items-start justify-between gap-4 hover:bg-slate-50 transition-colors group">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-slate-800">{module.title}</h4>
                      {module.duration && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-slate-100 text-slate-600 border-slate-200 flex items-center gap-1">
                          <Clock size={10} /> {module.duration}
                        </span>
                      )}
                      {module.author && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-blue-50 text-blue-600 border-blue-100 flex items-center gap-1">
                          <Target size={10} /> {module.author}
                        </span>
                      )}
                    </div>
                    {module.points ? (
                      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-1 mt-3">
                        {module.points.map((point: string, idx: number) => (
                          <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0"></span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-slate-500">Read this guide to master {activeCategory.title.replace(/[0-9.]/g, '').trim()}.</p>
                    )}
                  </div>

                  {module.url ? (
                    <a
                      href={module.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm group-hover:shadow-md whitespace-nowrap mt-1 sm:mt-0"
                    >
                      Read Guide <ExternalLink size={16} />
                    </a>
                  ) : (
                    <button
                      className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-purple-600 hover:border-purple-200 transition-all shadow-sm group-hover:shadow-md whitespace-nowrap mt-1 sm:mt-0"
                    >
                      View Checklist <PlayCircle size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideView;