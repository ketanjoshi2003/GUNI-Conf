import React from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

const ImportantDates = () => {
    const events = [
        { label: "Full Paper Submission", date: "May 30, 2026", status: "upcoming" },
        { label: "Paper Acceptance Notification", date: "July 30, 2026", status: "upcoming" },
        { label: "Registration Opens", date: "July 30, 2026", status: "upcoming" },
        { label: "Camera-Ready Papers", date: "August 15, 2026", status: "upcoming" },
        { label: "Registration Closed", date: "August 15, 2026", status: "upcoming" },
        { label: "Conference Date", date: "September 10-11, 2026", status: "upcoming", highlight: true }
    ];

    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">

                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
                        Schedule
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Important <span className="text-blue-600">Dates</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Mark your calendars for the upcoming deadlines and events.
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-1/2"></div>

                    <div className="space-y-12">
                        {events.map((event, index) => (
                            <div key={index} className={`relative flex items-center md:justify-between group animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>

                                {/* Date Box (Left on Desktop for odd, Right for even) */}
                                <div className={`flex-1 md:text-right pl-20 md:pl-0 md:pr-12 ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                                    <div className={`inline-block px-4 py-2 rounded-xl font-bold text-sm mb-2 shadow-sm ${event.highlight ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 border border-gray-100'}`}>
                                        {event.date}
                                    </div>
                                    <h3 className={`text-xl font-bold text-gray-800 hidden md:block ${event.highlight ? 'text-blue-600' : ''}`}>
                                        {event.label}
                                    </h3>
                                </div>

                                {/* Center Dot */}
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-4 border-white shadow-md transform -translate-x-1/2 z-10 bg-blue-500 group-hover:scale-125 transition-transform"></div>

                                {/* Content Box (Right on Desktop for odd, Left for even) */}
                                <div className={`flex-1 pl-20 md:pl-12 ${index % 2 !== 0 ? 'md:text-right md:order-0 md:pr-12 md:pl-0' : ''}`}>
                                    {/* Mobile Only Title */}
                                    <h3 className={`text-lg font-bold text-gray-800 md:hidden mb-1 ${event.highlight ? 'text-blue-600' : ''}`}>
                                        {event.label}
                                    </h3>

                                    {index % 2 !== 0 && (
                                        <h3 className={`text-xl font-bold text-gray-800 hidden md:block ${event.highlight ? 'text-blue-600' : ''}`}>
                                            {event.label}
                                        </h3>
                                    )}

                                    <div className="text-sm text-gray-500 font-medium flex items-center gap-2 mt-1 md:mt-0 md:justify-start">
                                        {index % 2 !== 0 && <span className="hidden md:inline-flex items-center gap-2 flex-row-reverse"><Clock size={14} /> Upcoming</span>}
                                        {(index % 2 === 0 || window.innerWidth < 768) && <span className="inline-flex items-center gap-2"><Clock size={14} /> Upcoming</span>}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
                    <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-blue-900 mb-1">Note to Authors</h4>
                        <p className="text-blue-800/80 text-sm leading-relaxed">
                            Deadlines are strictly enforced. Please ensure your submissions and registrations are completed by the specified dates.
                            All times are in Indian Standard Time (IST).
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ImportantDates;
