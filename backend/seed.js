const mongoose = require('mongoose');

const Conference = require('./models/Conference');
const RegistrationFee = require('./models/RegistrationFee');
const Archive = require('./models/Archive');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/guni_conf')
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const seedData = {
    conference_id: 'coms2-2026',
    name: 'COMS2 – International Conference on Computing Communication Security',
    theme: 'Computing Communication Security',
    venue: 'Ganpat University',
    state: 'Gujarat',
    country: 'India',
    start_date: new Date('2026-10-09'),
    end_date: new Date('2026-10-10'),
    website: 'https://coms2.gnu.ac.in/',
    author_page: 'https://coms2.gnu.ac.in/for-authors/'
};

const registrationFees = [
    { type: "Author Registration: Academicians/ Researcher/ Students", indian: "10,000/- + Taxes", foreign: "400 USD", order: 1 },
    { type: "Author Registration: Industry Professional", indian: "12,000/- + Taxes", foreign: "500 USD", order: 2 },
    { type: "Attendee/Participating Registration: Academicians", indian: "1,500/- + Taxes", foreign: "100 USD", order: 3 },
    { type: "Attendee/Participating Registration: Industry Professional", indian: "2,000/- + Taxes", foreign: "150 USD", order: 4 },
    { type: "Attendee/Participating Registration: Student (Ph.D, PG, UG)", indian: "1,000/- + Taxes", foreign: "50 USD", order: 5 },
    { type: "Accompanying Guest/Spouse", indian: "1,000/- + Taxes", foreign: "100 USD", order: 6 }
];

const archives = [
    { title: "Media Coverage: First COMS2 2020", year: "2020", type: "media-coverage", order: 1 },
    { title: "Media Coverage: Second COMS2 2021", year: "2021", type: "media-coverage", order: 2 },
    { title: "Media Coverage: Third COMS2 2022", year: "2022", type: "media-coverage", order: 3 },
    { title: "Media Coverage: Fourth COMS2 2023", year: "2023", type: "media-coverage", order: 4 },
    { title: "Media Coverage: Fifth COMS2 2024", year: "2024", type: "media-coverage", order: 5 },
    { title: "Media Coverage: Sixth COMS2 2025", year: "2025", type: "media-coverage", order: 6 },
    { title: "Glimpse of COMS2 2025 Opening Ceremony", year: "2025", type: "glimpses", image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070", order: 1 },
    { title: "Keynote Session COMS2 2024", year: "2024", type: "glimpses", image: "https://images.unsplash.com/photo-1475721027187-4024733924f7?q=80&w=2070", order: 2 }
];

const seedDB = async () => {
    try {
        await Conference.deleteMany({});
        await Conference.create(seedData);
        await RegistrationFee.deleteMany({});
        await RegistrationFee.insertMany(registrationFees);
        await Archive.deleteMany({});
        await Archive.insertMany(archives);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
