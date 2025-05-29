import React, { useEffect, useState } from 'react';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('https://flight-booking-app-production.up.railway.app/api/bookings')
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error('Error fetching bookings:', err));
  }, []);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f0f8ff', minHeight: '100vh' }}>
      <h2 style={{ color: '#0077b6' }}>Booking History</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {bookings.map((booking) => (
            <li
              key={booking.id}
              style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: '#e6f7ff',
                borderRadius: '10px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              🧍 Passenger: <strong>{booking.passenger_name}</strong><br />
              ✉️ Email: {booking.email || 'N/A'}<br />
              ✈️ Flight ID: {booking.flight_id}<br />
              🕐 Booking Time: {new Date(booking.booking_time).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingHistory;
