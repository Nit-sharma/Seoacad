
import * as XLSX from 'xlsx';
import * as fs from 'fs';

// --- Data Definitions ---

const commonColumns = ["Category", "Checklist Item", "Description", "Priority", "Status", "Impact (1-10)", "Resource"];

const checklists = {
    "Core SEO": [
        // SEO Audit
        { category: "SEO Audit", item: "Check Indexing Status", description: "Use 'site:domain.com' to see how many pages Google has indexed vs your actual page count.", priority: "High", impact: 10, resource: "Google Search Console" },
        { category: "SEO Audit", item: "Analyze Organic Traffic Drops", description: "Check GA4 and GSC for sudden drops in traffic or rankings to identify penalties or algo hits.", priority: "High", impact: 10, resource: "GA4 / GSC" },
        { category: "SEO Audit", item: "Check for Manual Actions", description: "Look in GSC under 'Security & Manual Actions' to ensure no penalties exist.", priority: "Critical", impact: 10, resource: "GSC" },
        { category: "SEO Audit", item: "Mobile-Friendliness Check", description: "Verify the site passes the Mobile-Friendly Test and has no usability errors in GSC.", priority: "High", impact: 9, resource: "Google Mobile Friendly Test" },
        { category: "SEO Audit", item: "Core Web Vitals Assessment", description: "Review LCP, INP, and CLS scores in GSC and PageSpeed Insights.", priority: "High", impact: 9, resource: "PageSpeed Insights" },

        // On-Page SEO
        { category: "On-Page SEO", item: "Title Tag Optimization", description: "Ensure unique, keyword-rich title tags under 60 characters for every page.", priority: "High", impact: 10, resource: "Guide to Title Tags" },
        { category: "On-Page SEO", item: "Meta Description Optimization", description: "Write CTR-focused descriptions (150-160 chars) including the primary keyword.", priority: "Medium", impact: 7, resource: "Guide to Meta Descriptions" },
        { category: "On-Page SEO", item: "H1 Tag Consistency", description: "Ensure only one H1 tag per page, including the main target keyword.", priority: "High", impact: 8, resource: "MDN Headings" },
        { category: "On-Page SEO", item: "URL Structure Optimization", description: "Use short, descriptive, lowercase URLs with hyphens (no underscores or parameters).", priority: "Medium", impact: 6, resource: "SEJ URL Structure" },
        { category: "On-Page SEO", item: "Internal Linking Strategy", description: "Link to important pages using descriptive anchor text. Ensure no orphan pages.", priority: "High", impact: 9, resource: "Ahrefs Internal Linking" },
        { category: "On-Page SEO", item: "Image Alt Text", description: "Add descriptive Alt text to all images for accessibility and image search.", priority: "Medium", impact: 5, resource: "W3C Accessibility" },
        { category: "On-Page SEO", item: "Keyword Cannibalization Check", description: "Ensure multiple pages aren't competing for the exact same keyword.", priority: "High", impact: 8, resource: "Semrush Cannibalization" },

        // Off-Page SEO
        { category: "Off-Page SEO", item: "Backlink Profile Audit", description: "Check for toxic backlinks and disavow if necessary. Analyze anchor text distribution.", priority: "High", impact: 10, resource: "Semrush / Ahrefs" },
        { category: "Off-Page SEO", item: "Competitor Backlink Analysis", description: "Identify where competitors are getting links and replicate high-quality sources.", priority: "Medium", impact: 8, resource: "Ahrefs Link Intersect" },
        { category: "Off-Page SEO", item: "Social Signal Review", description: "Ensure content is shareable (OG tags) and active on relevant social platforms.", priority: "Low", impact: 3, resource: "OpenGraph.xyz" },
        { category: "Off-Page SEO", item: "Broken Link Building", description: "Find broken links on niche relevant sites and offer your content as a replacement.", priority: "Medium", impact: 7, resource: "Backlinko Guide" },
        { category: "Off-Page SEO", item: "Guest Blogging Strategy", description: "Identify high-DA sites in your niche for guest posting opportunities.", priority: "Medium", impact: 7, resource: "Google Search Operators" },
    ],

    "Technical SEO": [
        // Technical
        { category: "Technical SEO", item: "XML Sitemap Validation", description: "Ensure sitemap.xml is clean (200 OK only), updated, and submitted to GSC.", priority: "High", impact: 9, resource: "Sitemaps.org" },
        { category: "Technical SEO", item: "Robots.txt Configuration", description: "Verify robots.txt isn't blocking important resources. Allow JS/CSS crawling.", priority: "Critical", impact: 10, resource: "Google Robots.txt" },
        { category: "Technical SEO", item: "Canonical Tag Implementation", description: "Ensure every page has a self-referencing canonical tag unless it's a duplicate.", priority: "High", impact: 9, resource: "Google Canonicals" },
        { category: "Technical SEO", item: "Schema Markup / Structured Data", description: "Implement JSON-LD schema (Organization, Article, Product, Review) and validate.", priority: "High", impact: 8, resource: "Schema.org Validator" },
        { category: "Technical SEO", item: "HTTPS/SSL Security", description: "Ensure the site forces HTTPS and has no mixed content errors.", priority: "Critical", impact: 10, resource: "Let's Encrypt" },
        { category: "Technical SEO", item: "404 Page Customization", description: "Create a helpful 404 page that guides users back to content, preventing bounce.", priority: "Low", impact: 4, resource: "Nielsen Norman Group" },
        { category: "Technical SEO", item: "Redirect Chain Audit", description: "Fix redirect chains (e.g. A -> B -> C) to direct links (A -> C).", priority: "Medium", impact: 6, resource: "Screaming Frog" },
        { category: "Technical SEO", item: "Hreflang for International", description: "If multi-language, validate hreflang tags to prevent duplicate content issues.", priority: "High", impact: 9, resource: "Hreflang Generator" },
        { category: "Technical SEO", item: "Pagination Optimization", description: "Use rel='prev/next' or proper canonical strategies for paginated content.", priority: "Medium", impact: 5, resource: "Google Pagination" },

        // Programmatic SEO
        { category: "Programmatic SEO", item: "Dataset Quality Check", description: "Ensure the source data for programmatic pages is unique, accurate, and valuable.", priority: "Critical", impact: 10, resource: "Data Source" },
        { category: "Programmatic SEO", item: "Template Uniqueness", description: "Avoid thin content by ensuring templates generate significantly different content per page.", priority: "High", impact: 9, resource: "Google Thin Content" },
        { category: "Programmatic SEO", item: "Internal Linking Logic", description: "Create a scalable internal linking graph so crawlers can find all generated pages.", priority: "Critical", impact: 10, resource: "Graph Theory" },
    ],

    "Local & Maps": [
        // GMB / GBP
        { category: "GMB / GBP", item: "Claim and Verify Business Profile", description: "Ensure full ownership of the Google Business Profile.", priority: "Critical", impact: 10, resource: "Google Business Profile" },
        { category: "GMB / GBP", item: "Complete Business Information", description: "Fill out every field: Categories, Services, Opening Date, Attributes.", priority: "High", impact: 9, resource: "GBP Help" },
        { category: "GMB / GBP", item: "NAP Consistency", description: "Ensure Name, Address, Phone matches exactly across website and all directories.", priority: "Critical", impact: 10, resource: "Moz Local" },
        { category: "GMB / GBP", item: "Photo & Video Updates", description: "Upload high-quality interior, exterior, and team photos regularly.", priority: "Medium", impact: 7, resource: "Local Ranking Factors" },
        { category: "GMB / GBP", item: "Review Management Strategy", description: "Responder to all reviews (positive and negative). Encourage new reviews.", priority: "High", impact: 9, resource: "Whitespark" },

        // Local SEO
        { category: "Local SEO", item: "Local Schema Markup", description: "Implement 'LocalBusiness' schema with coordinates, priceRange, and openingHours.", priority: "High", impact: 8, resource: "Schema.org LocalBusiness" },
        { category: "Local SEO", item: "Embed Google Map", description: "Embed the Google Map of your location on the Contact/Location page.", priority: "Medium", impact: 6, resource: "Google Maps" },
        { category: "Local SEO", item: "Local Content Creation", description: "Create location-specific service pages (e.g., 'SEO Services in New York').", priority: "High", impact: 9, resource: "City Pages Guide" },
        { category: "Local SEO", item: "Citation Building", description: "List business on Yelp, Bing Places, YellowPages, and niche directories.", priority: "Medium", impact: 7, resource: "BrightLocal" },
    ],

    "Content & Platforms": [
        // Content
        { category: "Blog SEO", item: "Topic Cluster Strategy", description: "Create pillar pages and support them with cluster content interlinked together.", priority: "High", impact: 9, resource: "HubSpot Topic Clusters" },
        { category: "Blog SEO", item: "Content Refresh Schedule", description: "Identify declining content and update it with fresh data and keywords.", priority: "Medium", impact: 8, resource: "Google Freshness Algo" },
        { category: "Landing Page", item: "Conversion Rate Optimization (CRO)", description: "Ensure clear CTAs and value propositions above the fold.", priority: "High", impact: 9, resource: "CXL" },

        // Image & Video
        { category: "Image SEO", item: "Next-Gen Format Usage", description: "Serve images in WebP or AVIF formats for faster loading.", priority: "High", impact: 8, resource: "Cloudinary" },
        { category: "Image SEO", item: "Lazy Loading", description: "Implement lazy loading for off-screen images to improve LCP.", priority: "Medium", impact: 6, resource: "MDN Lazy Loading" },
        { category: "Video SEO", item: "Video Schema", description: "Use VideoObject schema to get video rich snippets in search.", priority: "High", impact: 7, resource: "Schema.org VideoObject" },
        { category: "Video SEO", item: "Transcript Publication", description: "Publish full transcripts text on the page for crawlability.", priority: "High", impact: 8, resource: "Wistia Guide" },

        // Podcast & News
        { category: "Podcast SEO", item: "RSS Feed Optimization", description: "Optimize RSS feed title, description, and tags for directories.", priority: "High", impact: 8, resource: "Apple Podcasts" },
        { category: "News SEO", item: "Google Publisher Center", description: "Submit publication to Google Publisher Center for Google News inclusion.", priority: "High", impact: 9, resource: "Publisher Center" },
        { category: "News SEO", item: "Article Schema", description: "Use NewsArticle schema specifically for news content.", priority: "High", impact: 8, resource: "Schema.org NewsArticle" },
    ],

    "AI & Future SEO": [
        // AI / AIO / SGE / GEO / AEO
        { category: "AIO/SGE/GEO", item: "Answer Engine Optimization (AEO)", description: "Structure content efficiently (Q&A format) to be picked up by AI summaries.", priority: "High", impact: 10, resource: "Search Engine Land" },
        { category: "AIO/SGE/GEO", item: "Entity-Based Optimization", description: "Focus on establishing clear Entity relationships (Knowledge Graph) rather than just keywords.", priority: "High", impact: 10, resource: "InLinks" },
        { category: "AIO/SGE/GEO", item: "Zero-Click Optimization", description: "Optimize for Featured Snippets which often power AI answers.", priority: "High", impact: 9, resource: "Semrush Snippets" },
        { category: "AIO/SGE/GEO", item: "E-E-A-T Enforcement", description: "Maximize Experience, Expertise, Authoritativeness, and Trustworthiness signals.", priority: "Critical", impact: 10, resource: "Google Raters Guidelines" },
        { category: "AIO/SGE/GEO", item: "Conversational Keyword Targeting", description: "Target long-tail, natural language queries that people ask voice assistants.", priority: "Medium", impact: 7, resource: "AlsoAsked.com" },
    ],

    "Ecommerce & Marketplaces": [
        { category: "Ecommerce / Shopify", item: "Product Schema", description: "Add comprehensive Product schema (Price, Stock, Rating) for rich snippets.", priority: "Critical", impact: 10, resource: "Google Merchant Center" },
        { category: "Ecommerce / Shopify", item: "Category Page Optimization", description: "Add unique content to category pages, don't just list products.", priority: "High", impact: 9, resource: "Shopify Guides" },
        { category: "Ecommerce / Shopify", item: "Faceted Navigation Control", description: "Manage URL parameters to prevent creating millions of thin filter pages.", priority: "Critical", impact: 10, resource: "Google Faceted Nav" },
        { category: "Marketplace (Amazon/Etsy)", item: "Title Keyword Stuffing (Legal)", description: "For Amazon/Etsy, maximize character limits with relevant keywords (different from Google).", priority: "High", impact: 10, resource: "Helium 10" },
        { category: "Marketplace (Amazon/Etsy)", item: "Backend Keywords", description: "Fill out hidden backend search terms that don't fit in the title.", priority: "High", impact: 9, resource: "Seller Central" },
        { category: "Marketplace (Amazon/Etsy)", item: "Image Quality & Quantity", description: "Use all available image slots; high-res, white background + lifestyle shots.", priority: "High", impact: 9, resource: "Amazon Guidelines" },
    ],

    "Social Media SEO": [
        // YouTube, Reddit, Quora, LinkedIn, etc.
        { category: "YouTube SEO", item: "Filename Optimization", description: "Rename video file to 'target-keyword.mp4' before uploading.", priority: "Medium", impact: 6, resource: "YouTube Creator Academy" },
        { category: "YouTube SEO", item: "Timestamp/Chapters", description: "Add timestamps in description to create 'Key Moments' in Google Search.", priority: "High", impact: 8, resource: "Google Video Key Moments" },
        { category: "Pinterest SEO", item: "Rich Pins", description: "Enable Article, Product, or Recipe Rich Pins for better visibility.", priority: "High", impact: 8, resource: "Pinterest Developers" },
        { category: "LinkedIn SEO", item: "Profile Headline", description: "Use keywords in the headline, not just job title (e.g., 'SEO Expert' vs 'Marketing Manager').", priority: "High", impact: 9, resource: "LinkedIn Help" },
        { category: "Twitter/X SEO", item: "Bio Optimization", description: "Include main keywords and hashtags in the bio for internal search discovery.", priority: "Medium", impact: 6, resource: "Twitter Help" },
        { category: "Reddit/Quora", item: "Keyword in Answers", description: "Include the question's target keywords naturally in the first paragraph of answers.", priority: "High", impact: 8, resource: "Reddit Guidelines" },
    ],

    "Industry Specific": [
        // SaaS, B2B, B2C, etc.
        { category: "SaaS / B2B", item: "Competitor Comparison Pages", description: "Create '[Your Brand] vs [Competitor]' pages to capture high-intent bottom-funnel traffic.", priority: "High", impact: 10, resource: "SaaS SEO Guide" },
        { category: "SaaS / B2B", item: "Integration Pages", description: "Create pages for every tool you integrate with to capture 'tool + integration' searches.", priority: "Medium", impact: 8, resource: "Zapier Strategy" },
        { category: "Local Services (Home/Auto)", item: "Service Area Pages", description: "Create individual pages for each city/suburb served.", priority: "High", impact: 9, resource: "RankMath Local" },
        { category: "Healthcare / Law", item: "Author Bio & Credentials", description: "Strict E-E-A-T: Every article must be reviewed/written by a qualified professional with visible credentials.", priority: "Critical", impact: 10, resource: "YMYL Guidelines" },
        { category: "Real Estate", item: "IDX Integration", description: "Ensure MLS listings are indexable and don't create massive duplicate content.", priority: "High", impact: 9, resource: "IDX Guide" },
        { category: "Travel / Hospitality", item: "Visual Richness", description: "Prioritize high-res imagery and video; speed optimize with CDNs.", priority: "High", impact: 8, resource: "Google Travel" },
        { category: "News / Media", item: "AMP (Accelerated Mobile Pages)", description: "Consider AMP for Top Stories carousel eligibility (though less critical now).", priority: "Low", impact: 5, resource: "AMP.dev" },
    ],

    "International & App": [
        // International, Multilingual, App Store
        { category: "International", item: "ccTLD vs Subfolder", description: "Choose structure carefully: ccTLD (.fr) for strongest local signal, Subfolder (/fr/) for consolidated authority.", priority: "Critical", impact: 10, resource: "Google International" },
        { category: "International", item: "Currency & Measurement", description: "Ensure prices and units match the target locale.", priority: "Medium", impact: 7, resource: "UX Guidelines" },
        { category: "App Store (ASO)", item: "Title & Subtitle Keywords", description: "Place strongest keywords in App Title (30 chars) and Subtitle.", priority: "Critical", impact: 10, resource: "Apple ASO" },
        { category: "App Store (ASO)", item: "Screenshot Optimization", description: "Use the first 3 screenshots to sell value props; test different variations.", priority: "High", impact: 9, resource: "SplitMetrics" },
        { category: "Play Store (ASO)", item: "Short Description", description: "Optimize the 80-char short description for conversion and keywords.", priority: "High", impact: 9, resource: "Google Play Console" },
    ]
};

