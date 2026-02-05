const express = require('express');
const router = express.Router();
const Speaker = require('../models/Speaker');
const Committee = require('../models/Committee');
const ImportantDate = require('../models/ImportantDate');
const Topic = require('../models/Topic');
const PreviousEdition = require('../models/PreviousEdition');
const RegistrationFee = require('../models/RegistrationFee');
const Archive = require('../models/Archive');
const News = require('../models/News');
const { protect, admin } = require('../middleware/authMiddleware');

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
        const { type } = req.query;
        const filter = type ? { type } : {};
        const committees = await Committee.find(filter).sort({ order: 1, name: 1 });
        res.json(committees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/important-dates', async (req, res) => {
    try {
        const dates = await ImportantDate.find().sort({ order: 1, date: 1 });
        res.json(dates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/topics', async (req, res) => {
    try {
        const topics = await Topic.find().sort({ order: 1, title: 1 });
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
        const fees = await RegistrationFee.find().sort({ order: 1 });
        res.json(fees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/archive', async (req, res) => {
    try {
        const { type } = req.query;
        const filter = type ? { type } : {};
        const archives = await Archive.find(filter);
        res.json(archives);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/news', async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ============ PROTECTED ROUTES (POST, PUT, DELETE) ============

router.use(protect);
router.use(admin);

// Speakers
router.post('/speakers', async (req, res) => {
    try {
        const speaker = new Speaker(req.body);
        const saved = await speaker.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put('/speakers/:id', async (req, res) => {
    try {
        const updated = await Speaker.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/speakers/:id', async (req, res) => {
    try {
        await Speaker.findByIdAndDelete(req.params.id);
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
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put('/committees/:id', async (req, res) => {
    try {
        const updated = await Committee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/committees/:id', async (req, res) => {
    try {
        await Committee.findByIdAndDelete(req.params.id);
        res.json({ message: 'Committee member deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Important Dates
router.post('/important-dates', async (req, res) => {
    try {
        const date = new ImportantDate(req.body);
        const saved = await date.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put('/important-dates/:id', async (req, res) => {
    try {
        const updated = await ImportantDate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/important-dates/:id', async (req, res) => {
    try {
        await ImportantDate.findByIdAndDelete(req.params.id);
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
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put('/topics/:id', async (req, res) => {
    try {
        const updated = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/topics/:id', async (req, res) => {
    try {
        await Topic.findByIdAndDelete(req.params.id);
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
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put('/previous-editions/:id', async (req, res) => {
    try {
        const updated = await PreviousEdition.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/previous-editions/:id', async (req, res) => {
    try {
        await PreviousEdition.findByIdAndDelete(req.params.id);
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
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put('/registration-fees/:id', async (req, res) => {
    try {
        const updated = await RegistrationFee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/registration-fees/:id', async (req, res) => {
    try {
        await RegistrationFee.findByIdAndDelete(req.params.id);
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
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put('/archive/:id', async (req, res) => {
    try {
        const updated = await Archive.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/archive/:id', async (req, res) => {
    try {
        await Archive.findByIdAndDelete(req.params.id);
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
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/news/:id', async (req, res) => {
    try {
        const updated = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/news/:id', async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
