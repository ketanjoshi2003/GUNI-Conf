import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, MapPin, Globe, Film, Newspaper, Users, Image as ImageIcon } from 'lucide-react';

const Archive = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const defaultTab = query.get('tab') || 'previous-speakers';
    const [activeTab, setActiveTab] = React.useState(defaultTab);

    useEffect(() => {
        const tab = query.get('tab');
        if (tab) {
            setActiveTab(tab);
        }
    }, [location.search]);

    const tabs = [
        { id: 'previous-speakers', label: 'Previous Speakers', icon: Users },
        { id: 'media-coverage', label: 'Media Coverage', icon: Newspaper },
        { id: 'glimpses', label: 'Glimpses', icon: ImageIcon },
    ];

    const previousSpeakers = [
        {
            name: "Dr. Manjunatha Mahadevappa",
            title: "Professor",
            affiliation: "School of Medical Science and Technology, Indian Institute of Technology, Kharagpur, India",
            image: "https://avatar.iran.liara.run/public/10"
        },
        {
            name: "Dr. B. K. Panigrahi",
            title: "Professor",
            affiliation: "Department of Electrical Engineering, Indian Institute of Technology, Delhi, India",
            image: "https://avatar.iran.liara.run/public/11"
        },
        {
            name: "Mr. Dhaval Patel",
            title: "Senior System Analyst",
            affiliation: "Department of Science and Technology, Gujarat",
            image: "https://avatar.iran.liara.run/public/12"
        },
        {
            name: "Dr. Bakul Trehan",
            title: "Professor",
            affiliation: "Canada",
            image: "https://avatar.iran.liara.run/public/13"
        }
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

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* LEFT COLUMN (Content) */}
                    <div className="lg:w-2/3">
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

                        {/* Previous Speakers Tab */}
                        {activeTab === 'previous-speakers' && (
                            <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up">
                                {previousSpeakers.map((speaker, index) => (
                                    <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex items-center gap-4 hover:shadow-lg transition-all">
                                        <div className="w-20 h-20 flex-shrink-0 rounded-full overflow-hidden border-2 border-blue-50">
                                            <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900">{speaker.name}</h3>
                                            <p className="text-blue-600 text-sm font-medium">{speaker.title}</p>
                                            <p className="text-gray-500 text-xs mt-1">{speaker.affiliation}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Media Coverage Tab */}
                        {activeTab === 'media-coverage' && (
                            <div className="space-y-8 animate-fade-in-up">
                                {mediaCoverage.map((item, index) => (
                                    <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                                        <div className="p-4 border-b border-gray-50 bg-gray-50">
                                            <h3 className="font-bold text-lg text-blue-900">{item.title}</h3>
                                        </div>
                                        <div className="p-6 flex justify-center bg-gray-100/50">
                                            {/* Placeholder for actual newspaper clips - using a generic responsive container */}
                                            <div className="w-full max-w-md h-64 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center flex-col text-gray-400">
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

                    {/* RIGHT COLUMN (Sidebar) */}
                    <div className="lg:w-1/3 space-y-8">

                        {/* Venue Widget */}
                        <div className="bg-slate-900 text-white rounded-xl p-8 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform rotate-12 scale-150">
                                <MapPin className="w-32 h-32" />
                            </div>
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-3 relative z-10">
                                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                    <MapPin className="w-5 h-5 text-sky-400" />
                                </div>
                                Venue
                            </h3>
                            <div className="space-y-3 text-sm text-gray-300 relative z-10">
                                <p className="font-semibold text-white text-lg">Ganpat University</p>
                                <p>Mehsana-Gozaria Highway, Kherva</p>
                                <p>Gujarat 384012, India</p>
                                <div className="pt-4 mt-4 border-t border-white/10">
                                    <p className="text-xs text-gray-400 mb-1">Contact for queries:</p>
                                    <a href="mailto:coms2@ganpatuniversity.ac.in" className="text-sky-400 hover:text-sky-300 transition-colors">coms2@ganpatuniversity.ac.in</a>
                                </div>
                            </div>
                        </div>

                        {/* Important Dates */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-sky-100 text-sky-600 rounded-lg">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                Important Dates
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { label: "Full Paper Submission", date: "May 30, 2026", active: true },
                                    { label: "Paper Acceptance", date: "July 30, 2026" },
                                    { label: "Registration Opens", date: "July 30, 2026" },
                                    { label: "Conference Date", date: "Sept 10-11, 2026" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex flex-col relative pl-4 border-l-2 border-gray-100 last:border-0">
                                        <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${item.active ? 'bg-sky-500 ring-4 ring-sky-100' : 'bg-gray-300'}`}></div>
                                        <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${item.active ? 'text-sky-600' : 'text-gray-400'}`}>{item.date}</span>
                                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visitors Widget */}
                        <div className="bg-slate-900 text-white rounded-xl shadow-xl border border-slate-800 p-6 flex flex-col items-center">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                    <Globe className="w-5 h-5 text-blue-400" />
                                </div>
                                Visitors
                            </h3>
                            <div className="overflow-hidden rounded-lg shadow-inner bg-[#0f172a]">
                                <img
                                    src="https://s11.flagcounter.com/count2/JO2k/bg_0F172A/txt_FFFFFF/border_334155/columns_2/maxflags_10/viewers_0/labels_0/pageviews_0/flags_0/percent_0/"
                                    alt="Flag Counter"
                                    className="block opacity-90 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Archive;
