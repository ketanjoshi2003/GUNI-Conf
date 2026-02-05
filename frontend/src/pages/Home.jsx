import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, MapPin, ArrowRight, Shield, Network, Wifi, Globe } from 'lucide-react';

const Home = () => {
    const [conference, setConference] = useState(null);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

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
                                        <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-4xl md:text-5xl font-bold rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:bg-white/10 transition-all text-white relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
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
                    <div className="lg:col-span-2 space-y-12">

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

                        {/* Tracks Section - Modernized */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">
                                Conference Tracks
                            </h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Track 1 */}
                                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                        <Network className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-3">Computing</h4>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li>• Cloud Computing</li>
                                        <li>• AI & Machine Learning</li>
                                        <li>• Data Science</li>
                                        <li>• Quantum Computing</li>
                                    </ul>
                                </div>
                                {/* Track 2 */}
                                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                        <Wifi className="w-5 h-5 text-green-600" />
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-3">Communication</h4>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li>• 5G/6G Networks</li>
                                        <li>• Wireless Comm.</li>
                                        <li>• IoT & Sensors</li>
                                        <li>• Satellite Comm.</li>
                                    </ul>
                                </div>
                                {/* Track 3 */}
                                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                        <Shield className="w-5 h-5 text-red-600" />
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-3">Cyber Security</h4>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li>• Network Security</li>
                                        <li>• Cryptography</li>
                                        <li>• Blockchain</li>
                                        <li>• Cyber Physical</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* About University */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">
                                Host Institute
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                                <div className="p-6">
                                    <h4 className="text-xl font-bold text-gray-800 mb-3">Ganpat University</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                        A high-tech state private university with a sprawling 300-acre green campus
                                        in Mehsana, Gujarat. We are committed to value-based quality education.
                                    </p>
                                    <a href="#" className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
                                        Learn More <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                                <div className="h-full min-h-[200px] bg-gray-100 relative">
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src="https://www.youtube.com/embed/jZ5Duv2T4QY?si=u3hWjkq9zS5gYJ9_"
                                        title="University Drone View"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </section>
                    </div>


                    {/* RIGHT COLUMN (Sidebar) */}
                    <div className="space-y-8">

                        {/* Previous Publications */}
                        <section>
                            <h3 className="text-gray-900 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                                    <Globe className="w-4 h-4" />
                                </span>
                                Publications
                            </h3>
                            <p className="text-xs text-gray-500 mb-4">Indexed in Scopus and DBLP</p>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { ccis: "1235", year: "2020", from: "blue-600", to: "blue-400" },
                                    { ccis: "1358", year: "2021", from: "indigo-600", to: "indigo-400" },
                                    { ccis: "1572", year: "2022", from: "violet-600", to: "violet-400" },
                                    { ccis: "1856", year: "2024", from: "fuchsia-600", to: "fuchsia-400" }
                                ].map((book) => (
                                    <div key={book.ccis} className={`bg-gradient-to-br from-${book.from} to-${book.to} rounded-xl shadow-lg p-4 text-white hover:scale-105 transition-transform cursor-pointer relative overflow-hidden group`}>
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-fullblur-2xl -mr-8 -mt-8"></div>
                                        <div className="relative z-10">
                                            <span className="text-[10px] font-bold opacity-75 tracking-wider bg-black/20 px-2 py-0.5 rounded-full">SPRINGER</span>
                                            <div className="font-bold text-2xl mt-2 mb-1">CCIS {book.ccis}</div>
                                            <div className="text-[10px] font-medium opacity-90 leading-tight">
                                                Computing, Comm. & Security
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

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

                        {/* Latest News */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                    <Wifi className="w-5 h-5" />
                                </div>
                                Latest News
                            </h3>
                            <div className="space-y-4">
                                <div className="group cursor-pointer">
                                    <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Call for Papers - COMS2 2026 announced</p>
                                    <span className="text-xs text-blue-500 mt-1 inline-block bg-blue-50 px-2 py-0.5 rounded">International Conference</span>
                                </div>
                                <div className="w-full h-px bg-gray-100"></div>
                                <div className="group cursor-pointer">
                                    <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Advisory Committee Invited</p>
                                    <span className="text-xs text-gray-400 mt-1 block">1 week ago</span>
                                </div>
                                <div className="w-full h-px bg-gray-100"></div>
                                <div className="group cursor-pointer">
                                    <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Paper Format Templates Available</p>
                                    <span className="text-xs text-gray-400 mt-1 block">2 weeks ago</span>
                                </div>
                            </div>
                        </div>

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

export default Home;
