import React, { useEffect, useState } from 'react';

function Flights() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(null);
  const [passengerName, setPassengerName] = useState('');
  const [email, setEmail] = useState('');

  // Format ISO string to DD/MM/YYYY HH:MM
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year}, ${hours}:${minutes}`;
  };

  useEffect(() => {
    fetch('https://flight-booking-app-production.up.railway.app/api/flights')
      .then(async (res) => {
        const data = await res.json();
        console.log('📦 Flight data:', data);

        if (Array.isArray(data)) {
          setFlights(data);
          setFilteredFlights(data);
        } else {
          console.error('❌ Data is not an array:', data);
          setFlights([]);
          setFilteredFlights([]);
        }
      })
      .catch(err => console.error('Error fetching flights:', err));
  }, []);

  const handleSearch = () => {
    if (!origin || !destination || !departureDate) {
      alert('Please fill in all search fields');
      return;
    }

    // departureDate is already in YYYY-MM-DD from <input type="date">
    const searchDateString = departureDate;
    console.log('🔎 Normalized search date:', searchDateString);

    const filtered = flights.filter(flight => {
      const flightDateString = flight.departure_time.split('T')[0];
      console.log('✈️ flightDate:', flightDateString, '| Looking for:', searchDateString);

      return (
        flight.origin.toLowerCase().includes(origin.toLowerCase()) &&
        flight.destination.toLowerCase().includes(destination.toLowerCase()) &&
        flightDateString === searchDateString
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

  const handleBooking = (flightId) => {
    if (!passengerName || !email) {
      alert("Please fill in all booking fields");
      return;
    }

    fetch('https://flight-booking-app-production.up.railway.app/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        flight_id: flightId,
        passenger_name: passengerName,
        email: email,
      }),
    })
      .then(res => res.json())
      .then(data => {
        alert('Booking successful!');
        setShowBookingForm(null);
        setPassengerName('');
        setEmail('');
      })
      .catch(err => {
        console.error('Booking error:', err);
        alert('Booking failed.');
      });
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#fff0f5', minHeight: '100vh' }}>
      <h2 style={{ color: '#cc0066' }}>Available Flights</h2>

      <div style={{ marginBottom: '1rem' }}>
        <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#888' }}>
          * Select date using the calendar (e.g. 2025-06-02 for June 2nd)
        </p>
      </div>

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

      {!Array.isArray(filteredFlights) || filteredFlights.length === 0 ? (
        <p>No flights found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {filteredFlights.map(flight => (
            <li
              key={flight.id}
              style={{
                marginBottom: '2rem',
                padding: '1rem',
                backgroundColor: '#ffe6f0',
                borderRadius: '10px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              ✈️ <strong>{flight.origin}</strong> → <strong>{flight.destination}</strong><br />
              🕐 {formatDateTime(flight.departure_time)} → {formatDateTime(flight.arrival_time)}<br />
              💵 {flight.price ? `${parseFloat(flight.price).toFixed(2)} $` : 'Price not available'}<br />
              <button
                onClick={() => setShowBookingForm(flight.id)}
                style={{ marginTop: '1rem' }}
              >
                Book Flight
              </button>

              {showBookingForm === flight.id && (
                <div style={{ marginTop: '1rem', backgroundColor: '#fff5f8', padding: '1rem', borderRadius: '8px' }}>
                  <h4>Booking Form</h4>
                  <input
                    type="text"
                    placeholder="Passenger Name"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    style={{ marginBottom: '0.5rem', display: 'block' }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginBottom: '0.5rem', display: 'block' }}
                  />
                  <button onClick={() => handleBooking(flight.id)}>Submit Booking</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Flights;
