// frontend/src/Flights.js
import React, { useEffect, useState } from 'react';

function Flights() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  useEffect(() => {
    fetch('http://localhost:5002/api/flights')
      .then(res => res.json())
      .then(data => {
        setFlights(data);
        setFilteredFlights(data);
      })
      .catch(err => console.error('Error fetching flights:', err));
  }, []);

  const handleSearch = () => {
    if (!origin || !destination || !departureDate) {
      alert('Please fill in all search fields');
      return;
    }

    const filtered = flights.filter(flight => {
      const flightDate = new Date(flight.departure_time).toISOString().split('T')[0];
      return (
        flight.origin.toLowerCase().includes(origin.toLowerCase()) &&
        flight.destination.toLowerCase().includes(destination.toLowerCase()) &&
        flightDate === departureDate
      );
    });

    setFilteredFlights(filtered);
  };

  const handleClear = () => {
    setOrigin('');
    setDestination('');
    setDepartureDate('');
    setFilteredFlights(flights);
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#fff0f5', minHeight: '100vh' }}>
      <h2 style={{ color: '#cc0066' }}>Available Flights</h2>

      {/* 🔍 טופס חיפוש */}
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClear} style={{ marginLeft: '1rem' }}>Clear</button>
      </div>

      {/* ✈️ רשימת טיסות */}
      {filteredFlights.length === 0 ? (
        <p>No flights found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {filteredFlights.map(flight => (
            <li
              key={flight.id}
              style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: '#ffe6f0',
                borderRadius: '10px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              ✈️ <strong>{flight.origin}</strong> → <strong>{flight.destination}</strong> <br />
              🕐 {new Date(flight.departure_time).toLocaleString()} → {new Date(flight.arrival_time).toLocaleString()} <br />
              💵 {flight.price ? `${parseFloat(flight.price).toFixed(2)} $` : 'Price not available'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Flights;
