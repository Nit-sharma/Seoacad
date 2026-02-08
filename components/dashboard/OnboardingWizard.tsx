import React, { useState } from 'react';
import { UserProfile, SEOProject, TodoItem } from '../../types';
import {
    User, Briefcase, CheckSquare, BookOpen, ArrowRight, CheckCircle2,
    Plus, Globe, Loader2
} from 'lucide-react';

interface OnboardingWizardProps {
    user: UserProfile;
    onUpdateProfile: (data: Partial<UserProfile>) => void;
    onCreateProject: (name: string, domain: string) => void;
    onCreateTask: (text: string) => void;
    onReadGuide: () => void;
    currentStep: number;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
    user,
    onUpdateProfile,
    onCreateProject,
    onCreateTask,
    onReadGuide,
    currentStep
}) => {
    // Local state for forms
    const [profileName, setProfileName] = useState(user.name);
    const [profileRole, setProfileRole] = useState(user.role || '');

    const [projectName, setProjectName] = useState('');
    const [projectDomain, setProjectDomain] = useState('');

    const [taskText, setTaskText] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            onUpdateProfile({ name: profileName, role: profileRole });
            setIsLoading(false);
        }, 800);
    };

    const handleProjectSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!projectName || !projectDomain) return;
        setIsLoading(true);
        setTimeout(() => {
            onCreateProject(projectName, projectDomain);
            setIsLoading(false);
        }, 800);
    };

    const handleTaskSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskText) return;
        setIsLoading(true);
        setTimeout(() => {
            onCreateTask(taskText);
            setIsLoading(false);
        }, 600);
    };

    const steps = [
        { id: 1, title: 'Complete Profile', icon: User, description: 'Tell us about yourself' },
        { id: 2, title: 'Create Project', icon: Briefcase, description: 'Set up your first website' },
        { id: 3, title: 'First Task', icon: CheckSquare, description: 'What is your priority?' },
        { id: 4, title: 'Read Guide', icon: BookOpen, description: 'Learn the basics' }
    ];

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <form onSubmit={handleProfileSubmit} className="space-y-4 animate-fade-in-up">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={profileName}
                                onChange={(e) => setProfileName(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="e.g. Alex Johnson"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Role / Job Title</label>
                            <input
                                type="text"
                                value={profileRole}
                                onChange={(e) => setProfileRole(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="e.g. SEO Specialist"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-6 active:scale-95"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>Contextualize Experience <ArrowRight size={18} /></>}
                        </button>
                    </form>
                );
            case 2:
                return (
                    <form onSubmit={handleProjectSubmit} className="space-y-4 animate-fade-in-up">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                            <p className="text-sm text-blue-700">
                                Start by adding the main website you want to optimize.
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
                            <input
                                type="text"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="e.g. My Portfolio Site"
                                required
                                autoFocus
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Website Domain</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    value={projectDomain}
                                    onChange={(e) => setProjectDomain(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="https://example.com"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-6 active:scale-95"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>Create First Project <ArrowRight size={18} /></>}
                        </button>
                    </form>
                );
            case 3:
                return (
                    <form onSubmit={handleTaskSubmit} className="space-y-4 animate-fade-in-up">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-4">
                            <p className="text-sm text-green-700">
                                What is the one thing you need to get done today?
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Your First Task</label>
                            <div className="relative">
                                <Plus className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    value={taskText}
                                    onChange={(e) => setTaskText(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. Fix broken links on homepage"
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-6 active:scale-95"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>Add to Dashboard <ArrowRight size={18} /></>}
                        </button>
                    </form>
                );
            case 4:
                return (
                    <div className="animate-fade-in-up">
                        <p className="text-slate-600 mb-6">
                            Pick one guide to start your learning journey. You can read it later, just open it now.
                        </p>
                        <div className="space-y-3">
                            {[
                                { title: 'SEO Basics: The Fundamentals', time: '5 min' },
                                { title: 'How to do Keyword Research', time: '8 min' },
                                { title: 'On-Page SEO Checklist', time: '10 min' }
                            ].map((guide, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        setIsLoading(true);
                                        // Slight delay for effect
                                        setTimeout(() => {
                                            onReadGuide();
                                            setIsLoading(false);
                                        }, 500);
                                    }}
                                    className="bg-white border boundary-slate-200 p-4 rounded-xl hover:border-blue-300 hover:shadow-md cursor-pointer transition-all group flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <BookOpen size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">{guide.title}</h4>
                                            <p className="text-xs text-slate-500">{guide.time} read</p>
                                        </div>
                                    </div>
                                    <ArrowRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden min-h-[500px]">
                {/* Sidebar */}
                <div className="md:col-span-5 bg-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-2">Welcome to SEO Academy</h2>
                            <p className="text-slate-400">Let's get your workspace ready.</p>
                        </div>

                        <div className="space-y-6">
                            {steps.map((step) => {
                                const isActive = step.id === currentStep;
                                const isCompleted = step.id < currentStep;
                                const Icon = step.icon;

                                return (
                                    <div key={step.id} className={`flex items-center gap-4 transition-all ${isActive ? 'opacity-100 translate-x-2' : isCompleted ? 'opacity-50' : 'opacity-30'}`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-colors ${isActive ? 'border-blue-500 bg-blue-500 text-white' :
                                                isCompleted ? 'border-green-500 bg-green-500 text-white' :
                                                    'border-slate-600 text-slate-600'
                                            }`}>
                                            {isCompleted ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                                        </div>
                                        <div>
                                            <h4 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-300'}`}>{step.title}</h4>
                                            <p className="text-xs text-slate-500 hidden md:block">{step.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="relative z-10 text-xs text-slate-500 mt-8">
                        Step {currentStep} of 4
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">{steps[currentStep - 1].title}</h1>
                        <p className="text-slate-500 text-lg">{steps[currentStep - 1].description}</p>
                    </div>

                    {renderStepContent()}
                </div>
            </div>
        </div>
    );
};

export default OnboardingWizard;
