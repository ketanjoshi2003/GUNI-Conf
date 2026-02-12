import React, { useState } from 'react';
import { Trophy, Star, Users, Medal, Quote } from 'lucide-react';
import { useYear } from '../context/YearContext';

const BestPaperAward = () => {
    const { selectedYear } = useYear();
    const activeTab = String(selectedYear);

    const awards = {
        '2024': [
            {
                id: '369',
                title: 'Osmotic Computing Based Task Offloading: A Fuzzy Logic Based Approach',
                authors: 'Ranadir Naha, Sanjaya Kumar Panda, Pradip Kumar Sahu',
                institution: 'Veer Surendra Sai University of Technology, Odisha, India; National Institute of Technology, Warangal, Telangana, India'
            },
            {
                id: '411',
                title: 'Design of Performance Enhanced Approximate Multiplier for Image Processing Applications',
                authors: 'Dr. K. Sivanandam, P. Sadhana',
                institution: 'M. Kumaraswamy College of Engineering, Thalavapalayam, Tamilnadu, India'
            },
            {
                id: '418',
                title: 'Design and performance analysis of high-efficiency propulsion system for VTOL applications',
                authors: 'Arpit Biswas, Ms. Neha chaubey',
                institution: 'Triaudic Robotics Pvt Ltd, New Delhi, India; Imperial College, London, United Kingdom'
            }
        ]
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Hero */}
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold mb-4 flex items-center gap-2 w-fit mx-auto">
                        <Trophy size={14} /> Hall of Fame
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Best Paper <span className="text-blue-600">Awards</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                        Recognizing excellence in research and innovation at International Conference COMS2.
                    </p>
                </div>

                {/* Main Content */}
                <div className="flex flex-col gap-8">
                    {/* Content Area */}
                    <div className="flex-grow">
                        {awards[activeTab] ? (
                            <div className="grid gap-6">
                                {awards[activeTab].map((paper, idx) => (
                                    <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <Medal size={80} className="text-yellow-500 transform rotate-12" />
                                        </div>

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-lg">
                                                    Paper ID: {paper.id}
                                                </span>
                                                <div className="h-4 w-px bg-gray-300"></div>
                                                <span className="text-yellow-500 flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                                                    <Trophy size={12} /> Winner
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                                                "{paper.title}"
                                            </h3>

                                            <div className="flex items-start gap-3 text-gray-600 mb-2">
                                                <Users size={18} className="mt-1 text-blue-500 flex-shrink-0" />
                                                <span className="font-medium text-sm">{paper.authors}</span>
                                            </div>

                                            <div className="pl-8 text-xs text-gray-400 italic">
                                                {paper.institution}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100">
                                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Quote className="text-gray-300" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Archive Mode</h3>
                                <p className="text-gray-500">
                                    The detailed list for {activeTab} is currently archived.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BestPaperAward;
