const mongoose = require('mongoose');
const Conference = require('./models/Conference');
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

const seedDB = async () => {
    try {
        await Conference.deleteMany({});
        await Conference.create(seedData);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
