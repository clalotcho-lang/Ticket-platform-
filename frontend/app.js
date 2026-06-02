const API_URL = 'http://localhost:5000/api';

async function loadFeaturedEvents() {
  try {
    const response = await fetch(`${API_URL}/events/featured`);
    const events = await response.json();
    displayEvents(events, 'featured-list');
  } catch (error) {
    console.error('Erreur:', error);
    document.getElementById('featured-list').innerHTML = '<p>Erreur lors du chargement des événements</p>';
  }
}

async function loadAllEvents() {
  try {
    const response = await fetch(`${API_URL}/events`);
    const events = await response.json();
    displayEvents(events, 'events-list');
  } catch (error) {
    console.error('Erreur:', error);
    document.getElementById('events-list').innerHTML = '<p>Erreur lors du chargement des événements</p>';
  }
}

function displayEvents(events, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  if (events.length === 0) {
    container.innerHTML = '<p>Aucun événement trouvé</p>';
    return;
  }

  events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    const minPrice = Math.min(...event.ticketTypes.map(t => t.price));
    eventCard.innerHTML = `
      <img src="${event.image}" alt="${event.title}" onerror="this.src='https://via.placeholder.com/300x200?text=Event'">
      <div class="event-info">
        <h3>${event.title}</h3>
        <div class="event-date">📅 ${formatDate(event.date)}</div>
        <div class="event-date">📍 ${event.location.city} - ${event.location.venue}</div>
        <div class="event-price">À partir de ${minPrice}€</div>
        <div class="event-tickets">Tickets: ${event.availableTickets} disponibles</div>
        <button class="btn-book" onclick="bookEvent('${event._id}')">Réserver</button>
      </div>
    `;
    container.appendChild(eventCard);
  });
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

function filterByCategory(category) {
  fetch(`${API_URL}/events?category=${category}`)
    .then(res => res.json())
    .then(events => {
      displayEvents(events, 'events-list');
      document.getElementById('events').scrollIntoView({ behavior: 'smooth' });
    })
    .catch(error => console.error('Erreur:', error));
}

function bookEvent(eventId) {
  alert('🚀 Fonctionnalité de réservation à implémenter\n\nID Événement: ' + eventId);
}

document.addEventListener('DOMContentLoaded', () => {
  loadFeaturedEvents();
  loadAllEvents();
  
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
      const search = e.target.value;
      if (search.trim()) {
        fetch(`${API_URL}/events?search=${search}`)
          .then(res => res.json())
          .then(events => displayEvents(events, 'events-list'));
      } else {
        loadAllEvents();
      }
    });
  }
});
