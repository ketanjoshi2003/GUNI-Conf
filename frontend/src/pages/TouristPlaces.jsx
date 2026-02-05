import React from 'react';
import { MapPin } from 'lucide-react';

const TouristPlaces = () => {
    const places = [
        {
            name: "Sun Temple",
            location: "Modhera",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sun_Temple_Modhera_Gujarat.jpg/1200px-Sun_Temple_Modhera_Gujarat.jpg"
        },
        {
            name: "Akshardham Temple",
            location: "Gandhinagar",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Akshardham_Gandhinagar_Gujarat.jpg/1200px-Akshardham_Gandhinagar_Gujarat.jpg"
        },
        {
            name: "Rani ki Vav",
            location: "Patan",
            image: "https://upload.wikimedia.org/wikipedia/commons/4/41/Rani_ki_vav_04.jpg"
        },
        {
            name: "Kirtitoran",
            location: "Vadnagar",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Kirti_Toran_Vadnagar.jpg/800px-Kirti_Toran_Vadnagar.jpg"
        },
        {
            name: "Rudramahal",
            location: "Siddhpur",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Rudra_Mahalaya_Temple_Siddhpur_Gujarat.jpg/1200px-Rudra_Mahalaya_Temple_Siddhpur_Gujarat.jpg"
        },
        {
            name: "Hatheesing Jain Temple",
            location: "Ahmedabad",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Hutheesing_Jain_Temple_Ahmedabad.jpg/1200px-Hutheesing_Jain_Temple_Ahmedabad.jpg"
        },
        {
            name: "Adalaj Stepwell",
            location: "Adalaj",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Adalaj_Stepwell.jpg/1200px-Adalaj_Stepwell.jpg"
        },
        {
            name: "Ambaji Temple",
            location: "Ambaji",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Ambaji_Temple_Gujarat.jpg/800px-Ambaji_Temple_Gujarat.jpg"
        },
        {
            name: "Statue of Unity",
            location: "Kevadia",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Statue_of_Unity.jpg/1200px-Statue_of_Unity.jpg"
        },
        {
            name: "Thol Lake Bird Sanctuary",
            location: "Thol, Mehsana",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/THOL_LAKE_BIRD_SANCTUARY.jpg?width=1200"
        },
        {
            name: "Taranga Jain Temple",
            location: "Taranga Hill, Mehsana",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Taranga_Temple_2017.jpg?width=1200"
        },
        {
            name: "Dharoi Dam",
            location: "Dharoi, Mehsana",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Dharoi_dam_04.jpg?width=1200"
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen pt-28 pb-12">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
                        Discover Gujarat
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Tourist <span className="text-blue-600">Attractions</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                        Explore the rich heritage and scenic beauty of Gujarat near the venue.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {places.map((place, idx) => (
                        <div key={idx} className="group bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={place.image}
                                    alt={place.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90"></div>
                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{place.name}</h3>
                                    <div className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                                        <MapPin className="w-4 h-4 text-red-500" />
                                        {place.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TouristPlaces;
