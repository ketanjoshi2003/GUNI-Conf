import React from 'react';
import { BookOpen, CheckCircle, BarChart3, ExternalLink } from 'lucide-react';
import { useYear } from '../context/YearContext';

const PaperPublications = () => {
    const { selectedYear } = useYear();
    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Hero */}
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
                        Proceedings & Indexing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Paper <span className="text-blue-600">Publications</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                        Papers submitted to COMS2-{selectedYear} are assessed for originality, scientific contribution, and technical soundness.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Left: Info & Key Features */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <BookOpen className="text-blue-600" />
                                Publishing Partner
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                All accepted, registered, and presented papers will be published in the
                                <strong className="text-blue-600"> Scopus Indexed Springer CCIS Series Conference Proceedings</strong>.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                                    <div>
                                        <h4 className="font-bold text-gray-900">Plagiarism Policy</h4>
                                        <p className="text-sm text-gray-600">Match score should not exceed 10% overall, and 3% for single source.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                                    <div>
                                        <h4 className="font-bold text-gray-900">Review Process</h4>
                                        <p className="text-sm text-gray-600">Rigorous double-blind peer review process.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a
                            href="https://link.springer.com/conference/coms2"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-blue-600 text-white text-center font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            View Previous Proceedings on Springer
                            <ExternalLink className="inline-block ml-2 mb-1" size={18} />
                        </a>
                    </div>

                    {/* Right: Stats */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <BarChart3 className="text-indigo-600" />
                                Acceptance Statistics
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { year: '2024', rate: '11%' },
                                    { year: '2023', rate: '10%' },
                                    { year: '2022', rate: '15%' },
                                    { year: '2021', rate: '18%' },
                                    { year: '2020', rate: '27%' },
                                ].map((stat) => (
                                    <div key={stat.year} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex justify-between items-center group hover:border-blue-200 transition-colors">
                                        <span className="font-bold text-gray-500 group-hover:text-gray-700">COMS2-{stat.year}</span>
                                        <span className="font-bold text-blue-600 text-xl">{stat.rate}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400 mt-4 text-center italic">
                                * Acceptance rate reflects our commitment to quality.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PaperPublications;
