import React from 'react';

const PaperPublications = () => {
    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-5xl">

                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 uppercase">
                    PUBLICATIONS OF COMS2 PROCEEDING IN SPRINGER CCIS SCOPUS INDEX
                </h1>

                <div className="space-y-6 text-gray-700 text-justify leading-relaxed">
                    <p>
                        Papers submitted to COMS2-2026 will be assessed based on the originality, scientific contribution and novelty,
                        technical soundness, clarity, and interest to a wide audience. The plagiarism / similarity ratio of the papers
                        should not exceed 10% overall, and 3% for single source overlap.
                    </p>

                    <div>
                        <strong className="block mb-2 text-black">KEY FEATURES:</strong>
                        <p className="mb-4">
                            <strong>Paper Publications:</strong> All accepted, registered and presented papers will be published in Scopus Indexed
                            Springer CCIS Series Conference Proceedings for COMS2-2026.
                        </p>
                        <p>
                            Previous conference proceeding of COMS2-2024 (paper acceptance rate: 11%),
                            COMS2-2023 (paper acceptance rate: 10%),
                            COMS2-2022 (paper acceptance rate: 15%),
                            COMS2-2021 (paper acceptance rate: 18%),
                            COMS2-2020 (paper acceptance rate: 27%),
                            published in Scopus Indexed Springer CCIS can be accessed at{' '}
                            <a href="https://link.springer.com/conference/coms2" className="text-blue-600 hover:underline break-all">
                                https://link.springer.com/conference/coms2
                            </a>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PaperPublications;
