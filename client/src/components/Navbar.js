import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a202c',
    padding: '15px 30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    fontFamily: "'Poppins', sans-serif",
  };

  const leftStyle = {
    flex: '1',
  };

  const rightStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: '2',
    gap: '30px',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'all 0.3s',
    padding: '8px 12px',
    borderRadius: '4px',
  };

  const brandStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '1px',
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = '#2d3748';
    e.target.style.color = '#63b3ed';
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.color = 'white';
  };

  return (
    <nav style={navbarStyle}>
      <div style={leftStyle}>
        <span style={brandStyle}>MedTrack</span>
      </div>
      <div style={rightStyle}>
        <Link to="/" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          Home
        </Link>
        <Link to="/reminders" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Medication</Link>
        <Link to="/appointments" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Appointments</Link>
        <Link to="/calendar" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Calendar</Link>
        {user ? (
          <span style={{ color: 'white', fontWeight: '500', alignSelf: 'center' }}>Welcome {user.name}</span> 
        ) : (
          <Link to="/login" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
