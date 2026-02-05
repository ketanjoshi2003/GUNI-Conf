import React from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate();

    const registrationFees = [
        {
            type: "Author Registration: Academicians/ Researcher/ Students",
            indian: "10,000/- + Taxes",
            foreign: "400 USD"
        },
        {
            type: "Author Registration: Industry Professional",
            indian: "12,000/- + Taxes",
            foreign: "500 USD"
        },
        {
            type: "Attendee/Participating Registration: Academicians",
            indian: "1,500/- + Taxes",
            foreign: "100 USD"
        },
        {
            type: "Attendee/Participating Registration: Industry Professional",
            indian: "2,000/- + Taxes",
            foreign: "150 USD"
        },
        {
            type: "Attendee/Participating Registration: Student (Ph.D, PG, UG)",
            indian: "1,000/- + Taxes",
            foreign: "50 USD"
        },
        {
            type: "Accompanying Guest/Spouse",
            indian: "1,000/- + Taxes",
            foreign: "100 USD"
        }
    ];

    const importantNotes = [
        "Registration Requirement: Every paper requires a separate full registration. At least one author per accepted paper must register, pay the full registration fee online by the conference deadline, and present the paper at the conference.",
        "Co-Author Registration: If a co-author wants to attend the conference or requires a certificate, they need to register as participants/attendees with a fee of ₹1,000.",
        "Payment Tracking: Please keep a copy of the transaction ID the payment gateway and your bank generated to track your payment/registration.",
        "Payment Proof Submission: Submit a soft copy of the registration fee payment proof via email attachment to coms2@ganpatuniversity.ac.in",
        "GST and Payment Gateway Charges: The registration fees mentioned above exclude GST. An additional 18% GST and applicable payment gateway charges, if any, will be added at the payment page and must be borne by the registrant.",
        "Cancellation and Refund Policy: If authors/participants cancel their registration or do not attend the conference, the registration fees will not be refunded under any circumstances.",
        "Correspondence: All correspondence regarding your registration for COMS2-2026 should include your Paper ID and registration confirmation number.",
        "Inclusions: The registration fee includes a conference kit (proceeding CD, conference bag, pen, and notepad), conference certificate, high tea/coffees and lunch at the conference venue.",
        "TA/DA: No travel allowance (TA) or daily allowance (DA) will be paid to any delegate for the conference."
    ];

    return (
        <div className="pt-32 pb-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8 border-l-4 border-blue-600 pl-4">Registration Details</h1>

                    {/* Registration Fee Table */}
                    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 mb-6 font-sans">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="px-6 py-4 font-semibold border-r border-blue-500">Type of Registration</th>
                                    <th className="px-6 py-4 font-semibold border-r border-blue-500">Indian participants (INR)</th>
                                    <th className="px-6 py-4 font-semibold">Foreign participants (USD)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {registrationFees.map((fee, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4 text-gray-700 border-r border-gray-100">{fee.type}</td>
                                        <td className="px-6 py-4 text-gray-700 border-r border-gray-100 font-medium">{fee.indian}</td>
                                        <td className="px-6 py-4 text-gray-700 font-medium">{fee.foreign}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p className="text-gray-600 italic mb-12 text-sm">
                        *Accompanying guest/ spouse does not include co-author(s). Co-authors are supposed to register under 'Attendee' category.
                    </p>

                    {/* Important Notes Section */}
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <span className="w-2 h-8 bg-blue-600 mr-3 rounded-full"></span>
                            Important Notes:
                        </h2>
                        <ul className="space-y-4">
                            {importantNotes.map((note, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                                    <span className="text-gray-700 leading-relaxed">{note}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Registration Button */}
                    <div className="text-center">
                        <button
                            onClick={() => window.open('https://forms.eduqfix.com/comsic/add', '_blank')}
                            className="px-10 py-4 bg-emerald-500 text-white font-bold rounded-full shadow-lg hover:bg-emerald-600 hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                            </svg>
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
