// frontend/src/Flights.js
import React, { useEffect, useState } from 'react';

function Flights() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5002/api/flights')
      .then(res => res.json())
      .then(data => setFlights(data))
      .catch(err => console.error('Error fetching flights:', err));
  }, []);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#fff0f5', minHeight: '100vh' }}>
      <h2 style={{ color: '#cc0066' }}>Available Flights</h2>
      {flights.length === 0 ? (
        <p>No flights available.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {flights.map(flight => (
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
              💵 {flight.price} ₪
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Flights;
