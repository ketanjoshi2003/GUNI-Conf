import React from 'react';
import { MapPin, Mail, ChevronRight, Globe, Wifi } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative mt-20">
            {/* Top Footer: Info Cards */}
            <div className="bg-gray-50/50 pb-16">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-8 -translate-y-12">
                        {/* Venue Card */}
                        <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 flex flex-col h-full transform transition-all hover:scale-[1.01]">
                            <div className="flex items-start gap-5 mb-6">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-blue-100">
                                    <MapPin className="w-7 h-7 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Ganpat University</h4>
                                    <div className="text-gray-500 text-sm space-y-1 leading-relaxed">
                                        <p>Ganpat Vidyanagar, Mehsana-Gandhinagar Highway,</p>
                                        <p>North Gujarat, India, Pin Code 384012</p>
                                        <a href="mailto:coms2@ganpatuniversity.ac.in" className="text-blue-600 font-bold hover:underline block pt-2 text-base">coms2@ganpatuniversity.ac.in</a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto relative h-64 rounded-3xl overflow-hidden border-4 border-white shadow-lg">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7335.5!2d72.4532934!3d23.5258338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c476c5013fd03%3A0xa1fe01d9ab30482!2sGanpat%20University%20(GUNI)!5e0!3m2!1sen!2sin!4v1707123456789!5m2!1sen!2sin"
                                    className="absolute inset-0 w-full h-full grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>

                        {/* Participation Card */}
                        <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 flex flex-col h-full transform transition-all hover:scale-[1.01]">
                            <h3 className="text-2xl font-bold text-gray-900 mb-10 border-l-4 border-blue-600 pl-4">
                                Participation Modes
                            </h3>

                            <div className="space-y-8 flex-grow">
                                {/* Mode 1 */}
                                <div className="flex gap-5 group items-center">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:shadow-lg transition-all duration-300">
                                        <Globe className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">International Authors</h5>
                                        <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                            (Outside India): Hybrid participation requests will be considered.
                                        </p>
                                    </div>
                                </div>
                                {/* Mode 2 */}
                                <div className="flex gap-5 group items-center">
                                    <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 group-hover:shadow-lg transition-all duration-300">
                                        <Wifi className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-orange-500 transition-colors">Authors from Other States</h5>
                                        <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                            (Other than Gujarat): Online participation may be permitted under exceptional circumstances.
                                        </p>
                                    </div>
                                </div>
                                {/* Mode 3 */}
                                <div className="flex gap-5 group items-center">
                                    <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 group-hover:shadow-lg transition-all duration-300">
                                        <MapPin className="w-7 h-7 text-green-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-green-600 transition-colors">Authors from Gujarat</h5>
                                        <p className="text-sm text-gray-500 leading-relaxed font-medium">
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
            <div className="bg-[#111827] text-gray-400 pt-12 pb-8 border-t border-gray-800">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-8">

                        {/* Address & News */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-white text-xl font-bold border-l-4 border-blue-500 pl-4 mb-6 uppercase tracking-wider text-sm">Address</h3>
                                <div className="text-sm space-y-2 text-gray-400">
                                    <p className="font-bold text-gray-300">Ganpat University</p>
                                    <p>Mehsana-Gozaria Highway, Kherva, Gujarat 384012</p>
                                    <p className="flex items-center gap-2 pt-2">
                                        <Mail className="w-4 h-4 text-blue-500" />
                                        <a href="mailto:nirbhay.chaubey@ganpatuniversity.ac.in" className="hover:text-blue-400 transition-colors">nirbhay.chaubey@ganpatuniversity.ac.in</a>
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4">
                                <h3 className="text-white text-xl font-bold border-l-4 border-blue-500 pl-4 mb-6 uppercase tracking-wider text-sm">Latest News</h3>
                                <ul className="text-sm space-y-3">
                                    <li className="flex items-start gap-2 group">
                                        <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                                        <a href="/call-for-papers" className="hover:text-blue-400 transition-colors italic text-xs leading-relaxed">Call for paper - Springer 7th Edition - COMS2 September 10-11, 2026</a>
                                    </li>
                                    <li className="flex items-start gap-2 group">
                                        <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                                        <span className="italic text-xs leading-relaxed">Invitation for International Advisory Committee and TPC Member</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Important Dates */}
                        <div>
                            <h3 className="text-white text-xl font-bold border-l-4 border-blue-500 pl-4 mb-6 uppercase tracking-wider text-sm">Important Dates</h3>
                            <ul className="grid grid-cols-1 gap-4 text-sm">
                                {[
                                    { label: 'Full Paper Submission', date: 'May 30, 2026' },
                                    { label: 'Paper Acceptance', date: 'July 30, 2026' },
                                    { label: 'Registration Opens', date: 'July 30, 2026' },
                                    { label: 'Camera Ready Paper', date: 'August 15, 2026' },
                                    { label: 'Conference Date', date: 'Sept 10-11, 2026', highlight: true }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex justify-between items-center border-b border-gray-800/50 pb-2">
                                        <span className="text-gray-500 text-[11px] uppercase font-bold tracking-tight">{item.label}</span>
                                        <span className={item.highlight ? 'text-blue-400 font-bold' : 'text-gray-300'}>{item.date}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Visitors */}
                        <div className="space-y-4">
                            <h3 className="text-white text-xl font-bold border-l-4 border-blue-500 pl-4 uppercase tracking-wider text-sm">Visitors</h3>
                            <div className="bg-[#0f172a] p-5 rounded-2xl border border-gray-800 shadow-2xl inline-block group hover:border-blue-500/50 transition-colors">
                                <img
                                    src="https://s11.flagcounter.com/count2/JO2k/bg_0F172A/txt_FFFFFF/border_334155/columns_2/maxflags_10/viewers_0/labels_0/pageviews_0/flags_0/percent_0/"
                                    alt="Flag Counter"
                                    className="block opacity-90 group-hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="border-t border-gray-800/50 pt-6 flex flex-col md:flex-row justify-center items-center gap-4 text-xs font-semibold text-gray-500">
                        <p>© {new Date().getFullYear()} All Copyrights reserved to Ganpat University.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
