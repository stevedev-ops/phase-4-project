import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const drugCategories = {
  ByPurpose: [
    {
      title: "Analgesics",
      description: "Pain relievers (e.g., ibuprofen, acetaminophen).",
      imgSrc: "path/to/analgesics.jpg",
    },
    {
      title: "Antibiotics",
      description: "Fight bacterial infections (e.g., penicillin, amoxicillin).",
      imgSrc: "path/to/antibiotics.jpg",
    },
   
  ],
  ByForm: [
    {
      title: "Tablets/Capsules",
      description: "Solid forms taken orally.",
      imgSrc: "path/to/tablets_capsules.jpg",
    },
    
  ],
  
};

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '25px',
    border: 'none',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const containerStyle = {
    textAlign: 'center',
    marginTop: '50px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  };

  const categoryStyle = {
    marginTop: '40px',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const drugCardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    margin: '20px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '250px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    backgroundColor: '#f1f1f1',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredCategories = selectedCategory === 'All'
    ? Object.entries(drugCategories)
    : Object.entries(drugCategories).filter(([key]) => key === selectedCategory);

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#333', fontFamily: 'Arial, sans-serif', marginBottom: '20px' }}>Welcome to Medical Reminder App</h1>
      <p style={{ color: '#666', fontSize: '18px', marginBottom: '30px' }}>Track and manage your medical prescriptions and appointments easily.</p>
      <div>
        <Link to="/add-reminder" style={buttonStyle}>Add a New Reminder</Link>
        <Link to="/add-appointment" style={buttonStyle}>Add a New Appointment</Link>
        <Link to="/login" style={buttonStyle}>Login</Link>
      </div>

      <div style={{ margin: '30px 0' }}>
        <label htmlFor="category-filter" style={{ fontSize: '16px', marginRight: '10px' }}>Select a Category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        >
          <option value="All">All</option>
          {Object.keys(drugCategories).map((category) => (
            <option key={category} value={category}>{category.replace(/([A-Z])/g, ' $1').trim()}</option>
          ))}
        </select>
      </div>

      {filteredCategories.map(([category, drugs]) => (
        <div key={category} style={categoryStyle}>
          <h2 style={{ color: '#333', fontFamily: 'Arial, sans-serif' }}>{category.replace(/([A-Z])/g, ' $1').trim()}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {drugs.map((drug, index) => (
              <div
                key={index}
                style={drugCardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <h3 style={{ color: '#333', margin: '10px 0' }}>{drug.title}</h3>
                {drug.imgSrc && <img src={drug.imgSrc} alt={drug.title} style={{ width: '100%', borderRadius: '5px' }} />}
                <p style={{ color: '#666', textAlign: 'center' }}>{drug.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
