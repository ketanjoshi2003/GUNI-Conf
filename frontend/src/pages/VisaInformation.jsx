import React from 'react';
import { Calendar, MapPin, Wifi, Globe, ExternalLink, Mail, FileText, CheckCircle } from 'lucide-react';

const VisaInformation = () => {
    return (
        <div className="bg-gray-50 min-h-screen pt-28 pb-12">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
                        Visa Information
                    </h1>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* LEFT COLUMN (Main Content) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Requirements Card */}
                        <section className="bg-white rounded-xl shadow-md border border-gray-100 p-8 hover:shadow-lg transition-shadow">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 border-b pb-4">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <FileText className="w-6 h-6" />
                                </div>
                                Visa Requirements and Application
                            </h2>
                            <div className="space-y-6 text-gray-700 leading-relaxed">
                                <p>
                                    Indian government rules that all foreign nationals, authors of accepted papers, chairs, and speakers attending the
                                    <strong> International Conference COMS2</strong> are required to possess a valid international travel document in the form of a <strong>passport</strong>
                                    with a valid visa from Indian Missions, Bureau of Immigration, Ministry of Home Affairs.
                                </p>

                                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                                    <h3 className="font-bold text-blue-900 mb-2">Detailed Visa Information</h3>
                                    <p className="text-sm text-blue-800 mb-4">
                                        For detailed information on visa requirements and application procedures, please visit the official government website:
                                    </p>
                                    <a
                                        href="https://indianvisaonline.gov.in/visa/tvoa.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                        Visit Indian Visa Online <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>

                                <p>
                                    Authors of accepted papers, attendees, and speakers should start the visa application process as soon as possible.
                                    The attendees are responsible for understanding the requirements and procedures to obtain an Indian Visa to attend the conference.
                                </p>
                            </div>
                        </section>

                        {/* Invitation Letter Card */}
                        <section className="bg-white rounded-xl shadow-md border border-gray-100 p-8 hover:shadow-lg transition-shadow">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 border-b pb-4">
                                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                    <Mail className="w-6 h-6" />
                                </div>
                                Invitation Letter Request
                            </h2>
                            <div className="space-y-6 text-gray-700 leading-relaxed">
                                <p>
                                    International delegates may need an <strong>"Invitation Letter"</strong> for visa purposes from the organizing team of <strong>COMS2-2026</strong>.
                                    We strongly recommend starting the process early.
                                </p>

                                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        How to Request an Invitation Letter
                                    </h3>
                                    <p className="mb-4 text-sm">
                                        Please email the organizing chair with the subject line <span className="font-mono bg-white px-2 py-0.5 rounded border">"Invitation Letter for COMS2-2026"</span> and include the following details:
                                    </p>
                                    <ul className="grid md:grid-cols-2 gap-3 text-sm">
                                        {[
                                            "Full Name (as on Passport)",
                                            "Passport Number",
                                            "Date of Birth",
                                            "Nationality",
                                            "Passport Expiry Date",
                                            "Tentative Travel Dates"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-900 mb-2">Contact Person:</p>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                                        <div>
                                            <p className="font-bold text-lg">Dr. Nirbhay Chaubey</p>
                                            <p className="text-sm text-gray-500">Organizing Chair, COMS2</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <a href="mailto:nirbhay.chaubey@ganpatuniversity.ac.in" className="text-blue-600 hover:underline flex items-center gap-2 text-sm">
                                                <Mail className="w-4 h-4" /> nirbhay.chaubey@ganpatuniversity.ac.in
                                            </a>
                                            <a href="mailto:dean.s@ganpatuniversity.ac.in" className="text-blue-600 hover:underline flex items-center gap-2 text-sm">
                                                <Mail className="w-4 h-4" /> dean.s@ganpatuniversity.ac.in
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r text-sm text-orange-800">
                                    <strong>Note:</strong> On confirmation of your conference registration, the invitation letter will be issued. The conference organizers will not be able to process requests without the above-mentioned information.
                                </div>
                            </div>
                        </section>

                        {/* Participation Modes */}
                        <section className="bg-white rounded-xl shadow-md border border-gray-100 p-8 hover:shadow-lg transition-shadow">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 border-b pb-4">
                                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                                    <Wifi className="w-6 h-6" />
                                </div>
                                Participation Modes
                            </h2>
                            <div className="space-y-4 text-gray-700">
                                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                                    <h3 className="font-bold text-gray-900 mb-2">Hybrid Mode Supported</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Globe className="w-3.5 h-3.5" />
                                            </div>
                                            <div>
                                                <span className="font-semibold text-gray-900">International Authors (Outside India):</span>
                                                <p className="text-sm mt-1">Permitted to present their papers via <span className="font-medium text-green-600">Online Mode</span> due to travel constraints.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <MapPin className="w-3.5 h-3.5" />
                                            </div>
                                            <div>
                                                <span className="font-semibold text-gray-900">Indian Authors:</span>
                                                <p className="text-sm mt-1">Required to present papers via <span className="font-medium text-blue-600">Physical Presence</span> at the venue (Ganpat University, Gujarat).</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>


                    {/* RIGHT COLUMN (Sidebar) */}
                    <div className="space-y-8">

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

export default VisaInformation;
