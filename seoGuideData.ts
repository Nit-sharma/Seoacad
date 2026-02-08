export interface SeoGuideItem {
    id: string;
    title: string;
    description: string;
    slug: string;
}

export interface SeoGuideCategory {
    id: string;
    title: string;
    icon?: string;
    items: SeoGuideItem[];
}

export const SEO_GUIDE_DATA: SeoGuideCategory[] = [
    {
        id: 'core_strategies',
        title: 'CORE STRATEGIES',
        items: [
            { id: 'on_page', title: 'On-page SEO', description: 'Strategies for optimizing individual web pages.', slug: 'on-page-seo' },
            { id: 'off_page', title: 'Off-page SEO', description: 'Actions taken outside of your own website to impact rankings.', slug: 'off-page-seo' },
            { id: 'technical', title: 'Technical SEO', description: 'Website and server optimizations that help search engine spiders crawl and index your site.', slug: 'technical-seo' },
        ]
    },
    {
        id: 'chatbot_opt',
        title: 'Chatbot Optimization',
        items: [
            { id: 'aio', title: 'AIO SEO', description: 'Artificial Intelligence Optimization.', slug: 'aio-seo' },
            { id: 'sge', title: 'SGE SEO', description: 'Search Generative Experience optimization.', slug: 'sge-seo' },
            { id: 'geo', title: 'GEO SEO', description: 'Generative Engine Optimization.', slug: 'geo-seo' },
            { id: 'aeo', title: 'AEO SEO', description: 'Answer Engine Optimization.', slug: 'aeo-seo' },
            { id: 'sxo', title: 'SXO SEO', description: 'Search Experience Optimization.', slug: 'sxo-seo' },
            { id: 'programmatic', title: 'Programmatic SEO', description: 'Large-scale landing page creation.', slug: 'programmatic-seo' },
        ]
    },
    {
        id: 'social_opt',
        title: 'Social Optimization',
        items: [
            { id: 'youtube', title: 'YouTube SEO', description: 'Video ranking optimization.', slug: 'youtube-seo' },
            { id: 'reddit', title: 'Reddit SEO', description: 'Optimization for Reddit visibility.', slug: 'reddit-seo' },
            { id: 'quora', title: 'Quora SEO', description: 'Ranking answers on Quora.', slug: 'quora-seo' },
            { id: 'linkedin', title: 'LinkedIn SEO', description: 'Profile and content optimization.', slug: 'linkedin-seo' },
            { id: 'pinterest', title: 'Pinterest SEO', description: 'Visual search optimization.', slug: 'pinterest-seo' },
            { id: 'instagram', title: 'Instagram SEO', description: 'Optimization for IG discovery.', slug: 'instagram-seo' },
            { id: 'facebook', title: 'Facebook SEO', description: 'Page and content optimization.', slug: 'facebook-seo' },
            { id: 'twitter', title: 'Twitter/X SEO', description: 'Tweet visibility and profile optimization.', slug: 'twitter-seo' },
            { id: 'medium', title: 'Medium SEO', description: 'Ranking Medium articles.', slug: 'medium-seo' },
            { id: 'substack', title: 'Substack SEO', description: 'Newsletter discovery optimization.', slug: 'substack-seo' },
            { id: 'tiktok', title: 'TikTok SEO', description: 'Short-form video optimization.', slug: 'tiktok-seo' },
        ]
    },
    {
        id: 'formats_opt',
        title: 'FORMATS Optimization',
        items: [
            { id: 'content', title: 'Content SEO', description: 'Optimizing written content.', slug: 'content-seo' },
            { id: 'image', title: 'Image SEO', description: 'Optimizing images for search.', slug: 'image-seo' },
            { id: 'video', title: 'Video SEO', description: 'Optimizing video content.', slug: 'video-seo' },
            { id: 'voice', title: 'Voice SEO', description: 'Optimizing for voice search.', slug: 'voice-seo' },
            { id: 'multimedia', title: 'Multimedia SEO', description: 'Optimizing various media formats.', slug: 'multimedia-seo' },
        ]
    },
    {
        id: 'industry_specific',
        title: 'Industry Specific Optimization',
        items: [
            { id: 'ecommerce', title: 'Ecommerce SEO', description: 'Shop optimization.', slug: 'ecommerce-seo' },
            { id: 'enterprise', title: 'Enterprise SEO', description: 'Large scale site optimization.', slug: 'enterprise-seo' },
            { id: 'business', title: 'Business SEO', description: 'General business optimization.', slug: 'business-seo' },
            { id: 'organization', title: 'Organization SEO', description: 'Non-profit and org optimization.', slug: 'organization-seo' },
            { id: 'saas', title: 'SaaS SEO', description: 'Software as a Service optimization.', slug: 'saas-seo' },
            { id: 'b2b', title: 'B2B SEO', description: 'Business to Business optimization.', slug: 'b2b-seo' },
            { id: 'b2c', title: 'B2C SEO', description: 'Business to Consumer optimization.', slug: 'b2c-seo' },
            { id: 'portfolio', title: 'Portfolio SEO', description: 'Creative portfolio optimization.', slug: 'portfolio-seo' },
            { id: 'affiliate', title: 'Affiliate SEO', description: 'Affiliate site optimization.', slug: 'affiliate-seo' },
            { id: 'healthcare', title: 'Healthcare SEO', description: 'Medical and health optimization.', slug: 'healthcare-seo' },
            { id: 'real_estate', title: 'Real Estate SEO', description: 'Property site optimization.', slug: 'real-estate-seo' },
            { id: 'news', title: 'News SEO', description: 'Publisher optimization.', slug: 'news-seo' },
            { id: 'podcast', title: 'Podcast SEO', description: 'Audio content optimization.', slug: 'podcast-seo' },
            { id: 'travel', title: 'Travel SEO', description: 'Travel site optimization.', slug: 'travel-seo' },
            { id: 'marketplace', title: 'Marketplace SEO', description: 'Two-sided market optimization.', slug: 'marketplace-seo' },
            { id: 'landing_page', title: 'Landing Page SEO', description: 'Single page optimization.', slug: 'landing-page-seo' },
            { id: 'blog', title: 'Blog SEO', description: 'Blog post optimization.', slug: 'blog-seo' },
            { id: 'law_firm', title: 'Law Firm SEO', description: 'Legal practice optimization.', slug: 'law-firm-seo' },
            { id: 'fintech', title: 'Fintech SEO', description: 'Financial technology optimization.', slug: 'fintech-seo' },
            { id: 'edtech', title: 'EdTech SEO', description: 'Educational tech optimization.', slug: 'edtech-seo' },
            { id: 'home_services', title: 'Home Services SEO', description: 'Service provider optimization.', slug: 'home-services-seo' },
            { id: 'automotive', title: 'Automotive SEO', description: 'Car industry optimization.', slug: 'automotive-seo' },
            { id: 'crypto', title: 'Crypto & Web3 SEO', description: 'Blockchain space optimization.', slug: 'crypto-seo' },
            { id: 'hospitality', title: 'Hospitality SEO', description: 'Hotel and leisure optimization.', slug: 'hospitality-seo' },
            { id: 'logistics', title: 'Logistics SEO', description: 'Transport and supply chain.', slug: 'logistics-seo' },
        ]
    },
    {
        id: 'geo_targeting',
        title: 'GEOTargeting Optimization',
        items: [
            { id: 'local', title: 'Local SEO', description: 'Ranking in local map packs.', slug: 'local-seo' },
            { id: 'international', title: 'International SEO', description: 'Global ranking strategies.', slug: 'international-seo' },
            { id: 'multilingual', title: 'Multilingual SEO', description: 'Ranking in multiple languages.', slug: 'multilingual-seo' },
        ]
    },
    {
        id: 'store_opt',
        title: 'Store Optimization',
        items: [
            { id: 'amazon', title: 'Amazon SEO', description: 'Ranking products on Amazon.', slug: 'amazon-seo' },
            { id: 'etsy', title: 'Etsy SEO', description: 'Ranking on Etsy.', slug: 'etsy-seo' },
            { id: 'ebay', title: 'eBay SEO', description: 'Ranking on eBay.', slug: 'ebay-seo' },
            { id: 'walmart', title: 'Walmart SEO', description: 'Ranking on Walmart.', slug: 'walmart-seo' },
            { id: 'app_store', title: 'App Store SEO', description: 'ASO for iOS App Store.', slug: 'app-store-seo' },
            { id: 'play_store', title: 'Play Store SEO', description: 'ASO for Google Play.', slug: 'play-store-seo' },
            { id: 'gmb', title: 'GMB SEO', description: 'Google Business Profile optimization.', slug: 'gmb-seo' },
        ]
    },
    {
        id: 'cms_builders',
        title: 'CMS & Builders Optimization',
        items: [
            { id: 'wordpress', title: 'WordPress SEO', description: 'Optimizing WP sites.', slug: 'wordpress-seo' },
            { id: 'shopify', title: 'Shopify SEO', description: 'Optimizing Shopify stores.', slug: 'shopify-seo' },
            { id: 'wix', title: 'Wix SEO', description: 'Optimizing Wix sites.', slug: 'wix-seo' },
            { id: 'squarespace', title: 'Squarespace SEO', description: 'Optimizing Squarespace sites.', slug: 'squarespace-seo' },
            { id: 'framer', title: 'Framer SEO', description: 'Optimizing Framer sites.', slug: 'framer-seo' },
            { id: 'webflow', title: 'Webflow SEO', description: 'Optimizing Webflow sites.', slug: 'webflow-seo' },
            { id: 'hubspot', title: 'HubSpot SEO', description: 'Optimizing HubSpot CMS.', slug: 'hubspot-seo' },
            { id: 'ghost', title: 'Ghost SEO', description: 'Optimizing Ghost blogs.', slug: 'ghost-seo' },
            { id: 'magento', title: 'Magento SEO', description: 'Optimizing Magento stores.', slug: 'magento-seo' },
        ]
    },
    {
        id: 'seo_tactics',
        title: 'SEO TACTICS',
        items: [
            { id: 'semantic', title: 'Semantic SEO', description: 'Optimizing for meaning and topics.', slug: 'semantic-seo' },
            { id: 'white_hat', title: 'White Hat SEO', description: 'Ethical SEO strategies.', slug: 'white-hat-seo' },
            { id: 'gray_hat', title: 'Gray Hat SEO', description: 'Risky strategies.', slug: 'gray-hat-seo' },
            { id: 'black_hat', title: 'Black Hat SEO', description: 'Unethical strategies.', slug: 'black-hat-seo' },
            { id: 'negative', title: 'Negative SEO', description: 'Protecting against attacks.', slug: 'negative-seo' },
            { id: 'parasite', title: 'Parasite SEO', description: 'Leveraging authority sites.', slug: 'parasite-seo' },
            { id: 'informational', title: 'Informational SEO', description: 'Optimizing for info intent.', slug: 'informational-seo' },
            { id: 'transactional', title: 'Transactional SEO', description: 'Optimizing for purchase intent.', slug: 'transactional-seo' },
            { id: 'navigational', title: 'Navigational SEO', description: 'Optimizing for brand search.', slug: 'navigational-seo' },
        ]
    },
    {
        id: 'seo_framework',
        title: 'SEO Framework',
        items: [
            { id: 'javascript', title: 'JavaScript SEO', description: 'Optimizing JS-heavy sites.', slug: 'javascript-seo' },
            { id: 'react', title: 'React SEO', description: 'Optimizing React apps.', slug: 'react-seo' },
            { id: 'nextjs', title: 'NextJs SEO', description: 'Optimizing Next.js apps.', slug: 'nextjs-seo' },
            { id: 'headless', title: 'Headless SEO', description: 'SEO for headless CMS.', slug: 'headless-seo' },
        ]
    }
];
