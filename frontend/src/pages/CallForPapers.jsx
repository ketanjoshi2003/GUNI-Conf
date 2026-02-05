import React, { useState } from 'react';

const CallForPapers = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const tracks = {
        column1: [
            "Next Generation Networks",
            "Ad Hoc Networks, Sensor Network",
            "Cognitive Radio, MIMO Technologies",
            "Satellite Communications and Networking",
            "Cyber Physical Systems",
            "Quantum Computing and Networking"
        ],
        column2: [
            "Green Networking and Smart Grid",
            "Cloud Communications and Networking",
            "Social Networks and Crowdsourcing",
            "Software Defined Networking",
            "Cognitive Radio and White-space Networking",
            "Mobile and Ubiquitous computing"
        ]
    };

    const filterTopics = (topics) => {
        return topics.filter(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Header Image or Title Section could go here, but screenshot just shows text */}
                <div className="max-w-4xl mx-auto">

                    <p className="text-gray-700 mb-8 text-justify leading-relaxed">
                        Researchers, authors, and industrial practitioners are invited to submit original,
                        high-quality technical papers of their newest research findings, novel technical studies,
                        innovative ideas, and visionary perspectives in computing science, networking,
                        communication, security, and future trends (but are not limited to):
                    </p>

                    <div className="flex justify-end mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600 text-sm">Search:</span>
                            <input
                                type="text"
                                className="border border-gray-300 px-2 py-1 rounded text-sm focus:outline-none focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-sm overflow-hidden">
                        {/* Headers */}
                        <div className="grid grid-cols-1 md:grid-cols-2 bg-[#d9edf7] border-b border-gray-200 font-bold text-[#31708f]">
                            <div className="p-3 border-r border-gray-200 flex items-center gap-2">
                                <span className="text-xs">▼</span> Wireless Networks and Communication
                            </div>
                            <div className="p-3 flex items-center gap-2">
                                <span className="text-xs">▼</span> Network Security and Cyber Security
                            </div>
                        </div>

                        {/* Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 bg-white">
                            {/* Col 1 */}
                            <div className="p-4 border-r border-gray-200 space-y-4">
                                {filterTopics(tracks.column1).length > 0 ? (
                                    filterTopics(tracks.column1).map((topic, idx) => (
                                        <div key={idx} className="flex gap-2 text-gray-700">
                                            <span className="text-blue-500">•</span>
                                            <span>{topic}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-400 italic">No matches</div>
                                )}
                            </div>

                            {/* Col 2 */}
                            <div className="p-4 space-y-4">
                                {filterTopics(tracks.column2).length > 0 ? (
                                    filterTopics(tracks.column2).map((topic, idx) => (
                                        <div key={idx} className="flex gap-2 text-gray-700">
                                            <span className="text-blue-500">•</span>
                                            <span>{topic}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-400 italic">No matches</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-500">
                        Showing 1 to 6 of 6 entries
                    </div>

                    <div className="mt-12 text-center">
                        <a href="#" className="text-[#31708f] hover:underline font-semibold text-lg hover:text-blue-600 transition-colors">
                            Call for Papers 7th Edition – Springer International Conference Computing Communication Security COMS2 - 2026
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CallForPapers;
