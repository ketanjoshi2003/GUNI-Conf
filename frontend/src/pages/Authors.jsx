import React from 'react';

const Authors = () => {
    return (
        <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">For Authors</h1>

                <div className="grid gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Submission Guidelines</h2>
                        <p className="text-gray-600 mb-6">
                            All papers must be original and not simultaneously submitted to another journal or conference.
                            The reviews will be double-blind. Please ensure that author names and affiliations are removed from the submitted PDF.
                        </p>
                        <a
                            href="https://coms2.gnu.ac.in/for-authors/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            View Full Guidelines
                        </a>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Proceedings</h2>
                        <p className="text-gray-600 mb-6">
                            Accepted papers will be published in the Springer Book Series.
                        </p>
                        <a
                            href="https://link.springer.com/book/10.1007/978-3-031-75170-7"
                            target="_blank"
                            rel="noreferrer"
                            className="text-accent underline font-medium"
                        >
                            View Previous Proceedings (Springer)
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authors;
