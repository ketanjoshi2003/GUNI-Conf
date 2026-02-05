import React from 'react';
import { MapPin, Phone, Star, ArrowRight, Building } from 'lucide-react';

const Accommodation = () => {
    const hotels = [
        {
            id: 1,
            name: "The Highness Hotel",
            address: "Opp. Jalaram Temple, Near Palavasana Ahmedabad, Highway, Mehsana, Gujarat 384003",
            rating: 4
        },
        {
            id: 2,
            name: "Shivalik Hotel Mehsana",
            address: "Opp. Essar Petrol Pump, Nagalpur Highway, Mehsana bypass, Mehsana, Gujarat 384002",
            rating: 4
        },
        {
            id: 3,
            name: "Shankus Water Park and Resort",
            address: "Ahmedabad-Mehsana Highway, Mehsana, Gujarat 384435",
            rating: 5
        },
        {
            id: 4,
            name: "Hotel Sahara Bridge",
            address: "Gujarat State Highway 41, Mouje, Nagalpur, Mehsana, Gujarat 384002",
            rating: 3
        },
        {
            id: 5,
            name: "Hotel The Comfort Inn",
            address: "Opp. Baps Swaminarayan Mandir, Radhanpur Cir, Mehsana, Gujarat 384002",
            contact: "096860 37660",
            rating: 4
        },
        {
            id: 6,
            name: "Hotel Janpath, Mehsana",
            address: "Radhanpur Cross Road, Highway, Mehsana, Gujarat, India - 384002",
            contact: "+91 - 9925051336",
            email: "janpath76@yahoo.com",
            rating: 3
        },
        {
            id: 7,
            name: "Prominent Corporate Residency",
            address: "B/h Ugati Heights, Kudasan-Por Road, Kudasan, Gandhinagar, Gujarat 382421",
            contact: "078434 72345",
            rating: 4
        },
        {
            id: 8,
            name: "The Grand Midway, Gandhinagar",
            address: "10 Floor, Suman City, Above Cinemax theater, Sector 11, Gandhinagar, Gujarat",
            contact: "+91 96018 32777",
            email: "thegrandmidway@gmail.com",
            rating: 4
        },
        {
            id: 9,
            name: "Radisson Blu Hotel, Ahmedabad",
            address: "Near Panchvati Cross Roads, Off C.G. Road, Ambawadi, Ahmedabad 380006 India",
            rating: 5
        },
        {
            id: 10,
            name: "Hyatt Regency, Ahmedabad",
            address: "17/A, Ashram Road, Ahmedabad, Gujarat, India, 380014",
            rating: 5
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen pt-28 pb-12">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
                        Accommodation
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We have curated a list of comfortable stay options near the venue and in nearby cities for your convenience.
                    </p>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-6"></div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-900 text-white">
                                    <th className="p-4 border-b border-gray-700 font-semibold w-16 text-center">Sr.No</th>
                                    <th className="p-4 border-b border-gray-700 font-semibold w-1/4">Hotel</th>
                                    <th className="p-4 border-b border-gray-700 font-semibold">Address & Contact</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {hotels.map((hotel) => (
                                    <tr key={hotel.id} className="hover:bg-blue-50/50 transition-colors group">
                                        <td className="p-4 text-center font-medium text-gray-500 group-hover:text-blue-600">
                                            {hotel.id}
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2">
                                                <Building className="w-4 h-4 text-gray-400" />
                                                {hotel.name}
                                            </div>
                                            <div className="flex text-yellow-400 text-xs">
                                                {[...Array(hotel.rating)].map((_, i) => (
                                                    <Star key={i} className="w-3 h-3 fill-current" />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-start gap-2 text-gray-600 mb-2">
                                                <MapPin className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                                                <span className="text-sm leading-relaxed">{hotel.address}</span>
                                            </div>
                                            {(hotel.contact || hotel.email) && (
                                                <div className="flex flex-wrap gap-4 mt-2 pl-6 text-sm">
                                                    {hotel.contact && (
                                                        <span className="flex items-center gap-1.5 text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                                            <Phone className="w-3 h-3" />
                                                            {hotel.contact}
                                                        </span>
                                                    )}
                                                    {hotel.email && (
                                                        <span className="text-blue-600 hover:underline cursor-pointer">
                                                            {hotel.email}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 italic">
                        * Please note that the organizers are not responsible for bookings. Attendees are requested to book directly with the hotels.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Accommodation;
