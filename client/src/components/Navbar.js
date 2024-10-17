import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#282c34',
    padding: '15px',
  };

  const leftStyle = {
    flex: '1',
  };

  const rightStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    flex: '1',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    transition: 'color 0.3s',
  };

  const handleMouseEnter = (e) => {
    e.target.style.color = '#61dafb';
  };

  const handleMouseLeave = (e) => {
    e.target.style.color = 'white';
  };

  return (
    <nav style={navbarStyle}>
      <div style={leftStyle}>
        <Link to="/" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Home</Link>
      </div>
      <div style={rightStyle}>
        <Link to="/reminders" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Medication Reminders</Link>
        <Link to="/appointments" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Appointment Reminders</Link>
        <Link to="/calendar" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Calendar</Link>
        {user ? (
          <span style={{ color: 'white', marginLeft: '20px' }}>Welcome, {user.name}</span> // Display user name
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
