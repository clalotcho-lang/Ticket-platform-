const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const crypto = require('crypto');

const generateBookingReference = () => {
  return 'BK' + Date.now() + crypto.randomBytes(3).toString('hex').toUpperCase();
};

// POST créer une réservation
router.post('/', async (req, res) => {
  try {
    const { userId, eventId, ticketType, quantity } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Événement non trouvé' });

    if (event.availableTickets < quantity) {
      return res.status(400).json({ message: 'Tickets insuffisants' });
    }

    const ticketInfo = event.ticketTypes.find(t => t.name === ticketType);
    const totalPrice = ticketInfo.price * quantity;

    const booking = new Booking({
      bookingReference: generateBookingReference(),
      user: userId,
      event: eventId,
      quantity,
      totalPrice,
      status: 'pending'
    });

    await booking.save();

    event.availableTickets -= quantity;
    await event.save();

    res.status(201).json({ message: 'Réservation créée', booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET réservations utilisateur
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate('event');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
