import React from 'react';

const ImportantDates = () => {
    const events = [
        { label: "Full Paper Submission", date: "May 30, 2026" },
        { label: "Paper Acceptance / Reject Notification", date: "July 30, 2026" },
        { label: "Registration Opens", date: "July 30, 2026" },
        { label: "Camera-Ready Papers and Copyright Form", date: "August 15, 2026" },
        { label: "Registration Closed", date: "August 15, 2026" },
        { label: "Conference Date", date: "September 10-11, 2026" }
    ];

    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">

                <h1 className="text-2xl font-bold text-gray-800 mb-6 underline decoration-gray-400 decoration-2 underline-offset-4">
                    Important Dates:
                </h1>

                <div className="bg-white p-6">
                    <ul className="space-y-4 text-gray-700">
                        {events.map((event, index) => (
                            <li key={index} className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                                <span className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 bg-gray-500 rounded-full flex-shrink-0"></span>
                                    <span className="font-normal">{event.label} :</span>
                                </span>
                                <span className="font-normal text-gray-600">{event.date}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default ImportantDates;
