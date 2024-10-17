import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Reminders from './components/Reminders';
import AddReminder from './components/AddReminder.js';
import AddAppointment from './components/AddAppointment';
import Appointments from './components/Appointments';
import Login from './components/Login';
import CalendarView from './components/Calendar';
import Navbar from './components/Navbar';
import Signup from './components/Signup'; 

function App() {
  const [user, setUser] = useState(null); 

  const handleSignup = (userData) => {
    setUser(userData); 
  };

  return (
    <Router>
      <div>
        <Navbar user={user} /> {/* Pass user data to Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/add-reminder" element={<AddReminder />} />
          <Route path="/add-appointment" element={<AddAppointment />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} /> {/* Pass callback */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
