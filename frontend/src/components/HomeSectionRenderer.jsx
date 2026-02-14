import React, { useState } from 'react';
import { Calendar, MapPin, ArrowRight, Pin, User, FileText, Award, BarChart, ExternalLink } from 'lucide-react';

const HomeSectionRenderer = ({ section, data }) => {
    const {
        conferenceInfo,
        topics,
        previousEditions,
        speakers,
        committees,
        importantDates,
        registrationFees,
        archives,
        acceptedPapers,
        bestPapers,
        pubStats,
        news,
        coverImages,
        formatImageUrl
    } = data;

    const [searchQuery, setSearchQuery] = useState('');

    const SectionHeader = ({ title }) => (
        <h3 className="text-2xl font-bold text-gray-900 border-l-4 border-blue-600 pl-4 mb-6">
            {title}
        </h3>
    );

    switch (section.type) {
        case 'welcome':
            return (
                <section className="space-y-6 text-gray-700 leading-relaxed text-justify text-base">
                    <SectionHeader title={section.title || `Welcome to ${conferenceInfo?.short_name || 'COMS2'} ${conferenceInfo?.year || ''}`} />
                    {conferenceInfo?.description ? (
                        <div
                            className="text-justify [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                            dangerouslySetInnerHTML={{ __html: conferenceInfo.description }}
                        />
                    ) : (
                        <p>Welcome to our conference.</p>
                    )}
                    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                        <p className="text-blue-900 font-medium">
                            Accepted papers will be published in <strong>Springer Proceedings</strong> and indexed in SCOPUS.
                        </p>
                    </div>
                </section>
            );

        case 'about-university':
            return (
                <section className="py-12 bg-gray-50/50 rounded-3xl px-4 md:px-8 border border-gray-100">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-sky-500">
                            {section.title || 'About the University'}
                        </h2>
                        <div className="w-20 h-1 bg-sky-200 mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base text-justify px-4 lg:px-0">
                            <p>
                                Ganpat University is a well reputed State Private University established in 2005 through
                                the State Legislative Act No.19/2005 on 12th April 2005, Government of Gujarat, and
                                recognized by the UGC under the section 2(f) of the UGC Act, 1956 having campus
                                spread over more than 300 acres of land with world-class infrastructure and more than
                                10,000 students on campus.
                            </p>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video border-2 md:border-4 border-white">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/OsoXEo1wpYI"
                                title="Aerial Walkthrough of Ganpat University"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </section>
            );

        case 'topics':
            const filteredTopics = topics.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
            return (
                <section>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                        <SectionHeader title={section.title || 'Topics of Interest'} />
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <span className="text-sm text-gray-600">Search:</span>
                            <input
                                type="text"
                                className="flex-grow md:flex-none border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="Filter..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="grid md:grid-cols-2">
                            {filteredTopics.map((topic, idx) => (
                                <div key={topic._id || idx} className={`p-4 flex items-start gap-3 border-b border-gray-100 ${idx % 2 === 0 ? 'md:border-r' : ''}`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-2"></span>
                                    <span className="text-gray-700 font-medium leading-relaxed">{topic.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            );

        case 'previous-editions':
            return (
                <section>
                    <SectionHeader title={section.title || 'Previous Editions (Springer CCIS Series)'} />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {previousEditions.map((item) => (
                            <div key={item._id || item.year} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group relative overflow-hidden">
                                <div className="flex gap-5">
                                    <div className="w-24 h-32 md:w-28 md:h-36 flex-shrink-0 rounded-lg overflow-hidden shadow-md border border-gray-200 relative group-hover:scale-105 transition-transform duration-500">
                                        <img
                                            src={formatImageUrl(item.coverImage) || coverImages[item.year]}
                                            alt={`COMS2 ${item.year}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between py-1">
                                        <div>
                                            <span className="inline-block text-[10px] font-bold px-2 py-0.5 bg-green-50 text-green-700 rounded-full border border-green-100 uppercase tracking-tight mb-2">Scopus Indexed</span>
                                            <h4 className="text-sm md:text-base font-bold text-gray-900 leading-tight line-clamp-3 group-hover:text-blue-600 transition-colors">
                                                {item.title}
                                            </h4>
                                        </div>
                                        <a href={item.link || '#'} target="_blank" className="inline-flex items-center text-blue-600 text-xs font-bold uppercase tracking-wider group/link mt-2">
                                            View Proceedings <ArrowRight size={12} className="ml-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            );

        case 'speakers':
            return (
                <section>
                    <SectionHeader title={section.title || 'Speakers'} />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {speakers.slice(0, 6).map((speaker) => (
                            <div key={speaker._id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-blue-50">
                                    <img src={formatImageUrl(speaker.image)} alt={speaker.name} className="w-full h-full object-cover" />
                                </div>
                                <h4 className="font-bold text-gray-900">{speaker.name}</h4>
                                <p className="text-sm text-gray-500 mb-2">{speaker.designation}</p>
                                <p className="text-xs text-blue-600 font-medium">{speaker.organization}</p>
                            </div>
                        ))}
                    </div>
                </section>
            );

        case 'important-dates':
            return (
                <section>
                    <SectionHeader title={section.title || 'Important Dates'} />
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {importantDates.map((item, idx) => (
                            <div key={item._id} className={`p-4 flex items-center justify-between border-b border-gray-50 last:border-0 hover:bg-gray-50`}>
                                <span className="font-medium text-gray-700">{item.event}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                                        {new Date(item.date).toLocaleDateString()}
                                    </span>
                                    {item.isPinned && <Pin size={16} className="text-red-500 fill-current" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            );

        case 'registration-fees':
            return (
                <section>
                    <SectionHeader title={section.title || 'Registration Fees'} />
                    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3">Category</th>
                                    <th className="px-6 py-3">Indian (INR)</th>
                                    <th className="px-6 py-3">Foreign (USD)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {registrationFees.map((fee) => (
                                    <tr key={fee._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{fee.type}</td>
                                        <td className="px-6 py-4 text-gray-600">{fee.indian}</td>
                                        <td className="px-6 py-4 text-gray-600">{fee.foreign}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            );

        case 'news':
            return (
                <section>
                    <SectionHeader title={section.title || 'Latest News'} />
                    <div className="space-y-4">
                        {news.map((item) => (
                            <div key={item._id} className="p-4 bg-white border-l-4 border-yellow-400 shadow-sm rounded-r-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-gray-900">{item.title}</p>
                                        <p className="text-xs text-gray-500 mt-1">{new Date(item.date).toLocaleDateString()}</p>
                                    </div>
                                    <a href={item.link} target="_blank" className="text-blue-600 hover:text-blue-800"><ExternalLink size={16} /></a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            );

        // Add basics for other types if needed, using generic placeholders or lists
        case 'committees':
        case 'archives':
        case 'accepted-papers':
        case 'best-papers':
        case 'publication-stats':
            return (
                <section>
                    <SectionHeader title={section.title || section.type.replace(/-/g, ' ').toUpperCase()} />
                    <div className="p-8 bg-gray-50 rounded-xl text-center text-gray-500 italic border border-dashed border-gray-300">
                        Content for {section.type} will be displayed here.
                    </div>
                </section>
            );

        default:
            return null;
    }
};

export default HomeSectionRenderer;
