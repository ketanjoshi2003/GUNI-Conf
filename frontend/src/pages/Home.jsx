import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, MapPin, ArrowRight, Shield, Network, Cpu, Globe, Wifi, Server } from 'lucide-react';

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
            // Target date: Oct 09, 2026. 
            // Ideally we should use conference.start_date but it might load late.
            // We'll fallback to the known date for smoother initial render.
            const difference = +new Date('2026-10-09') - +new Date();

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

    const topicsList = [
        "Wireless Networks and Communication",
        "Network Security and Cyber Security",
        "Next Generation Networks",
        "Green Networking and Smart Grid",
        "Ad Hoc Networks",
        "Sensor Network",
        "Cloud Communications and Networking",
        "Cognitive Radio",
        "MIMO Technologies",
        "Social Networks and Crowdsourcing",
        "Satellite Communications and Networking",
        "Software Defined Networking",
        "Cyber Physical Systems",
        "Cognitive Radio and White-space Networking",
        "Quantum Computing and Networking",
        "Mobile and Ubiquitous Computing"
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center bg-primary overflow-hidden pb-20 pt-32">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-blue-900/80 z-0"></div>
                {/* Placeholder image for hero background since I cannot query unsplash directly without hitting API limits or knowing if user allows external images, but standard img tag is fine. I'll use a reliable placeholder or just CSS patterns if image fails. */}
                <div className="absolute inset-0 bg-[url('https://plus.unsplash.com/premium_photo-1663100722417-6e36673fe0ed?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>

                <div className="container mx-auto px-6 relative z-10 text-center text-white pt-20">
                    <div className="inline-block px-4 py-1 border border-blue-400/30 rounded-full bg-blue-500/10 backdrop-blur-sm mb-6 animate-pulse">
                        <span className="text-blue-300 font-medium tracking-wide text-sm uppercase">7th Edition &bull; Springer</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
                        {conference?.name || "COMS2 International Conference"}
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light">
                        International Conference on <span className="text-white font-medium">{conference?.theme || "Computing Communication Security"}</span>
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
                        {Object.keys(timeLeft).map((interval) => (
                            <div key={interval} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col items-center">
                                <span className="text-3xl md:text-4xl font-bold text-accent font-mono">
                                    {String(timeLeft[interval]).padStart(2, '0')}
                                </span>
                                <span className="text-gray-300 text-sm uppercase tracking-wider">{interval}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12">
                        <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-xl backdrop-blur-md border border-white/10">
                            <Calendar className="text-accent w-6 h-6" />
                            <span className="text-lg">Oct 09-10, 2026</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-xl backdrop-blur-md border border-white/10">
                            <MapPin className="text-accent w-6 h-6" />
                            <span className="text-lg">Ganpat University, Gujarat, India</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="#topics" className="px-8 py-4 bg-accent hover:bg-blue-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/30 text-lg flex items-center">
                            Explore Topics <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                        <a href="https://coms2.gnu.ac.in/wp-content/uploads/2026/01/Call_for_Papers-7th-Edition-Springer-International_Conference_Computing_Communication_Secuirty_COMS2-2026.pdf" target="_blank" rel="noreferrer" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold transition-all text-lg">
                            Call for Papers
                        </a>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About the Conference</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            The 7th Edition of COMS2 brings together global experts to discuss cutting-edge developments in Computing, Communication, and Security. Join us at Ganpat University for two days of innovative research presentations and networking.
                        </p>
                    </div>
                </div>
            </section>

            {/* Topics Section */}
            <section id="topics" className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Conference Topics</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We invite submissions on the following key areas:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {topicsList.map((topic, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group cursor-default">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex-shrink-0 flex items-center justify-center text-accent mt-1 group-hover:bg-accent group-hover:text-white transition-colors">
                                        <Network size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-accent transition-colors">{topic}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
