import React, { useState, useMemo, useEffect } from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Settings,
  LogOut,
  Plus,
  Search,
  Bell,
  Menu,
  X,
  TrendingUp,
  Calendar,
  ListTodo,
  CheckCircle,
  Trash2,
  Mail,
  Check,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Anchor,
  Zap,
  Activity,
  BarChart3,
  Code,
  FileText,
  Bot,
  Puzzle,
  Briefcase,
  ExternalLink,
  Layers,
  Wrench,
  Info,
  Server,
  Globe,
  MapPin,
  ClipboardList,
  Image,
  Video,
  Mic,
  Database,
  Youtube,
  ShoppingBag,
  ShoppingCart,
  Cloud,
  Lock,
  MessageCircle,
  AlertTriangle,
  Rocket,
  ArrowRight,
  LogIn,
  User,
  Megaphone,
  ChevronUp,
  ChevronDown,
  Sparkles,
  FileDown,
  Layout,
  Pencil,
} from 'lucide-react';
import { SEOProject, UserProfile, TodoItem, ViewState } from './types';
import { INITIAL_PROJECTS, INITIAL_TODOS, ONBOARDING_TODOS, SEO_TOOLS_CATEGORIES, SEO_EXTENSIONS_LIST } from './constants';
import ChecklistSection from './components/common/ChecklistSection';
import RadialProgress from './components/common/RadialProgress';
import LoginView from './components/auth/LoginView';
import JobsView from './components/jobs/JobsView';
import GuideView from './components/guides/GuideView';
import ProfileView from './components/profile/ProfileView';
import SeoGuideView from './components/guides/SeoGuideView';
import DashboardWelcome from './components/dashboard/DashboardWelcome';
import ProjectOnboarding from './components/projects/ProjectOnboarding';
import OnboardingWizard from './components/dashboard/OnboardingWizard';
import { downloadProjectCSV } from './utils';

// ... (Rest of file) ... 
// (I need to jump to getPillarIcon function, but replace_file_content is contiguous blocks. I'll split into two tool calls or use multi_replace if I could find line numbers.
// getPillarIcon is at line 725. Imports are top.
// I'll make this call JUST for imports, and another for getPillarIcon.)
// Wait, I can't effectively see where the imports END without context.
// Imports end at line 51.
// I will just replace the import block.

// Actually, I can use multi_replace_file_content.


// --- Delete Modal Component ---
const DeleteConfirmationModal = ({ project, isOpen, onClose, onConfirm }: { project: SEOProject | null, isOpen: boolean, onClose: () => void, onConfirm: (withExport: boolean) => void }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
            <Trash2 size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Delete Project?</h3>
          <p className="text-slate-500 text-sm mb-6">
            Are you sure you want to delete <span className="font-bold text-slate-800">{project.name}</span>?
            This action cannot be undone. We recommend exporting your data first.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => onConfirm(true)}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <FileDown size={18} /> Export CSV & Delete
            </button>
            <button
              onClick={() => onConfirm(false)}
              className="w-full py-3 bg-white border border-slate-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-colors"
            >
              Delete Without Export
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 text-slate-400 font-medium hover:text-slate-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Types & Mock Data ---
const INITIAL_USER: UserProfile = {
  name: 'Alex Johnson',
  email: 'alex@seo-master.com',
  phone: '+1 (555) 123-4567',
  isPhoneHidden: false,
  isProfileComplete: true,
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  banner: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&h=300&q=80',
  role: 'Senior SEO Specialist',
  location: 'San Francisco, CA',
  about: 'Passionate SEO expert with over a decade of experience used to helping businesses grow their organic traffic. I specialize in technical SEO, content strategy, and link building.',
  socials: {
    linkedin: 'linkedin.com/in/alexj',
    twitter: '@alexseo',
    website: 'alexjohnson.com',
    instagram: '@alex_seo_life',
    github: 'github.com/alex-dev'
  },
  certificates: [
    { id: '1', name: 'Google SEO Fundamentals', issuer: 'Google', date: '2023' },
    { id: '2', name: 'Advanced Technical SEO', issuer: 'Semrush', date: '2024' }
  ],
  portfolio: [
    { id: '1', title: 'TechCurve Growth', description: 'Increased organic traffic by 200% in 6 months.', link: 'https://techcurve.com' },
    { id: '2', title: 'E-Shop Audit', description: 'Complete technical audit for a large e-commerce site.' }
  ],
  preferences: {
    emailNotifications: true,
    darkMode: false
  },
  onboardingStep: 5 // Fully onboarded
};

const GUEST_USER: UserProfile = {
  name: 'Guest User',
  email: 'guest@example.com',
  phone: '',
  isPhoneHidden: true,
  isProfileComplete: false,
  avatar: '',
  about: '',
  socials: { linkedin: '', twitter: '', website: '' },
  preferences: { emailNotifications: true, darkMode: false },
  onboardingStep: 1 // Start onboarding
};

const MARKETING_GUIDE = [
  { category: 'SEO', title: 'Title Tag Optimization', prompt: 'Write 5 SEO-optimized Title Tags for "[Keyword]". Keep them under 60 characters. Front-load the keyword.' },
  { category: 'SEO', title: 'Meta Description Generator', prompt: 'Write 3 Meta Descriptions for "[Topic]". Under 155 characters. Include a CTA and the keyword "[Keyword]".' },
  { category: 'SEO', title: 'Header Tag Structure', prompt: 'Create a logical H1, H2, and H3 header structure for a 2000-word guide on "[Topic]".' },
  { category: 'SEO', title: 'URL Slug Simplifier', prompt: 'Suggest 3 short, clean, SEO-friendly URL slugs for a page titled "[Long Title]".' },
  { category: 'SEO', title: 'Image Alt Text Writer', prompt: 'Write descriptive, keyword-rich Alt Text for an image showing [Describe Image].' },
  { category: 'SEO', title: 'Internal Linking Opportunity', prompt: 'I am writing a post about "[Topic A]". Suggest 5 anchor text variations I can use to link to my other article about "[Topic B]".' },
  { category: 'SEO', title: 'Featured Snippet Optimization (Definition)', prompt: 'Write a concise (40-60 words) definition of "[Term]" optimized to win the Google Featured Snippet "What is..." box.' },
  { category: 'SEO', title: 'Featured Snippet Optimization (List)', prompt: 'Format the following steps into a clean, numbered list optimized for a "How-to" Featured Snippet. [Insert Steps]' },
  { category: 'SEO', title: 'Keyword Density Check', prompt: 'Analyze this text and tell me if the keyword "[Keyword]" is used too frequently (keyword stuffing) or naturally. [Insert Text]' },
  { category: 'SEO', title: 'Reading Level Adjuster', prompt: 'Rewrite this text to be readable by a 7th grader (Flesch-Kincaid Grade Level 7). [Insert Text]' },
  { category: 'SEO', title: 'Breadcrumb Structure', prompt: 'Suggest a logical breadcrumb navigation path for a product page located at: Home > Category > Sub-category > Product. Product: [Product Name]' },
  { category: 'SEO', title: 'Above-the-Fold Optimization', prompt: 'Critique the "Above the Fold" content for a page targeting "[Keyword]". What elements should be visible immediately without scrolling?' },
  { category: 'SEO', title: 'Anchor Text Variator', prompt: 'Generate 10 natural variations of anchor text for the link destination "[URL]". Avoid exact match spam.' },
  { category: 'SEO', title: 'Title Tag CTR Booster', prompt: 'Add power words and brackets to these titles to improve Click-Through Rate (CTR): [List of Titles]' },
  { category: 'SEO', title: 'Content Formatting', prompt: 'Take this block of text and format it with bullet points and bold text to make it skimmable for mobile users. [Insert Text]' }
];

