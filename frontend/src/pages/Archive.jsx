import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Film, Newspaper, Image as ImageIcon } from 'lucide-react';

const Archive = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const defaultTab = query.get('tab') || 'media-coverage';
    const [activeTab, setActiveTab] = React.useState(defaultTab);

    useEffect(() => {
        const tab = query.get('tab');
        if (tab && (tab === 'media-coverage' || tab === 'glimpses')) {
            setActiveTab(tab);
        }
    }, [location.search]);

    const tabs = [
        { id: 'media-coverage', label: 'Media Coverage', icon: Newspaper },
        { id: 'glimpses', label: 'Glimpses', icon: ImageIcon },
    ];

    const mediaCoverage = [
        { title: "Media Coverage: First COMS2 2020", year: "2020", image: "https://via.placeholder.com/300x400?text=2020+Coverage" },
        { title: "Media Coverage: Second COMS2 2021", year: "2021", image: "https://via.placeholder.com/300x400?text=2021+Coverage" },
        { title: "Media Coverage: Third COMS2 2022", year: "2022", image: "https://via.placeholder.com/300x400?text=2022+Coverage" },
        { title: "Media Coverage: Fourth COMS2 2023", year: "2023", image: "https://via.placeholder.com/300x400?text=2023+Coverage" },
        { title: "Media Coverage: Fifth COMS2 2024", year: "2024", image: "https://via.placeholder.com/300x400?text=2024+Coverage" },
        { title: "Media Coverage: Sixth COMS2 2025", year: "2025", image: "https://via.placeholder.com/300x400?text=2025+Coverage" },
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
                            <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up">
                                {mediaCoverage.map((item, index) => (
                                    <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                                        <div className="p-4 border-b border-gray-50 bg-gray-50">
                                            <h3 className="font-bold text-lg text-blue-900">{item.title}</h3>
                                        </div>
                                        <div className="p-6 flex justify-center bg-gray-100/50">
                                            <div className="w-full max-w-sm h-64 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center flex-col text-gray-400">
                                                <Newspaper className="w-12 h-12 mb-2 opacity-50" />
                                                <span className="text-sm">Newspaper Clipping {item.year}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Glimpses Tab */}
                        {activeTab === 'glimpses' && (
                            <div className="animate-fade-in-up text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                                <Film className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-400">Photo Gallery Coming Soon</h3>
                                <p className="text-gray-400 mt-2">Glimpses of previous conferences will be uploaded here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Archive;
