import React from 'react';
import { FileText, Download, CheckCircle } from 'lucide-react';

const CallForPapers = () => {
    const topics = [
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
        <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <h1 className="text-4xl font-bold text-gray-900">Call for Papers</h1>
                    <a
                        href="https://coms2.gnu.ac.in/wp-content/uploads/2026/01/Call_for_Papers-7th-Edition-Springer-International_Conference_Computing_Communication_Secuirty_COMS2-2026.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md shadow-red-500/20 font-medium"
                    >
                        <Download size={20} />
                        Download PDF
                    </a>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <FileText className="text-accent" />
                                Topics of Interest
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Authors are solicited to submit complete unpublished papers in the following, but not limited to, thematic areas:
                            </p>
                            <ul className="grid md:grid-cols-2 gap-4">
                                {topics.map((topic, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{topic}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-primary text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-4">Important Dates</h3>
                                <ul className="space-y-4">
                                    <li className="flex justify-between border-b border-gray-700 pb-2">
                                        <span className="text-gray-300">Paper Submission</span>
                                        <span className="font-semibold">TBA</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-700 pb-2">
                                        <span className="text-gray-300">Notification</span>
                                        <span className="font-semibold">TBA</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-700 pb-2">
                                        <span className="text-gray-300">Registration</span>
                                        <span className="font-semibold">TBA</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-gray-300">Conference Dates</span>
                                        <span className="font-semibold text-accent">Oct 09-10</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Submission Link</h3>
                            <p className="text-gray-600 mb-4">
                                Please submit your papers through the Springer OCS system.
                            </p>
                            <button className="w-full px-4 py-2 bg-gray-100 text-gray-400 font-medium rounded-lg cursor-not-allowed">
                                Submission Closed
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallForPapers;
