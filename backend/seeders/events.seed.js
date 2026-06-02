const mongoose = require('mongoose');
const Event = require('../models/Event');
require('dotenv').config();

const events = [
  {
    title: '🏉 Coupe du Monde de Rugby 2027',
    description: 'Le plus grand événement de rugby du monde! Assistez aux matchs les plus importants de la Coupe du Monde de Rugby 2027 en France.',
    category: 'Rugby',
    date: new Date('2027-09-10'),
    location: {
      city: 'Paris',
      venue: 'Stade de France',
      address: '1 rue Mario Cerdan, 93200 Saint-Denis'
    },
    image: 'https://images.unsplash.com/photo-1461318163453-ac5f1fc17c8c?w=800&q=80',
    totalTickets: 80000,
    availableTickets: 75000,
    ticketTypes: [
      { name: 'VIP', price: 500, quantity: 5000 },
      { name: 'Premium', price: 250, quantity: 15000 },
      { name: 'Standard', price: 100, quantity: 60000 }
    ],
    organizer: 'World Rugby',
    status: 'upcoming',
    featured: true
  },
  {
    title: '⚽ PSG vs Marseille - Ligue 1',
    description: 'Le Classique! PSG contre Marseille au Parc des Princes - Le plus grand derby du football français.',
    category: 'Football',
    date: new Date('2026-12-05'),
    location: {
      city: 'Paris',
      venue: 'Parc des Princes',
      address: '24 rue du Commandant Guilbaud, 75016 Paris'
    },
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
    totalTickets: 48000,
    availableTickets: 42000,
    ticketTypes: [
      { name: 'VIP Tribunes', price: 350, quantity: 8000 },
      { name: 'Tribunes', price: 150, quantity: 20000 },
      { name: 'Virages', price: 80, quantity: 20000 }
    ],
    organizer: 'Ligue 1',
    status: 'upcoming',
    featured: true
  },
  {
    title: '🎵 Glastonbury Festival 2026',
    description: 'L\'un des plus grands festivals de musique au monde avec les meilleures artistes internationales!',
    category: 'Musique',
    date: new Date('2026-06-25'),
    location: {
      city: 'Somerset',
      venue: 'Worthy Farm',
      address: 'Worthy Farm, Pilton, Somerset'
    },
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80',
    totalTickets: 100000,
    availableTickets: 85000,
    ticketTypes: [
      { name: 'VIP Pass', price: 800, quantity: 10000 },
      { name: 'General Admission', price: 350, quantity: 90000 }
    ],
    organizer: 'Glastonbury Festival',
    status: 'upcoming',
    featured: true
  },
  {
    title: '🏀 NBA All-Star Game 2027',
    description: 'L\'événement le plus attendu de la NBA! Les meilleures stars du basketball se rencontrent pour un spectacle inoubliable.',
    category: 'Sports',
    date: new Date('2027-02-13'),
    location: {
      city: 'New Orleans',
      venue: 'Smoothie King Center',
      address: '1501 Girod Street'
    },
    image: 'https://images.unsplash.com/photo-1546519638-68d109498ffc?w=800&q=80',
    totalTickets: 20000,
    availableTickets: 15000,
    ticketTypes: [
      { name: 'Courtside', price: 2000, quantity: 500 },
      { name: 'Lower Bowl', price: 800, quantity: 5000 },
      { name: 'Upper Level', price: 350, quantity: 14500 }
    ],
    organizer: 'NBA',
    status: 'upcoming',
    featured: true
  },
  {
    title: '🎭 Festival d\'Avignon 2026',
    description: 'Le plus grand festival de théâtre au monde! Découvrez des pièces de théâtre et des performances artistiques exceptionnelles.',
    category: 'Culture',
    date: new Date('2026-07-07'),
    location: {
      city: 'Avignon',
      venue: 'Palais des Papes',
      address: 'Palais des Papes, Avignon'
    },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    totalTickets: 50000,
    availableTickets: 45000,
    ticketTypes: [
      { name: 'Premium', price: 80, quantity: 10000 },
      { name: 'Standard', price: 40, quantity: 40000 }
    ],
    organizer: 'Festival d\'Avignon',
    status: 'upcoming',
    featured: true
  },
  {
    title: '🏉 France vs Nouvelle-Zélande - Rugby Test Match',
    description: 'Match test international de rugby: Les Bleus affrontent les All Blacks dans un combat épique!',
    category: 'Rugby',
    date: new Date('2026-11-14'),
    location: {
      city: 'Lyon',
      venue: 'Matmut Stadium',
      address: '7 avenue Jean Mermoz, 69008 Lyon'
    },
    image: 'https://images.unsplash.com/photo-1461318163453-ac5f1fc17c8c?w=800&q=80',
    totalTickets: 58000,
    availableTickets: 50000,
    ticketTypes: [
      { name: 'VIP', price: 400, quantity: 8000 },
      { name: 'Premium', price: 180, quantity: 20000 },
      { name: 'Standard', price: 80, quantity: 30000 }
    ],
    organizer: 'FFR',
    status: 'upcoming',
    featured: false
  }
];

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ticketing');
    
    await Event.deleteMany({});
    await Event.insertMany(events);
    
    console.log('✅ Événements importés avec succès!');
    console.log(`📊 ${events.length} événements créés`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

seedEvents();
