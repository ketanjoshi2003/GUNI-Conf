import React from 'react';
import { FileUp, FileText, AlertCircle, ExternalLink, BookOpen } from 'lucide-react';

const PaperSubmission = () => {
    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
                        Guidelines & Process
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Paper <span className="text-blue-600">Submission</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                        We invite authors to submit original research papers. Please review the guidelines below before submitting your work.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column: Guidelines */}
                    <div className="md:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>

                        {/* Submission Link Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-blue-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileUp className="text-blue-600" />
                                    Submit Your Paper
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Authors are invited to submit their original research paper including results, tables, figures, and references.
                                    All submissions must be made through the Springer EquinOCS system.
                                </p>
                                <a
                                    href="https://equinocs.springernature.com/service/COMS2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                                >
                                    Go to EquinOCS Submission System
                                    <ExternalLink size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Formatting Guidelines */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <FileText className="text-indigo-600" />
                                Formatting Guidelines
                            </h3>

                            <div className="space-y-4">
                                <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="bg-white p-2 rounded-lg shadow-sm h-fit">
                                        <BookOpen size={20} className="text-blue-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Page Limits & Layout</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Papers should be between <strong>12 to 15 pages</strong>. Each page should contain approximately 400 words.
                                            The document must be written in English.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="bg-white p-2 rounded-lg shadow-sm h-fit">
                                        <AlertCircle size={20} className="text-orange-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Double-Blind Review</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Springer COMS2 follows a <strong>DOUBLE-BLIND</strong> peer review system.
                                            Please do <span className="text-red-500 font-medium">not</span> include author names, affiliations,
                                            or acknowledgments in the initial submission. Identity should only be revealed in the final camera-ready version.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Quick Info */}
                    <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-200">
                            <h3 className="font-bold text-lg mb-4">Important Note</h3>
                            <p className="text-blue-100 text-sm leading-relaxed mb-4">
                                All accepted and registered papers will be published in Springer CCIS Series.
                            </p>
                            <div className="text-xs font-mono bg-blue-700/50 p-3 rounded-lg border border-blue-500/30">
                                Scopus Indexed
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4">Downloads</h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left text-sm font-medium text-gray-700 group">
                                    <span>Word Template</span>
                                    <FileText size={16} className="text-gray-400 group-hover:text-blue-600" />
                                </button>
                                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left text-sm font-medium text-gray-700 group">
                                    <span>LaTeX Template</span>
                                    <FileText size={16} className="text-gray-400 group-hover:text-blue-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PaperSubmission;
