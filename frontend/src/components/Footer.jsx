import React from 'react';
import { MapPin, Calendar, Globe } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-gray-400 py-12 border-t border-slate-800">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Column 1: About */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">COMS2-2026</h2>
                        <p className="mb-4 text-sm leading-relaxed">International Conference on Computing Communication Security.</p>
                        <p className="mt-4 text-sm font-medium text-white">Ganpat University, Gujarat, India</p>
                    </div>

                    {/* Column 2: Venue */}
                    <div>
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-sky-400" />
                            Venue
                        </h3>
                        <div className="space-y-3 text-sm">
                            <p className="font-semibold text-gray-200">Ganpat University</p>
                            <p>Ganpat Vidyanagar, Mehsana-Gandhinagar Highway,</p>
                            <p>North Gujarat, India, Pin Code 384012</p>
                            <div className="pt-2 mt-2 border-t border-slate-800">
                                <p className="text-xs text-gray-500 mb-1">Contact:</p>
                                <a href="mailto:coms2@ganpatuniversity.ac.in" className="text-sky-400 hover:text-sky-300 transition-colors">coms2@ganpatuniversity.ac.in</a>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Important Dates */}
                    <div>
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-sky-400" />
                            Important Dates
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex justify-between items-start">
                                <span className="text-gray-400">Paper Submission</span>
                                <span className="text-white font-medium text-right">May 30, 2026</span>
                            </li>
                            <li className="flex justify-between items-start">
                                <span className="text-gray-400">Paper Acceptance</span>
                                <span className="text-white font-medium text-right">July 30, 2026</span>
                            </li>
                            <li className="flex justify-between items-start">
                                <span className="text-gray-400">Registration</span>
                                <span className="text-white font-medium text-right">July 30, 2026</span>
                            </li>
                            <li className="flex justify-between items-start">
                                <span className="text-sky-400">Conference Date</span>
                                <span className="text-sky-400 font-bold text-right">Sept 10-11, 2026</span>
                            </li>
                        </ul>
                    </div>
                    {/* Column 4: Visitors & Quick Links */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                                <Globe className="w-4 h-4 text-sky-400" />
                                Visitors
                            </h3>
                            <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800 inline-block">
                                <img
                                    src="https://s11.flagcounter.com/count2/JO2k/bg_0F172A/txt_FFFFFF/border_334155/columns_2/maxflags_10/viewers_0/labels_0/pageviews_0/flags_0/percent_0/"
                                    alt="Flag Counter"
                                    className="block opacity-90 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; 2026 Ganpat University. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="/" className="hover:text-white transition-colors">Home</a>
                        <a href="/call-for-papers" className="hover:text-white transition-colors">Call for Papers</a>
                        <a href="https://link.springer.com/book/10.1007/978-3-031-75170-7" className="hover:text-white transition-colors">Proceedings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
