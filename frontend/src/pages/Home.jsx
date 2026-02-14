import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, MapPin, ArrowRight, Shield, Network, Wifi, Globe } from 'lucide-react';
import { useSocketRefresh } from '../hooks/useSocketRefresh';
import HomeSectionRenderer from '../components/HomeSectionRenderer';

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
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [topics, setTopics] = useState([]);
    const [previousEditions, setPreviousEditions] = useState([]);
    const [speakers, setSpeakers] = useState([]);
    const [committees, setCommittees] = useState([]);
    const [importantDates, setImportantDates] = useState([]);
    const [registrationFees, setRegistrationFees] = useState([]);
    const [archives, setArchives] = useState([]);
    const [acceptedPapers, setAcceptedPapers] = useState([]);
    const [bestPapers, setBestPapers] = useState([]);
    const [pubStats, setPubStats] = useState([]);
    const [news, setNews] = useState([]);

    const [countdownTarget, setCountdownTarget] = useState(new Date('2026-09-10'));
    const [homeSections, setHomeSections] = useState([]);

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

    const fetchAllData = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/conference/coms2-2026`).then(res => setConferenceInfo(res.data)).catch(console.error);
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/important-dates`).then(res => {
            setImportantDates(res.data);
            const pinned = res.data.find(d => d.isPinned);
            if (pinned) setCountdownTarget(new Date(pinned.date));
        }).catch(console.error);
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/topics`).then(res => setTopics(res.data)).catch(console.error);
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/previous-editions`).then(res => setPreviousEditions(res.data)).catch(console.error);
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/home-sections`).then(res => setHomeSections(res.data)).catch(console.error);

        // Fetch others
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/speakers`).then(res => setSpeakers(res.data)).catch(console.error);
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/committees`).then(res => setCommittees(res.data)).catch(console.error);
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/registration-fees`).then(res => setRegistrationFees(res.data)).catch(console.error);
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/archive`).then(res => setArchives(res.data)).catch(console.error);
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/accepted-papers`).then(res => setAcceptedPapers(res.data)).catch(console.error);
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/best-papers`).then(res => setBestPapers(res.data)).catch(console.error);
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/publication-stats`).then(res => setPubStats(res.data)).catch(console.error);
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/news`).then(res => setNews(res.data)).catch(console.error);
    };

    const coverImages = {
        '2024': img2024,
        '2023': img2023,
        '2022': img2022,
        '2021': img2021,
        '2020': img2020,
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    useSocketRefresh(() => {
        console.log('Refreshing home data...');
        fetchAllData();
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
                        {/* Static Welcome Section */}
                        <HomeSectionRenderer
                            section={{ type: 'welcome' }}
                            data={{ conferenceInfo }}
                        />

                        {homeSections.length > 0 ? (
                            homeSections
                                .filter(s => s.isVisible && s.type !== 'welcome')
                                .map(section => (
                                    <HomeSectionRenderer
                                        key={section._id}
                                        section={section}
                                        data={{
                                            conferenceInfo,
                                            topics,
                                            previousEditions,
                                            speakers,
                                            committees,
                                            importantDates,
                                            registrationFees,
                                            archives,
                                            acceptedPapers,
                                            bestPapers,
                                            pubStats,
                                            news,
                                            coverImages,
                                            formatImageUrl
                                        }}
                                    />
                                ))
                        ) : (
                            // Default Layout if no dynamic sections configured (Welcome is already above)
                            <>
                                <HomeSectionRenderer
                                    section={{ type: 'topics' }}
                                    data={{ topics }}
                                />
                                <HomeSectionRenderer
                                    section={{ type: 'previous-editions' }}
                                    data={{ previousEditions, coverImages, formatImageUrl }}
                                />
                                <HomeSectionRenderer
                                    section={{ type: 'about-university' }}
                                    data={{}}
                                />
                            </>
                        )}
                    </div>



                </div>
            </div>
        </div>
    );
};

export default Home;
