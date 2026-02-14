const express = require('express');
const router = express.Router();
const Speaker = require('../models/Speaker');
const Committee = require('../models/Committee');
const ImportantDate = require('../models/ImportantDate');
const Topic = require('../models/Topic');
const PreviousEdition = require('../models/PreviousEdition');
const RegistrationFee = require('../models/RegistrationFee');
const Archive = require('../models/Archive');
const { protect, admin } = require('../middleware/authMiddleware');
const News = require('../models/News');
const Conference = require('../models/Conference');
const HomeSection = require('../models/HomeSection');
const upload = require('../middleware/uploadMiddleware');

// Helper to emit refresh event
const emitRefresh = (req) => {
    const io = req.app.get('io');
    if (io) {
        console.log('Emitting contentUpdated event...');
        io.emit('contentUpdated');
    } else {
        console.log('Warning: Socket.io instance not found in app settings');
    }
};

// ============ PUBLIC GET ROUTES ============

router.get('/speakers', async (req, res) => {
    try {
        const { year } = req.query;
        const filter = year ? { year: parseInt(year) } : {};
        const speakers = await Speaker.find(filter).sort({ order: 1, name: 1 });
        res.json(speakers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/committees', async (req, res) => {
    try {
        const { type, year } = req.query;
        let filter = {};
        if (type) filter.type = type;
        if (year) filter.year = parseInt(year);

        const committees = await Committee.find(filter).sort({ order: 1, name: 1 });
        res.json(committees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/important-dates', async (req, res) => {
    try {
        const { year } = req.query;
        const filter = year ? { year: parseInt(year) } : {};
        const dates = await ImportantDate.find(filter).sort({ order: 1, date: 1 });
        res.json(dates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/topics', async (req, res) => {
    try {
        const { year } = req.query;
        const filter = year ? { year: parseInt(year) } : {};
        const topics = await Topic.find(filter).sort({ order: 1, title: 1 });
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/previous-editions', async (req, res) => {
    try {
        const editions = await PreviousEdition.find().sort({ year: -1 });
        res.json(editions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/registration-fees', async (req, res) => {
    try {
        const { year } = req.query;
        const filter = year ? { year: parseInt(year) } : {};
        const fees = await RegistrationFee.find(filter).sort({ order: 1 });
        res.json(fees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/archive', async (req, res) => {
    try {
        const { type, year } = req.query;
        let filter = {};
        if (type) filter.type = type;
        if (year) filter.year = parseInt(year) || year; // Archive year might be string in model? Model says String.
        const archives = await Archive.find(filter);
        res.json(archives);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/news', async (req, res) => {
    try {
        const { year } = req.query;
        const filter = year ? { year: parseInt(year) } : {};
        const news = await News.find(filter).sort({ createdAt: -1 });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/conference-info', async (req, res) => {
    try {
        let conf = await Conference.findOne({ conference_id: 'coms2-2026' });
        if (!conf) {
            conf = new Conference({
                conference_id: 'coms2-2026',
                name: 'International Conference on Computing, Communication and Security',
                short_name: 'COMS2',
                year: '2026',
                edition: '7th Edition',
                mode: 'Hybrid Mode',
                venue: 'Ganpat University',
                country: 'India',
                start_date: new Date('2026-09-10'),
                end_date: new Date('2026-09-11')
            });
            await conf.save();
        }
        res.json(conf);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Home Sections Routes
router.get('/home-sections', async (req, res) => {
    try {
        let sections = await HomeSection.find().sort({ order: 1 });

        if (sections.length === 0) {
            const defaults = [
                { type: 'topics', order: 1, isVisible: true },
                { type: 'previous-editions', order: 2, isVisible: true },
                { type: 'about-university', order: 3, isVisible: true }
            ];
            await HomeSection.insertMany(defaults);
            sections = await HomeSection.find().sort({ order: 1 });
        } else {
            // Check if crucial defaults are missing (e.g. user added one section and lost the defaults)
            const defaults = ['topics', 'previous-editions', 'about-university'];
            const existingTypes = sections.map(s => s.type);
            const toAdd = [];

            defaults.forEach((type, idx) => {
                if (!existingTypes.includes(type)) {
                    toAdd.push({ type, order: idx + 2, isVisible: true }); // Order relative to typical start
                }
            });

            if (toAdd.length > 0) {
                await HomeSection.insertMany(toAdd);
                sections = await HomeSection.find().sort({ order: 1 });
            }
        }

        res.json(sections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/home-sections', protect, admin, async (req, res) => {
    try {
        const section = new HomeSection(req.body);
        const newSection = await section.save();
        emitRefresh(req); // Refresh socket
        res.status(201).json(newSection);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/home-sections/:id', protect, admin, async (req, res) => {
    try {
        const section = await HomeSection.findByIdAndUpdate(req.params.id, req.body, { new: true });
        emitRefresh(req);
        res.json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/home-sections/:id', protect, admin, async (req, res) => {
    try {
        await HomeSection.findByIdAndDelete(req.params.id);
        emitRefresh(req);
        res.json({ message: 'Section removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ============ PROTECTED ROUTES (POST, PUT, DELETE) ============

router.use(protect);
router.use(admin);

// --- Image Upload ---
router.post('/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        // Return relative path to be stored in DB
        const imagePath = `/uploads/${req.file.filename}`;
        res.json({ url: imagePath });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Speakers
router.post('/speakers', async (req, res) => {
    try {
        console.log('Received request to add speaker:', req.body);
        const speaker = new Speaker(req.body);
        const saved = await speaker.save();
        console.log('Speaker saved successfully:', saved._id);
        emitRefresh(req);
        res.status(201).json(saved);
    } catch (error) {
        console.error('Error adding speaker:', error.message);
        res.status(400).json({ message: error.message });
    }
});
router.put('/speakers/:id', async (req, res) => {
    try {
        const updated = await Speaker.findByIdAndUpdate(req.params.id, req.body, { new: true });
        emitRefresh(req);
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/speakers/:id', async (req, res) => {
    try {
        await Speaker.findByIdAndDelete(req.params.id);
        emitRefresh(req);
        res.json({ message: 'Speaker deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Committees
router.post('/committees', async (req, res) => {
    try {
        const committee = new Committee(req.body);
        const saved = await committee.save();
        emitRefresh(req);
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put('/committees/:id', async (req, res) => {
    try {
        const updated = await Committee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        emitRefresh(req);
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/committees/section/:type', async (req, res) => {
    try {
        const { type } = req.params;
        console.log(`Backend: Deleting all members for section: ${type}`);
        const result = await Committee.deleteMany({ type });
        console.log(`Backend: Deleted ${result.deletedCount} members`);
        emitRefresh(req);
        res.json({ message: 'Committee section deleted', count: result.deletedCount });
    } catch (error) {
        console.error('Backend Error deleting section:', error);
        res.status(500).json({ message: error.message });
    }
});

router.delete('/committees/:id', async (req, res) => {
    try {
        await Committee.findByIdAndDelete(req.params.id);
        emitRefresh(req);
        res.json({ message: 'Committee member deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Important Dates
router.post('/important-dates', async (req, res) => {
    try {
        console.log('Creating Important Date:', req.body);
        // If we're pining this new date, unpin all existing ones first
        if (req.body.isPinned === true) {
            await ImportantDate.updateMany({}, { isPinned: false });
        }
        const date = new ImportantDate(req.body);
        const saved = await date.save();
        emitRefresh(req);
        res.status(201).json(saved);
    } catch (error) {
        console.error('Create Important Date Error:', error.message);
        res.status(400).json({ message: error.message });
    }
});
router.put('/important-dates/:id', async (req, res) => {
    try {
        console.log('Updating Important Date:', req.params.id, req.body);
        // If we're pining this date, unpin every OTHER date
        if (req.body.isPinned === true) {
            console.log('Unpining other dates...');
            await ImportantDate.updateMany({ _id: { $ne: req.params.id } }, { isPinned: false });
        }

        const updated = await ImportantDate.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        emitRefresh(req);
        res.json(updated);
    } catch (error) {
        console.error('Update Important Date Error:', error.message);
        res.status(400).json({ message: error.message });
    }
});
router.delete('/important-dates/:id', async (req, res) => {
    try {
        await ImportantDate.findByIdAndDelete(req.params.id);
        emitRefresh(req);
        res.json({ message: 'Date deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Topics
router.post('/topics', async (req, res) => {
    try {
        const topic = new Topic(req.body);
        const saved = await topic.save();
        emitRefresh(req);
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put('/topics/:id', async (req, res) => {
    try {
        const updated = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
        emitRefresh(req);
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/topics/:id', async (req, res) => {
    try {
        await Topic.findByIdAndDelete(req.params.id);
        emitRefresh(req);
        res.json({ message: 'Topic deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Previous Editions
router.post('/previous-editions', async (req, res) => {
    try {
        const edition = new PreviousEdition(req.body);
        const saved = await edition.save();
        emitRefresh(req);
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put('/previous-editions/:id', async (req, res) => {
    try {
        const updated = await PreviousEdition.findByIdAndUpdate(req.params.id, req.body, { new: true });
        emitRefresh(req);
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/previous-editions/:id', async (req, res) => {
    try {
        await PreviousEdition.findByIdAndDelete(req.params.id);
        emitRefresh(req);
        res.json({ message: 'Edition deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Registration Fees
router.post('/registration-fees', async (req, res) => {
    try {
        const fee = new RegistrationFee(req.body);
        const saved = await fee.save();
        emitRefresh(req);
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put('/registration-fees/:id', async (req, res) => {
    try {
        const updated = await RegistrationFee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        emitRefresh(req);
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/registration-fees/:id', async (req, res) => {
    try {
        await RegistrationFee.findByIdAndDelete(req.params.id);
        emitRefresh(req);
        res.json({ message: 'Registration fee deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Archive
router.post('/archive', async (req, res) => {
    try {
        const archive = new Archive(req.body);
        const saved = await archive.save();
        emitRefresh(req);
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put('/archive/:id', async (req, res) => {
    try {
        const updated = await Archive.findByIdAndUpdate(req.params.id, req.body, { new: true });
        emitRefresh(req);
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/archive/:id', async (req, res) => {
    try {
        await Archive.findByIdAndDelete(req.params.id);
        emitRefresh(req);
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// News
router.post('/news', async (req, res) => {
    try {
        const news = new News(req.body);
        const saved = await news.save();
        emitRefresh(req);
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/news/:id', async (req, res) => {
    try {
        const updated = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        emitRefresh(req);
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/news/:id', async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        emitRefresh(req);
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Conference Settings
router.put('/conference-info', async (req, res) => {
    try {
        const updated = await Conference.findOneAndUpdate(
            { conference_id: 'coms2-2026' },
            req.body,
            { new: true, runValidators: true }
        );
        emitRefresh(req);
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const AcceptedPaper = require('../models/AcceptedPaper');
const BestPaper = require('../models/BestPaper');
const PublicationStat = require('../models/PublicationStat');

// Helper to update stats for a given year
const updateStatsForYear = async (year) => {
    try {
        if (!year) return;

        const totalAccepted = await AcceptedPaper.countDocuments({ year });
        let stat = await PublicationStat.findOne({ year });

        if (!stat) {
            // If specific stats don't exist yet, we can't update them, 
            // unless we want to auto-create with 0 submissions? 
            // Better to only update if a record exists to track submissions.
            return;
        }

        stat.acceptedCount = totalAccepted;
        if (stat.totalSubmissions > 0) {
            stat.rate = ((totalAccepted / stat.totalSubmissions) * 100).toFixed(0) + '%';
        } else {
            stat.rate = '0%';
        }
        await stat.save();
        console.log(`Updated stats for ${year}: ${totalAccepted} accepted, Rate: ${stat.rate}`);
    } catch (e) {
        console.error('Error updating stats:', e);
    }
};

// ... (existing helper and routes)

// ============ AUTHORS SECTION ROUTES ============

// ---- ACCEPTED PAPERS ----
router.get('/accepted-papers', async (req, res) => {
    try {
        const { year } = req.query;
        const filter = year ? { year: parseInt(year) } : {};
        const data = await AcceptedPaper.find(filter).sort({ year: -1, paperId: 1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/accepted-papers', async (req, res) => {
    try {
        const newItem = new AcceptedPaper(req.body);
        const savedItem = await newItem.save();
        await updateStatsForYear(savedItem.year);
        emitRefresh(req);
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/accepted-papers/:id', async (req, res) => {
    try {
        const item = await AcceptedPaper.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (item) await updateStatsForYear(item.year);
        emitRefresh(req);
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/accepted-papers/:id', async (req, res) => {
    try {
        const item = await AcceptedPaper.findById(req.params.id);
        if (item) {
            const year = item.year;
            await AcceptedPaper.findByIdAndDelete(req.params.id);
            await updateStatsForYear(year);
        }
        emitRefresh(req);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ---- BEST PAPERS ----
router.get('/best-papers', async (req, res) => {
    try {
        const { year } = req.query;
        const filter = year ? { year: parseInt(year) } : {};
        const data = await BestPaper.find(filter).sort({ year: -1, order: 1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/best-papers', async (req, res) => {
    try {
        const newItem = new BestPaper(req.body);
        const savedItem = await newItem.save();
        emitRefresh(req);
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/best-papers/:id', async (req, res) => {
    try {
        const item = await BestPaper.findByIdAndUpdate(req.params.id, req.body, { new: true });
        emitRefresh(req);
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/best-papers/:id', async (req, res) => {
    try {
        await BestPaper.findByIdAndDelete(req.params.id);
        emitRefresh(req);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ---- PUBLICATION STATS ----
router.get('/publication-stats', async (req, res) => {
    try {
        // Recalculate stats on read? Or assume they are up to date?
        // Let's assume up to date for performance, but maybe do a quick check? 
        // For now, return stored data.
        const data = await PublicationStat.find().sort({ year: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/publication-stats', async (req, res) => {
    try {
        // User provides year and totalSubmissions
        const newItem = new PublicationStat(req.body);
        const savedItem = await newItem.save();

        // Auto-calculate rate immediately
        await updateStatsForYear(savedItem.year);
        const updatedItem = await PublicationStat.findById(savedItem._id);

        emitRefresh(req);
        res.status(201).json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/publication-stats/:id', async (req, res) => {
    try {
        const item = await PublicationStat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (item) {
            await updateStatsForYear(item.year);
            const updatedItem = await PublicationStat.findById(item._id);
            emitRefresh(req);
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/publication-stats/:id', async (req, res) => {
    try {
        await PublicationStat.findByIdAndDelete(req.params.id);
        emitRefresh(req);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
