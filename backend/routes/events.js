const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET tous les événements
router.get('/', async (req, res) => {
  try {
    const { category, city, search } = req.query;
    let filter = { status: { $ne: 'cancelled' } };

    if (category) filter.category = category;
    if (city) filter['location.city'] = city;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET événements à la une
router.get('/featured', async (req, res) => {
  try {
    const events = await Event.find({ featured: true, status: { $ne: 'cancelled' } }).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET détails d'un événement
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Événement non trouvé' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST créer un événement (admin)
router.post('/', async (req, res) => {
  const event = new Event(req.body);
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
