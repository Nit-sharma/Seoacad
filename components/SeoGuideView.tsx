import React, { useState } from 'react';
import {
    BookOpen,
    Search,
    ChevronDown,
    ChevronRight,
    ChevronUp,
    LayoutGrid,
    MessageSquare,
    Share2,
    FileImage,
    Briefcase,
    Globe,
    ShoppingCart,
    Box,
    Anchor,
    Cpu,
    Wrench,
    TrendingUp,
    Target,
    Zap,
    BarChart,
    Check,
    X,
    AlertTriangle,
    Code,
    Terminal,
    Type,
    MousePointerClick,
    Heading,
    Link,
    Sparkles,
    FileText,
    Smartphone,
    Image as ImageIcon,
    FileJson,
    MousePointer,
    AlertCircle,
    RotateCw,
    Maximize,
    Minimize,
    Table,
    List,
    Layers,
    ExternalLink,
    CheckCircle,
    XCircle,
    Activity,
    Server,
    Database,
    Clock,
    Timer,
    Gauge,
    SmartphoneCharging,
    MonitorSmartphone,
    Lock,
    Unlock,
    Eye,
    EyeOff,
    MoreHorizontal,
    MoreVertical,
    ArrowRight,
    ArrowLeft,
    ArrowUp,
    ArrowDown,
    Filter,
    SortAsc,
    SortDesc,
    RefreshCw,
    Trash2,
    Edit2,
    Plus,
    Minus,
    Download,
    Upload,
    Copy,
    Clipboard,
    File,
    Folder,
    Home,
    Settings,
    User,
    Users,
    Bell,
    HelpCircle,
    Info,
    LogOut,
    LogIn,
    Moon,
    Sun,
    Laptop,
    Menu
} from 'lucide-react';
import { SEO_GUIDE_DATA, SeoGuideCategory, SeoGuideItem } from '../seoGuideData';

// --- Reusing NavigationTab Style from ToolsView ---
interface NavigationTabProps {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    isOpen: boolean;
    isActive: boolean;
    onClick: () => void;
}

