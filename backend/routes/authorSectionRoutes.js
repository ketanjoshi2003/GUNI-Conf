const express = require('express');
const router = express.Router();
const AcceptedPaper = require('../models/AcceptedPaper');
const BestPaper = require('../models/BestPaper');
const PublicationStat = require('../models/PublicationStat');

// ---- ACCEPTED PAPERS ----
router.get('/accepted-papers', async (req, res) => {
    try {
        const data = await AcceptedPaper.find().sort({ year: -1, paperId: 1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/accepted-papers', async (req, res) => {
    try {
        const newItem = new AcceptedPaper(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/accepted-papers/:id', async (req, res) => {
    try {
        const item = await AcceptedPaper.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/accepted-papers/:id', async (req, res) => {
    try {
        await AcceptedPaper.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ---- BEST PAPERS ----
router.get('/best-papers', async (req, res) => {
    try {
        const data = await BestPaper.find().sort({ year: -1, order: 1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/best-papers', async (req, res) => {
    try {
        const newItem = new BestPaper(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/best-papers/:id', async (req, res) => {
    try {
        const item = await BestPaper.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/best-papers/:id', async (req, res) => {
    try {
        await BestPaper.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ---- PUBLICATION STATS ----
router.get('/publication-stats', async (req, res) => {
    try {
        const data = await PublicationStat.find().sort({ year: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/publication-stats', async (req, res) => {
    try {
        const newItem = new PublicationStat(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/publication-stats/:id', async (req, res) => {
    try {
        const item = await PublicationStat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/publication-stats/:id', async (req, res) => {
    try {
        await PublicationStat.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
