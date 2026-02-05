import React from 'react';
import { Download, Globe, MapPin, Users, FileText, CheckCircle } from 'lucide-react';

const AcceptedPapers = () => {
    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Hero */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
                        Results Announced
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Accepted <span className="text-blue-600">Papers</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                        List of accepted research papers for oral presentation and publication in Springer CCIS.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Main Content: Info & Stats */}
                    <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>

                        {/* Conference Info Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2 relative z-10">COMS2 2025</h2>
                            <p className="text-gray-500 mb-6 relative z-10">Ganpat University, Gujarat, India • Sept 12-13, 2025</p>

                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                                <div className="text-blue-900 font-serif font-bold text-xl">Springer</div>
                                <div className="h-6 w-px bg-gray-300"></div>
                                <div className="bg-orange-500 text-white font-bold px-2 py-0.5 rounded text-sm">CCIS</div>
                                <div className="ml-auto text-sm text-gray-500 italic">Scopus Indexed</div>
                            </div>
                        </div>

                        {/* Participation Modes */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Globe className="text-indigo-600" />
                                Participation Modes
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl border border-gray-200 hover:border-blue-300 transition-colors bg-blue-50/50">
                                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <Globe size={16} className="text-blue-600" /> International
                                    </h4>
                                    <p className="text-sm text-gray-600">Hybrid participation requests considered for authors outside India.</p>
                                </div>
                                <div className="p-4 rounded-2xl border border-gray-200 hover:border-blue-300 transition-colors bg-green-50/50">
                                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <MapPin size={16} className="text-green-600" /> National (Gujarat)
                                    </h4>
                                    <p className="text-sm text-gray-600">Physical presence of the presenting author is mandatory.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Stats & Download */}
                    <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>

                        {/* Stats Card */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 opacity-90">
                                <Users size={20} />
                                Selection Process
                            </h3>

                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-5xl font-bold">20%</span>
                                <span className="text-blue-200 mb-2">Acceptance Rate</span>
                            </div>
                            <div className="w-full bg-blue-900/30 h-2 rounded-full mb-6">
                                <div className="bg-white h-2 rounded-full" style={{ width: '20%' }}></div>
                            </div>

                            <div className="space-y-3 text-sm text-blue-100">
                                <div className="flex justify-between border-b border-blue-500/30 pb-2">
                                    <span>Submissions</span>
                                    <span className="font-bold text-white">238</span>
                                </div>
                                <div className="flex justify-between border-b border-blue-500/30 pb-2">
                                    <span>Selected</span>
                                    <span className="font-bold text-white">48</span>
                                </div>
                            </div>
                        </div>

                        {/* Download CTA */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
                            <FileText size={40} className="text-gray-300 mx-auto mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">Full List Available</h3>
                            <p className="text-gray-500 text-sm mb-6">Download the complete list of accepted papers.</p>
                            <a href="#" className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors">
                                <Download size={18} />
                                Download PDF
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AcceptedPapers;
