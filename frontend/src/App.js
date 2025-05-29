// src/App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Flights from './Flights';
import BookingHistory from './BookingHistory';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', backgroundColor: '#ffccdd' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/flights" style={{ marginRight: '1rem' }}>Flights</Link>
        <Link to="/booking-history">Booking History</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/booking-history" element={<BookingHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