const PERSONAL_GUIDE = [
  { category: 'Mail', task: 'Clear inbox and archive old threads' },
  { category: 'Contact', task: 'Update CRM with new leads' },
  { category: 'Reachout', task: 'Send 10 cold outreach emails' },
  { category: 'Invoice', task: 'Generate monthly invoices for clients' }
];

// --- Helper Components ---

interface GuideTask {
  category: string;
  task?: string; // Legacy simple task
  title?: string; // New structured task title
  prompt?: string; // New structured task prompt with [Placeholders]
}

interface GuideCardProps {
  category: string;
  items: GuideTask[];
  theme: any;
  description: string;
}

interface GuideTaskItemProps {
  item: GuideTask;
  index: number;
  theme: any;
}

// --- Guide Task Component (Grid Card Style) ---
const GuideTaskItem: React.FC<GuideTaskItemProps> = ({ item, index, theme }) => {
  const [prompt, setPrompt] = useState(item.prompt);
  const [isFilled, setIsFilled] = useState(false);

  // Extract placeholders like [Keyword]
  const placeholders = item.prompt.match(/\[(.*?)\]/g) || [];

  return (
    <div className="group bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all hover:border-blue-200 flex flex-col h-full relative overflow-hidden">
      {/* Accent Top Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${theme.bg.replace('bg-', 'bg-gradient-to-r from-white via-').replace('50', '200') + ' to-white'}`}></div>

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${theme.bg} ${theme.text} text-sm font-bold shadow-sm border ${theme.border}`}>
            {index + 1}
          </span>
          <h4 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
            {item.title}
          </h4>
        </div>
        <div className={`p-1.5 rounded-md ${theme.bg} text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity`}>
          <Sparkles size={16} className={theme.text} />
        </div>
      </div>

      <div className="flex-1 mb-5">
        <div className="bg-slate-50/80 rounded-lg p-4 border border-slate-100/50 min-h-[100px]">
          <p className="text-sm text-slate-600 leading-relaxed font-medium font-mono">
            {item.prompt.split('[').map((part, i) => {
              if (i === 0) return part;
              const [placeholder, ...rest] = part.split(']');
              return (
                <React.Fragment key={i}>
                  <span className="text-blue-600 bg-blue-50 px-1 py-0.5 rounded font-bold border border-blue-100 text-xs uppercase tracking-wider mx-0.5">
                    {placeholder}
                  </span>
                  {rest.join(']')}
                </React.Fragment>
              );
            })}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Template</span>
        <a
          href={`https://chatgpt.com/?q=${encodeURIComponent(`Act as an expert SEO assistant. ${item.prompt}`)}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-lg shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-200 transition-all active:scale-95"
        >
          <Bot size={16} /> Use AI Template
        </a>
      </div>
    </div>
  );
};

const GuideCard: React.FC<GuideCardProps> = ({ category, items, theme, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Extract color class for left border accent (approximated from theme.text or theme.bg)
  // Assuming theme.text is like 'text-blue-700', we can try to derive a border color or just use inline style/map.
  // Ideally we should pass a specific color, but let's use the theme.bg which is like 'bg-blue-50' -> 'border-blue-500' mapping?
  // Simpler: Just use the theme.text color class for the icon and maybe a hardcoded accent since we passed 'bg-blue-50'.
  // Let's rely on the theme Props passed. The passed theme is { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: 'bg-blue-100' }
  // I will use a generic 'border-l-4' with a style that patches the theme or just use the icon color.

  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300 mb-6 overflow-hidden group hover:shadow-md ${isOpen ? 'ring-1 ring-slate-200' : ''}`}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/80 transition-colors bg-white"
      >
        <div className="flex items-center gap-5">
          {/* Icon with enhanced color pop */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme.bg} ${theme.text} border ${theme.border} shadow-sm group-hover:scale-105 transition-transform`}>
            <Layers size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-800 -mb-0.5 group-hover:text-blue-600 transition-colors">
              {category}
            </h3>
            <p className="text-sm text-slate-500 font-medium">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <div className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              {items.length} Templates
            </div>
          </div>
          <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-slate-100 text-slate-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="p-6 bg-slate-50 border-t border-slate-100 animate-fade-in-down">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, index) => (
              <GuideTaskItem key={index} item={item} index={index} theme={theme} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface NavigationTabProps {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  progress?: number;
  locked?: boolean;
}

const NavigationTab: React.FC<NavigationTabProps> = ({ id, title, subtitle, icon, active, onClick, progress, locked }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 mb-2 transition-all border ${active ? 'bg-white border-blue-500 ring-1 ring-blue-500 shadow-md' : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'}`}
  >
    <div className={`p-2 rounded-lg flex-shrink-0 ${active ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500'}`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center mb-0.5">
        <span className={`text-sm font-bold truncate ${active ? 'text-blue-700' : 'text-slate-700'}`}>{title}</span>
        {locked ? <Lock size={12} className="text-slate-400" /> : progress !== undefined && (
          <span className={`text-xs font-bold ${active ? 'text-blue-600' : 'text-slate-400'}`}>{progress}%</span>
        )}
      </div>
      <p className={`text-xs truncate ${active ? 'text-blue-500' : 'text-slate-500'}`}>{subtitle}</p>

      {progress !== undefined && !locked && (
        <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${active ? 'bg-blue-600' : 'bg-slate-300'}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  </button>
);

// --- Todo List View (Comprehensive) ---
interface TodoViewProps {
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  projects: SEOProject[];
}

const TodoView: React.FC<TodoViewProps> = ({ todos, setTodos, projects }) => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newTask, setNewTask] = useState('');
  const [newProjectId, setNewProjectId] = useState('');

  const calendarViewDays = useMemo(() => {
    const dates = [];
    for (let i = 29; i >= -10; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  }, []);

  const getPerformance = (date: string) => {
    const tasks = todos.filter(t => t.date === date);
    if (tasks.length === 0) return 'bg-slate-50 text-slate-400 border border-slate-100 hover:border-blue-200';
    const completed = tasks.filter(t => t.completed).length;
    const ratio = completed / tasks.length;
    if (ratio === 1) return 'bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold';
    return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
  };

  const performanceScore = useMemo(() => {
    let totalTasks = 0;
    let completedTasks = 0;
    todos.forEach(t => {
      if (calendarViewDays.includes(t.date)) {
        totalTasks++;
        if (t.completed) completedTasks++;
      }
    });
    return totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  }, [todos, calendarViewDays]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const newItem: TodoItem = {
      id: Math.random().toString(36).substr(2, 9),
      text: newTask,
      date: selectedDate,
      completed: false,
      projectId: newProjectId || undefined
    };
    setTodos([...todos, newItem]);
    setNewTask('');
    setNewProjectId('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const getProjectName = (id?: string) => projects.find(p => p.id === id)?.name;

  const currentTodos = todos.filter(t => t.date === selectedDate);

  const renderTaskSection = (title: string, mainIcon: React.ReactNode, data: GuideTask[]) => {
    const groupedData = data.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, GuideTask[]>);

    return (
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-2">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">{mainIcon}{title}</h3>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {Object.entries(groupedData).map(([category, items]) => (
            <GuideCard key={category} category={category} items={items} theme={{ bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: 'bg-blue-100' }} description="Guided Tasks" />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Task Board</h2>
          <p className="text-slate-500">Track your productivity and manage your daily agenda.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 shadow-sm">
          <div className="p-2 bg-green-50 text-green-600 rounded-full"><TrendingUp size={20} /></div>
          <div><p className="text-xs text-slate-500 font-medium">30-Day Consistency</p><p className="text-xl font-bold text-slate-800">{performanceScore}%</p></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2"><Calendar size={16} /> 30 Days</h3>
        <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
          {calendarViewDays.map(date => {
            const dayNumber = new Date(date).getDate();
            const isSelected = date === selectedDate;
            return (
              <div key={date} className={`w-10 h-12 rounded-lg cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${getPerformance(date)} ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500 shadow-md transform scale-105' : 'hover:bg-slate-50'}`} onClick={() => setSelectedDate(date)}>
                <span className="text-sm font-medium">{dayNumber}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-green-100 bg-green-50 flex justify-between items-center">
              <h3 className="font-bold text-green-900 flex items-center gap-2"><ListTodo size={18} className="text-green-600" /> Tasks</h3>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="text-sm border border-slate-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="p-4">
              <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-2 mb-6">
                <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="What needs to be done?" className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                <select value={newProjectId} onChange={(e) => setNewProjectId(e.target.value)} className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-600 text-sm">
                  <option value="">Personal</option>
                  {projects.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
                </select>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">Add</button>
              </form>
              <div className="space-y-3">
                {currentTodos.length === 0 ? <p className="text-center py-8 text-slate-400">No tasks for this day.</p> : currentTodos.map(todo => (
                  <div key={todo.id} className={`flex flex-col p-3 rounded-xl border mb-3 transition-all ${todo.completed ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-green-50 border-green-200 shadow-sm hover:shadow-md'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${todo.completed ? 'bg-slate-200 text-slate-500' : 'bg-white text-green-600 shadow-sm'}`}>
                        {new Date(todo.date).toLocaleDateString()}
                      </span>
                      <button onClick={() => deleteTodo(todo.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1 hover:bg-white/50 rounded"><Trash2 size={14} /></button>
                    </div>

                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => setTodos(todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t))}
                        className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-colors shadow-sm ${todo.completed ? 'bg-slate-300 text-white' : 'bg-white border border-green-300 text-green-600 hover:border-green-500'}`}
                      >
                        {todo.completed && <CheckCircle size={14} />}
                      </button>
                      <div className="flex flex-col">
                        <p className={`text-sm font-bold leading-tight ${todo.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>{todo.text}</p>
                        {todo.projectId && <span className="text-[10px] text-green-700 bg-green-100/50 px-1.5 py-0.5 rounded w-fit mt-1.5 font-medium">{getProjectName(todo.projectId)}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-red-50"><h3 className="font-bold text-red-800 flex items-center gap-2"><Mail size={18} /> Pending</h3></div>
            <div className="p-4">
              {todos.filter(t => t.date < new Date().toISOString().split('T')[0] && !t.completed).length === 0 ? <p className="text-center text-slate-500 text-sm">No overdue tasks.</p> :
                todos.filter(t => t.date < new Date().toISOString().split('T')[0] && !t.completed).map(todo => (
                  <div key={todo.id} className="p-3 bg-red-50 border border-red-100 rounded-lg mb-2 last:mb-0">
                    <div className="flex justify-between items-start mb-1"><span className="text-xs font-semibold text-red-600 bg-white px-1 rounded">{new Date(todo.date).toLocaleDateString()}</span></div>
                    <p className="text-sm text-slate-800 font-medium">{todo.text}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-12">
        {renderTaskSection("Marketing & SEO Tasks Sample List", <Megaphone size={22} className="text-purple-600" />, MARKETING_GUIDE)}
        {renderTaskSection("Personal & Admin Sample Tasks", <User size={22} className="text-blue-600" />, PERSONAL_GUIDE)}
      </div>
    </div>
  );
};

// --- Tools View (NEW SPLIT DESIGN) ---
const ToolsView: React.FC = () => {
  const [activeToolCategoryId, setActiveToolCategoryId] = useState<string>(SEO_TOOLS_CATEGORIES[0].id);

  const getToolCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return <Search size={20} />;
      case 'Activity': return <Activity size={20} />;
      case 'BarChart3': return <BarChart3 size={20} />;
      case 'Zap': return <Zap size={20} />;
      case 'Code': return <Code size={20} />;
      case 'FileText': return <FileText size={20} />; // Content
      case 'Bot': return <Bot size={20} />; // AI
      case 'Layout': return <Layout size={20} />; // CMS
      case 'Puzzle': return <Puzzle size={20} />; // Extensions
      default: return <Wrench size={20} />;
    }
  };

  const activeCategory = SEO_TOOLS_CATEGORIES.find(c => c.id === activeToolCategoryId);
  const totalTools = SEO_TOOLS_CATEGORIES.reduce((acc, cat) => acc + cat.tools.length, 0);

  return (
    <div className="animate-fade-in flex flex-col md:flex-row gap-8">
      {/* Left Sidebar */}
      <div className="w-full md:w-80 flex-shrink-0 space-y-6">
        {/* Tools Summary Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col items-center relative overflow-hidden">
          <div className="text-center mb-4">
            <h3 className="font-bold text-slate-800 text-lg">Tools Board</h3>
          </div>
          <div className="relative w-32 h-32 flex items-center justify-center bg-blue-50 rounded-full mb-2">
            <Wrench size={48} className="text-blue-600" />
          </div>
          <div className="mt-2 text-center">
            <span className="text-3xl font-bold text-slate-800">
              {totalTools}
            </span>
            <p className="text-xs text-slate-400 mt-1">Total Tools Available</p>
          </div>
        </div>

        <nav className="space-y-1">
          {SEO_TOOLS_CATEGORIES.map(category => (
            <NavigationTab
              key={category.id}
              id={category.id}
              title={category.title}
              subtitle={category.subtitle}
              icon={getToolCategoryIcon(category.iconName)}
              active={activeToolCategoryId === category.id}
              onClick={() => setActiveToolCategoryId(category.id)}
            />
          ))}
        </nav>
      </div>

      {/* Right Content */}
      <div className="flex-1">
        {activeCategory && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800">{activeCategory.title}</h2>
              <p className="text-slate-500">{activeCategory.subtitle}</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {activeCategory.tools.map(tool => (
                  <div key={tool.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors group">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-slate-800">{tool.name}</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border 
                                                     ${tool.priceModel === 'Free' ? 'bg-green-50 text-green-700 border-green-200' :
                            tool.priceModel === 'Paid' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                              'bg-orange-50 text-orange-700 border-orange-200'}`}>
                          {tool.priceModel}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">{tool.description}</p>
                    </div>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm group-hover:shadow-md whitespace-nowrap"
                    >
                      Visit Tool <ExternalLink size={16} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Extensions View ---
const ExtensionsView: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="p-8 text-center bg-gradient-to-b from-blue-50/50 to-white border-b border-slate-100">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 shadow-sm">
            <Puzzle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Extensions Board</h2>
          <p className="text-slate-500 max-w-lg mx-auto">{SEO_EXTENSIONS_LIST.subtitle}</p>
        </div>
        <div className="divide-y divide-slate-100">
          {SEO_EXTENSIONS_LIST.tools.map(tool => (
            <div key={tool.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-md transition-all duration-300">
                  <Puzzle size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-800 text-lg">{tool.name}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border 
                                            ${tool.priceModel === 'Free' ? 'bg-green-50 text-green-700 border-green-200' :
                        tool.priceModel === 'Paid' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                          'bg-orange-50 text-orange-700 border-orange-200'}`}>
                      {tool.priceModel}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">{tool.description}</p>
                </div>
              </div>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:text-blue-600 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all whitespace-nowrap"
              >
                Get Extension <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center p-8 bg-slate-100 rounded-2xl border border-dashed border-slate-300">
        <p className="text-slate-500 font-medium">Have a favorite extension not listed here?</p>
        <button className="text-blue-600 font-bold hover:underline mt-1 text-sm">Submit a suggestion</button>
      </div>
    </div>
  );
};

// --- Sidebar CTA Component ---
const SidebarCTA: React.FC = () => (
  <div className="mx-4 mb-6 p-5 bg-blue-50/80 rounded-2xl border border-blue-100">
    <h3 className="font-bold text-slate-800 text-sm mb-2">Ready to rank?</h3>
    <p className="text-xs text-slate-600 mb-4 leading-relaxed">
      Join 10,000+ SEOs<br />managing their projects here.
    </p>
    <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm active:scale-95 shadow-blue-600/20">
      Create Free Account
    </button>
  </div>
);

// --- Landing Page (Guest View) ---
const LandingView: React.FC<{ onSignUp: () => void }> = ({ onSignUp }) => {
  return (
    <div className="animate-fade-in space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-bold text-xs uppercase tracking-wider mb-4 border border-blue-100">
          <Zap size={14} /> The #1 Platform for SEO Growth
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight max-w-3xl mx-auto">
          Scale Your SEO Agency with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Precision & Confidence</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Manage projects, track audits, and execute strategies seamlessly. Join 10,000+ SEO professionals who trust SEO Academy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button onClick={onSignUp} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-95 text-lg">
            Start Free Trial <ChevronRight size={20} />
          </button>
          <button onClick={onSignUp} className="px-8 py-4 bg-white text-slate-700 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 active:scale-95 text-lg">
            View Live Demo
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: LayoutDashboard, title: "Centralized Dashboard", desc: "Manage all your SEO projects, audits, and client reports in one unified view." },
          { icon: CheckSquare, title: "Actionable Checklists", desc: "Follow proven step-by-step guides for technical SEO, content, and link building." },
          { icon: TrendingUp, title: "Performance Tracking", desc: "Monitor your progress with real-time analytics and health scores for every project." }
        ].map((feature, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
              <feature.icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
            <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Social Proof */}
      <div className="bg-slate-900 text-white rounded-3xl p-12 text-center relative overflow-hidden">
        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl font-bold">Trusted by Industry Leaders</h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all">
            {/* Mock Logos */}
            <div className="text-2xl font-black font-serif">FORBES</div>
            <div className="text-2xl font-black font-sans">TechCrunch</div>
            <div className="text-2xl font-black font-mono">WIRED</div>
            <div className="text-2xl font-black">Medium</div>
          </div>
        </div>
        {/* Abstract BG */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 pointer-events-none"></div>
      </div>
    </div>
  );
};

// --- Onboarding Dashboard (Logged In, No Projects) ---
const OnboardingDashboard: React.FC<{ onCreateProject: () => void, user: UserProfile }> = ({ onCreateProject, user }) => {
  return (
    <div className="animate-fade-in max-w-5xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="flex-1 relative z-10">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome to your workspace, {user.name}! 👋</h1>
          <p className="text-slate-500 text-lg mb-6">Let's get you set up for SEO success. Complete these steps to activate your dashboard.</p>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
            <span>Setup Progress:</span>
            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-[20%]"></div>
            </div>
            <span className="text-blue-600">20%</span>
          </div>
        </div>
        <div className="w-48 h-48 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
          <Rocket size={80} className="text-blue-600" />
        </div>
      </div>

      {/* Onboarding Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-all cursor-pointer group" onClick={onCreateProject}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Plus size={24} />
            </div>
            <div className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">Priority</div>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Create Your First Project</h3>
          <p className="text-slate-500 text-sm mb-4">Start by adding a website to audit and manage. This unlocks your main dashboard features.</p>
          <span className="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Start Now <ArrowRight size={16} /></span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all opacity-70">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-slate-100 text-slate-500 rounded-lg">
              <User size={24} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Complete Profile</h3>
          <p className="text-slate-500 text-sm mb-4">Add your professional details and social links to personalize your experience.</p>
          <span className="text-slate-400 font-bold text-sm">Pending</span>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  // Persistence Helper
  const loadState = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      return fallback;
    }
  };

  const [view, setView] = useState<ViewState>('LANDING'); // Default to LANDING
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('basic_details');

  // Persistent State
  const [projects, setProjects] = useState<SEOProject[]>(() => loadState('seo_projects', INITIAL_PROJECTS)); // Ensure fallback to initial projects too if empty
  const [todos, setTodos] = useState<TodoItem[]>(() => loadState('seo_todos_v1', INITIAL_TODOS)); // Updated key to force refresh
  const [user, setUser] = useState<UserProfile | null>(() => loadState('seo_user', null));

  // Initialize view based on user state
  useEffect(() => {
    if (!user) {
      setView('LANDING');
    } else {
      // If user is logged in but view is LANDING, switch to Dashboard
      if (view === 'LANDING') setView('DASHBOARD');
    }
  }, [user]);

  // UI State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDomain, setNewProjectDomain] = useState('');
  const [newProjectLogo, setNewProjectLogo] = useState('');

  // Delete Modal State
  const [projectToDelete, setProjectToDelete] = useState<SEOProject | null>(null);

  // Persistence Effects
  useEffect(() => { localStorage.setItem('seo_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('seo_todos_v1', JSON.stringify(todos)); }, [todos]);
  useEffect(() => { localStorage.setItem('seo_user', JSON.stringify(user)); }, [user]);

  const activeProject = projects.find(p => p.id === activeProjectId);

  const checkAuth = (action: () => void) => user ? action() : setIsLoginModalOpen(true);

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'Server': return <Server size={20} />;
      case 'FileText': return <FileText size={20} />;
      case 'Globe': return <Globe size={20} />;
      case 'MapPin': return <MapPin size={20} />;
      case 'ClipboardList': return <ClipboardList size={20} />;
      case 'Image': return <Image size={20} />;
      case 'Video': return <Video size={20} />;
      case 'Bot': return <Bot size={20} />;
      case 'Search': return <Search size={20} />;
      case 'Mic': return <Mic size={20} />;
      case 'Database': return <Database size={20} />;
      case 'Youtube': return <Youtube size={20} />;
      case 'Layout': return <Layout size={20} />;
      case 'ShoppingBag': return <ShoppingBag size={20} />;
      case 'ShoppingCart': return <ShoppingCart size={20} />;
      case 'Cloud': return <Cloud size={20} />;
      case 'Lock': return <Lock size={20} />;
      default: return <BarChart3 size={20} />;
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    // Create a deep copy of the default pillars structure
    const initialPillars = JSON.parse(JSON.stringify(INITIAL_PROJECTS[0].pillars));

    // IMPORTANT: Reset all tasks to incomplete to ensure 0% progress start
    initialPillars.forEach((pillar: any) => {
      pillar.categories.forEach((cat: any) => {
        cat.tasks.forEach((task: any) => {
          task.completed = false;
        });
      });
    });

    const newProject: SEOProject = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProjectName,
      domain: newProjectDomain || 'https://',
      logo: newProjectLogo.trim() || `https://www.google.com/s2/favicons?domain=${newProjectDomain || 'google.com'}&sz=128`,
      lastAuditDate: new Date().toISOString().split('T')[0],
      score: 0,
      pillars: initialPillars,
      basicDetails: {
        companyName: newProjectName,
        website: newProjectDomain || 'https://',
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
      }
    };
    setProjects([...projects, newProject]);
    setNewProjectName('');
    setNewProjectDomain('');
    setNewProjectLogo('');
    setIsProjectModalOpen(false);

    // Auto-open the new project
    setActiveProjectId(newProject.id);
    setView('DASHBOARD');
    setActiveTab('basic_details');
  };

  const handleConfirmDelete = (withExport: boolean) => {
    if (!projectToDelete) return;

    if (withExport) {
      downloadProjectCSV(projectToDelete);
    }

    const updatedProjects = projects.filter(p => p.id !== projectToDelete.id);
    setProjects(updatedProjects);

    if (activeProjectId === projectToDelete.id) {
      setActiveProjectId(null);
      setView('DASHBOARD');
    }
    setProjectToDelete(null);
  };

  const handleToggleTask = (taskId: string, categoryId: string) => {
    if (!activeProject) return;
    const updatedProjects = projects.map(project => {
      if (project.id === activeProject.id) {
        const updatedPillars = project.pillars.map(pillar => {
          const updatedCategories = pillar.categories.map(cat => {
            if (cat.id === categoryId) {
              return { ...cat, tasks: cat.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t) };
            }
            return cat;
          });
          return { ...pillar, categories: updatedCategories };
        });
        let total = 0, completed = 0;
        updatedPillars.forEach(p => p.categories.forEach(c => c.tasks.forEach(t => { total++; if (t.completed) completed++; })));
        return { ...project, pillars: updatedPillars, score: total === 0 ? 0 : (completed / total) * 100 };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const handleUpdateProject = (updatedProject: SEOProject) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const SidebarItem = ({ icon: Icon, label, active, onClick, badge }: any) => (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1 ${active ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}>
      <Icon size={20} />
      <span className="flex-1 text-left">{label}</span>
      {badge && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{badge}</span>}
    </button>
  );

  const handleOnboardingUpdateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...data, onboardingStep: 2, isProfileComplete: true });
  };

  const handleOnboardingCreateProject = (name: string, domain: string) => {
    if (!user) return;
    // Create Project Logic reused/adapted
    const initialPillars = JSON.parse(JSON.stringify(INITIAL_PROJECTS[0].pillars));
    initialPillars.forEach((pillar: any) => {
      pillar.categories.forEach((cat: any) => {
        cat.tasks.forEach((task: any) => { task.completed = false; });
      });
    });

    const newProject: SEOProject = {
      id: Math.random().toString(36).substr(2, 9),
      name: name,
      domain: domain,
      logo: `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
      lastAuditDate: new Date().toISOString().split('T')[0],
      score: 0,
      pillars: initialPillars,
      basicDetails: { ...INITIAL_PROJECTS[0].basicDetails, companyName: name, website: domain } // Simplified for brevity
    };
    setProjects([...projects, newProject]);
    setUser({ ...user, onboardingStep: 3 });
  };

  const handleOnboardingCreateTask = (text: string) => {
    if (!user) return;
    const newItem: TodoItem = {
      id: Math.random().toString(36).substr(2, 9),
      text: text,
      date: new Date().toISOString().split('T')[0],
      completed: false
    };
    setTodos([...todos, newItem]);
    setUser({ ...user, onboardingStep: 4 });
  };

  const handleOnboardingReadGuide = () => {
    if (!user) return;
    setUser({ ...user, onboardingStep: 5 });
    setView('DASHBOARD');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setIsSidebarOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
            <span className="font-bold text-xl text-slate-800">SEO Academy</span>
          </div>
          <button className="ml-auto md:hidden text-slate-400" onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
        </div>
        <div className="p-4 flex flex-col h-[calc(100%-4rem)] overflow-y-auto">
          <div className="space-y-6">
            <div>
              <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Dashboard</p>
              <SidebarItem icon={LayoutDashboard} label="Dashboard" active={view === 'DASHBOARD'} onClick={() => checkAuth(() => { setView('DASHBOARD'); setActiveProjectId(null); setIsSidebarOpen(false); })} />
              <SidebarItem icon={Briefcase} label="Projects" active={view === 'PROJECTS' || view === 'PROJECT_DETAIL'} onClick={() => checkAuth(() => { setView('PROJECTS'); setActiveProjectId(null); setIsSidebarOpen(false); })} />
              <SidebarItem icon={CheckSquare} label="Tasks" active={view === 'TODO'} onClick={() => checkAuth(() => { setView('TODO'); setIsSidebarOpen(false); })} badge={todos.filter(t => !t.completed && t.date <= new Date().toISOString().split('T')[0]).length || undefined} />
              <SidebarItem icon={BookOpen} label="Guide" active={view === 'SEO_GUIDE'} onClick={() => { setView('SEO_GUIDE'); setIsSidebarOpen(false); }} />
              <SidebarItem icon={Wrench} label="Tools" active={view === 'TOOLS'} onClick={() => { setView('TOOLS'); setIsSidebarOpen(false); }} />
              <SidebarItem icon={Puzzle} label="Extensions" active={view === 'EXTENSIONS'} onClick={() => { setView('EXTENSIONS'); setIsSidebarOpen(false); }} />
              <SidebarItem icon={Briefcase} label="Jobs" active={view === 'JOBS'} onClick={() => { setView('JOBS'); setIsSidebarOpen(false); }} />
              <SidebarItem icon={Layers} label="Resources" active={view === 'GUIDE'} onClick={() => { setView('GUIDE'); setIsSidebarOpen(false); }} />
            </div>
          </div>

          {/* CTA Card */}
          <SidebarCTA />

          <div className="mt-auto pt-6 border-t border-slate-100 space-y-1">
            {user ? (
              <>
                <SidebarItem icon={Settings} label="Settings" active={view === 'SETTINGS'} onClick={() => { setView('SETTINGS'); setIsSidebarOpen(false); }} />
                <SidebarItem icon={LogOut} label="Sign Out" active={false} onClick={() => { setUser(null); setView('LANDING'); }} />
              </>
            ) : (
              <button onClick={() => setIsLoginModalOpen(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1 text-blue-600 hover:bg-blue-50 font-medium">
                <LogIn size={20} /><span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-500" onClick={() => setIsSidebarOpen(true)}><Menu size={24} /></button>
            <h1 className="text-lg font-bold text-slate-800">
              {view === 'LANDING' ? 'Welcome' : view === 'DASHBOARD' ? 'Projects Dashboard' : view === 'PROJECT_DETAIL' ? activeProject?.name : view === 'TODO' ? 'Task Board' : view === 'SEO_GUIDE' ? 'Guide Board' : view === 'TOOLS' ? 'Tools Board' : view === 'EXTENSIONS' ? 'Extensions Board' : view === 'JOBS' ? 'Jobs Board' : view === 'GUIDE' ? 'Resources Board' : 'Account Settings'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-slate-500"><Search size={16} /><input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-48" /></div>
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg"><Bell size={20} /><span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span></button>
          </div>
        </header>

        <div className="p-4 sm:p-8 max-w-7xl mx-auto min-h-[calc(100vh-4rem)]">

          {/* Landing View (Guest) */}
          {view === 'LANDING' && <LandingView onSignUp={() => setIsLoginModalOpen(true)} />}

          {/* Onboarding Wizard (Logged In, Incomplete Onboarding) */}
          {user && (user.onboardingStep || 0) < 5 && view !== 'LANDING' && (
            <OnboardingWizard
              user={user}
              currentStep={user.onboardingStep || 1}
              onUpdateProfile={handleOnboardingUpdateProfile}
              onCreateProject={handleOnboardingCreateProject}
              onCreateTask={handleOnboardingCreateTask}
              onReadGuide={handleOnboardingReadGuide}
            />
          )}

          {/* Active Dashboard (Logged In, Fully Onboarded) */}
          {view === 'DASHBOARD' && user && (user.onboardingStep || 0) >= 5 && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden mb-8">
                <div className="relative z-10 max-w-lg">
                  <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name.split(' ')[0]}!</h1>
                  <p className="text-blue-100 mb-6 text-lg">Here is what's happening with your projects today.</p>
                  <div className="flex gap-4">
                    <button onClick={() => setView('PROJECTS')} className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">View Projects</button>
                    <button onClick={() => setView('TODO')} className="bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-800 transition-colors">My Tasks</button>
                  </div>
                </div>
                <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-12 translate-y-12">
                  <Rocket size={180} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-slate-500 text-sm font-bold uppercase mb-2">Total Projects</h3>
                  <p className="text-3xl font-bold text-slate-800">{projects.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-slate-500 text-sm font-bold uppercase mb-2">Avg SEO Score</h3>
                  <p className="text-3xl font-bold text-slate-800">
                    {Math.round(projects.reduce((acc, p) => acc + p.score, 0) / projects.length || 0)}%
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-slate-500 text-sm font-bold uppercase mb-2">Pending Tasks</h3>
                  <p className="text-3xl font-bold text-slate-800">{todos.filter(t => !t.completed).length}</p>
                </div>
              </div>
            </div>
          )}

          {/* Projects List View */}
          {view === 'PROJECTS' && user && (user.onboardingStep || 0) >= 5 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-800">Projects Dashboard</h1>
              </div>

              {/* Removing Old Logic block since we handled Empty State above in OnboardingDashboard */}
              {false ? (
                // Old empty state block rendered here if needed, but we keep structure to avoid breaking closing tags
                <div />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column: Projects */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-5 text-white shadow-lg relative overflow-hidden group">
                        <div className="relative z-10">
                          <h3 className="text-blue-100 font-medium text-xs uppercase tracking-wide mb-1">Total Projects</h3>
                          <p className="text-3xl font-bold">{projects.length}</p>
                          <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] bg-white/10 px-2 py-0.5 rounded-full"><Activity size={10} /> Active</div>
                        </div>
                        <Briefcase size={80} className="absolute -bottom-4 -right-4 text-white/5 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-blue-200 transition-colors">
                        <div>
                          <h3 className="text-slate-500 font-medium text-xs uppercase tracking-wide mb-1">Avg Score</h3>
                          <p className="text-3xl font-bold text-slate-800">
                            {Math.round(projects.reduce((acc, p) => acc + p.score, 0) / projects.length || 0)}%
                          </p>
                        </div>
                        <p className="text-xs text-green-600 flex items-center gap-1 mt-2 font-medium"><TrendingUp size={12} /> +5% from last month</p>
                      </div>
                      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-orange-200 transition-colors">
                        <div>
                          <h3 className="text-slate-500 font-medium text-xs uppercase tracking-wide mb-1">Pending Actions</h3>
                          <p className="text-3xl font-bold text-slate-800">
                            {todos.filter(t => !t.completed && new Date(t.date) < new Date()).length}
                          </p>
                        </div>
                        <p className="text-xs text-orange-500 flex items-center gap-1 mt-2 font-medium"><AlertTriangle size={12} /> Needs attention</p>
                      </div>
                    </div>

                    {/* Project List */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-800">Your Projects</h2>
                        <button onClick={() => checkAuth(() => setIsProjectModalOpen(true))} className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1"><Plus size={16} /> New Project</button>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {projects.map(project => (
                          <div key={project.id} onClick={() => { setView('PROJECT_DETAIL'); setActiveProjectId(project.id); }} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all hover:border-blue-300 group">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <img src={project.logo} alt="Logo" className="w-12 h-12 rounded-lg bg-slate-50 p-2 object-contain border border-slate-100" />
                                <div>
                                  <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">{project.name}</h3>
                                  <p className="text-xs text-slate-500 truncate max-w-[200px] flex items-center gap-1"><Globe size={10} /> {project.domain}</p>
                                </div>
                              </div>
                              <button
                                onClick={(e) => { e.stopPropagation(); setProjectToDelete(project); }}
                                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                title="Delete Project"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs font-semibold text-slate-500">
                                <span>Health Score</span>
                                <span className={project.score >= 80 ? 'text-green-600' : project.score >= 50 ? 'text-orange-500' : 'text-red-500'}>{Math.round(project.score)}%</span>
                              </div>
                              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full transition-all duration-1000 ${project.score >= 80 ? 'bg-green-500' : project.score >= 50 ? 'bg-orange-400' : 'bg-red-400'}`} style={{ width: `${project.score}%` }}></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Profile & Todos */}
                  <div className="space-y-8">
                    {/* Profile Card */}
                    {/* Profile Card */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-24">
                      {/* User Header */}
                      {!user?.isProfileComplete ? (
                        <div className="flex flex-col items-center text-center animate-fade-in">
                          <div className="flex justify-between w-full mb-4">
                            <h3 className="font-bold text-slate-800 text-lg">Your Profile</h3>
                            <button onClick={() => setView('SETTINGS')} className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-50 transition-colors">
                              <Pencil size={18} />
                            </button>
                          </div>

                          <div className="relative w-32 h-32 mb-6">
                            {/* Circular Progress (25%) */}
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="64" cy="64" r="58" stroke="#F1F5F9" strokeWidth="8" fill="transparent" />
                              <circle
                                cx="64" cy="64" r="58"
                                stroke={user?.isProfileComplete ? "#22c55e" : "#8B5CF6"}
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray="364"
                                strokeDashoffset={364 - (364 * Math.min((user?.onboardingStep || 1) * 20, 100) / 100)}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-600/30">
                                {user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'GU'}
                              </div>
                            </div>
                          </div>

                          <h3 className="font-bold text-slate-800 text-xl mb-1">Good Morning, {user?.name ? user.name.split(' ')[0] : 'Guest'}</h3>
                          <p className="text-sm text-slate-500 mb-8 font-medium">
                            {user?.isProfileComplete ? 'All set! Ready to conquer SEO.' : 'Complete profile to unlock features'}
                          </p>

                          <button onClick={() => setView('SETTINGS')} className={`w-full text-white font-bold py-3.5 rounded-xl mb-8 hover:opacity-90 transition-all shadow-lg active:scale-95 ${user?.isProfileComplete ? 'bg-green-600 shadow-green-600/20' : 'bg-slate-900 shadow-slate-900/10'}`}>
                            {user?.isProfileComplete ? 'Edit Profile' : 'Complete Profile'}
                          </button>

                          <div className="flex gap-4 justify-center w-full">
                            <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-blue-600 transition-colors hover:border-blue-200 hover:shadow-sm"><Bell size={20} /></button>
                            <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-blue-600 transition-colors hover:border-blue-200 hover:shadow-sm"><Mail size={20} /></button>
                            <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-blue-600 transition-colors hover:border-blue-200 hover:shadow-sm"><User size={20} /></button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full p-1 border border-blue-100 flex-shrink-0">
                              <img src={user?.avatar || 'https://via.placeholder.com/150'} alt="Profile" className="w-full h-full rounded-full object-cover" />
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-900 text-xl">{user ? user.name : 'Guest User'}</h3>
                              <p className="text-sm text-slate-500 font-medium">SEO Specialist</p>
                            </div>
                          </div>

                          <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="text-base font-bold text-slate-800">Daily Consistency</h4>
                              <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">+12%</span>
                            </div>
                            <div className="flex gap-2 h-10 items-end px-1">
                              {[40, 60, 30, 0, 45, 80, 100].map((h, i) => (
                                <div
                                  key={i}
                                  className={`flex-1 rounded-t-md transition-all duration-500 ${i === 6 ? 'bg-blue-600' : 'bg-slate-200'}`}
                                  style={{ height: h === 0 ? '10%' : `${h}%` }}
                                ></div>
                              ))}
                            </div>
                            <p className="text-xs text-slate-400 mt-3 text-center font-medium">Last 7 Days Activity</p>
                          </div>

                          <div className="border-t border-slate-100 pt-6">
                            <h4 className="text-base font-bold text-slate-800 mb-6 flex items-center justify-between">
                              <span>My Tasks</span>
                              <button onClick={() => setView('TODO')} className="text-blue-600 text-xs font-bold hover:underline">View All</button>
                            </h4>

                            <div className="space-y-6">
                              <div className="space-y-3">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">New & Active</p>
                                {todos.filter(t => !t.completed && new Date(t.date) >= new Date(new Date().setHours(0, 0, 0, 0))).length === 0 ? (
                                  <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                    <p className="text-sm text-slate-500 font-medium mb-3">No active tasks. Start your day!</p>
                                    <button onClick={() => setView('TODO')} className="px-4 py-2 bg-white border border-blue-200 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-sm">
                                      + Create New Task
                                    </button>
                                  </div>
                                ) : (
                                  todos.filter(t => !t.completed && new Date(t.date) >= new Date(new Date().setHours(0, 0, 0, 0))).slice(0, 3).map(todo => (
                                    <div key={todo.id} className="p-3 rounded-xl border border-blue-200 bg-white hover:border-blue-400 transition-colors group flex items-start gap-3 cursor-pointer" onClick={() => setTodos(todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t))}>
                                      <div className={`w-5 h-5 rounded border-2 border-slate-300 mt-0.5 flex items-center justify-center flex-shrink-0 group-hover:border-blue-500`}></div>
                                      <div>
                                        <p className="text-sm font-bold text-slate-700 leading-tight mb-1">{todo.text}</p>
                                        <p className="text-xs text-blue-500 font-medium">Active</p>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>

                              <div className="space-y-3">
                                <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider flex justify-between items-center">
                                  <span>Pending / Overdue</span>
                                  {todos.filter(t => !t.completed && new Date(t.date) < new Date(new Date().setHours(0, 0, 0, 0))).length > 0 &&
                                    <span className="text-[10px] lowercase italic opacity-80">Finish these to unlock potential!</span>
                                  }
                                </p>
                                {todos.filter(t => !t.completed && new Date(t.date) < new Date(new Date().setHours(0, 0, 0, 0))).length === 0 ? (
                                  <div className="text-sm text-slate-400 italic font-medium">All caught up! Great job sticking to your plan.</div>
                                ) : (
                                  todos.filter(t => !t.completed && new Date(t.date) < new Date(new Date().setHours(0, 0, 0, 0))).slice(0, 3).map(todo => (
                                    <div key={todo.id} className="p-3 rounded-xl border border-red-500 bg-white hover:bg-red-50/10 transition-colors group flex items-start gap-3 cursor-pointer relative overflow-hidden" onClick={() => setTodos(todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t))}>
                                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                                      <div className={`w-5 h-5 rounded border-2 border-red-200 mt-0.5 flex items-center justify-center flex-shrink-0 bg-red-50`}></div>
                                      <div>
                                        <p className="text-sm font-bold text-slate-800 leading-tight mb-1">{todo.text}</p>
                                        <p className="text-xs text-red-500 font-medium">Overdue</p>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {view === 'PROJECT_DETAIL' && activeProject && (
            <div className="animate-fade-in flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-80 flex-shrink-0 space-y-6 md:sticky md:top-24">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col items-center relative overflow-hidden">
                  <div className="text-center mb-4"><h3 className="font-bold text-slate-800 text-lg">Overall Health</h3></div>
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <RadialProgress score={activeProject.score} size={160} />
                    <div className="absolute inset-0 flex items-center justify-center"><div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 p-2"><img src={activeProject.logo} className="w-full h-full object-cover rounded-full" /></div></div>
                  </div>
                  <div className="mt-4 text-center"><span className={`text-3xl font-bold ${activeProject.score >= 80 ? 'text-green-600' : 'text-orange-500'}`}>{Math.round(activeProject.score)}%</span><p className="text-xs text-slate-400 mt-1">SEO Score</p></div>
                </div>
                <nav className="space-y-1">
                  <NavigationTab id="basic" title="Basic Details" subtitle="Company & Identity" icon={<Info size={20} />} active={activeTab === 'basic_details'} onClick={() => setActiveTab('basic_details')} />
                  {activeProject.pillars.map(pillar => (
                    <NavigationTab
                      key={pillar.id}
                      id={pillar.id}
                      title={pillar.title}
                      subtitle={pillar.isLocked ? 'Premium Plan' : pillar.description.split(',')[0]}
                      icon={getPillarIcon(pillar.iconName)}
                      active={activeTab === pillar.id}
                      onClick={() => setActiveTab(pillar.id)}
                      progress={!pillar.isLocked ? Math.round((pillar.categories.reduce((a, c) => a + c.tasks.filter(t => t.completed).length, 0) / pillar.categories.reduce((a, c) => a + c.tasks.length, 0) || 0) * 100) : undefined}
                      locked={pillar.isLocked}
                    />
                  ))}
                </nav>
              </div>
              <div className="flex-1">
                <div className="flex justify-end mb-4 gap-2">
                  <button onClick={() => setView('DASHBOARD')} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600"><ChevronLeft size={16} /> Back</button>
                  <button onClick={() => setProjectToDelete(activeProject)} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-red-500 hover:bg-red-50"><Trash2 size={16} /> Delete</button>
                </div>
                {activeTab === 'basic_details' && activeProject.basicDetails && (
                  <ProjectOnboarding project={activeProject} onUpdate={handleUpdateProject} />
                )}
                {activeProject.pillars.map(pillar => pillar.id === activeTab && (
                  <div key={pillar.id} className="animate-fade-in">
                    <div className="mb-6"><h2 className="text-2xl font-bold text-slate-800">{pillar.title}</h2><p className="text-slate-500">{pillar.description}</p></div>
                    {pillar.isLocked ? (
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5"><Lock size={120} /></div>
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                          <Lock size={32} className="text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Unlock {pillar.title} Checklist</h3>
                        <p className="text-slate-500 max-w-md mx-auto mb-8">
                          Gain access to expert-curated strategies and tasks for {pillar.title} to skyrocket your rankings.
                          This checklist includes detailed actionable steps, resource links, and priority guides.
                        </p>
                        <div className="bg-slate-50 rounded-xl p-6 max-w-sm mx-auto border border-slate-200 mb-8">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <span className="text-slate-400 line-through text-lg">₹149</span>
                            <span className="text-3xl font-bold text-slate-800">₹99</span>
                          </div>
                          <p className="text-xs text-green-600 font-bold uppercase tracking-wider">Valid for 1 Month • All Projects</p>
                        </div>
                        <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 active:scale-95 w-full max-w-xs">
                          Buy Now - ₹99
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">{pillar.categories.map(category => <ChecklistSection key={category.id} category={category} onToggleTask={handleToggleTask} />)}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'TODO' && <TodoView todos={todos} setTodos={setTodos} projects={projects} />}
          {view === 'TOOLS' && <ToolsView />}
          {view === 'EXTENSIONS' && <ExtensionsView />}
          {view === 'JOBS' && <JobsView onApplyClick={() => checkAuth(() => { })} />}
          {view === 'GUIDE' && <GuideView />}
          {view === 'SEO_GUIDE' && <SeoGuideView />}
          {view === 'SETTINGS' && user && <ProfileView user={user} onUpdate={(u) => setUser({ ...u, isProfileComplete: true })} />}
        </div>

        {isLoginModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md">
              {/* The outer button is removed in favor of the inner one in LoginView, but keeping layout container clean. */}
              <LoginView onLogin={() => {
                setUser(INITIAL_USER);
                setIsLoginModalOpen(false);
                setView('DASHBOARD'); // Redirect to dashboard after login (was SETTINGS)
              }}
                onSignUp={() => {
                  setUser(GUEST_USER);
                  setTodos(ONBOARDING_TODOS);
                  setIsLoginModalOpen(false);
                  setView('DASHBOARD');
                }}
                onClose={() => setIsLoginModalOpen(false)} isModal={true} />
            </div>
          </div>
        )}

        {
          isProjectModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="font-bold text-slate-800">Start New Project</h3>
                  <button onClick={() => setIsProjectModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                </div>
                <form onSubmit={handleCreateProject} className="p-6 space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Project Name</label>
                    <input
                      type="text"
                      className="w-full pl-4 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                      placeholder="e.g. My Awesome Brand"
                      value={newProjectName}
                      onChange={e => setNewProjectName(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Website Link (Domain)</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Globe size={16} /></div>
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                        placeholder="e.g. https://example.com"
                        value={newProjectDomain}
                        onChange={e => setNewProjectDomain(e.target.value)}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">We'll auto-fetch the logo from this link.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Project Logo (Optional)</label>
                    <div className="flex gap-4 items-center">
                      <div className="flex-1">
                        <label className="flex flex-col items-center justify-center w-full h-12 border-2 border-slate-200 border-dashed rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-2 text-slate-500">
                            <Plus size={16} />
                            <span className="text-xs font-medium">Click to Upload Logo</span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setNewProjectLogo(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0 relative group">
                        {newProjectLogo || newProjectDomain ? (
                          <>
                            <img
                              src={newProjectLogo || `https://www.google.com/s2/favicons?domain=${newProjectDomain}&sz=128`}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                              onLoad={(e) => { (e.target as HTMLImageElement).style.display = 'block'; }}
                            />
                            {newProjectLogo && (
                              <button
                                type="button"
                                onClick={() => setNewProjectLogo('')}
                                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 size={16} className="text-white" />
                              </button>
                            )}
                          </>
                        ) : (
                          <span className="text-xs text-slate-400 font-bold">?</span>
                        )}
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Upload a PNG, JPG or SVG.</p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!newProjectName}
                      className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-600/20 active:scale-95"
                    >
                      Create Project
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )
        }

        <DeleteConfirmationModal
          project={projectToDelete}
          isOpen={!!projectToDelete}
          onClose={() => setProjectToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      </main >
    </div >
  );
};

export default App;