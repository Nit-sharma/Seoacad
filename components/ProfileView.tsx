import React, { useState, useRef } from 'react';
import {
    Mail, Phone, MapPin, Linkedin, Twitter, Globe, Edit2, Shield, Bell, Moon,
    Share2, Save, Plus, Trash2, Award, Briefcase, ExternalLink, Github, Instagram
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
    user: UserProfile;
    onUpdate: (user: UserProfile) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user: initialUser, onUpdate }) => {
    const [user, setUser] = useState<UserProfile>(initialUser);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<UserProfile>(initialUser);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);

    // Handlers
    const handleEditToggle = () => {
        if (isEditing) {
            // Cancel edit - reset form
            setEditForm(user);
        } else {
            // Start edit
            setEditForm(user);
        }
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setUser(editForm);
        setIsEditing(false);
        onUpdate(editForm);
    };

    const handleChange = (field: keyof UserProfile, value: any) => {
        setEditForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSocialChange = (network: string, value: string) => {
        setEditForm(prev => ({
            ...prev,
            socials: { ...prev.socials, [network]: value }
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'avatar' | 'banner') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditForm(prev => ({ ...prev, [field]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    // --- Portfolio Handlers ---
    const addPortfolioItem = () => {
        const newItem = { id: Date.now().toString(), title: 'New Project', description: 'Project description...', link: '' };
        setEditForm(prev => ({ ...prev, portfolio: [...(prev.portfolio || []), newItem] }));
    };

    const removePortfolioItem = (id: string) => {
        setEditForm(prev => ({ ...prev, portfolio: (prev.portfolio || []).filter(i => i.id !== id) }));
    };

    const updatePortfolioItem = (id: string, field: string, value: string) => {
        setEditForm(prev => ({
            ...prev,
            portfolio: (prev.portfolio || []).map(i => i.id === id ? { ...i, [field]: value } : i)
        }));
    };

    // --- Certificate Handlers ---
    const addCertificate = () => {
        const newItem = { id: Date.now().toString(), name: 'Certificate Name', issuer: 'Issuer', date: '2024' };
        setEditForm(prev => ({ ...prev, certificates: [...(prev.certificates || []), newItem] }));
    };

    const removeCertificate = (id: string) => {
        setEditForm(prev => ({ ...prev, certificates: (prev.certificates || []).filter(i => i.id !== id) }));
    };

    const updateCertificate = (id: string, field: string, value: string) => {
        setEditForm(prev => ({
            ...prev,
            certificates: (prev.certificates || []).map(i => i.id === id ? { ...i, [field]: value } : i)
        }));
    };

    // --- Share Handler ---
    const handleShare = () => {
        const url = window.location.href; // Mock sharing the current URL
        navigator.clipboard.writeText(url);
        alert('Profile Link copied to clipboard!');
    };

    if (isEditing) {
        return (
            <div className="animate-fade-in space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-800">Edit Profile</h2>
                    <div className="flex gap-2">
                        <button onClick={handleEditToggle} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 font-medium">Cancel</button>
                        <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"><Save size={16} /> Save Changes</button>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                                <input type="text" value={editForm.name} onChange={(e) => handleChange('name', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Headline / Role</label>
                                <input type="text" value={editForm.role || ''} onChange={(e) => handleChange('role', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Senior SEO Specialist" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Location</label>
                                <input type="text" value={editForm.location || ''} onChange={(e) => handleChange('location', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone</label>
                                <input type="text" value={editForm.phone} onChange={(e) => handleChange('phone', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">About Me</label>
                            <textarea value={editForm.about} onChange={(e) => handleChange('about', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32" />
                        </div>
                    </div>

                    {/* Images */}
                    <div className="space-y-4 pt-4">
                        <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Profile Images</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Profile Picture</label>
                                <div className="flex items-center gap-4">
                                    <img src={editForm.avatar} className="w-16 h-16 rounded-full object-cover border border-slate-200" />
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'avatar')} />
                                    <button onClick={() => fileInputRef.current?.click()} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-sm font-medium">Change Avatar</button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Banner Image</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-32 h-16 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden">
                                        {editForm.banner && <img src={editForm.banner} className="w-full h-full object-cover" />}
                                    </div>
                                    <input type="file" ref={bannerInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'banner')} />
                                    <button onClick={() => bannerInputRef.current?.click()} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-sm font-medium">Change Banner</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="space-y-4 pt-4">
                        <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Social Links</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.keys(editForm.socials).map((key) => (
                                <div key={key}>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1 capitalize">{key}</label>
                                    <input
                                        type="text"
                                        value={(editForm.socials as any)[key] || ''}
                                        onChange={(e) => handleSocialChange(key, e.target.value)}
                                        className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder={`${key} username or url`}
                                    />
                                </div>
                            ))}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">New Social Network</label>
                                <div className="flex gap-2">
                                    <select className="p-2 border border-slate-200 rounded-lg text-sm bg-white">
                                        <option>Instagram</option>
                                        <option>Github</option>
                                        <option>Medium</option>
                                    </select>
                                    <button className="px-3 py-2 bg-slate-100 rounded-lg hover:bg-slate-200"><Plus size={16} /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Portfolio */}
                    <div className="space-y-4 pt-4">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <h3 className="text-lg font-bold text-slate-800">Portfolio</h3>
                            <button onClick={addPortfolioItem} className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus size={14} /> Add Project</button>
                        </div>
                        <div className="space-y-4">
                            {editForm.portfolio?.map((item, idx) => (
                                <div key={item.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50 relative group">
                                    <button onClick={() => removePortfolioItem(item.id)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input type="text" value={item.title} onChange={(e) => updatePortfolioItem(item.id, 'title', e.target.value)} className="p-2 border border-slate-200 rounded bg-white text-sm font-bold" placeholder="Project Title" />
                                        <input type="text" value={item.link} onChange={(e) => updatePortfolioItem(item.id, 'link', e.target.value)} className="p-2 border border-slate-200 rounded bg-white text-sm" placeholder="Project Link" />
                                        <textarea value={item.description} onChange={(e) => updatePortfolioItem(item.id, 'description', e.target.value)} className="md:col-span-2 p-2 border border-slate-200 rounded bg-white text-sm h-20 resize-none" placeholder="Description" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certificates */}
                    <div className="space-y-4 pt-4">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <h3 className="text-lg font-bold text-slate-800">Certificates</h3>
                            <button onClick={addCertificate} className="text-blue-600 text-sm font-medium flex items-center gap-1"><Plus size={14} /> Add Certificate</button>
                        </div>
                        <div className="space-y-4">
                            {editForm.certificates?.map((item, idx) => (
                                <div key={item.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50 relative">
                                    <button onClick={() => removeCertificate(item.id)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <input type="text" value={item.name} onChange={(e) => updateCertificate(item.id, 'name', e.target.value)} className="p-2 border border-slate-200 rounded bg-white text-sm font-bold" placeholder="Certificate Name" />
                                        <input type="text" value={item.issuer} onChange={(e) => updateCertificate(item.id, 'issuer', e.target.value)} className="p-2 border border-slate-200 rounded bg-white text-sm" placeholder="Issuer" />
                                        <input type="text" value={item.date} onChange={(e) => updateCertificate(item.id, 'date', e.target.value)} className="p-2 border border-slate-200 rounded bg-white text-sm" placeholder="Year" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in space-y-8 max-w-7xl mx-auto">
            {/* Header / Banner */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group">
                <div className="h-48 bg-slate-100 relative overflow-hidden">
                    {user.banner ? (
                        <img src={user.banner} alt="Banner" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={handleShare} className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg backdrop-blur-sm transition-colors" title="Share Profile">
                            <Share2 size={18} />
                        </button>
                        <button onClick={handleEditToggle} className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg backdrop-blur-sm transition-colors" title="Edit Profile">
                            <Edit2 size={18} />
                        </button>
                    </div>
                </div>

                <div className="px-6 md:px-8 pb-8">
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        {/* Avatar - Pulled up to overlap banner */}
                        <div className="-mt-12 md:-mt-16 relative z-10 flex-shrink-0 mx-auto md:mx-0">
                            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white ring-1 ring-slate-900/5">
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* Main Info - Starts naturally below banner */}
                        <div className="flex-1 text-center md:text-left w-full pt-1 md:pt-3">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-1">{user.name}</h1>
                                    <p className="text-base md:text-lg font-medium text-slate-500 mb-3">{user.role || 'SEO Specialist'}</p>

                                    {/* Contact Grid - Pills Style */}
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm text-slate-600">
                                        {user.location && (
                                            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
                                                <MapPin size={14} className="text-slate-400" />
                                                <span>{user.location}</span>
                                            </div>
                                        )}

                                        {user.phone && !user.isPhoneHidden && (
                                            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
                                                <Phone size={14} className="text-slate-400" />
                                                <span>{user.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions - Top Aligned */}
                                <div className="flex gap-3 justify-center md:justify-end flex-shrink-0 w-full md:w-auto mt-2 md:mt-0">
                                    <button onClick={handleEditToggle} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center gap-2 active:scale-95">
                                        <Edit2 size={16} /> <span className="">Edit Profile</span>
                                    </button>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 active:scale-95">
                                        <Mail size={16} /> <span>Contact</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
                        {/* Left Column: About & Socials & Certs */}
                        <div className="lg:col-span-1 space-y-8">
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">About</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {user.about}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Connect</h3>
                                <div className="space-y-3">
                                    {Object.entries(user.socials).map(([network, handle]) => {
                                        if (!handle || typeof handle !== 'string') return null;
                                        let icon = Globe;
                                        let color = "text-slate-600";
                                        let bg = "bg-slate-100";

                                        if (network.includes('linkedin')) { icon = Linkedin; color = "text-blue-600"; bg = "bg-blue-50"; }
                                        else if (network.includes('twitter')) { icon = Twitter; color = "text-sky-500"; bg = "bg-sky-50"; }
                                        else if (network.includes('github')) { icon = Github; color = "text-slate-800"; bg = "bg-slate-100"; }
                                        else if (network.includes('instagram')) { icon = Instagram; color = "text-pink-600"; bg = "bg-pink-50"; }

                                        return (
                                            <a key={network} href={handle.startsWith('http') ? handle : `https://${handle}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group">
                                                <div className={`p-2 rounded-md ${bg} ${color} group-hover:scale-110 transition-transform`}>
                                                    {/* Note: React dynamic component rendering like this might need explicit mapping, simpler below */}
                                                    {network.includes('linkedin') && <Linkedin size={18} />}
                                                    {network.includes('twitter') && <Twitter size={18} />}
                                                    {network.includes('github') && <Github size={18} />}
                                                    {network.includes('instagram') && <Instagram size={18} />}
                                                    {!['linkedin', 'twitter', 'github', 'instagram'].some(k => network.includes(k)) && <Globe size={18} />}
                                                </div>
                                                <span className="text-sm font-medium text-slate-700 truncate">{handle.replace(/^https?:\/\//, '')}</span>
                                                <ExternalLink size={14} className="ml-auto text-slate-300 opacity-0 group-hover:opacity-100" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>

                            {user.certificates && user.certificates.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Certificates</h3>
                                    <div className="space-y-3">
                                        {user.certificates.map(cert => (
                                            <div key={cert.id} className="flex items-start gap-3">
                                                <div className="mt-1 text-yellow-500"><Award size={18} /></div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">{cert.name}</p>
                                                    <p className="text-xs text-slate-500">{cert.issuer} • {cert.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Portfolio & Settings */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Portfolio Section */}
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Briefcase className="text-blue-600" size={24} /> Projects Portfolio
                                </h3>
                                {user.portfolio && user.portfolio.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {user.portfolio.map(project => (
                                            <div key={project.id} className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
                                                <div className="mb-2">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">{project.title}</h4>
                                                        {project.link && (
                                                            <a href={project.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600"><ExternalLink size={16} /></a>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-600 line-clamp-3">{project.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-8 text-center text-slate-500">
                                        <p>No projects added yet. Click "Edit Profile" to showcase your work.</p>
                                    </div>
                                )}
                            </div>

                            {/* Account Settings */}
                            <div className="pt-8 border-t border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Shield className="text-slate-600" size={24} /> Account Settings
                                </h3>
                                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                    <div className="p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer flex justify-between items-center group">
                                        <div>
                                            <p className="font-bold text-slate-800">Email Address</p>
                                            <p className="text-sm text-slate-500">{user.email}</p>
                                        </div>
                                        <button className="text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">Change</button>
                                    </div>
                                    <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer flex justify-between items-center group">
                                        <div>
                                            <p className="font-bold text-slate-800">Password</p>
                                            <p className="text-sm text-slate-500">Last changed 3 months ago</p>
                                        </div>
                                        <button className="text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">Update</button>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Preferences</p>
                                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
                                        <div className="p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Bell size={18} className="text-slate-400" />
                                                <span className="font-medium text-slate-700">Email Notifications</span>
                                            </div>
                                            <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${user.preferences.emailNotifications ? 'bg-blue-600' : 'bg-slate-300'}`}>
                                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${user.preferences.emailNotifications ? 'translate-x-4' : 'translate-x-0'}`} />
                                            </div>
                                        </div>
                                        <div className="p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Moon size={18} className="text-slate-400" />
                                                <span className="font-medium text-slate-700">Dark Mode</span>
                                            </div>
                                            <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${user.preferences.darkMode ? 'bg-blue-600' : 'bg-slate-300'}`}>
                                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${user.preferences.darkMode ? 'translate-x-4' : 'translate-x-0'}`} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
