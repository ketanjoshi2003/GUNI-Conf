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
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 border-l-4 border-blue-600 pl-4 mb-6 break-words">
            {title}
        </h3>
    );

    switch (section.type) {
        case 'welcome':
            return (
                <section className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base break-words w-full overflow-x-visible">
                    <SectionHeader title={section.title || `Welcome to ${conferenceInfo?.short_name || 'COMS2'} ${conferenceInfo?.year || ''}`} />
                    {conferenceInfo?.description ? (
                        <div
                            className="rich-text-content w-full overflow-x-visible [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
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
                <section className="py-6 md:py-10 bg-gray-50/50 rounded-xl md:rounded-3xl px-4 md:px-8 border border-gray-100 w-full overflow-x-visible">
                    <div className="text-center mb-6 md:mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-sky-500 break-words">
                            {section.title || 'About the University'}
                        </h2>
                        <div className="w-16 h-1 bg-sky-200 mx-auto mt-3 rounded-full"></div>
                    </div>
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
                        <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base text-left px-2 lg:px-0 min-w-0 break-words w-full">
                            {conferenceInfo?.university_about ? (
                                <div className="rich-text-content w-full overflow-x-visible" dangerouslySetInnerHTML={{ __html: conferenceInfo.university_about }} />
                            ) : (
                                <p>
                                    Ganpat University is a well reputed State Private University established in 2005 through
                                    the State Legislative Act No.19/2005 on 12th April 2005, Government of Gujarat, and
                                    recognized by the UGC under the section 2(f) of the UGC Act, 1956 having campus
                                    spread over more than 300 acres of land with world-class infrastructure and more than
                                    10,000 students on campus.
                                </p>
                            )}
                        </div>
                        <div className="relative w-full rounded-xl overflow-hidden shadow-lg aspect-video border-2 md:border-4 border-white mx-auto max-w-2xl lg:max-w-none">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={conferenceInfo?.university_video || "https://www.youtube.com/embed/OsoXEo1wpYI"}
                                title="About University Video"
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
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
                        <SectionHeader title={section.title || 'Topics of Interest'} />
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <span className="text-sm text-gray-600 shrink-0">Search:</span>
                            <input
                                type="text"
                                className="flex-grow sm:flex-none border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-w-0"
                                placeholder="Filter..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="grid md:grid-cols-2">
                            {filteredTopics.map((topic, idx) => (
                                <div key={topic._id || idx} className={`p-3 sm:p-4 flex items-start gap-2 sm:gap-3 border-b border-gray-100 ${idx % 2 === 0 ? 'md:border-r' : ''}`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-2"></span>
                                    <span className="text-gray-700 font-medium leading-relaxed text-sm lg:text-base break-words">{topic.title}</span>
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
                            <div key={item._id || item.year} className="bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group relative overflow-hidden">
                                <div className="flex gap-3 md:gap-5">
                                    <div className="w-20 h-28 md:w-28 md:h-36 flex-shrink-0 rounded-lg overflow-hidden shadow-md border border-gray-200 relative group-hover:scale-105 transition-transform duration-500">
                                        <img
                                            src={formatImageUrl(item.coverImage) || coverImages[item.year]}
                                            alt={`COMS2 ${item.year}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between py-1 min-w-0">
                                        <div className="min-w-0">
                                            <span className="inline-block text-[9px] font-bold px-2 py-0.5 bg-green-50 text-green-700 rounded-full border border-green-100 uppercase tracking-tight mb-2">Scopus Indexed</span>
                                            <h4 className="text-xs md:text-base font-bold text-gray-900 leading-tight line-clamp-3 group-hover:text-blue-600 transition-colors break-words">
                                                {item.title}
                                            </h4>
                                        </div>
                                        <a href={item.link || '#'} target="_blank" className="inline-flex items-center text-blue-600 text-[10px] md:text-xs font-bold uppercase tracking-wider group/link mt-2">
                                            View Proceedings <ArrowRight size={10} className="ml-1" />
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
                            <div key={item._id} className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-50 last:border-0 hover:bg-gray-50 gap-2 min-w-0`}>
                                <span className="font-medium text-gray-700 text-sm md:text-base break-words flex-grow">{item.event}</span>
                                <div className="flex items-center gap-3 self-end sm:self-auto">
                                    <span className="text-xs md:text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                                        {new Date(item.date).toLocaleDateString()}
                                    </span>
                                    {item.isPinned && <Pin size={14} className="text-red-500 fill-current" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            );

        case 'registration-fees':
            return (
                <section>
                    <SectionHeader title={section.title || 'Registration Details'} />
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-x-auto">
                        <table className="w-full text-sm text-left min-w-[600px] md:min-w-0">
                            <thead className="bg-[#1a73e8] text-white">
                                <tr>
                                    <th className="px-4 md:px-6 py-4 font-bold text-xs md:text-sm tracking-wide">Type of Registration</th>
                                    <th className="px-4 md:px-6 py-4 font-bold text-xs md:text-sm tracking-wide">Indian participants (INR)</th>
                                    <th className="px-4 md:px-6 py-4 font-bold text-xs md:text-sm tracking-wide">Foreign participants (USD)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {registrationFees.map((fee, index) => (
                                    <tr key={fee._id} className={`transition-colors hover:bg-blue-50/50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                        <td className="px-4 md:px-6 py-4 text-gray-800 font-medium whitespace-normal md:whitespace-nowrap">{fee.type}</td>
                                        <td className="px-4 md:px-6 py-4 text-gray-600">{fee.indian}</td>
                                        <td className="px-4 md:px-6 py-4 text-gray-600">{fee.foreign}</td>
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
                            <div key={item._id} className="p-4 bg-white border-l-4 border-yellow-400 shadow-sm rounded-r-lg min-w-0">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="min-w-0 flex-grow">
                                        <p className="font-bold text-gray-900 break-words">{item.title}</p>
                                        <p className="text-xs text-gray-500 mt-1">{new Date(item.date).toLocaleDateString()}</p>
                                    </div>
                                    <a href={item.link} target="_blank" className="text-blue-600 hover:text-blue-800 shrink-0 mt-1"><ExternalLink size={16} /></a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            );

        // Add basics for other types if needed, using generic placeholders or lists
        case 'committees':
            // Group committees by type
            const groupedCommittees = committees.reduce((acc, member) => {
                const type = member.type || 'Other';
                if (!acc[type]) {
                    acc[type] = {
                        members: [],
                        sectionOrder: member.sectionOrder || 99
                    };
                }
                acc[type].members.push(member);
                return acc;
            }, {});

            // Sort sections
            const sortedSections = Object.entries(groupedCommittees)
                .sort((a, b) => (a[1].sectionOrder || 0) - (b[1].sectionOrder || 0));

            return (
                <section>
                    <SectionHeader title={section.title || 'Committees'} />
                    <div className="space-y-8">
                        {sortedSections.map(([type, group]) => (
                            <div key={type} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden text-center">
                                <div className="bg-blue-50/50 px-4 py-3 border-b border-gray-100">
                                    <h4 className="font-bold text-blue-900">{type}</h4>
                                </div>
                                <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {group.members
                                        .sort((a, b) => (a.order || 0) - (b.order || 0))
                                        .map((member, idx) => (
                                            <div key={member._id || idx} className="flex flex-col items-center">
                                                <div className="font-bold text-gray-900">{member.name}</div>
                                                <div className="text-sm text-gray-500">{member.designation}</div>
                                                {member.organization && (
                                                    <div className="text-xs text-blue-600 font-medium mt-1">{member.organization}</div>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <a href="/committees" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-blue-600 font-bold text-sm hover:bg-blue-50 transition-all shadow-sm hover:shadow">
                            View All Committees <ArrowRight size={16} />
                        </a>
                    </div>
                </section>
            );

        case 'archives':
            return (
                <section>
                    <SectionHeader title={section.title || 'Archives'} />
                    <div className="grid md:grid-cols-3 gap-6">
                        {archives.map((item) => (
                            <div key={item._id} className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all border border-gray-100">
                                <div className="aspect-video bg-gray-100 overflow-hidden">
                                    {item.image ? (
                                        <img src={formatImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <FileText size={48} opacity={0.2} />
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <div className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-wider">{item.type} • {item.year}</div>
                                    <h4 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                                    {item.link && (
                                        <a href={item.link} target="_blank" className="mt-4 block text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-blue-600">
                                            View Details &rarr;
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            );

        case 'accepted-papers':
            return (
                <section>
                    <SectionHeader title={section.title || 'Accepted Papers'} />
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3">Paper ID</th>
                                        <th className="px-6 py-3">Title</th>
                                        <th className="px-6 py-3">Authors</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {acceptedPapers.slice(0, 10).map((paper) => (
                                        <tr key={paper._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-bold text-blue-600">#{paper.paperId}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{paper.title}</td>
                                            <td className="px-6 py-4 text-gray-600">{paper.authors}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {acceptedPapers.length > 10 && (
                            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-center">
                                <a href="/accepted-papers" className="text-blue-600 text-xs font-bold uppercase tracking-widest hover:underline">View All Papers</a>
                            </div>
                        )}
                    </div>
                </section>
            );

        case 'best-papers':
            return (
                <section>
                    <SectionHeader title={section.title || 'Best Paper Awards'} />
                    <div className="grid md:grid-cols-2 gap-6">
                        {bestPapers.map((paper) => (
                            <div key={paper._id} className="relative bg-gradient-to-br from-white to-yellow-50/50 p-6 rounded-xl border border-yellow-100 shadow-sm hover:shadow-md transition-all">
                                <div className="absolute top-0 right-0 p-3 text-yellow-500">
                                    <Award size={24} />
                                </div>
                                <div className="text-xs font-bold text-yellow-600 uppercase tracking-wider mb-2">{paper.awardName}</div>
                                <h4 className="font-bold text-gray-900 mb-2 leading-tight">{paper.title}</h4>
                                <p className="text-sm text-gray-600 mb-1">{paper.authors}</p>
                                {paper.institution && <p className="text-xs text-gray-400 italic">{paper.institution}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            );

        case 'publication-stats':
            return (
                <section>
                    <SectionHeader title={section.title || 'Publication Stats'} />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {pubStats.map((stat) => (
                            <div key={stat._id} className="bg-white p-3 sm:p-6 rounded-xl border border-gray-100 shadow-sm text-center group hover:border-blue-200 transition-all flex flex-col justify-center min-w-0">
                                <div className="text-2xl sm:text-3xl font-black text-blue-600 mb-1 group-hover:scale-110 transition-transform">{stat.acceptedCount}</div>
                                <div className="text-[9px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest break-words">Accepted Papers</div>
                                <div className="mt-2 text-[8px] sm:text-[10px] text-gray-400 font-medium">{stat.year} • {stat.totalSubmissions} Subs</div>
                            </div>
                        ))}
                    </div>
                </section>
            );

        default:
            return null;
    }
};

export default HomeSectionRenderer;
