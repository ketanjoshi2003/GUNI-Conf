import React from 'react';

const AcceptedPapers = () => {
    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-5xl">

                <div className="border border-gray-300 shadow-xl bg-white p-8 md:p-16 min-h-[1000px] relative">

                    {/* Header Logos */}
                    <div className="flex justify-center items-center gap-8 mb-8 border-b border-gray-300 pb-4">
                        <div className="text-center">
                            <span className="font-bold text-red-600 text-2xl flex flex-col items-center">
                                {/* Simple red flower/sun icon representation */}
                                <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor" className="mb-1">
                                    <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z" />
                                </svg>
                                Ganpat University
                            </span>
                        </div>
                        <div className="h-12 w-px bg-gray-400"></div>
                        <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-2xl text-blue-800">Springer</span>
                            <div className="bg-orange-500 text-white font-bold px-1 text-sm">CCIS</div>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-xl font-bold text-blue-900 leading-tight">
                            Springer 6th Edition - International Conference on Computing <br />
                            Science, Communication and Security (COMS2-2025) <br />
                            September 12th – 13th 2025 <br />
                            Ganpat University, Gujarat, India
                        </h1>
                        <h2 className="text-[#31708f] italic font-semibold mt-4 text-lg">
                            List of Accepted Research Papers - Oral Presentation and Publications <br />
                            (Hybrid Mode)
                        </h2>
                    </div>

                    {/* Content Body */}
                    <div className="space-y-8 text-gray-800 text-sm md:text-base font-serif">

                        <div>
                            <h3 className="font-bold underline text-blue-900 mb-2">Participation Modes:</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>International Authors (outside India):</strong> Hybrid participation requests will be considered.</li>
                                <li><strong>Authors from States other than Gujarat (India):</strong> Online participation may be permitted under exceptional circumstances.</li>
                                <li><strong>Authors from Gujarat (India):</strong> Physical presence of the presenting author is mandatory.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold underline text-blue-900 mb-2">Paper Acceptance Ratio:</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    COMS2-2025 has a competitive 20% paper acceptance ratio, with 48 out of 238 submissions selected after a wonderful double-blind peer-review process and evaluated by the Springer CCIS Board for presentation.
                                </li>
                                <li>
                                    Only accepted and presented papers will be published in the Scopus Indexed Springer CCIS Proceedings.
                                </li>
                            </ul>
                        </div>

                        <div className="mt-12 text-center">
                            <a href="#" className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors">
                                Download Full List (PDF)
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AcceptedPapers;