// --- Execution ---

const wb = XLSX.utils.book_new();

// Helper to calculate column widths
const getWidth = (data) => {
    return commonColumns.map(col => ({ wch: 30 })); // Standard width for simplicity, can be dynamic
};

for (const [sheetName, data] of Object.entries(checklists)) {
    // 1. Create formatted data with all columns
    const formattedData = data.map(row => ({
        "Category": row.category,
        "Checklist Item": row.item,
        "Description": row.description,
        "Priority": row.priority,
        "Status": "Pending", // Default value
        "Impact (1-10)": row.impact,
        "Resource": row.resource
    }));

    // 2. Create Sheet
    const ws = XLSX.utils.json_to_sheet(formattedData);

    // 3. Set Column Widths
    ws['!cols'] = [
        { wch: 20 }, // Category
        { wch: 40 }, // Item
        { wch: 60 }, // Description
        { wch: 10 }, // Priority
        { wch: 10 }, // Status
        { wch: 10 }, // Impact
        { wch: 25 }, // Resource
    ];

    // 4. Add to Workbook
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
}

// Write file
const fileName = "Ultimate_SEO_Checklist.xlsx";
XLSX.writeFile(wb, fileName);

console.log(`Successfully created ${fileName} with ${Object.keys(checklists).length} sheets.`);
