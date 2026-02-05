import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, MapPin, ArrowRight, Shield, Network, Wifi, Globe } from 'lucide-react';

const Home = () => {
    const [conference, setConference] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const topics = [
        "Wireless Networks and Communication", "Network Security and Cyber Security",
        "Next Generation Networks", "Green Networking and Smart Grid",
        "Ad Hoc Networks, Sensor Network", "Cloud Communications and Networking",
        "Cognitive Radio, MIMO Technologies", "Social Networks and Crowdsourcing",
        "Satellite Communications and Networking", "Software Defined Networking",
        "Cyber Physical Systems", "Cognitive Radio and White-space Networking",
        "Quantum Computing and Networking", "Mobile and Ubiquitous computing"
    ];

    const filteredTopics = topics.filter(topic =>
        topic.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group filtered topics into pairs for the 2-column table
    const pairedTopics = [];
    for (let i = 0; i < filteredTopics.length; i += 2) {
        pairedTopics.push([filteredTopics[i], filteredTopics[i + 1] || null]);
    }

    useEffect(() => {
        const calculateTimeLeft = () => {
            // Target date: Sept 10, 2026. 
            const difference = +new Date('2026-09-10') - +new Date();
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }
            return timeLeft;
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/api/conference/coms2-2026')
            .then(res => setConference(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-[700px] flex items-center justify-center text-center text-white overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop")' }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-blue-900/70"></div>

                <div className="relative z-10 container mx-auto px-6">
                    <div className="animate-fade-in-up">
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/30 border border-blue-400 text-sm font-semibold mb-4 backdrop-blur-sm">
                            7th Edition • Hybrid Mode
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
                            COMS2 <span className="text-sky-400">2026</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto text-gray-200">
                            International Conference on Computing, Communication and Security
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
                            <div className="flex items-center gap-2 text-lg font-medium bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
                                <Calendar className="w-5 h-5 text-sky-400" />
                                <span>Sept 10-11, 2026</span>
                            </div>
                            <div className="flex items-center gap-2 text-lg font-medium bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
                                <MapPin className="w-5 h-5 text-red-400" />
                                <span>Ganpat University, India</span>
                            </div>
                        </div>

                        {/* Countdown in Hero */}
                        <div className="flex gap-4 md:gap-8 justify-center flex-wrap">
                            {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, idx) => {
                                const value = Object.values(timeLeft)[idx];
                                return (
                                    <div key={label} className="flex flex-col items-center group">
                                        <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-4xl md:text-5xl font-bold rounded-2xl border border-white/30 bg-white/10 text-white relative">
                                            {String(value).padStart(2, '0')}
                                        </div>
                                        <span className="text-sky-200 font-bold text-xs uppercase mt-3 tracking-widest">{label}</span>
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
                                Welcome to COMS2 2026
                            </h3>
                            <p>
                                The <strong>7th Edition of International Conference on Computing Communication and Security (COMS2)</strong> is being organized by Ganpat University, India on September 10-11, 2026.
                            </p>
                            <p>
                                COMS2-2026 aims to provide a platform for researchers, scientists, practitioners, and academicians
                                to present and discuss their cutting-edge innovations, trends, and concerns as well as practical
                                challenges encountered and solutions adopted in the fields of Computing, Communication and Security.
                            </p>
                            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                                <p className="text-blue-900 font-medium">
                                    Accepted papers will be published in <strong>Springer Proceedings</strong> and indexed in SCOPUS.
                                </p>
                            </div>
                        </section>



                        {/* Topics of Interest Section */}
                        <section>
                            <div className="flex justify-between items-end mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 border-l-4 border-blue-600 pl-4">
                                    Topics of Interest
                                </h3>
                                <div className="hidden md:flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Search:</span>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
                                        placeholder=""
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-gray-700">
                                        <tbody className="divide-y divide-gray-100">
                                            {pairedTopics.map((row, idx) => (
                                                <tr key={idx} className={idx === 0 && searchQuery === '' ? "bg-blue-50/80 font-semibold text-gray-900" : "hover:bg-gray-50 transition-colors"}>
                                                    <td className="p-4 border-r border-gray-100 w-1/2">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`w-1.5 h-1.5 rounded-full ${idx === 0 && searchQuery === '' ? 'bg-blue-600' : 'bg-gray-400'}`}></span>
                                                            {row[0]}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 w-1/2">
                                                        {row[1] && (
                                                            <div className="flex items-center gap-2">
                                                                <span className={`w-1.5 h-1.5 rounded-full ${idx === 0 && searchQuery === '' ? 'bg-blue-600' : 'bg-gray-400'}`}></span>
                                                                {row[1]}
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                            {pairedTopics.length === 0 && (
                                                <tr>
                                                    <td colSpan="2" className="p-8 text-center text-gray-500 italic">
                                                        No topics found matching "{searchQuery}"
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-gray-500">
                                Showing 1 to {filteredTopics.length} of {topics.length} entries
                            </div>
                        </section>

                        {/* Previous Editions Section */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">
                                Previous Editions (Springer CCIS Series)
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    { year: '2024', title: 'Proceedings of International Conference on Computing Science, Communication and Security (COMS2-2024)' },
                                    { year: '2023', title: 'Proceedings of International Conference on Computing Science, Communication and Security (COMS2-2023)' },
                                    { year: '2022', title: 'Proceedings of International Conference on Computing Science, Communication and Security (COMS2-2022)' },
                                    { year: '2021', title: 'Proceedings of International Conference on Computing Science, Communication and Security (COMS2-2021)' },
                                    { year: '2020', title: 'Proceedings of International Conference on Computing Science, Communication and Security (COMS2-2020)' }
                                ].map((item) => (
                                    <div key={item.year} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group border-l-4 border-l-transparent hover:border-l-blue-600">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                {item.year}
                                            </div>
                                            <span className="text-[10px] font-bold px-2 py-0.5 bg-green-50 text-green-700 rounded-full border border-green-100 uppercase tracking-tight">Scopus Indexed</span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-800 leading-snug">
                                            {item.title}
                                        </p>
                                        <div className="mt-3 flex items-center text-blue-600 text-[10px] font-bold uppercase tracking-widest gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            View Proceedings <ArrowRight size={10} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* About the University Section */}
                        <section className="py-12 bg-gray-50/50 rounded-3xl px-8 border border-gray-100">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-sky-500">
                                    About the University
                                </h2>
                                <div className="w-20 h-1 bg-sky-200 mx-auto mt-4 rounded-full"></div>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6 text-gray-700 leading-relaxed text-justify">
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
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video border-4 border-white">
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
