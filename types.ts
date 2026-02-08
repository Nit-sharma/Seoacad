
export type Difficulty = 'Low' | 'Medium' | 'High';
export type Impact = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  question: string;
  description?: string;
  completed: boolean;
  impact: Impact;
  difficulty?: Difficulty;
  resourceUrl?: string;
  category_id: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

export interface Pillar {
  id: string;
  title: string;
  description: string;
  iconName: string; // identifying icon
  isLocked?: boolean;
  categories: Category[]; // Can be empty if locked 
}

export interface BasicDetails {
  // Business Profile
  companyName: string;
  website: string;
  businessType?: string;
  industry?: string;
  targetLocation: string;
  projectDescription?: string; // New field

  // SEO Strategy
  mainProducts?: string; // Textarea content
  targetKeywords?: string; // Textarea content
  priorityPages?: string; // Textarea content

  // Point of Contact
  // Contact & Social
  contactName: string;
  email: string;
  phone: string;
  whatsapp?: string; // New field
  address?: string; // New field
  socialHandles?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    pinterest?: string;
    reddit?: string;
    quora?: string;
    medium?: string;
    substack?: string;
  };

  // Technical Setup& History
  cms?: string;
  hasPastSeo?: boolean | null; // true, false, or null (unselected)

  // Tools & Analytics
  accessGsc?: boolean | null;
  accessGa4?: boolean | null;
  accessGbp?: boolean | null; // Google Business Profile
  accessGtm?: boolean | null; // Google Tag Manager
  monthlyReportRequired?: boolean | null; // New field

  // Technical Setup
  robotsTxtUrl?: string;
  sitemapUrl?: string;

  // Competitors
  competitors?: string[];
}

export interface SEOProject {
  id: string;
  domain: string;
  name: string;
  logo?: string; // URL or Base64 string
  lastAuditDate: string;
  score: number;
  pillars: Pillar[];
  basicDetails?: BasicDetails;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  isPhoneHidden: boolean;
  isProfileComplete?: boolean;
  avatar: string; // Base64 or URL
  about: string;
  banner?: string; // Background banner image
  role?: string; // Headline e.g. "Senior SEO Specialist"
  location?: string;
  certificates?: {
    id: string;
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }[];
  portfolio?: {
    id: string;
    title: string;
    description: string;
    image?: string;
    link?: string;
  }[];
  socials: {
    linkedin: string;
    twitter: string;
    website: string;
    instagram?: string;
    github?: string;
  };
  preferences: {
    emailNotifications: boolean;
    darkMode: boolean;
  };
}

export interface TodoItem {
  id: string;
  text: string;
  date: string; // ISO Date string YYYY-MM-DD
  completed: boolean;
  projectId?: string; // Optional link to a specific project
}

export interface MarketingTool {
  id: string;
  name: string;
  description: string;
  url: string;
  priceModel: 'Free' | 'Freemium' | 'Paid';
}

export interface ToolCategory {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  tools: MarketingTool[];
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Freelance';
  salary: string;
  postedDate: string;
  logo: string;
}

export type ViewState = 'DASHBOARD' | 'PROJECT_DETAIL' | 'SETTINGS' | 'TODO' | 'TOOLS' | 'EXTENSIONS' | 'JOBS' | 'GUIDE' | 'SEO_GUIDE' | 'ABOUT' | 'CONTACT' | 'TERMS';