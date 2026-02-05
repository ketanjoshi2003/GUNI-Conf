import React from 'react';

const PaperSubmission = () => {
    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-[#5bc0de] text-center mb-12 uppercase tracking-wide">
                    Paper Submission, Instructions and Formatting:
                </h1>

                {/* Intro */}
                <p className="text-gray-700 mb-8 text-center text-lg">
                    Authors are invited to submit their original research paper including results, tables, figures and references using following Springer OCS Submission Link:
                    <br />
                    <a href="https://equinocs.springernature.com/service/COMS2" className="text-[#5bc0de] hover:underline break-all">
                        https://equinocs.springernature.com/service/COMS2
                    </a>
                </p>

                {/* Formatting Section */}
                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-bold text-[#5bc0de] mb-8 opacity-60">
                        Formatting of Paper:
                    </h2>

                    <p className="text-gray-700 leading-relaxed text-justify max-w-4xl mx-auto">
                        <strong>Formatting of Paper:</strong> Authors are advised to prepare their papers according to the Springer formatting guidelines
                        (Minimum 12 pages and to maximum 15 pages, around 400 words on each page should be written
                        in English and in Word document /LaTeX. Springer COMS2 follows the DOUBLE-BLIND peer review
                        system, hence authors are informed not to disclose their identity like their names, affiliations,
                        acknowledgments, etc. in the initial submission of the paper.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default PaperSubmission;
