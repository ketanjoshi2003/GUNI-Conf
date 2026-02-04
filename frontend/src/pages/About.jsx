import React from 'react';

const About = () => {
    return (
        <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">About COMS2</h1>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 prose max-w-none">
                    <p className="text-lg text-gray-600 mb-6">
                        The International Conference on Computing, Communication and Security (COMS2) is a premier forum for the presentation of new advances and research results in the fields of Computing, Communication and Security. The conference will bring together leading researchers, engineers and scientists in the domain of interest from around the world.
                    </p>
                    <p className="text-lg text-gray-600">
                        The theme of the conference, "Computing Communication Security," reflects the growing importance of these interconnected fields in our modern world. From wireless networks to quantum computing, we are gathering experts to discuss the future of technology.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
