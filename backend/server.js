const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ticketing', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur MongoDB:'));
db.once('open', () => console.log('✅ MongoDB connecté'));

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: '✅ API en ligne', timestamp: new Date() });
});

// Routes à implémenter
// app.use('/api/events', require('./routes/events'));
// app.use('/api/users', require('./routes/users'));
// app.use('/api/bookings', require('./routes/bookings'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
