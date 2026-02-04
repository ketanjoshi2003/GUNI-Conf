const express = require('express');
const router = express.Router();
const Conference = require('../models/Conference');

// Get Conference Details
router.get('/:id', async (req, res) => {
    try {
        const conference = await Conference.findOne({ conference_id: req.params.id });
        if (!conference) {
            // specific for this task: if not found, return the default data from code (fallback)
            // or user might prefer strictly DB. I'll stick to DB first.
            return res.status(404).json({ message: 'Conference not found' });
        }
        res.json(conference);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create/Update Conference
router.post('/', async (req, res) => {
    const { conference_id } = req.body;
    try {
        let conference = await Conference.findOne({ conference_id });
        if (conference) {
            Object.assign(conference, req.body);
            await conference.save();
            return res.json(conference);
        }
        conference = new Conference(req.body);
        await conference.save();
        res.status(201).json(conference);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
