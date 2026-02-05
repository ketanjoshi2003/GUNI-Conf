const express = require('express');
const router = express.Router();
const Speaker = require('../models/Speaker');
const Committee = require('../models/Committee');
const ImportantDate = require('../models/ImportantDate');
const Topic = require('../models/Topic');
const PreviousEdition = require('../models/PreviousEdition');

// ============ SPEAKERS ============
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

// ============ COMMITTEES ============
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

// ============ IMPORTANT DATES ============
router.get('/important-dates', async (req, res) => {
    try {
        const dates = await ImportantDate.find().sort({ order: 1, date: 1 });
        res.json(dates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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

// ============ TOPICS ============
router.get('/topics', async (req, res) => {
    try {
        const topics = await Topic.find().sort({ order: 1, title: 1 });
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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

// ============ PREVIOUS EDITIONS ============
router.get('/previous-editions', async (req, res) => {
    try {
        const editions = await PreviousEdition.find().sort({ year: -1 });
        res.json(editions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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

module.exports = router;
