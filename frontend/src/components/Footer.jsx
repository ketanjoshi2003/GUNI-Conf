import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { MapPin, Mail, ChevronRight, Globe, Wifi } from 'lucide-react';
import { useSocketRefresh } from '../hooks/useSocketRefresh';

const Footer = () => {
    const [news, setNews] = useState([]);
    const [footerDates, setFooterDates] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            // Fetch News
            const newsRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/news`);
            setNews(newsRes.data);

            // Fetch Important Dates for footer display
            const datesRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/important-dates`);
            if (datesRes.data && datesRes.data.length > 0) {
                const mapped = datesRes.data.slice(0, 5).map(d => ({
                    label: d.event,
                    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    highlight: d.isPinned
                }));
                setFooterDates(mapped);
            }
        } catch (error) {
            console.error('Error fetching footer data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useSocketRefresh(() => {
        console.log('Footer: Refreshing data...');
        fetchData();
    });

    return (
        <footer className="relative mt-20 lg:mt-32">
            {/* Top Footer: Info Cards */}
            <div className="bg-gray-50/50 pb-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-8 -translate-y-10 md:-translate-y-12">
                        {/* Venue Card */}
                        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border border-gray-100 p-6 md:p-8 flex flex-col h-full transform transition-all hover:scale-[1.01]">
                            <div className="flex items-start gap-4 md:gap-5 mb-6">
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-blue-100">
                                    <MapPin className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">Ganpat University</h4>
                                    <div className="text-gray-500 text-xs md:text-sm space-y-1 leading-relaxed">
                                        <p>Ganpat Vidyanagar, Mehsana-Gandhinagar Highway,</p>
                                        <p>North Gujarat, India, Pin Code 384012</p>
                                        <a href="mailto:coms2@ganpatuniversity.ac.in" className="text-blue-600 font-bold hover:underline block pt-1 md:pt-2 text-sm md:text-base">coms2@ganpatuniversity.ac.in</a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto relative h-48 md:h-64 rounded-2xl md:rounded-3xl overflow-hidden border-2 md:border-4 border-white shadow-lg">
                                <iframe
                                    src="https://maps.google.com/maps?q=Ganpat%20University&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                    className="absolute inset-0 w-full h-full grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>

                        {/* Participation Card */}
                        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border border-gray-100 p-6 md:p-8 flex flex-col h-full transform transition-all">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-10 border-l-4 border-blue-600 pl-4">
                                Participation Modes
                            </h3>

                            <div className="space-y-6 md:space-y-8 flex-grow">
                                {/* Mode 1 */}
                                <div className="flex gap-4 md:gap-5 items-center">
                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                                        <Globe className="w-5 h-5 md:w-7 md:h-7 text-blue-600 transition-colors" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-900 text-sm md:text-lg mb-0.5 md:mb-1 transition-colors">International Authors</h5>
                                        <p className="text-[10px] md:text-sm text-gray-500 leading-relaxed font-medium">
                                            (Outside India): Hybrid participation requests will be considered.
                                        </p>
                                    </div>
                                </div>
                                {/* Mode 2 */}
                                <div className="flex gap-4 md:gap-5 items-center">
                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-orange-50 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                                        <Wifi className="w-5 h-5 md:w-7 md:h-7 text-orange-500 transition-colors" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-900 text-sm md:text-lg mb-0.5 md:mb-1 transition-colors">Authors from Other States</h5>
                                        <p className="text-[10px] md:text-sm text-gray-500 leading-relaxed font-medium">
                                            (Other than Gujarat): Online participation may be permitted.
                                        </p>
                                    </div>
                                </div>
                                {/* Mode 3 */}
                                <div className="flex gap-4 md:gap-5 items-center">
                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                                        <MapPin className="w-5 h-5 md:w-7 md:h-7 text-green-600 transition-colors" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-900 text-sm md:text-lg mb-0.5 md:mb-1 transition-colors">Authors from Gujarat</h5>
                                        <p className="text-[10px] md:text-sm text-gray-500 leading-relaxed font-medium">
                                            Physical presence of the presenting author is mandatory.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer: Column Links */}
            <div className="bg-[#111827] text-gray-400 pt-16 md:pt-12 pb-8 border-t border-gray-800">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-8">

                        {/* Address & News */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-white text-base md:text-xl font-bold border-l-4 border-blue-500 pl-4 mb-6 uppercase tracking-wider">Address</h3>
                                <div className="text-sm space-y-2 text-gray-400">
                                    <p className="font-bold text-gray-300">Ganpat University</p>
                                    <p>Mehsana-Gozaria Highway, Kherva, Gujarat 384012</p>
                                    <p className="flex items-center gap-2 pt-2">
                                        <Mail className="w-4 h-4 text-blue-500" />
                                        <a href="mailto:nirbhay.chaubey@ganpatuniversity.ac.in" className="hover:text-blue-400 transition-colors break-all">nirbhay.chaubey@ganpatuniversity.ac.in</a>
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4">
                                <h3 className="text-white text-base md:text-xl font-bold border-l-4 border-blue-500 pl-4 mb-6 uppercase tracking-wider">Latest News</h3>
                                <ul className="text-sm space-y-3">
                                    {news.length > 0 ? (
                                        news.map((item) => (
                                            <li key={item._id} className="flex items-start gap-2 group">
                                                <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                                                {item.link ? (
                                                    <a href={item.link} className="hover:text-blue-400 transition-colors italic text-xs leading-relaxed">
                                                        {item.title}
                                                    </a>
                                                ) : (
                                                    <span className="italic text-xs leading-relaxed">{item.title}</span>
                                                )}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-xs text-gray-500 italic">No news available</li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Important Dates */}
                        <div>
                            <h3 className="text-white text-base md:text-xl font-bold border-l-4 border-blue-500 pl-4 mb-6 uppercase tracking-wider">Important Dates</h3>
                            <ul className="grid grid-cols-1 gap-4 text-sm">
                                {footerDates.length > 0 ? footerDates.map((item, idx) => (
                                    <li key={idx} className="flex justify-between items-center border-b border-gray-800/50 pb-2 gap-4">
                                        <span className="text-gray-500 text-[10px] md:text-[11px] uppercase font-bold tracking-tight shrink-0">{item.label}</span>
                                        <span className={item.highlight ? 'text-blue-400 font-bold whitespace-nowrap text-right' : 'text-gray-300 whitespace-nowrap text-right'}>{item.date}</span>
                                    </li>
                                )) : (
                                    <li className="text-xs text-gray-500 italic">Dates coming soon...</li>
                                )}
                            </ul>
                        </div>

                        {/* Visitors */}
                        <div className="space-y-4">
                            <h3 className="text-white text-base md:text-xl font-bold border-l-4 border-blue-500 pl-4 uppercase tracking-wider">Visitors</h3>
                            <div className="bg-[#0f172a] p-5 rounded-2xl border border-gray-800 shadow-2xl inline-block group hover:border-blue-500/50 transition-colors">
                                <img
                                    src="https://s11.flagcounter.com/count2/JO2k/bg_0F172A/txt_FFFFFF/border_334155/columns_2/maxflags_10/viewers_0/labels_0/pageviews_0/flags_0/percent_0/"
                                    alt="Flag Counter"
                                    className="block opacity-90 group-hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="border-t border-gray-800/50 pt-6 flex flex-col md:flex-row justify-center items-center gap-4 text-center text-[10px] md:text-xs font-semibold text-gray-500">
                        <p>© {new Date().getFullYear()} All Copyrights reserved to Ganpat University.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