const CategoryTab: React.FC<NavigationTabProps> = ({ title, subtitle, icon, isOpen, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all border mb-2 ${isActive || isOpen ? 'bg-white border-blue-200 shadow-sm ring-1 ring-blue-100' : 'bg-white border-transparent hover:bg-slate-50'}`}
    >
        <div className={`p-2 rounded-lg ${isActive || isOpen ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
            {icon}
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-0.5">
                <span className={`text-sm font-bold truncate ${isActive || isOpen ? 'text-blue-900' : 'text-slate-700'}`}>{title}</span>
                {isOpen ? <ChevronUp size={16} className="text-blue-400" /> : <ChevronDown size={16} className="text-slate-300" />}
            </div>
            <p className={`text-xs truncate ${isActive || isOpen ? 'text-blue-600' : 'text-slate-400'}`}>{subtitle}</p>
        </div>
    </button>
);

const SeoGuideView: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<SeoGuideItem | null>(SEO_GUIDE_DATA[0].items[0]);
    const [openCategories, setOpenCategories] = useState<string[]>([SEO_GUIDE_DATA[0].id]);

    // Checklist State
    const [checklistItems, setChecklistItems] = useState<Record<string, boolean>>({});

    const toggleChecklistItem = (id: string) => {
        setChecklistItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const checklistData = {
        meta: [
            { id: 'meta-1', label: 'Title tag is 50-60 characters' },
            { id: 'meta-2', label: 'Primary keyword in title tag' },
            { id: 'meta-3', label: 'Meta description is 150-160 characters' },
            { id: 'meta-4', label: 'Compelling CTA in meta description' }
        ],
        content: [
            { id: 'cont-1', label: 'One H1 tag per page with primary keyword' },
            { id: 'cont-2', label: 'Logical heading hierarchy (H1 → H2 → H3)' },
            { id: 'cont-3', label: 'Content matches search intent' },
            { id: 'cont-4', label: 'Primary keyword in first 100 words' },
            { id: 'cont-5', label: 'Comprehensive, in-depth content' }
        ],
        tech: [
            { id: 'tech-1', label: 'Short, descriptive URL with keyword' },
            { id: 'tech-2', label: 'HTTPS enabled' },
            { id: 'tech-3', label: 'Page loads under 3 seconds' },
            { id: 'tech-4', label: 'Mobile-friendly design' },
            { id: 'tech-5', label: 'Schema markup implemented' }
        ],
        media: [
            { id: 'med-1', label: 'Images have descriptive alt text' },
            { id: 'med-2', label: 'Images are compressed' },
            { id: 'med-3', label: 'Internal links to relevant content' },
            { id: 'med-4', label: 'Descriptive anchor text used' }
        ]
    };

    const totalChecklistItems = Object.values(checklistData).flat().length;
    const completedChecklistItems = Object.values(checklistItems).filter(Boolean).length;
    const checklistProgress = Math.round((completedChecklistItems / totalChecklistItems) * 100);

    const toggleCategory = (id: string) => {
        setOpenCategories(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const getCategoryIcon = (id: string) => {
        switch (id) {
            case 'core_strategies': return <LayoutGrid size={20} />;
            case 'chatbot_opt': return <MessageSquare size={20} />;
            case 'social_opt': return <Share2 size={20} />;
            case 'formats_opt': return <FileImage size={20} />;
            case 'industry_specific': return <Briefcase size={20} />;
            case 'geo_targeting': return <Globe size={20} />;
            case 'store_opt': return <ShoppingCart size={20} />;
            case 'cms_builders': return <Box size={20} />;
            case 'seo_tactics': return <Anchor size={20} />;
            case 'seo_framework': return <Cpu size={20} />;
            default: return <BookOpen size={20} />;
        }
    };

    const totalGuides = SEO_GUIDE_DATA.reduce((acc, cat) => acc + cat.items.length, 0);
    const activeCategory = selectedItem ? SEO_GUIDE_DATA.find(c => c.items.find(i => i.id === selectedItem.id)) : null;

    return (
        <div className="animate-fade-in flex flex-col md:flex-row gap-8">
            {/* Left Sidebar - Navigation (Detached Style like ToolsView) */}
            <div className="w-full md:w-80 flex-shrink-0 space-y-6 md:sticky md:top-24 md:max-h-[calc(100vh-8rem)] md:overflow-y-auto">

                {/* Summary Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col items-center relative overflow-hidden">
                    <div className="text-center mb-4">
                        <h3 className="font-bold text-slate-800 text-lg">Guide Board</h3>
                    </div>
                    <div className="relative w-32 h-32 flex items-center justify-center bg-blue-50 rounded-full mb-2">
                        <BookOpen size={48} className="text-blue-600" />
                    </div>
                    <div className="mt-2 text-center">
                        <span className="text-3xl font-bold text-slate-800">
                            {totalGuides}
                        </span>
                        <p className="text-xs text-slate-400 mt-1">Types Available</p>
                    </div>
                </div>

                {/* Categories List */}
                <div className="space-y-1">
                    {SEO_GUIDE_DATA.map(category => (
                        <div key={category.id}>
                            <CategoryTab
                                title={category.title}
                                subtitle={`${category.items.length} items`}
                                icon={getCategoryIcon(category.id)}
                                isOpen={openCategories.includes(category.id)}
                                isActive={activeCategory?.id === category.id}
                                onClick={() => toggleCategory(category.id)}
                            />

                            {/* Dropdown Items */}
                            {openCategories.includes(category.id) && (
                                <div className="ml-4 pl-4 border-l-2 border-slate-200 space-y-1 mb-4 animate-fade-in">
                                    {category.items.map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setSelectedItem(item)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${selectedItem?.id === item.id
                                                ? 'bg-blue-500 text-white shadow-md font-medium'
                                                : 'text-slate-600 hover:bg-white hover:text-blue-600'
                                                }`}
                                        >
                                            {selectedItem?.id === item.id ? <ChevronRight size={14} /> : <div className="w-3.5" />}
                                            <span className="truncate">{item.title}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1">
                {selectedItem ? (
                    <div className="animate-fade-in">
                        {selectedItem.id === 'on_page' ? (
                            // Unique Design for On-Page SEO
                            <div className="flex flex-col items-center justify-center py-10 px-4 max-w-4xl mx-auto">
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-xs font-semibold text-slate-600">Complete 2026 Guide</span>
                                </div>

                                {/* Hero Title */}
                                <div className="text-center mb-6">
                                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-2">
                                        Master <span className="text-blue-600">On-Page SEO</span>
                                    </h1>
                                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                                        & Rank Higher
                                    </h1>
                                </div>

                                {/* Description */}
                                <p className="text-lg text-slate-600 text-center max-w-2xl mb-10 leading-relaxed">
                                    Learn the essential techniques to optimize your web pages for search engines. From title tags to schema markup, discover everything you need to improve your rankings.
                                </p>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
                                    <button className="px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2">
                                        Start Learning
                                    </button>
                                    <button className="px-8 py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm hover:shadow-md flex items-center gap-2">
                                        View Checklist
                                    </button>
                                </div>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                                            <TrendingUp size={24} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-1">200+</h3>
                                        <p className="text-sm font-medium text-slate-500">Ranking Factors</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
                                            <Target size={24} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-1">12</h3>
                                        <p className="text-sm font-medium text-slate-500">Key Topics Covered</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                                            <Zap size={24} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-1">100%</h3>
                                        <p className="text-sm font-medium text-slate-500">Free Resource</p>
                                    </div>
                                </div>

                                {/* --- What is On-Page SEO Section --- */}
                                <div className="w-full mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                                    {/* Left Text Content */}
                                    <div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 mb-6">
                                            <Search size={14} />
                                            <span className="text-xs font-bold uppercase tracking-wider">Introduction</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                                            What is <span className="text-blue-600">On-Page SEO?</span>
                                        </h2>
                                        <div className="space-y-6 text-slate-600 leading-relaxed">
                                            <p>
                                                <strong className="text-slate-900">On-page SEO</strong> (also known as on-site SEO) refers to the practice of optimizing individual web pages to rank higher and earn more relevant traffic in search engines. Unlike off-page SEO which focuses on external signals like backlinks, on-page SEO involves optimizing both the content and HTML source code of a page.
                                            </p>
                                            <p>
                                                It's about making your website <strong className="text-slate-900">understandable</strong> for both search engines and users. When done correctly, on-page SEO helps search engines understand what your page is about, which helps them organize and display your content in search results.
                                            </p>
                                            <p>
                                                The goal is simple: create pages that provide the <strong className="text-slate-900">best possible answer</strong> to a user's search query while following technical best practices that help search engines crawl, index, and understand your content.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Cards */}
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {/* Content Optimization Card */}
                                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                                                    <Search size={20} />
                                                </div>
                                                <h3 className="font-bold text-slate-900 mb-2">Content Optimization</h3>
                                                <p className="text-sm text-slate-600 leading-relaxed">
                                                    Creating high-quality, relevant content that matches search intent and provides value to users.
                                                </p>
                                            </div>
                                            {/* HTML Elements Card */}
                                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 text-indigo-600">
                                                    <Globe size={20} />
                                                </div>
                                                <h3 className="font-bold text-slate-900 mb-2">HTML Elements</h3>
                                                <p className="text-sm text-slate-600 leading-relaxed">
                                                    Optimizing title tags, meta descriptions, headers, and other HTML elements for search engines.
                                                </p>
                                            </div>
                                        </div>
                                        {/* Why It Matters Card */}
                                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                                                <BarChart size={20} />
                                            </div>
                                            <h3 className="font-bold text-slate-900 mb-2">Why It Matters</h3>
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                On-page SEO is crucial because it signals to Google that your website provides high-quality content that answers searchers' questions. It's the foundation of any successful SEO strategy and directly impacts your ability to rank in search results.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* --- Title Tags Section --- */}
                                <div className="w-full mt-24">
                                    <div className="text-center max-w-3xl mx-auto mb-12">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 mb-6">
                                            <Type size={14} />
                                            <span className="text-xs font-bold uppercase tracking-wider">Critical Element</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Title Tags</h2>
                                        <p className="text-lg text-slate-600">
                                            The title tag is one of the most important on-page SEO elements. It appears in search results, browser tabs, and when your content is shared on social media.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        {/* Left: Best Practices */}
                                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-full">
                                            <div className="flex items-center gap-3 mb-6">
                                                <Check className="text-green-500" size={24} />
                                                <h3 className="text-xl font-bold text-slate-900">Best Practices</h3>
                                            </div>
                                            <ul className="space-y-4">
                                                {[
                                                    "Keep titles between 50-60 characters",
                                                    "Include your primary keyword near the beginning",
                                                    "Make each title unique across your site",
                                                    "Use pipe (|) or dash (-) to separate elements",
                                                    "Include your brand name when possible",
                                                    "Avoid keyword stuffing",
                                                    "Make it compelling and click-worthy"
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <div className="mt-1 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                                            <Check size={12} className="text-green-600" />
                                                        </div>
                                                        <span className="text-slate-700 font-medium">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Right: Examples */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <AlertTriangle size={20} className="text-amber-500" />
                                                <h3 className="text-lg font-bold text-slate-900">Good vs Bad Examples</h3>
                                            </div>

                                            {/* Good Example */}
                                            <div className="bg-green-50/50 rounded-xl p-6 border border-green-100">
                                                <div className="flex items-center gap-2 text-green-700 font-bold mb-3 text-sm">
                                                    <Check size={16} /> Good Example
                                                </div>
                                                <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm mb-3">
                                                    <div className="text-blue-600 text-lg hover:underline cursor-pointer font-medium truncate">
                                                        On-Page SEO Guide: 12 Essential Tips for 2024 | SEO Guide
                                                    </div>
                                                    <div className="text-xs text-slate-400 mt-1">57 characters</div>
                                                </div>
                                                <p className="text-sm text-slate-600">Clear, includes keyword, proper length, brand mentioned</p>
                                            </div>

                                            {/* Bad Example */}
                                            <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 text-sm">
                                                    <X size={16} /> Bad Example
                                                </div>
                                                <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm mb-3">
                                                    <div className="text-blue-600 text-lg hover:underline cursor-pointer font-medium truncate">
                                                        SEO, Search Engine Optimization, SEO Tips, SEO Guide, Best SEO
                                                    </div>
                                                    <div className="text-xs text-slate-400 mt-1">62 characters</div>
                                                </div>
                                                <p className="text-sm text-slate-600">Keyword stuffing, no value proposition, looks spammy</p>
                                            </div>

                                            {/* HTML Code */}
                                            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                                                <div className="bg-white px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                                                    <span className="text-xs font-bold text-slate-500 uppercase">HTML Code</span>
                                                    <Code size={14} className="text-slate-400" />
                                                </div>
                                                <div className="p-4 bg-slate-900 overflow-x-auto">
                                                    <pre className="text-xs font-mono text-slate-300">
                                                        <span className="text-purple-400">&lt;head&gt;</span>
                                                        <br />
                                                        {"  "}<span className="text-purple-400">&lt;title&gt;</span>
                                                        <span className="text-white">On-Page SEO Guide: 12 Essential Tips | Your Brand</span>
                                                        <span className="text-purple-400">&lt;/title&gt;</span>
                                                        <br />
                                                        <span className="text-purple-400">&lt;/head&gt;</span>
                                                    </pre>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* --- Meta Descriptions Section --- */}
                                <div className="w-full mt-24">
                                    <div className="text-center max-w-3xl mx-auto mb-12">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 mb-6">
                                            <MousePointerClick size={14} />
                                            <span className="text-xs font-bold uppercase tracking-wider">Click-Through Rate Booster</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Meta Descriptions</h2>
                                        <p className="text-lg text-slate-600">
                                            While meta descriptions don't directly impact rankings, they significantly influence click-through rates. Think of them as your page's advertisement in search results.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        {/* Left: Best Practices */}
                                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-full">
                                            <div className="flex items-center gap-3 mb-6">
                                                <Check className="text-green-500" size={24} />
                                                <h3 className="text-xl font-bold text-slate-900">Best Practices</h3>
                                            </div>
                                            <ul className="space-y-4">
                                                {[
                                                    "Keep descriptions between 150-160 characters",
                                                    "Include your primary keyword naturally",
                                                    "Write compelling copy that encourages clicks",
                                                    "Include a clear call-to-action (CTA)",
                                                    "Make each description unique",
                                                    "Accurately summarize the page content",
                                                    "Use active voice and action words"
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <div className="mt-1 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                                            <Check size={12} className="text-green-600" />
                                                        </div>
                                                        <span className="text-slate-700 font-medium">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Right: Examples */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <AlertTriangle size={20} className="text-amber-500" />
                                                <h3 className="text-lg font-bold text-slate-900">Good vs Bad Examples</h3>
                                            </div>

                                            {/* Good Example */}
                                            <div className="bg-green-50/50 rounded-xl p-6 border border-green-100">
                                                <div className="flex items-center gap-2 text-green-700 font-bold mb-3 text-sm">
                                                    <Check size={16} /> Good Example
                                                </div>
                                                <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm mb-3">
                                                    <div className="text-xs text-slate-800 line-clamp-3 leading-relaxed">
                                                        Learn on-page SEO with our comprehensive 2024 guide. Discover 12 proven techniques to boost rankings, drive traffic, and grow your business. Start optimizing today!
                                                    </div>
                                                    <div className="text-xs text-slate-400 mt-2">164 characters</div>
                                                </div>
                                                <p className="text-sm text-slate-600">Compelling, includes CTA, proper length, keyword included</p>
                                            </div>

                                            {/* Bad Example */}
                                            <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 text-sm">
                                                    <X size={16} /> Bad Example
                                                </div>
                                                <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm mb-3">
                                                    <div className="text-xs text-slate-800 line-clamp-3 leading-relaxed">
                                                        SEO guide, search engine optimization tips, SEO techniques, how to do SEO, SEO tutorial, learn SEO, SEO best practices.
                                                    </div>
                                                    <div className="text-xs text-slate-400 mt-2">119 characters</div>
                                                </div>
                                                <p className="text-sm text-slate-600">Just keywords, no value proposition, no CTA</p>
                                            </div>

                                            {/* HTML Code */}
                                            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                                                <div className="bg-white px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                                                    <span className="text-xs font-bold text-slate-500 uppercase">HTML Code</span>
                                                    <Code size={14} className="text-slate-400" />
                                                </div>
                                                <div className="p-4 bg-slate-900 overflow-x-auto">
                                                    <pre className="text-xs font-mono text-slate-300">
                                                        <span className="text-purple-400">&lt;head&gt;</span>
                                                        <br />
                                                        {"  "}<span className="text-purple-400">&lt;meta</span> <span className="text-blue-400">name</span>=<span className="text-green-400">"description"</span> <span className="text-blue-400">content</span>=<span className="text-green-400">"Learn on-page..."</span> <span className="text-purple-400">/&gt;</span>
                                                        <br />
                                                        <span className="text-purple-400">&lt;/head&gt;</span>
                                                    </pre>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* --- Heading Structure Section --- */}
                                <div className="w-full mt-24">
                                    <div className="text-center max-w-3xl mx-auto mb-12">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 mb-6">
                                            <Heading size={14} />
                                            <span className="text-xs font-bold uppercase tracking-wider">Content Structure</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Heading Structure</h2>
                                        <p className="text-lg text-slate-600">
                                            Proper heading structure helps both users and search engines understand your content hierarchy. It's essential for accessibility, user experience, and SEO.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        {/* Left: Best Practices */}
                                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-full">
                                            <div className="flex items-center gap-3 mb-6">
                                                <Check className="text-green-500" size={24} />
                                                <h3 className="text-xl font-bold text-slate-900">Best Practices</h3>
                                            </div>
                                            <ul className="space-y-4">
                                                {[
                                                    "Use only one H1 tag per page",
                                                    "Include your primary keyword in the H1",
                                                    "Use H2s for main section headings",
                                                    "Use H3s for subsections under H2s",
                                                    "Maintain logical hierarchy (H1 → H2 → H3)",
                                                    "Make headings descriptive and scannable",
                                                    "Don't skip heading levels"
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <div className="mt-1 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                                            <Check size={12} className="text-green-600" />
                                                        </div>
                                                        <span className="text-slate-700 font-medium">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Right: Hierarchy & Code */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <LayoutGrid size={20} className="text-blue-500" />
                                                <h3 className="text-lg font-bold text-slate-900">Proper Heading Hierarchy</h3>
                                            </div>

                                            {/* Hierarchy Visual */}
                                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3">
                                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">H1</span>
                                                        <span className="font-bold text-slate-900">Complete On-Page SEO Guide</span>
                                                    </div>
                                                    <div className="ml-6 flex items-center gap-3">
                                                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-bold">H2</span>
                                                        <span className="font-semibold text-slate-800">What is On-Page SEO?</span>
                                                    </div>
                                                    <div className="ml-6 flex items-center gap-3">
                                                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-bold">H2</span>
                                                        <span className="font-semibold text-slate-800">Title Tags Optimization</span>
                                                    </div>
                                                    <div className="ml-12 flex items-center gap-3">
                                                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold">H3</span>
                                                        <span className="text-slate-700">Best Practices for Title Tags</span>
                                                    </div>
                                                    <div className="ml-12 flex items-center gap-3">
                                                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold">H3</span>
                                                        <span className="text-slate-700">Common Title Tag Mistakes</span>
                                                    </div>
                                                    <div className="ml-6 flex items-center gap-3">
                                                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-bold">H2</span>
                                                        <span className="font-semibold text-slate-800">Meta Descriptions</span>
                                                    </div>
                                                    <div className="ml-6 flex items-center gap-3">
                                                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-bold">H2</span>
                                                        <span className="font-semibold text-slate-800">Heading Structure</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* HTML Code */}
                                            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                                                <div className="bg-white px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                                                    <span className="text-xs font-bold text-slate-500 uppercase">HTML Code</span>
                                                    <Code size={14} className="text-slate-400" />
                                                </div>
                                                <div className="p-4 bg-slate-900 overflow-x-auto">
                                                    <pre className="text-xs font-mono text-slate-300 leading-relaxed">
                                                        <span className="text-purple-400">&lt;h1&gt;</span><span className="text-white">Complete On-Page SEO Guide</span><span className="text-purple-400">&lt;/h1&gt;</span><br />
                                                        {"  "}<span className="text-purple-400">&lt;h2&gt;</span><span className="text-white">What is On-Page SEO?</span><span className="text-purple-400">&lt;/h2&gt;</span><br />
                                                        {"  "}<span className="text-purple-400">&lt;h2&gt;</span><span className="text-white">Title Tags Optimization</span><span className="text-purple-400">&lt;/h2&gt;</span><br />
                                                        {"    "}<span className="text-purple-400">&lt;h3&gt;</span><span className="text-white">Best Practices for Title Tags</span><span className="text-purple-400">&lt;/h3&gt;</span><br />
                                                        {"    "}<span className="text-purple-400">&lt;h3&gt;</span><span className="text-white">Common Title Tag Mistakes</span><span className="text-purple-400">&lt;/h3&gt;</span><br />
                                                        {"  "}<span className="text-purple-400">&lt;h2&gt;</span><span className="text-white">Meta Descriptions</span><span className="text-purple-400">&lt;/h2&gt;</span><br />
                                                        {"  "}<span className="text-purple-400">&lt;h2&gt;</span><span className="text-white">Heading Structure</span><span className="text-purple-400">&lt;/h2&gt;</span>
                                                    </pre>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Why It Matters Box */}
                                    <div className="mt-8 bg-amber-50 rounded-xl p-6 border border-amber-100 flex gap-4">
                                        <AlertTriangle className="text-amber-600 flex-shrink-0 mt-1" size={24} />
                                        <div>
                                            <h4 className="font-bold text-amber-900 mb-2">Why This Matters</h4>
                                            <p className="text-sm text-amber-800 leading-relaxed">
                                                Search engines use headings to understand the structure and topics of your content. A clear hierarchy helps them determine which content is most important and how different sections relate to each other.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* --- Content Optimization Section --- */}
                                <div className="w-full mt-24">
                                    <div className="text-center max-w-3xl mx-auto mb-12">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-600 mb-6">
                                            <FileText size={14} />
                                            <span className="text-xs font-bold uppercase tracking-wider">The Foundation</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Content Optimization</h2>
                                        <p className="text-lg text-slate-600">
                                            Content is king in SEO. High-quality, relevant content that satisfies user intent is the single most important factor for ranking well in search results.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        {/* Left: Best Practices */}
                                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-full">
                                            <div className="flex items-center gap-3 mb-6">
                                                <Check className="text-green-500" size={24} />
                                                <h3 className="text-xl font-bold text-slate-900">Content Best Practices</h3>
                                            </div>
                                            <ul className="space-y-4">
                                                {[
                                                    "Focus on search intent - what does the user want?",
                                                    "Create comprehensive, in-depth content",
                                                    "Use your primary keyword in the first 100 words",
                                                    "Include related keywords and LSI terms naturally",
                                                    "Write for humans first, search engines second",
                                                    "Use short paragraphs (2-3 sentences max)",
                                                    "Include bullet points and numbered lists",
                                                    "Add relevant internal and external links",
                                                    "Update content regularly to keep it fresh"
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <div className="mt-1 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                                            <Check size={12} className="text-green-600" />
                                                        </div>
                                                        <span className="text-slate-700 font-medium">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Right: Search Intent & Types */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Target size={20} className="text-blue-500" />
                                                <h3 className="text-lg font-bold text-slate-900">Understanding Search Intent</h3>
                                            </div>
                                            <p className="text-slate-600 text-sm mb-4">
                                                Search intent is the reason behind a user's search query. Understanding and matching this intent is crucial for creating content that ranks.
                                            </p>

                                            {/* Informational */}
                                            <div className="bg-white border boundary-slate-200 rounded-xl p-5 shadow-sm flex items-start gap-4">
                                                <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600">
                                                    <BookOpen size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900">Informational</h4>
                                                    <p className="text-xs text-slate-500 mb-1">Content that answers questions and provides knowledge</p>
                                                    <p className="text-[10px] text-slate-400">Examples: How-to guides, tutorials, explainers</p>
                                                </div>
                                            </div>

                                            {/* Commercial */}
                                            <div className="bg-white border boundary-slate-200 rounded-xl p-5 shadow-sm flex items-start gap-4">
                                                <div className="bg-indigo-50 p-2.5 rounded-lg text-indigo-600">
                                                    <Sparkles size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900">Commercial</h4>
                                                    <p className="text-xs text-slate-500 mb-1">Content that helps users make purchasing decisions</p>
                                                    <p className="text-[10px] text-slate-400">Examples: Product comparisons, reviews, best-of lists</p>
                                                </div>
                                            </div>

                                            {/* Navigational */}
                                            <div className="bg-white border boundary-slate-200 rounded-xl p-5 shadow-sm flex items-start gap-4">
                                                <div className="bg-purple-50 p-2.5 rounded-lg text-purple-600">
                                                    <BookOpen size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900">Navigational</h4>
                                                    <p className="text-xs text-slate-500 mb-1">Content that helps users find specific pages</p>
                                                    <p className="text-[10px] text-slate-400">Examples: Brand pages, login pages, contact pages</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* E-E-A-T Section */}
                                    <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                                        <h3 className="text-center font-bold text-slate-900 text-lg mb-8">E-E-A-T: What Google Looks For</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                            {[
                                                { letter: "E", word: "Experience", desc: "First-hand experience with the topic you're writing about", color: "bg-blue-100 text-blue-700" },
                                                { letter: "E", word: "Expertise", desc: "Deep knowledge and skill in your subject matter", color: "bg-indigo-100 text-indigo-700" },
                                                { letter: "A", word: "Authoritativeness", desc: "Recognition as a trusted source in your field", color: "bg-purple-100 text-purple-700" },
                                                { letter: "T", word: "Trustworthiness", desc: "Accuracy, transparency, and legitimacy of your content", color: "bg-pink-100 text-pink-700" }
                                            ].map((item, i) => (
                                                <div key={i} className="flex flex-col items-center">
                                                    <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-2xl font-bold mb-4`}>
                                                        {item.letter}
                                                    </div>
                                                    <h4 className="font-bold text-slate-900 mb-2">{item.word}</h4>
                                                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* --- URL Structure Section --- */}
                                <div className="w-full mt-24 mb-24">
                                    <div className="text-center max-w-3xl mx-auto mb-12">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 mb-6">
                                            <Link size={14} />
                                            <span className="text-xs font-bold uppercase tracking-wider">Technical Foundation</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">URL Structure</h2>
                                        <p className="text-lg text-slate-600">
                                            A well-structured URL helps users and search engines understand what your page is about before they even visit it. Clean URLs improve user experience and click-through rates.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        {/* Left: Best Practices */}
                                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-full">
                                            <div className="flex items-center gap-3 mb-6">
                                                <Check className="text-green-500" size={24} />
                                                <h3 className="text-xl font-bold text-slate-900">URL Best Practices</h3>
                                            </div>
                                            <ul className="space-y-4">
                                                {[
                                                    "Keep URLs short and descriptive",
                                                    "Include your primary keyword",
                                                    "Use hyphens (-) to separate words",
                                                    "Use lowercase letters only",
                                                    "Avoid special characters and spaces",
                                                    "Use a logical folder structure",
                                                    "Avoid unnecessary parameters",
                                                    "Make URLs human-readable"
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <div className="mt-1 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                                            <Check size={12} className="text-green-600" />
                                                        </div>
                                                        <span className="text-slate-700 font-medium">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Right: Examples & Pro Tips */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <AlertTriangle size={20} className="text-amber-500" />
                                                <h3 className="text-lg font-bold text-slate-900">Good vs Bad Examples</h3>
                                            </div>

                                            {/* Good Example */}
                                            <div className="bg-green-50/50 rounded-xl p-6 border border-green-100">
                                                <div className="flex items-center gap-2 text-green-700 font-bold mb-3 text-sm">
                                                    <Check size={16} /> Good Example
                                                </div>
                                                <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm mb-3 font-mono text-xs text-slate-700">
                                                    https://example.com/on-page-seo-guide
                                                </div>
                                                <p className="text-sm text-slate-600">Short, descriptive, keyword-rich, easy to read</p>
                                            </div>

                                            {/* Bad Example */}
                                            <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                                                <div className="flex items-center gap-2 text-red-700 font-bold mb-3 text-sm">
                                                    <X size={16} /> Bad Example
                                                </div>
                                                <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm mb-3 font-mono text-xs text-slate-700 break-all">
                                                    https://example.com/p=12345&cat=seo&utm_source=blog
                                                </div>
                                                <p className="text-sm text-slate-600">Contains parameters, no keywords, not user-friendly</p>
                                            </div>

                                            {/* Pro Tips */}
                                            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
                                                <h4 className="font-bold text-blue-900 mb-4">Pro Tips</h4>
                                                <ul className="space-y-2">
                                                    {[
                                                        "Avoid dates in URLs unless necessary (makes content seem outdated)",
                                                        "Use HTTPS for security and trust signals",
                                                        "Keep URLs under 60 characters when possible",
                                                        "Use canonical tags to prevent duplicate content issues"
                                                    ].map((tip, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-xs text-blue-800">
                                                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                                                            <span>{tip}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* --- Internal Linking Section --- */}
                                <div className="w-full mt-24">
                                    <div className="text-center max-w-3xl mx-auto mb-12">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 text-pink-600 mb-6">
                                            <Link size={14} />
                                            <span className="text-xs font-bold uppercase tracking-wider">Site Architecture</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Internal Linking</h2>
                                        <p className="text-lg text-slate-600">
                                            Internal links connect your content and give search engines an idea of your website's structure. They establish a hierarchy and spread link equity throughout your site.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        {/* Left: Best Practices */}
                                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-full">
                                            <div className="flex items-center gap-3 mb-6">
                                                <Check className="text-green-500" size={24} />
                                                <h3 className="text-xl font-bold text-slate-900">Internal Linking Best Practices</h3>
                                            </div>
                                            <ul className="space-y-4">
                                                {[
                                                    "Use descriptive, keyword-rich anchor text",
                                                    "Link to relevant, related content",
                                                    "Don't overdo it - 3-5 internal links per page is good",
                                                    "Link from high-authority pages to important content",
                                                    "Ensure all links are working (no 404s)",
                                                    "Use a logical site structure",
                                                    "Link deep, not just to homepage or category pages",
                                                    "Use 'dofollow' links for internal linking"
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <div className="mt-1 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                                            <Check size={12} className="text-green-600" />
                                                        </div>
                                                        <span className="text-slate-700 font-medium">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Right: Types & Anchor Text */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <LayoutGrid size={20} className="text-purple-500" />
                                                <h3 className="text-lg font-bold text-slate-900">Types of Internal Links</h3>
                                            </div>

                                            {/* Contextual Links */}
                                            <div className="bg-white border boundary-slate-200 rounded-xl p-5 shadow-sm">
                                                <h4 className="font-bold text-slate-900 mb-1">Contextual Links</h4>
                                                <p className="text-xs text-slate-500 mb-2">Links within your content that point to related articles or pages</p>
                                                <p className="text-[10px] text-green-600 font-bold">Passes link equity and keeps users engaged</p>
                                            </div>

                                            {/* Navigation Links */}
                                            <div className="bg-white border boundary-slate-200 rounded-xl p-5 shadow-sm">
                                                <h4 className="font-bold text-slate-900 mb-1">Navigation Links</h4>
                                                <p className="text-xs text-slate-500 mb-2">Links in your main menu, sidebar, or footer</p>
                                                <p className="text-[10px] text-green-600 font-bold">Helps users and crawlers discover important pages</p>
                                            </div>

                                            {/* Breadcrumb Links */}
                                            <div className="bg-white border boundary-slate-200 rounded-xl p-5 shadow-sm">
                                                <h4 className="font-bold text-slate-900 mb-1">Breadcrumb Links</h4>
                                                <p className="text-xs text-slate-500 mb-2">Hierarchical navigation showing the page's location</p>
                                                <p className="text-[10px] text-green-600 font-bold">Improves UX and helps search engines understand structure</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Anchor Text Box */}
                                    <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                                        <div className="flex items-center gap-2 mb-6">
                                            <Target size={24} className="text-blue-600" />
                                            <h3 className="text-xl font-bold text-slate-900">Anchor Text Best Practices</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <h4 className="font-bold text-green-600 mb-4">Good Anchor Text</h4>
                                                <div className="space-y-3">
                                                    <div className="bg-green-50 rounded-lg p-3 text-sm text-slate-700 border border-green-100">
                                                        "Learn more about <span className="text-blue-600 underline font-bold">on-page SEO techniques</span>"
                                                    </div>
                                                    <div className="bg-green-50 rounded-lg p-3 text-sm text-slate-700 border border-green-100">
                                                        "Check out our <span className="text-blue-600 underline font-bold">complete SEO checklist</span>"
                                                    </div>
                                                    <div className="bg-green-50 rounded-lg p-3 text-sm text-slate-700 border border-green-100">
                                                        "Read our guide on <span className="text-blue-600 underline font-bold">meta description optimization</span>"
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-red-600 mb-4">Bad Anchor Text</h4>
                                                <div className="space-y-3">
                                                    <div className="bg-red-50 rounded-lg p-3 text-sm text-slate-700 border border-red-100">
                                                        "Click <span className="text-blue-600 underline font-bold">here</span> to learn more"
                                                    </div>
                                                    <div className="bg-red-50 rounded-lg p-3 text-sm text-slate-700 border border-red-100">
                                                        "Visit <span className="text-blue-600 underline font-bold">this page</span> for details"
                                                    </div>
                                                    <div className="bg-red-50 rounded-lg p-3 text-sm text-slate-700 border border-red-100">
                                                        "<span className="text-blue-600 underline font-bold">https://example.com/page</span>"
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* --- Mobile Optimization Section --- */}
                                <div className="w-full mt-24">
                                    <div className="text-center max-w-3xl mx-auto mb-12">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 mb-6">
                                            <Smartphone size={14} />
                                            <span className="text-xs font-bold uppercase tracking-wider">Essential in 2024</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Mobile Optimization</h2>
                                        <p className="text-lg text-slate-600">
                                            With mobile-first indexing and over 60% of searches happening on mobile devices, optimizing for mobile is no longer optional—it's essential for SEO success.
                                        </p>
                                    </div>

                                    {/* 3 Mobile Feature Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center hover:shadow-md transition-shadow">
                                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                                                <Smartphone size={28} />
                                            </div>
                                            <h3 className="font-bold text-slate-900 mb-2">Mobile-First Indexing</h3>
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                Google primarily uses the mobile version of your site for indexing and ranking.
                                            </p>
                                        </div>
                                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center hover:shadow-md transition-shadow">
                                            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                                                <MonitorSmartphone size={28} />
                                            </div>
                                            <h3 className="font-bold text-slate-900 mb-2">Responsive Design</h3>
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                Your site should adapt seamlessly to any screen size or device orientation.
                                            </p>
                                        </div>
                                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center hover:shadow-md transition-shadow">
                                            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600">
                                                <MousePointer size={28} />
                                            </div>
                                            <h3 className="font-bold text-slate-900 mb-2">Touch-Friendly Interface</h3>
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                Buttons and links should be easy to tap without accidental clicks.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        {/* Left: Best Practices */}
                                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-full">
                                            <div className="flex items-center gap-3 mb-6">
                                                <Check className="text-green-500" size={24} />
                                                <h3 className="text-xl font-bold text-slate-900">Mobile Best Practices</h3>
                                            </div>
                                            <ul className="space-y-4">
                                                {[
                                                    "Use responsive design that adapts to all screen sizes",
                                                    "Ensure touch targets are at least 48x48 pixels",
                                                    "Use readable font sizes (minimum 16px for body text)",
                                                    "Avoid intrusive interstitials and pop-ups",
                                                    "Optimize for mobile page speed",
                                                    "Test on real devices, not just emulators",
                                                    "Ensure content is the same on mobile and desktop",
                                                    "Use mobile-friendly navigation (hamburger menu)"
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <div className="mt-1 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                                            <Check size={12} className="text-green-600" />
                                                        </div>
                                                        <span className="text-slate-700 font-medium">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Right: Tools & Common Issues */}
                                        <div className="space-y-6">
                                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                                <h3 className="font-bold text-slate-900 mb-4">Mobile Testing Tools</h3>
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Smartphone size={16} /></div>
                                                        <div>
                                                            <div className="text-sm font-bold text-slate-800">Mobile-Friendly Test</div>
                                                            <div className="text-xs text-slate-500">Google's official tool</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                                        <div className="p-2 bg-green-100 text-green-600 rounded-lg"><Search size={16} /></div>
                                                        <div>
                                                            <div className="text-sm font-bold text-slate-800">Search Console</div>
                                                            <div className="text-xs text-slate-500">Mobile usability reports</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Code size={16} /></div>
                                                        <div>
                                                            <div className="text-sm font-bold text-slate-800">Chrome DevTools</div>
                                                            <div className="text-xs text-slate-500">Device emulation & testing</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-red-50 rounded-2xl border border-red-100 p-6">
                                                <div className="flex items-center gap-2 mb-4 text-red-700">
                                                    <AlertCircle size={20} />
                                                    <h3 className="font-bold">Common Mobile Issues</h3>
                                                </div>
                                                <ul className="space-y-2">
                                                    {[
                                                        "Text too small to read",
                                                        "Content wider than screen",
                                                        "Clickable elements too close together",
                                                        "Viewport not set",
                                                        "Intrusive interstitials"
                                                    ].map((issue, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-xs text-red-800 font-medium">
                                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                                                            {issue}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* --- Image Optimization Section --- */}
                                <div className="w-full mt-24">
                                    <div className="text-center max-w-3xl mx-auto mb-12">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 text-cyan-600 mb-6">
                                            <ImageIcon size={14} />
                                            <span className="text-xs font-bold uppercase tracking-wider">Visual Content</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Image Optimization</h2>
                                        <p className="text-lg text-slate-600">
                                            Optimized images improve page speed, user experience, and can even rank in Google Images search. Don't overlook this important on-page SEO element.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                                        {/* Left: Best Practices */}
                                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-full">
                                            <div className="flex items-center gap-3 mb-6">
                                                <Check className="text-green-500" size={24} />
                                                <h3 className="text-xl font-bold text-slate-900">Image SEO Best Practices</h3>
                                            </div>
                                            <ul className="space-y-4">
                                                {[
                                                    "Use descriptive, keyword-rich file names",
                                                    "Write detailed alt text for accessibility",
                                                    "Compress images to reduce file size",
                                                    "Use appropriate image formats (WebP when possible)",
                                                    "Specify width and height attributes",
                                                    "Use responsive images with srcset",
                                                    "Implement lazy loading for below-fold images",
                                                    "Create and submit an image sitemap"
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <div className="mt-1 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                                            <Check size={12} className="text-green-600" />
                                                        </div>
                                                        <span className="text-slate-700 font-medium">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Right: Formats & Examples */}
                                        <div className="space-y-8">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <FileImage size={20} className="text-cyan-500" />
                                                    <h3 className="text-lg font-bold text-slate-900">Choose the Right Format</h3>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {[
                                                        { fmt: "WebP", desc: "Most images on the web", color: "text-green-600", bg: "bg-green-50" },
                                                        { fmt: "JPEG", desc: "Photographs and complex images", color: "text-blue-600", bg: "bg-blue-50" },
                                                        { fmt: "PNG", desc: "Images with transparency", color: "text-purple-600", bg: "bg-purple-50" },
                                                        { fmt: "SVG", desc: "Logos, icons, illustrations", color: "text-slate-600", bg: "bg-slate-50" }
                                                    ].map((f, i) => (
                                                        <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-cyan-200 transition-colors">
                                                            <div className={`w-8 h-8 ${f.bg} ${f.color} rounded-lg flex items-center justify-center mb-2 font-bold text-xs`}>
                                                                {i === 3 ? <Code size={14} /> : <FileImage size={14} />}
                                                            </div>
                                                            <div className="font-bold text-slate-800 text-sm mb-1">{f.fmt}</div>
                                                            <div className="text-[10px] text-slate-500 leading-tight">{f.desc}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                                <div className="flex items-center gap-2 mb-4 text-slate-800">
                                                    <Search size={18} />
                                                    <h3 className="font-bold">Alt Text Example</h3>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                                                        <div className="text-[10px] uppercase font-bold text-red-600 mb-1">Bad:</div>
                                                        <div className="text-xs text-slate-700 font-mono">"image1.jpg" or "IMG_2024.jpg"</div>
                                                    </div>
                                                    <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                                                        <div className="text-[10px] uppercase font-bold text-green-600 mb-1">Good:</div>
                                                        <div className="text-xs text-slate-700 font-mono">"Person optimizing website SEO on laptop in modern office"</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* HTML Code Box */}
                                    <div className="mt-8 bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800">
                                        <div className="bg-slate-800 px-6 py-3 flex items-center justify-between border-b border-slate-700">
                                            <div className="flex items-center gap-2 text-slate-300 font-medium text-sm">
                                                <Zap size={16} className="text-yellow-500" />
                                                Optimized Image HTML
                                            </div>
                                            <div className="flex gap-1.5">
                                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                            </div>
                                        </div>
                                        <div className="p-6 overflow-x-auto">
                                            <pre className="text-xs font-mono text-slate-300 leading-relaxed">
                                                <span className="text-purple-400">&lt;img</span><br />
                                                {"  "}<span className="text-blue-400">src</span>=<span className="text-green-400">"on-page-seo-guide.webp"</span><br />
                                                {"  "}<span className="text-blue-400">alt</span>=<span className="text-green-400">"Person following on-page SEO checklist on computer"</span><br />
                                                {"  "}<span className="text-blue-400">width</span>=<span className="text-green-400">"800"</span><br />
                                                {"  "}<span className="text-blue-400">height</span>=<span className="text-green-400">"600"</span><br />
                                                {"  "}<span className="text-blue-400">loading</span>=<span className="text-green-400">"lazy"</span><br />
                                                {"  "}<span className="text-blue-400">srcset</span>=<span className="text-green-400">"on-page-seo-guide-400.webp 400w,</span><br />
                                                {"          "}<span className="text-green-400">on-page-seo-guide-800.webp 800w,</span><br />
                                                {"          "}<span className="text-green-400">on-page-seo-guide-1200.webp 1200w"</span><br />
                                                {"  "}<span className="text-blue-400">sizes</span>=<span className="text-green-400">"(max-width: 600px) 400px,</span><br />
                                                {"         "}<span className="text-green-400">(max-width: 1000px) 800px,</span><br />
                                                {"         "}<span className="text-green-400">1200px"</span><br />
                                                <span className="text-purple-400">/&gt;</span>
                                            </pre>
                                        </div>
                                    </div>
                                </div>

                                {/* --- Page Speed Optimization Section --- */}
                                <div className="w-full mt-24">
                                    <div className="text-center max-w-3xl mx-auto mb-12">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-700 mb-6">
                                            <Zap size={14} />
                                            <span className="text-xs font-bold uppercase tracking-wider">Ranking Factor</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Page Speed Optimization</h2>
                                        <p className="text-lg text-slate-600">
                                            Page speed is a confirmed ranking factor. Faster pages provide better user experience and are favored by search engines. Core Web Vitals measure key aspects of this.
                                        </p>
                                    </div>

                                    {/* Core Web Vitals Section */}
                                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-12">
                                        <div className="flex items-center gap-2 mb-8">
                                            <Gauge size={24} className="text-blue-600" />
                                            <h3 className="text-xl font-bold text-slate-900">Core Web Vitals</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            <div className="space-y-4">
                                                <h4 className="font-bold text-slate-800">Largest Contentful Paint (LCP)</h4>
                                                <p className="text-xs text-slate-500">Measures loading performance</p>
                                                <div className="space-y-2 text-xs">
                                                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> Good: ≤ 2.5 seconds</div>
                                                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div> Needs Improvement: 2.5 - 4.0 seconds</div>
                                                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> Poor: &gt; 4.0 seconds</div>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="font-bold text-slate-800">First Input Delay (FID)</h4>
                                                <p className="text-xs text-slate-500">Measures interactivity</p>
                                                <div className="space-y-2 text-xs">
                                                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> Good: ≤ 100 milliseconds</div>
                                                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div> Needs Improvement: 100 - 300 milliseconds</div>
                                                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> Poor: &gt; 300 milliseconds</div>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="font-bold text-slate-800">Cumulative Layout Shift (CLS)</h4>
                                                <p className="text-xs text-slate-500">Measures visual stability</p>
                                                <div className="space-y-2 text-xs">
                                                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> Good: ≤ 0.1</div>
                                                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div> Needs Improvement: 0.1 - 0.25</div>
                                                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> Poor: &gt; 0.25</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Speed Optimization Columns */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                            <div className="flex items-center gap-2 font-bold text-slate-900 mb-4 text-orange-600">
                                                <Zap size={18} /> Images
                                            </div>
                                            <ul className="space-y-3">
                                                {["Compress images without losing quality", "Use modern formats like WebP", "Implement lazy loading", "Use responsive images with srcset"].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                                                        <Check size={12} className="text-green-500 mt-0.5 flex-shrink-0" /> {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                            <div className="flex items-center gap-2 font-bold text-slate-900 mb-4 text-purple-600">
                                                <Code size={18} /> Code
                                            </div>
                                            <ul className="space-y-3">
                                                {["Minify CSS, JavaScript, and HTML", "Remove unused CSS and JavaScript", "Defer non-critical JavaScript", "Inline critical CSS"].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                                                        <Check size={12} className="text-green-500 mt-0.5 flex-shrink-0" /> {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                            <div className="flex items-center gap-2 font-bold text-slate-900 mb-4 text-blue-600">
                                                <Server size={18} /> Server
                                            </div>
                                            <ul className="space-y-3">
                                                {["Enable browser caching", "Use a CDN for static assets", "Enable Gzip or Brotli compression", "Optimize server response time"].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                                                        <Check size={12} className="text-green-500 mt-0.5 flex-shrink-0" /> {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Speed Testing Tools */}
                                    <div className="bg-amber-50 rounded-2xl border border-amber-100 p-8">
                                        <h3 className="flex items-center gap-2 font-bold text-amber-900 mb-6">
                                            <AlertCircle size={20} /> Speed Testing Tools
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                            {[
                                                { name: "PageSpeed Insights", desc: "Google's official tool" },
                                                { name: "GTmetrix", desc: "Detailed performance reports" },
                                                { name: "Web Vitals", desc: "Core Web Vitals checker" },
                                                { name: "Pingdom", desc: "Test from multiple locations" }
                                            ].map((tool, i) => (
                                                <div key={i} className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm">
                                                    <div className="font-bold text-slate-900 text-sm mb-1">{tool.name}</div>
                                                    <div className="text-xs text-slate-500">{tool.desc}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* --- Schema Markup Section --- */}
                                <div className="w-full mt-24">
                                    <div className="text-center max-w-3xl mx-auto mb-12">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 mb-6">
                                            <Code size={14} />
                                            <span className="text-xs font-bold uppercase tracking-wider">Structured Data</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Schema Markup</h2>
                                        <p className="text-lg text-slate-600">
                                            Schema markup is code that helps search engines understand your content better and display it as rich snippets in search results, improving click-through rates.
                                        </p>
                                    </div>

                                    {/* Schema Types Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                        {[
                                            { name: "Article", desc: "Blog posts, news articles", color: "text-blue-600", bg: "bg-blue-50" },
                                            { name: "Product", desc: "E-commerce product pages", color: "text-green-600", bg: "bg-green-50" },
                                            { name: "FAQPage", desc: "Pages with FAQs", color: "text-purple-600", bg: "bg-purple-50" },
                                            { name: "HowTo", desc: "Step-by-step guides", color: "text-orange-600", bg: "bg-orange-50" },
                                            { name: "Review", desc: "Review pages and ratings", color: "text-pink-600", bg: "bg-pink-50" },
                                            { name: "LocalBusiness", desc: "Business websites", color: "text-cyan-600", bg: "bg-cyan-50" }
                                        ].map((schema, i) => (
                                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                                <div className={`w-10 h-10 ${schema.bg} ${schema.color} rounded-lg flex items-center justify-center mb-4`}>
                                                    <Code size={18} />
                                                </div>
                                                <h3 className="font-bold text-slate-900 mb-1">{schema.name}</h3>
                                                <p className="text-xs text-slate-500 mb-2">{schema.desc}</p>
                                                <div className={`text-[10px] uppercase font-bold ${schema.color} opacity-80`}>Rich snippets available</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        {/* Left: Best Practices */}
                                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-full">
                                            <div className="flex items-center gap-3 mb-6">
                                                <Check className="text-green-500" size={24} />
                                                <h3 className="text-xl font-bold text-slate-900">Schema Best Practices</h3>
                                            </div>
                                            <ul className="space-y-4">
                                                {[
                                                    "Use JSON-LD format (recommended by Google)",
                                                    "Include all required properties for your schema type",
                                                    "Test your markup with Google's Rich Results Test",
                                                    "Keep schema updated and accurate",
                                                    "Don't use schema for content not visible on the page",
                                                    "Implement multiple schema types when relevant",
                                                    "Use the @id property to connect related entities"
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <div className="mt-1 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                                            <Check size={12} className="text-green-600" />
                                                        </div>
                                                        <span className="text-slate-700 font-medium">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Right: Example JSON-LD */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Zap size={20} className="text-yellow-500" />
                                                <h3 className="text-lg font-bold text-slate-900">Example: Article Schema</h3>
                                            </div>

                                            <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
                                                <div className="p-4 overflow-x-auto">
                                                    <pre className="text-xs font-mono text-slate-300 leading-relaxed">
                                                        <span className="text-purple-400">&lt;script</span> <span className="text-blue-400">type</span>=<span className="text-green-400">"application/ld+json"</span><span className="text-purple-400">&gt;</span><br />
                                                        {"{"}<br />
                                                        {'  '}<span className="text-blue-400">"@context"</span>: <span className="text-green-400">"https://schema.org"</span>,<br />
                                                        {'  '}<span className="text-blue-400">"@type"</span>: <span className="text-green-400">"Article"</span>,<br />
                                                        {'  '}<span className="text-blue-400">"headline"</span>: <span className="text-green-400">"Complete On-Page SEO Guide"</span>,<br />
                                                        {'  '}<span className="text-blue-400">"description"</span>: <span className="text-green-400">"Learn on-page SEO..."</span>,<br />
                                                        {'  '}<span className="text-blue-400">"author"</span>: {"{"}<br />
                                                        {'    '}<span className="text-blue-400">"@type"</span>: <span className="text-green-400">"Person"</span>,<br />
                                                        {'    '}<span className="text-blue-400">"name"</span>: <span className="text-green-400">"John Doe"</span><br />
                                                        {'  '}<span className="text-purple-400">{"}"}</span>,<br />
                                                        {'  '}<span className="text-blue-400">"datePublished"</span>: <span className="text-green-400">"2024-01-15"</span>,<br />
                                                        {'  '}<span className="text-blue-400">"publisher"</span>: {"{"}<br />
                                                        {'    '}<span className="text-blue-400">"@type"</span>: <span className="text-green-400">"Organization"</span>,<br />
                                                        {'    '}<span className="text-blue-400">"name"</span>: <span className="text-green-400">"SEO Guide"</span>,<br />
                                                        {'    '}<span className="text-blue-400">"logo"</span>: {"{"}<br />
                                                        {'      '}<span className="text-blue-400">"@type"</span>: <span className="text-green-400">"ImageObject"</span>,<br />
                                                        {'      '}<span className="text-blue-400">"url"</span>: <span className="text-green-400">"https://example.com/logo.png"</span><br />
                                                        {'    '}<span className="text-purple-400">{"}"}</span><br />
                                                        {'  '}<span className="text-purple-400">{"}"}</span><br />
                                                        {"}"}<br />
                                                        <span className="text-purple-400">&lt;/script&gt;</span>
                                                    </pre>
                                                </div>
                                            </div>

                                            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
                                                <h4 className="font-bold text-blue-900 mb-3 text-sm">Testing Tools</h4>
                                                <ul className="space-y-2">
                                                    {[
                                                        "Google Rich Results Test - Test your structured data",
                                                        "Schema.org Validator - Validate schema markup",
                                                        "Google Search Console - Monitor rich results performance"
                                                    ].map((tool, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-xs text-blue-800">
                                                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                                                            {tool}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* --- On-Page SEO Checklist Section (New) --- */}
                                <div className="w-full mt-24 mb-24 animate-fade-in-up">
                                    <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-3xl border border-blue-100 p-8 md:p-12 shadow-sm relative overflow-hidden">
                                        {/* Background Decor */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                                        <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 mb-6 shadow-sm border border-blue-200">
                                                <Clipboard size={14} />
                                                <span className="text-xs font-bold uppercase tracking-wider">Your Action Plan</span>
                                            </div>
                                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                                                On-Page SEO <span className="text-blue-600">Checklist</span>
                                            </h2>
                                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                                Use this interactive checklist to ensure you've covered all the essential on-page SEO elements for your web pages.
                                            </p>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="max-w-2xl mx-auto mb-16 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="font-bold text-slate-800">Your Progress</span>
                                                <span className="font-bold text-blue-600 text-lg">{checklistProgress}%</span>
                                            </div>
                                            <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                                                    style={{ width: `${checklistProgress}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-2 text-center">
                                                {completedChecklistItems} of {totalChecklistItems} items completed
                                            </p>
                                        </div>

                                        {/* Checklist Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                                            {/* Card 1: Title & Meta */}
                                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 hover:shadow-md transition-shadow">
                                                <h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-2">
                                                    <Type className="text-blue-500" size={20} />
                                                    Title & Meta
                                                </h3>
                                                <div className="space-y-4">
                                                    {checklistData.meta.map(item => (
                                                        <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                                                            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${checklistItems[item.id] ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300 group-hover:border-blue-400'}`}>
                                                                {checklistItems[item.id] && <Check size={14} className="text-white" />}
                                                                <input
                                                                    type="checkbox"
                                                                    className="hidden"
                                                                    checked={!!checklistItems[item.id]}
                                                                    onChange={() => toggleChecklistItem(item.id)}
                                                                />
                                                            </div>
                                                            <span className={`text-sm transition-colors ${checklistItems[item.id] ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                                                {item.label}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Card 2: Headings & Content */}
                                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 hover:shadow-md transition-shadow">
                                                <h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-2">
                                                    <Heading className="text-indigo-500" size={20} />
                                                    Headings & Content
                                                </h3>
                                                <div className="space-y-4">
                                                    {checklistData.content.map(item => (
                                                        <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                                                            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${checklistItems[item.id] ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300 group-hover:border-blue-400'}`}>
                                                                {checklistItems[item.id] && <Check size={14} className="text-white" />}
                                                                <input
                                                                    type="checkbox"
                                                                    className="hidden"
                                                                    checked={!!checklistItems[item.id]}
                                                                    onChange={() => toggleChecklistItem(item.id)}
                                                                />
                                                            </div>
                                                            <span className={`text-sm transition-colors ${checklistItems[item.id] ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                                                {item.label}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Card 3: Technical */}
                                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 hover:shadow-md transition-shadow">
                                                <h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-2">
                                                    <Cpu className="text-purple-500" size={20} />
                                                    Technical
                                                </h3>
                                                <div className="space-y-4">
                                                    {checklistData.tech.map(item => (
                                                        <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                                                            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${checklistItems[item.id] ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300 group-hover:border-blue-400'}`}>
                                                                {checklistItems[item.id] && <Check size={14} className="text-white" />}
                                                                <input
                                                                    type="checkbox"
                                                                    className="hidden"
                                                                    checked={!!checklistItems[item.id]}
                                                                    onChange={() => toggleChecklistItem(item.id)}
                                                                />
                                                            </div>
                                                            <span className={`text-sm transition-colors ${checklistItems[item.id] ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                                                {item.label}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Card 4: Images & Links */}
                                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 hover:shadow-md transition-shadow">
                                                <h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-2">
                                                    <ImageIcon className="text-green-500" size={20} />
                                                    Images & Links
                                                </h3>
                                                <div className="space-y-4">
                                                    {checklistData.media.map(item => (
                                                        <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                                                            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${checklistItems[item.id] ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300 group-hover:border-blue-400'}`}>
                                                                {checklistItems[item.id] && <Check size={14} className="text-white" />}
                                                                <input
                                                                    type="checkbox"
                                                                    className="hidden"
                                                                    checked={!!checklistItems[item.id]}
                                                                    onChange={() => toggleChecklistItem(item.id)}
                                                                />
                                                            </div>
                                                            <span className={`text-sm transition-colors ${checklistItems[item.id] ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                                                {item.label}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            // Generic Under Construction View
                            <>
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                                        <span>{activeCategory?.title}</span>
                                        <ChevronRight size={14} />
                                        <span className="font-medium text-slate-800">{selectedItem.title}</span>
                                    </div>
                                    <h1 className="text-4xl font-bold text-slate-900 mb-2">{selectedItem.title}</h1>
                                    <p className="text-lg text-slate-600">{selectedItem.description}</p>
                                </div>

                                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
                                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Wrench size={32} className="text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-3">Guide Under Construction</h2>
                                    <p className="text-slate-500 max-w-lg mx-auto mb-8">
                                        Our expert team is currently compiling the latest research, case studies, and strategies for {selectedItem.title}.
                                    </p>
                                    <div className="flex justify-center gap-4">
                                        <button className="px-6 py-2.5 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">
                                            Notify Me When Ready
                                        </button>
                                        <button onClick={() => setSelectedItem(null)} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                                            Return Home
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-slate-50/50 rounded-3xl border border-dashed border-slate-300">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <Search size={48} className="text-slate-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Select an SEO Type</h2>
                        <p className="text-slate-500 max-w-sm">
                            Choose a category from the sidebar to explore detailed optimization guides and strategies.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeoGuideView;
