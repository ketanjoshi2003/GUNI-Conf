import React, { useState } from 'react';

const BestPaperAward = () => {
    const [activeTab, setActiveTab] = useState('2024');

    const render2024Content = () => (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
                <thead>
                    <tr className="bg-[#f0f9fd] border-b border-gray-200 text-gray-700">
                        <th className="p-3 border border-gray-200 font-bold w-16">Paper Id</th>
                        <th className="p-3 border border-gray-200 font-bold w-1/3">Paper Title</th>
                        <th className="p-3 border border-gray-200 font-bold">Authors</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    <tr className="hover:bg-gray-50">
                        <td className="p-3 border border-gray-200 align-top">369</td>
                        <td className="p-3 border border-gray-200 align-top">
                            Osmotic Computing Based Task Offloading: A Fuzzy Logic Based Approach
                        </td>
                        <td className="p-3 border border-gray-200 align-top text-gray-600">
                            Ranadir Naha, Sanjaya Kumar Panda, Pradip Kumar Sahu, Veer Surendra Sai University of Technology, Odisha, India;
                            National Institute of Technology, Warangal, Telangana, India
                        </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                        <td className="p-3 border border-gray-200 align-top">411</td>
                        <td className="p-3 border border-gray-200 align-top">
                            Design of Performance Enhanced Approximate Multiplier for Image Processing Applications
                        </td>
                        <td className="p-3 border border-gray-200 align-top text-gray-600">
                            Dr. K. Sivanandam, P. Sadhana, M. Kumaraswamy College of Engineering, Thalavapalayam, Tamilnadu, India
                        </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                        <td className="p-3 border border-gray-200 align-top">418</td>
                        <td className="p-3 border border-gray-200 align-top">
                            Design and performance analysis of high-efficiency propulsion system for VTOL applications
                        </td>
                        <td className="p-3 border border-gray-200 align-top text-gray-600">
                            Arpit Biswas, Triaudic Robotics Pvt Ltd, New Delhi, India; Ms. Neha chaubey, Imperial College, London, United Kingdom
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="mt-4">
                <a href="#" className="text-[#5bc0de] text-sm hover:underline">Edit</a>
            </div>
        </div>
    );

    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-5xl">

                <h1 className="text-3xl font-bold text-gray-700 mb-12 text-center">
                    Best Paper Award- <br /> International Conference COMS2
                </h1>

                <div className="border border-gray-200 rounded p-4">
                    {/* Tabs */}
                    <div className="flex flex-col space-y-2 mb-6">
                        {['2024', '2023', '2022', '2021', '2020'].map((year) => (
                            <button
                                key={year}
                                onClick={() => setActiveTab(year)}
                                className={`text-left font-bold uppercase tracking-wide py-2 px-1 transition-colors ${activeTab === year ? 'text-green-500' : 'text-[#5bc0de] hover:text-blue-500'}`}
                            >
                                COMS2-{year} PAPERS
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div>
                        {activeTab === '2024' && render2024Content()}
                        {activeTab !== '2024' && (
                            <div className="p-8 text-center text-gray-500 italic">
                                Data for {activeTab} is archived.
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BestPaperAward;
