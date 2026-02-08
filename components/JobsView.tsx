import React from 'react';
import { Briefcase, MapPin, Clock, DollarSign, ArrowRight, Building2 } from 'lucide-react';
import { JobListing } from '../types';

interface JobsViewProps {
  onApplyClick: () => void;
}

const MOCK_JOBS: JobListing[] = [
  {
    id: '1',
    title: 'Senior SEO Specialist',
    company: 'TechGrowth Inc.',
    location: 'Remote (US)',
    type: 'Full-time',
    salary: '$80k - $120k',
    postedDate: '2 days ago',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    title: 'Content Marketing Manager',
    company: 'Creative Pulse',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$70k - $95k',
    postedDate: '5 hours ago',
    logo: 'https://images.unsplash.com/photo-1572044162444-ad6021194360?w=100&h=100&fit=crop'
  },
  {
    id: '3',
    title: 'Freelance Link Builder',
    company: 'SEO Ninja Agency',
    location: 'Remote',
    type: 'Freelance',
    salary: '$40/hr',
    postedDate: '1 week ago',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop'
  },
  {
    id: '4',
    title: 'Technical SEO Analyst',
    company: 'WebFlow Masters',
    location: 'Austin, TX',
    type: 'Contract',
    salary: '$60k - $80k',
    postedDate: '3 days ago',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop'
  }
];

const JobsView: React.FC<JobsViewProps> = ({ onApplyClick }) => {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Jobs Board</h2>
        <p className="text-slate-500">Find your next role in Search Engine Optimization and Digital Marketing.</p>
      </div>

      <div className="grid gap-4">
        {MOCK_JOBS.map((job) => (
          <div key={job.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow group flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="flex-shrink-0">
              <img src={job.logo} alt={job.company} className="w-16 h-16 rounded-lg object-cover border border-slate-100" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                <span className="hidden sm:block text-slate-300">•</span>
                <span className="text-sm font-medium text-slate-600 flex items-center gap-1">
                  <Building2 size={14} /> {job.company}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-slate-400" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase size={16} className="text-slate-400" />
                  {job.type}
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign size={16} className="text-slate-400" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} className="text-slate-400" />
                  {job.postedDate}
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 w-full md:w-auto flex flex-row md:flex-col gap-3">
              <button
                onClick={onApplyClick}
                className="flex-1 md:flex-none px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm shadow-blue-200"
              >
                Apply Now <ExternalLinkIcon />
              </button>
              <button
                onClick={onApplyClick}
                className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors text-center"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-8 text-center border border-blue-100 mt-8">
        <h3 className="text-lg font-bold text-blue-900 mb-2">Want to post a job?</h3>
        <p className="text-blue-700 mb-6 max-w-lg mx-auto">Reach thousands of SEO professionals and marketers. Sign in to create a company profile and start hiring.</p>
        <button onClick={onApplyClick} className="px-6 py-2 bg-white text-blue-600 font-bold rounded-lg border border-blue-200 hover:shadow-md transition-all">
          Post a Job for Free
        </button>
      </div>
    </div>
  );
};

// Tiny helper for the icon inside button
const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

export default JobsView;