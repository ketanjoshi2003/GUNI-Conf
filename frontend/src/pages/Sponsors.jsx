import React from 'react';

const Sponsors = () => {
    const sponsorshipLevels = [
        {
            name: "Powered By",
            subName: "Event Main Financial Supporter",
            price: "INR 5,00,000/-",
            features: [
                "10 meter x 10 meter exhibit space and banner of sponsored company during the conference",
                "Speaking opportunity at one of the following sessions: Keynote.",
                "6 Complementary full conference registrations.",
                "Program Item for inclusion in conference kit bag.",
                "Name of Financial Supporter Company will be displayed on the conference web site."
            ],
            color: "bg-blue-600"
        },
        {
            name: "Presented By",
            subName: "Co Sponsor",
            price: "INR 3,00,000/-",
            features: [
                "6 meter x 6 meter exhibit space and banner of sponsored company during the conference",
                "Speaking opportunity at one of the following sessions: Keynote.",
                "4 Complementary full conference registrations.",
                "Program Item for inclusion in conference kit bag.",
                "Name of Financial Supporter Company will be displayed on the conference web site."
            ],
            color: "bg-cyan-600"
        },
        {
            name: "Diamond",
            price: "INR 2,00,000/-",
            features: [
                "4 meter x 6 meter exhibit space and banner of sponsored company during the conference",
                "Speaking opportunity at one of the following sessions: Keynote.",
                "3 Complementary full conference registrations.",
                "Program Item for inclusion in conference kit bag.",
                "Name of Financial Supporter Company will be displayed on the conference web site."
            ],
            color: "bg-indigo-600"
        },
        {
            name: "Platinum",
            price: "INR 1,00,000/-",
            features: [
                "3 meter x 6 meter exhibit space and banner of sponsored company during the conference",
                "4 Complementary full conference registrations.",
                "Program Item for inclusion in conference kit bag.",
                "Name of Financial Supporter Company will be displayed on the conference web site."
            ],
            color: "bg-slate-600"
        },
        {
            name: "Gold",
            price: "INR 50,000/-",
            features: [
                "3 meter x 6 meter exhibit space and banner of sponsored company during the conference",
                "Program Item for inclusion in conference kit bag.",
                "Name of Financial Supporter Company will be displayed on the conference web site."
            ],
            color: "bg-amber-500"
        },
        {
            name: "Silver",
            price: "INR 25,000/-",
            features: [
                "Program Item for inclusion in conference kit bag.",
                "Name of Financial Supporter Company will be displayed on the conference web site."
            ],
            color: "bg-gray-400"
        }
    ];

    return (
        <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 font-sans">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-500 mb-6 uppercase tracking-tight">
                        Exclusive Sponsorship Opportunities
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed italic">
                        If your company, institute is interested in a conference sponsorship, then the following opportunities are for you !
                    </p>
                </div>

                {/* Desktop/Tablet Table View */}
                <div className="hidden lg:block overflow-x-auto rounded-2xl shadow-2xl border border-gray-200 bg-white">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-50">
                                {sponsorshipLevels.map((level, idx) => (
                                    <th key={idx} className="p-6 border-r border-gray-200 last:border-0 vertical-top w-1/6">
                                        <div className="flex flex-col h-full">
                                            <span className="text-blue-700 font-bold text-lg mb-1">{level.name}</span>
                                            {level.subName && <span className="text-blue-600 text-xs font-semibold mb-1">{level.subName}</span>}
                                            <span className="text-gray-900 font-extrabold text-sm">({level.price})</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {/* We'll simulate rows by finding the max features and mapping through index */}
                            {[0, 1, 2, 3, 4].map(rowIndex => (
                                <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                                    {sponsorshipLevels.map((level, colIndex) => (
                                        <td key={colIndex} className="p-6 border-r border-gray-200 last:border-0 align-top text-sm text-gray-600 leading-relaxed min-h-[100px]">
                                            {level.features[rowIndex] || ""}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile/Card View */}
                <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sponsorshipLevels.map((level, idx) => (
                        <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform hover:-translate-y-1 transition-all duration-300">
                            <div className={`${level.color} p-6 text-white`}>
                                <h3 className="text-2xl font-bold">{level.name}</h3>
                                {level.subName && <p className="text-sm opacity-90 font-medium mb-1">{level.subName}</p>}
                                <p className="text-xl font-black mt-2">{level.price}</p>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-4">
                                    {level.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start text-sm text-gray-600">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-3 shrink-0"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center bg-white p-12 rounded-3xl shadow-xl border border-blue-50 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Interested in Sponsoring?</h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Join us as a partner for COMS2-2026 and showcase your brand to global experts in Computing, Communication and Security.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:coms2@ganpatuniversity.ac.in"
                            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200/50"
                        >
                            Contact for Sponsorship
                        </a>
                        <button
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all"
                        >
                            Download Prospectus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sponsors;
