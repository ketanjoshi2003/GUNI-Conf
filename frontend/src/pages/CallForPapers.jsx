import React, { useState, useEffect } from 'react';
import { Search, FileText, CheckCircle2, ChevronRight, Globe } from 'lucide-react';
import axios from 'axios';
import { useSocketRefresh } from '../hooks/useSocketRefresh';

const CallForPapers = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTopics = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/topics`);
            setTopics(response.data);
        } catch (error) {
            console.error('Error fetching topics:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    useSocketRefresh(fetchTopics);

    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Header Section */}
                <div className="text-center mb-16">
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

                {/* Topics Grid */}
                <div className="mb-16 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="text-center py-20 text-gray-400 italic">Loading topics...</div>
                    ) : (
                        <div className="grid md:grid-cols-2">
                            {topics
                                .filter(topic => topic.title.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((topic, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${idx % 2 === 0 ? 'md:border-r' : ''}`}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-2"></span>
                                        <span className="text-gray-700 font-medium leading-relaxed">{topic.title}</span>
                                    </div>
                                ))}
                            {topics.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                                <div className="col-span-full text-center py-10 text-gray-400 italic">
                                    No topics found matching "{searchTerm}"
                                </div>
                            )}
                        </div>
                    )}
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
