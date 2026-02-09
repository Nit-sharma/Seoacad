import React from 'react';
import { Rocket, ArrowRight, Sparkles, Check, CheckCircle2 } from 'lucide-react';

interface DashboardWelcomeProps {
    onGetStarted: () => void;
}

const DashboardWelcome: React.FC<DashboardWelcomeProps> = ({ onGetStarted }) => {
    return (
        <div className="animate-fade-in w-full h-full flex flex-col items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-4xl space-y-8 my-auto">

                {/* Main Banner */}
                <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 rounded-3xl p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">

                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">

                        <div className="flex-1 text-center md:text-left space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider text-blue-100 mb-2">
                                <Sparkles size={12} /> New Era of Growth
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                                Welcome to <br />
                                <span className="text-white">Seoacad</span>
                            </h1>

                            <p className="text-lg text-blue-100 max-w-md mx-auto md:mx-0 leading-relaxed opacity-90">
                                Your journey to search dominance starts here. Launch your first project to unlock personalized insights and advanced analytics.
                            </p>

                            <div className="pt-4">
                                <button
                                    onClick={onGetStarted}
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-700 font-bold text-lg rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                                >
                                    Get Started Now
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 flex justify-center md:justify-end">
                            <div className="relative">
                                {/* Glowing Rocket Effect */}
                                <div className="absolute inset-0 bg-white/20 blur-[50px] rounded-full"></div>
                                <Rocket
                                    size={200}
                                    className="text-white relative z-10 drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                    strokeWidth={1.5}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Static Project Launcher Guide */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">Project Launcher</h3>
                            <p className="text-slate-500 text-sm">Initial workspace configuration</p>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg text-blue-700 text-xs font-bold uppercase tracking-wide">
                            <CheckCircle2 size={14} className="text-blue-600" /> Status: Ready
                        </div>
                    </div>

                    <div className="relative px-4">
                        {/* Connecting Line */}
                        <div className="absolute top-8 left-4 right-4 h-0.5 border-t-2 border-dashed border-blue-100 hidden sm:block z-0" style={{ left: '10%', right: '10%' }}></div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10">
                            {/* Step 1 */}
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20 flex items-center justify-center text-white rotate-3 transition-transform hover:rotate-0">
                                    <Check size={32} strokeWidth={3} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-lg">1. Domain Added</h4>
                                    <p className="text-slate-500 text-sm">www.mybusiness.com</p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20 flex items-center justify-center text-white -rotate-3 transition-transform hover:rotate-0">
                                    <Check size={32} strokeWidth={3} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-lg">2. Audit Configured</h4>
                                    <p className="text-slate-500 text-sm">Frequency: Daily High</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20 flex items-center justify-center text-white animate-pulse-slow">
                                    <Rocket size={32} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-lg">3. Workspace Live</h4>
                                    <p className="text-slate-500 text-sm">Data collection in progress</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardWelcome;
