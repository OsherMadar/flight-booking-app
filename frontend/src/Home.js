import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#ffe6f0', minHeight: '100vh', textAlign: 'center', paddingTop: '100px' }}>
      <h1>Welcome to the Flight Booking Website</h1>
      <button 
        style={{
          padding: '10px 20px',
          fontSize: '18px',
          backgroundColor: '#ff66b2',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '40px'
        }}
        onClick={() => navigate('/flights')}
      >
        View Flights
      </button>
    </div>
  );
}

export default Home;
