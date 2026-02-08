import React, { useState, useEffect } from 'react';
import {
    Building,
    Globe,
    MapPin,
    Briefcase,
    Target,
    Key,
    Search,
    FileText,
    User,
    Mail,
    Phone,
    Settings,
    History,
    Wrench,
    BarChart,
    Users,
    Save,
    Plus,
    ChevronDown,
    Link,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Share2,
    Map,
    MessageCircle
} from 'lucide-react';
import { SEOProject, BasicDetails } from '../../types';

interface ProjectOnboardingProps {
    project: SEOProject;
    onUpdate: (updatedProject: SEOProject) => void;
}

const ProjectOnboarding: React.FC<ProjectOnboardingProps> = ({ project, onUpdate }) => {
    const [formData, setFormData] = useState<BasicDetails>(() => {
        const details = project.basicDetails || {
            companyName: project.name,
            website: project.domain,
            businessType: 'Service',
            industry: '',
            targetLocation: 'Global',
            competitors: ['', '', '']
        } as BasicDetails;

        // Sanitize booleans to ensure they are false if null/undefined
        return {
            ...details,
            hasPastSeo: details.hasPastSeo ?? false,
            monthlyReportRequired: details.monthlyReportRequired ?? false,
            accessGsc: details.accessGsc ?? false,
            accessGa4: details.accessGa4 ?? false,
            accessGbp: details.accessGbp ?? false,
            accessGtm: details.accessGtm ?? false,
            socialHandles: details.socialHandles || {
                facebook: '', instagram: '', twitter: '', linkedin: '', youtube: '',
                pinterest: '', reddit: '', quora: '', medium: '', substack: ''
            }
        };
    });

    // Sync with project if it changes externally
    // Sync with project if it changes externally
    useEffect(() => {
        if (project.basicDetails) {
            setFormData({
                ...project.basicDetails,
                hasPastSeo: project.basicDetails.hasPastSeo ?? false,
                monthlyReportRequired: project.basicDetails.monthlyReportRequired ?? false,
                accessGsc: project.basicDetails.accessGsc ?? false,
                accessGa4: project.basicDetails.accessGa4 ?? false,
                accessGbp: project.basicDetails.accessGbp ?? false,
                accessGtm: project.basicDetails.accessGtm ?? false,
                socialHandles: project.basicDetails.socialHandles || {
                    facebook: '', instagram: '', twitter: '', linkedin: '', youtube: '',
                    pinterest: '', reddit: '', quora: '', medium: '', substack: ''
                }
            });
        }
    }, [project.id]);

    const handleChange = (field: keyof BasicDetails, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleDeepChange = (field: keyof BasicDetails, subField: string, value: any) => {
        // Not needed currently as we flattened the structure, but kept for reference
    };

    const handleCompetitorChange = (index: number, value: string) => {
        const newCompetitors = [...(formData.competitors || ['', '', ''])];
        newCompetitors[index] = value;
        handleChange('competitors', newCompetitors);
    };

    const handleSocialChange = (platform: string, value: string) => {
        const currentSocials = formData.socialHandles || {};
        handleChange('socialHandles', { ...currentSocials, [platform]: value });
    };

    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate a brief network delay for better UX feel
        await new Promise(resolve => setTimeout(resolve, 800));
        onUpdate({
            ...project,
            basicDetails: formData
        });
        setIsSaving(false);
    };

    // --- Sub-components (Standardized) ---

    // Using a cleaner, uniform style matching ChecklistSection
    const Section = ({ title, subtitle, icon: Icon, children }: any) => {
        return (
            <div className="bg-white border border-slate-200 rounded-lg mb-6 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-white">
                    <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
                        <Icon size={20} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">{title}</h3>
                        <p className="text-sm text-slate-500">{subtitle}</p>
                    </div>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        );
    };

    const InputField = ({ label, icon: Icon, value, onChange, placeholder, required = false }: any) => (
        <div className="w-full group/input">
            <label className="block text-xs font-bold text-slate-400 group-hover/input:text-slate-500 uppercase tracking-wider mb-2 transition-colors ml-1">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-blue-500 transition-colors">
                    <Icon size={18} />
                </div>
                <input
                    type="text"
                    value={value || ''}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium placeholder:text-slate-300 outline-none focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all duration-300 shadow-sm"
                />
            </div>
        </div>
    );

    const TextAreaField = ({ label, value, onChange, placeholder }: any) => (
        <div className="w-full mb-4 group/input">
            <label className="block text-xs font-bold text-slate-400 group-hover/input:text-slate-500 uppercase tracking-wider mb-2 transition-colors ml-1">
                {label}
            </label>
            <textarea
                value={value || ''}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                rows={4}
                className="w-full p-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium placeholder:text-slate-300 outline-none focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all duration-300 resize-y shadow-sm"
            />
            <div className="flex justify-end mt-2 mr-1">
                <Settings size={14} className="text-slate-200" />
            </div>
        </div>
    );

    const ToggleButton = ({ label, value, onChange }: any) => (
        <div className="flex bg-slate-50 p-1.5 rounded-xl w-full border border-slate-100">
            <button
                onClick={() => onChange(true)}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${value === true ? 'bg-white text-blue-600 shadow-md shadow-blue-500/10 ring-1 ring-black/5' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100/50'}`}
            >
                Yes
            </button>
            <button
                onClick={() => onChange(false)}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${value === false ? 'bg-white text-slate-700 shadow-md shadow-slate-200/50 ring-1 ring-black/5' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100/50'}`}
            >
                No
            </button>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto animate-fade-in pb-20 pt-2">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Project Onboarding</h1>
                    <p className="text-slate-500 text-sm mt-1">Complete the client profile to generate a tailored strategy.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all duration-300 ${isSaving ? 'bg-emerald-500 text-white cursor-wait' : 'bg-blue-600 text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-800/20 active:scale-95'}`}
                >
                    {isSaving ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            Save Changes
                        </>
                    )}
                </button>
            </div>

            <div className="space-y-6">
                {/* Section 1: Business Profile */}
                <Section title="Business Profile" subtitle="Core identity and location details of the business." icon={Building} variant="blue">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <InputField
                            label="Company Name"
                            required
                            icon={Building}
                            value={formData.companyName}
                            onChange={(v: string) => handleChange('companyName', v)}
                            placeholder="e.g. Acme Corporation Inc."
                        />
                        <InputField
                            label="Website URL"
                            required
                            icon={Globe}
                            value={formData.website}
                            onChange={(v: string) => handleChange('website', v)}
                            placeholder="https://example.com"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="w-full">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Business Type</label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                    <Briefcase size={16} />
                                </div>
                                <select
                                    value={formData.businessType}
                                    onChange={(e) => handleChange('businessType', e.target.value)}
                                    className="w-full pl-12 pr-10 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium outline-none focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all duration-300 appearance-none cursor-pointer shadow-sm"
                                >
                                    <option value="" disabled>Select Type...</option>
                                    {['Service', 'Product', 'Ecommerce', 'Local', 'Blog', 'SaaS', 'Other'].map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        </div>
                        <InputField
                            label="Industry / Niche"
                            icon={Target}
                            value={formData.industry}
                            onChange={(v: string) => handleChange('industry', v)}
                            placeholder="e.g. Technology, Healthcare"
                        />
                    </div>
                    <InputField
                        label="Target Location"
                        icon={MapPin}
                        value={formData.targetLocation}
                        onChange={(v: string) => handleChange('targetLocation', v)}
                        placeholder="e.g. Global, New York, London"
                    />
                </Section>

                {/* Section 1.5: Project Description */}
                <Section title="About Project" subtitle="Brief description of the business and goals." icon={FileText} variant="indigo">
                    <TextAreaField
                        label="Project Description"
                        value={formData.projectDescription}
                        onChange={(v: string) => handleChange('projectDescription', v)}
                        placeholder="Describe the business, its mission, and what they want to achieve..."
                    />
                </Section>

                {/* Section 2: SEO Strategy */}
                <Section title="SEO Strategy & Offerings" subtitle="Define what we are selling and who we are targeting." icon={Target} variant="purple">
                    <TextAreaField
                        label="Main Products / Services"
                        value={formData.mainProducts}
                        onChange={(v: string) => handleChange('mainProducts', v)}
                        placeholder="List your key offerings here..."
                    />
                    <TextAreaField
                        label="Target Keywords"
                        value={formData.targetKeywords}
                        onChange={(v: string) => handleChange('targetKeywords', v)}
                        placeholder="Enter comma-separated keywords..."
                    />
                    <TextAreaField
                        label="Priority Pages"
                        value={formData.priorityPages}
                        onChange={(v: string) => handleChange('priorityPages', v)}
                        placeholder="e.g. /services, /pricing..."
                    />
                </Section>

                {/* Section 3: Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Section title="Contact Details" subtitle="Who should we report to?" icon={User} variant="emerald">
                        <div className="space-y-6">
                            <InputField
                                label="Contact Name"
                                icon={User}
                                value={formData.contactName}
                                onChange={(v: string) => handleChange('contactName', v)}
                                placeholder="Client Name"
                            />
                            <InputField
                                label="Email Address"
                                icon={Mail}
                                value={formData.email}
                                onChange={(v: string) => handleChange('email', v)}
                                placeholder="contact@example.com"
                            />
                            <InputField
                                label="Phone Number"
                                icon={Phone}
                                value={formData.phone}
                                onChange={(v: string) => handleChange('phone', v)}
                                placeholder="+1 (555) 000-0000"
                            />
                            <InputField
                                label="WhatsApp Number"
                                icon={MessageCircle}
                                value={formData.whatsapp || ''}
                                onChange={(v: string) => handleChange('whatsapp', v)}
                                placeholder="+1 (555) 000-0000"
                            />
                            <InputField
                                label="Full Address"
                                icon={Map}
                                value={formData.address || ''}
                                onChange={(v: string) => handleChange('address', v)}
                                placeholder="123 Business St, City, Country"
                            />
                        </div>
                    </Section>

                    <div className="space-y-6">
                        <Section title="Technical Setup" subtitle="CMS, Robots.txt & Sitemap." icon={Wrench} variant="slate">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Website Platform (CMS)</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Wrench size={16} /></div>
                                        <input
                                            type="text"
                                            value={formData.cms || ''}
                                            onChange={e => handleChange('cms', e.target.value)}
                                            placeholder="e.g. WordPress, Shopify, Webflow"
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                        />
                                    </div>
                                </div>
                                <InputField
                                    label="Robots.txt URL"
                                    icon={FileText}
                                    value={formData.robotsTxtUrl}
                                    onChange={(v: string) => handleChange('robotsTxtUrl', v)}
                                    placeholder="e.g. https://example.com/robots.txt"
                                />
                                <InputField
                                    label="Sitemap XML URL"
                                    icon={Link}
                                    value={formData.sitemapUrl}
                                    onChange={(v: string) => handleChange('sitemapUrl', v)}
                                    placeholder="e.g. https://example.com/sitemap.xml"
                                />
                            </div>
                        </Section>

                        <Section title="Project History" subtitle="Past work & Reporting." icon={History} variant="orange">
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Search size={16} className="text-purple-500" />
                                        <span className="text-xs font-bold text-slate-700 uppercase">Have you done SEO before?</span>
                                    </div>
                                    <ToggleButton value={formData.hasPastSeo} onChange={(v: boolean) => handleChange('hasPastSeo', v)} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <FileText size={16} className="text-indigo-500" />
                                        <span className="text-xs font-bold text-slate-700 uppercase">Monthly Report Required?</span>
                                    </div>
                                    <ToggleButton value={formData.monthlyReportRequired} onChange={(v: boolean) => handleChange('monthlyReportRequired', v)} />
                                </div>
                            </div>
                        </Section>
                    </div>
                </div>

                {/* Section 3.5: Social Media Handles */}
                <Section title="Social Media Handles" subtitle="Link your top social profiles." icon={Share2} variant="sky">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Facebook" icon={Facebook} value={formData.socialHandles?.facebook || ''} onChange={(v) => handleSocialChange('facebook', v)} placeholder="https://facebook.com/..." />
                        <InputField label="Instagram" icon={Instagram} value={formData.socialHandles?.instagram || ''} onChange={(v) => handleSocialChange('instagram', v)} placeholder="https://instagram.com/..." />
                        <InputField label="X (Twitter)" icon={Twitter} value={formData.socialHandles?.twitter || ''} onChange={(v) => handleSocialChange('twitter', v)} placeholder="https://twitter.com/..." />
                        <InputField label="LinkedIn" icon={Linkedin} value={formData.socialHandles?.linkedin || ''} onChange={(v) => handleSocialChange('linkedin', v)} placeholder="https://linkedin.com/in/..." />
                        <InputField label="YouTube" icon={Youtube} value={formData.socialHandles?.youtube || ''} onChange={(v) => handleSocialChange('youtube', v)} placeholder="https://youtube.com/..." />
                        <InputField label="Pinterest" icon={Link} value={formData.socialHandles?.pinterest || ''} onChange={(v) => handleSocialChange('pinterest', v)} placeholder="https://pinterest.com/..." />
                        <InputField label="Reddit" icon={Link} value={formData.socialHandles?.reddit || ''} onChange={(v) => handleSocialChange('reddit', v)} placeholder="https://reddit.com/r/..." />
                        <InputField label="Quora" icon={Link} value={formData.socialHandles?.quora || ''} onChange={(v) => handleSocialChange('quora', v)} placeholder="https://quora.com/profile/..." />
                        <InputField label="Medium" icon={Link} value={formData.socialHandles?.medium || ''} onChange={(v) => handleSocialChange('medium', v)} placeholder="https://medium.com/@..." />
                        <InputField label="Substack" icon={Link} value={formData.socialHandles?.substack || ''} onChange={(v) => handleSocialChange('substack', v)} placeholder="https://substack.com/@..." />
                    </div>
                </Section>

                {/* Section 4: Tools & Competitors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Section title="Tools & Analytics" subtitle="Access status for Google tools." icon={Wrench} variant="teal">
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <BarChart size={16} className="text-blue-500" />
                                    <span className="text-xs font-bold text-slate-700 uppercase">Google Search Console (GSC)</span>
                                </div>
                                <ToggleButton value={formData.accessGsc} onChange={(v: boolean) => handleChange('accessGsc', v)} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <BarChart size={16} className="text-orange-500" />
                                    <span className="text-xs font-bold text-slate-700 uppercase">Google Analytics (GA4)</span>
                                </div>
                                <ToggleButton value={formData.accessGa4} onChange={(v: boolean) => handleChange('accessGa4', v)} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin size={16} className="text-red-500" />
                                    <span className="text-xs font-bold text-slate-700 uppercase">Google Business Profile (GBP)</span>
                                </div>
                                <ToggleButton value={formData.accessGbp} onChange={(v: boolean) => handleChange('accessGbp', v)} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Target size={16} className="text-blue-600" />
                                    <span className="text-xs font-bold text-slate-700 uppercase">Google Tag Manager (GTM)</span>
                                </div>
                                <ToggleButton value={formData.accessGtm} onChange={(v: boolean) => handleChange('accessGtm', v)} />
                            </div>
                        </div>
                    </Section>

                    <Section title="Top Competitors" subtitle="Who are we competing against?" icon={Users} variant="rose">
                        <div className="space-y-4">
                            <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">!</div>
                                <p className="text-xs text-orange-800 font-medium">Add direct business competitors</p>
                            </div>
                            {(formData.competitors || ['', '', '']).map((competitor, idx) => (
                                <div key={idx}>
                                    <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Competitor {idx + 1}</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Globe size={14} /></div>
                                        <input
                                            type="text"
                                            value={competitor}
                                            onChange={(e) => handleCompetitorChange(idx, e.target.value)}
                                            placeholder={`https://competitor-${idx + 1}.com`}
                                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none"
                                        />
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-2 border border-dashed border-slate-300 rounded-lg text-slate-400 text-sm hover:border-blue-300 hover:text-blue-500 transition-colors flex items-center justify-center gap-2">
                                <Plus size={16} /> Add Competitor
                            </button>
                        </div>
                    </Section>
                </div>

            </div>
        </div>
    );
};

export default ProjectOnboarding;
