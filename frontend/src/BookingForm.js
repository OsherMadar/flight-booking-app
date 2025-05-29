import { useState } from 'react';

function BookingForm({ flightId, onClose }) {
  const [passengerName, setPassengerName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://flight-booking-app-production.up.railway.app/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        flight_id: flightId,
        passenger_name: passengerName,
        email
      })
    });

    const result = await response.json();
    console.log('Booking created:', result);
    alert('Flight booked successfully!');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '1rem', marginTop: '1rem', borderRadius: '10px' }}>
      <h3>Book Flight</h3>
      <input
        type="text"
        placeholder="Passenger Name"
        value={passengerName}
        onChange={(e) => setPassengerName(e.target.value)}
        required
      /><br /><br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /><br /><br />
      <button type="submit">Submit Booking</button>
      <button type="button" onClick={onClose} style={{ marginLeft: '1rem' }}>Cancel</button>
    </form>
  );
}

export default BookingForm;
