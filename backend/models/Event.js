const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  description: String,
  category: {
    type: String,
    enum: ['Rugby', 'Football', 'Musique', 'Culture', 'Sports'],
    required: true
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  location: {
    city: String,
    venue: String,
    address: String
  },
  image: String,
  totalTickets: Number,
  availableTickets: Number,
  ticketTypes: [{
    name: String,
    price: Number,
    quantity: Number
  }],
  organizer: String,
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', eventSchema);
