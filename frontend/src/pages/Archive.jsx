import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Film, Newspaper, Image as ImageIcon } from 'lucide-react';

const Archive = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const defaultTab = query.get('tab') || 'media-coverage';
    const [activeTab, setActiveTab] = React.useState(defaultTab);
    const [archives, setArchives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const tab = query.get('tab');
        if (tab && (tab === 'media-coverage' || tab === 'glimpses')) {
            setActiveTab(tab);
        }
    }, [location.search]);

    useEffect(() => {
        const fetchArchives = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/archive`);
                setArchives(response.data);
            } catch (err) {
                console.error('Error fetching archives:', err);
                setError('Failed to load archive data');
            } finally {
                setLoading(false);
            }
        };
        fetchArchives();
    }, []);

    const mediaItems = archives.filter(item => item.type === 'media-coverage');
    const glimpseItems = archives.filter(item => item.type === 'glimpses');

    const tabs = [
        { id: 'media-coverage', label: 'Media Coverage', icon: Newspaper },
        { id: 'glimpses', label: 'Glimpses', icon: ImageIcon },
    ];

    return (
        <div className="bg-gray-50 min-h-screen pt-28 pb-12">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
                        Conference Archive
                    </h1>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-6"></div>
                </div>

                <div className="max-w-6xl mx-auto">
                    {/* Main Content Area */}
                    <div className="w-full">
                        {/* Tabs */}
                        <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 pb-4">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === tab.id
                                            ? 'bg-blue-600 text-white shadow-lg scale-105'
                                            : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                                            }`}
                                    >
                                        <Icon size={18} />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Content Area */}

                        {/* Media Coverage Tab */}
                        {activeTab === 'media-coverage' && (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
                                {loading ? (
                                    <div className="col-span-full py-20 text-center text-gray-400 italic">Loading archive items...</div>
                                ) : mediaItems.length > 0 ? (
                                    mediaItems.map((item, index) => (
                                        <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transform transition-all hover:scale-[1.02]">
                                            <div className="p-4 border-b border-gray-50 bg-gray-50">
                                                <h3 className="font-bold text-lg text-blue-900 line-clamp-1">{item.title}</h3>
                                            </div>
                                            <div className="p-0 flex justify-center bg-gray-100/50 aspect-[3/4]">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50 border-2 border-dashed border-gray-200 m-4 rounded-lg">
                                                        <Newspaper className="w-12 h-12 mb-2 opacity-50" />
                                                        <span className="text-sm">Coverage {item.year}</span>
                                                    </div>
                                                )}
                                            </div>
                                            {item.link && (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block p-4 text-center text-blue-600 font-bold hover:bg-blue-50 transition-colors border-t border-gray-50"
                                                >
                                                    View Source
                                                </a>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 text-center bg-white rounded-xl shadow-sm border border-gray-100 italic text-gray-400">
                                        No media coverage items found.
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Glimpses Tab */}
                        {activeTab === 'glimpses' && (
                            <div className="animate-fade-in-up">
                                {loading ? (
                                    <div className="py-20 text-center text-gray-400 italic">Loading glimpses...</div>
                                ) : glimpseItems.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {glimpseItems.map((item, index) => (
                                            <div key={index} className="relative group aspect-square rounded-xl overflow-hidden shadow-lg border border-gray-100">
                                                <img src={item.image || 'https://via.placeholder.com/400?text=Conference+Glimpses'} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                                    <p className="text-white font-bold text-sm">{item.title}</p>
                                                    <p className="text-gray-300 text-xs">{item.year}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                                        <Film className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-gray-400">Photo Gallery Coming Soon</h3>
                                        <p className="text-gray-400 mt-2">Glimpses of previous conferences will be uploaded here.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Archive;
