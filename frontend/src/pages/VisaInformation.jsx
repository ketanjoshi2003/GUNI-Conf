import React from 'react';
import { Calendar, MapPin, Wifi, Globe, ExternalLink, Mail, FileText, CheckCircle } from 'lucide-react';

const VisaInformation = () => {
    return (
        <div className="bg-gray-50 min-h-screen pt-28 pb-12">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
                        Travel Essentials
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Visa <span className="text-blue-600">Information</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                        Important guidelines for international delegates attending COMS2 2026.
                    </p>
                </div>

                <div className="grid lg:grid-cols-1 gap-12">
                    {/* LEFT COLUMN (Main Content) */}
                    <div className="w-full space-y-8">

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

                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisaInformation;
