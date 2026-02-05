import React from 'react';
import { MapPin, Phone, Star, ArrowRight, Building, CheckCircle2 } from 'lucide-react';

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
        <div className="bg-gray-50 min-h-screen pt-28 pb-20">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Hero */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
                        Plan Your Stay
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Accommodation <span className="text-blue-600">Options</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                        Curated list of comfortable stay options near the venue and in nearby cities.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hotels.map((hotel, idx) => (
                        <div key={hotel.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all group animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-blue-50 p-2 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Building size={20} />
                                </div>
                                <div className="flex bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={12}
                                            className={`${i < hotel.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} ml-0.5 first:ml-0`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors">
                                {hotel.name}
                            </h3>

                            <div className="flex items-start gap-2.5 text-gray-600 text-sm mb-6 min-h-[3rem]">
                                <MapPin size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-2">{hotel.address}</span>
                            </div>

                            <div className="border-t border-gray-100 pt-4 mt-auto">
                                {(hotel.contact || hotel.email) ? (
                                    <div className="space-y-2">
                                        {hotel.contact && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                                                <Phone size={14} className="text-gray-400" />
                                                {hotel.contact}
                                            </div>
                                        )}
                                        {hotel.email && (
                                            <a href={`mailto:${hotel.email}`} className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline px-3 pt-1">
                                                <ArrowRight size={14} /> Email Hotel
                                            </a>
                                        )}
                                    </div>
                                ) : (
                                    <span className="text-xs text-gray-400 italic block py-2">Contact details check online</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-blue-50/50 rounded-2xl p-6 text-center border border-blue-100">
                    <p className="text-sm text-blue-800 flex items-center justify-center gap-2">
                        <CheckCircle2 size={16} />
                        Note: Attendees are requested to book directly with the hotels. Organizers are not responsible for reservations.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Accommodation;
