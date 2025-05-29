import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#ffe6f0', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ color: '#000' }}>Welcome to the Flight Booking Website</h1>

      <div style={{ marginTop: '3rem' }}>
        <button
          onClick={() => navigate('/flights')}
          style={{
            backgroundColor: '#ff66b2',
            color: 'white',
            padding: '10px 25px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}
        >
          View Flights
        </button>
        <br />
        <button
          onClick={() => navigate('/booking-history')}
          style={{
            backgroundColor: '#ff66b2',
            color: 'white',
            padding: '10px 25px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          View Booking History
        </button>
      </div>
    </div>
  );
}

export default Home;
