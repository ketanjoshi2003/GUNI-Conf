import React, { useState } from 'react';
import { Search, FileText, CheckCircle2, ChevronRight, Globe } from 'lucide-react';

const CallForPapers = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const tracks = {
        "Track 1: Communication & Networks": [
            "Wireless Networks and Communication",
            "Next Generation Networks",
            "Ad Hoc Networks, Sensor Network",
            "Cognitive Radio, MIMO Technologies",
            "Satellite Communications and Networking",
            "Green Networking and Smart Grid",
            "Cloud Communications and Networking"
        ],
        "Track 2: Advanced Computing": [
            "Cyber Physical Systems",
            "Quantum Computing and Networking",
            "Social Networks and Crowdsourcing",
            "Software Defined Networking",
            "Cognitive Radio and White-space Networking",
            "Mobile and Ubiquitous computing"
        ]
    };

    // Flatten tracks for easier searching if needed, or filter within categories
    const filterTopics = (category) => {
        return tracks[category].filter(topic =>
            topic.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Header Section */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
                        Submissions Open
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Call For <span className="text-blue-600">Papers</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                        Researchers, authors, and industrial practitioners are invited to submit original,
                        high-quality technical papers of their newest research findings, novel technical studies,
                        innovative ideas, and visionary perspectives.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-16 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all"
                        placeholder="Search for research topics..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Tracks Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {Object.keys(tracks).map((category, idx) => {
                        const filtered = filterTopics(category);
                        if (filtered.length === 0 && searchTerm) return null;

                        return (
                            <div key={idx} className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-100 border border-gray-100 hover:border-blue-100 transition-colors group">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${idx === 0 ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                        {idx === 0 ? <Globe size={20} /> : <FileText size={20} />}
                                    </div>
                                    {category}
                                </h3>

                                <ul className="space-y-3">
                                    {filtered.map((topic, i) => (
                                        <li key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 group-hover/item">
                                            <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                            <span className="font-medium">{topic}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-4">Ready to Submit?</h3>
                        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                            Join us at the 7th Edition of Springer International Conference on Computing, Communication and Security (COMS2 - 2026).
                        </p>
                        <a
                            href="https://equinocs.springernature.com/service/COMS2"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-full hover:bg-blue-50 hover:scale-105 transition-all shadow-lg"
                        >
                            Submit Your Paper
                            <ChevronRight size={20} />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CallForPapers;
