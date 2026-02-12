import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, MapPin, ArrowRight, Shield, Network, Wifi, Globe } from 'lucide-react';
import { useSocketRefresh } from '../hooks/useSocketRefresh';

import img2024 from '../assets/previous-editions/2024.jpg';
import img2023 from '../assets/previous-editions/2023.jpg';
import img2022 from '../assets/previous-editions/2022.jpg';
import img2021 from '../assets/previous-editions/2021.jpg';
import img2020 from '../assets/previous-editions/2020.jpg';

const HeroBackground = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imageUrl = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=70&w=1920&auto=format&fit=crop";

    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => setIsLoaded(true);
    }, []);

    return (
        <div
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transition-all duration-300 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105 blur-sm'}`}
            style={{
                backgroundImage: `url("${imageUrl}")`,
                backgroundColor: '#0f172a'
            }}
        ></div>
    );
};

const Home = () => {
    const [conferenceInfo, setConferenceInfo] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [topics, setTopics] = useState([]);
    const [previousEditions, setPreviousEditions] = useState([]);

    const filteredTopics = topics.filter(topic =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group filtered topics into pairs for the 2-column table
    const pairedTopics = [];
    for (let i = 0; i < filteredTopics.length; i += 2) {
        pairedTopics.push([filteredTopics[i], filteredTopics[i + 1] || null]);
    }

    const [countdownTarget, setCountdownTarget] = useState(new Date('2026-09-10'));

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const target = countdownTarget.getTime();
            const distance = target - now;

            if (distance < 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [countdownTarget]);

    const fetchConferenceInfo = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/conference/coms2-2026`)
            .then(res => setConferenceInfo(res.data))
            .catch(err => console.error(err));
    };

    const fetchCountdownTarget = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/important-dates`)
            .then(res => {
                const pinned = res.data.find(d => d.isPinned);
                if (pinned) {
                    console.log('Setting new countdown target:', pinned.date);
                    setCountdownTarget(new Date(pinned.date));
                }
            })
            .catch(err => console.error('Error fetching countdown target:', err));
    };

    const fetchTopics = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/topics`)
            .then(res => setTopics(res.data))
            .catch(err => console.error('Error fetching topics:', err));
    };

    const fetchEditions = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/previous-editions`)
            .then(res => setPreviousEditions(res.data))
            .catch(err => console.error('Error fetching editions:', err));
    };

    const coverImages = {
        '2024': img2024,
        '2023': img2023,
        '2022': img2022,
        '2021': img2021,
        '2020': img2020,
    };

    useEffect(() => {
        fetchCountdownTarget();
        fetchConferenceInfo();
        fetchTopics();
        fetchEditions();
    }, []);

    useSocketRefresh(() => {
        console.log('Refreshing home data...');
        fetchCountdownTarget();
        fetchConferenceInfo();
        fetchTopics();
        fetchEditions();
    });

    const formatImageUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:')) return url;
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        return `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
    };




    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative min-h-[600px] md:h-[700px] flex items-center justify-center text-center text-white overflow-hidden bg-slate-900 transition-all duration-700">
                <HeroBackground />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-blue-900/70"></div>

                <div className="relative z-10 container mx-auto px-4 md:px-6 py-20">
                    <div className="animate-fade-in-up">
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/30 border border-blue-400 text-[10px] md:text-sm font-semibold mb-4 backdrop-blur-sm">
                            {conferenceInfo?.edition || '7th Edition'} • {conferenceInfo?.mode || 'Hybrid Mode'}
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight">
                            {conferenceInfo?.short_name || 'COMS2'} <span className="text-sky-400">{conferenceInfo?.year || '2026'}</span>
                        </h1>
                        <p className="text-base sm:text-lg lg:text-2xl font-light mb-8 max-w-3xl mx-auto text-gray-200 px-4">
                            {conferenceInfo?.name || 'International Conference on Computing, Communication and Security'}
                        </p>
                        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 justify-center items-center mb-12 px-4">
                            <div className="flex items-center gap-2 text-sm lg:text-lg font-medium bg-white/10 backdrop-blur-sm px-4 lg:px-6 py-2 lg:py-3 rounded-xl border border-white/20 w-full max-w-sm lg:w-auto justify-center">
                                <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-sky-400" />
                                <span>
                                    {(() => {
                                        if (!conferenceInfo?.start_date || !conferenceInfo?.end_date) return 'Sept 10-11, 2026';
                                        const s = new Date(conferenceInfo.start_date);
                                        const e = new Date(conferenceInfo.end_date);
                                        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
                                        const month = months[s.getUTCMonth()];
                                        const sDay = s.getUTCDate();
                                        const eDay = e.getUTCDate();
                                        const year = e.getUTCFullYear();

                                        if (sDay === eDay) return `${month} ${sDay}, ${year}`;
                                        return `${month} ${sDay}-${eDay}, ${year}`;
                                    })()}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm lg:text-lg font-medium bg-white/10 backdrop-blur-sm px-4 lg:px-6 py-2 lg:py-3 rounded-xl border border-white/20 w-full max-w-sm lg:w-auto justify-center">
                                <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-red-400" />
                                <span>{conferenceInfo?.venue || 'Ganpat University'}, {conferenceInfo?.country || 'India'}</span>
                            </div>
                        </div>

                        {/* Countdown in Hero */}
                        <div className="flex gap-3 sm:gap-4 lg:gap-8 justify-center flex-wrap px-4">
                            {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, idx) => {
                                const value = Object.values(timeLeft)[idx];
                                return (
                                    <div key={label} className="flex flex-col items-center group">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 flex items-center justify-center text-2xl sm:text-3xl lg:text-5xl font-bold rounded-xl lg:rounded-2xl border border-white/30 bg-white/10 text-white relative backdrop-blur-sm">
                                            {String(value).padStart(2, '0')}
                                        </div>
                                        <span className="text-sky-200 font-bold text-[8px] lg:text-xs uppercase mt-2 lg:mt-3 tracking-widest">{label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* LEFT COLUMN (Main Content) */}
                    <div className="lg:col-span-3 space-y-12">

                        {/* Intro Text */}
                        <section className="space-y-6 text-gray-700 leading-relaxed text-justify text-base">
                            <h3 className="text-2xl font-bold text-gray-900 border-l-4 border-blue-600 pl-4">
                                Welcome to {conferenceInfo?.short_name || 'COMS2'} {conferenceInfo?.year || '2026'}
                            </h3>
                            {conferenceInfo?.description ? (
                                <div className="space-y-4">
                                    {conferenceInfo.description.split('\n').filter(p => p.trim()).map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <p>
                                        The <strong>{conferenceInfo?.edition || '7th Edition'} of International Conference on Computing Communication and Security ({conferenceInfo?.short_name || 'COMS2'})</strong> is being organized by {conferenceInfo?.venue || 'Ganpat University'}, {conferenceInfo?.country || 'India'} on {conferenceInfo?.start_date ? new Date(conferenceInfo.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : 'September 10-11, 2026'}.
                                    </p>
                                    <p>
                                        {conferenceInfo?.short_name || 'COMS2'}-{conferenceInfo?.year || '2026'} aims to provide a platform for researchers, scientists, practitioners, and academicians
                                        to present and discuss their cutting-edge innovations, trends, and concerns as well as practical
                                        challenges encountered and solutions adopted in the fields of Computing, Communication and Security.
                                    </p>
                                </>
                            )}
                            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                                <p className="text-blue-900 font-medium">
                                    Accepted papers will be published in <strong>Springer Proceedings</strong> and indexed in SCOPUS.
                                </p>
                            </div>
                        </section>



                        {/* Topics of Interest Section */}
                        <section>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                                <h3 className="text-2xl font-bold text-gray-900 border-l-4 border-blue-600 pl-4">
                                    Topics of Interest
                                </h3>
                                <div className="flex items-center gap-2 w-full md:w-auto">
                                    <span className="text-sm text-gray-600">Search:</span>
                                    <input
                                        type="text"
                                        className="flex-grow md:flex-none border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="Type to filter..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                {/* Topics List */}
                                <div className="grid md:grid-cols-2">
                                    {filteredTopics.map((topic, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors animate-fade-in-up border-b border-gray-100 ${idx % 2 === 0 ? 'md:border-r' : ''}`}
                                            style={{ animationDelay: `${idx * 20}ms` }}
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-2"></span>
                                            <span className="text-gray-700 font-medium leading-relaxed">{topic.title}</span>
                                        </div>
                                    ))}
                                </div>

                                {filteredTopics.length === 0 && (
                                    <div className="p-8 text-center text-gray-500 italic">
                                        No topics found matching "{searchQuery}"
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 text-xs text-gray-500 flex justify-between">
                                <span>Showing {filteredTopics.length} topics</span>
                                <span className="hidden md:inline">Total {topics.length} available</span>
                            </div>
                        </section>

                        {/* Previous Editions Section */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">
                                Previous Editions (Springer CCIS Series)
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {previousEditions.length > 0 ? previousEditions.map((item) => (
                                    <div key={item._id || item.year} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group relative overflow-hidden">
                                        <div className="flex gap-5">
                                            {/* Book Cover Style Image */}
                                            <div className="w-24 h-32 md:w-28 md:h-36 flex-shrink-0 rounded-lg overflow-hidden shadow-md border border-gray-200 relative group-hover:scale-105 transition-transform duration-500">
                                                <img
                                                    src={formatImageUrl(item.coverImage) || coverImages[item.year] || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=300&h=400"}
                                                    alt={`COMS2 ${item.year}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                <div className="absolute bottom-2 left-0 right-0 text-center">
                                                    <span className="text-white font-bold text-lg drop-shadow-md">{item.year}</span>
                                                </div>
                                            </div>

                                            <div className="flex-grow flex flex-col justify-between py-1">
                                                <div>
                                                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 bg-green-50 text-green-700 rounded-full border border-green-100 uppercase tracking-tight mb-2">Scopus Indexed</span>
                                                    <h4 className="text-sm md:text-base font-bold text-gray-900 leading-tight line-clamp-3 group-hover:text-blue-600 transition-colors">
                                                        {item.title}
                                                    </h4>
                                                </div>

                                                <a
                                                    href={item.link || '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-blue-600 text-xs font-bold uppercase tracking-wider group/link mt-2"
                                                >
                                                    View Proceedings
                                                    <ArrowRight size={12} className="ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-full py-10 text-center text-gray-400 italic">No previous editions recorded.</div>
                                )}
                            </div>
                        </section>

                        {/* About the University Section */}
                        <section className="py-12 bg-gray-50/50 rounded-3xl px-4 md:px-8 border border-gray-100">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-sky-500">
                                    About the University
                                </h2>
                                <div className="w-20 h-1 bg-sky-200 mx-auto mt-4 rounded-full"></div>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                                <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base text-justify px-4 lg:px-0">
                                    <p>
                                        Ganpat University is a well reputed State Private University established in 2005 through
                                        the State Legislative Act No.19/2005 on 12th April 2005, Government of Gujarat, and
                                        recognized by the UGC under the section 2(f) of the UGC Act, 1956 having campus
                                        spread over more than 300 acres of land with world-class infrastructure and more than
                                        10,000 students on campus.
                                    </p>
                                    <p>
                                        The University offers Diplomas, Under Graduate, Post
                                        Graduate, and Research Programs in the field of Engineering and Technology, Computer
                                        Applications, Management, Pharmacy, Sciences, Commerce & Social Science,
                                        Architecture, Design & Planning, Maritime Studies, Nursing, & Agriculture, etc.
                                    </p>
                                </div>
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video border-2 md:border-4 border-white">
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src="https://www.youtube.com/embed/OsoXEo1wpYI"
                                        title="Aerial Walkthrough of Ganpat University"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </section>


                    </div>



                </div>
            </div>
        </div>
    );
};

export default Home;
