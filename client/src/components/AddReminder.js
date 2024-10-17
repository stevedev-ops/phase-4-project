import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddReminder = () => {
  const [reminder, setReminder] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    dosage: '',  
    frequency: '' 
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReminder({ ...reminder, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    localStorage.setItem('reminders', JSON.stringify([...savedReminders, reminder]));
    navigate('/reminders'); 
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add a New Medicine Reminder</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          value={reminder.title}
          onChange={handleChange}
          placeholder="Reminder Title"
          required
          style={styles.input}
        />
        <input
          type="date"
          name="date"
          value={reminder.date}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="time"
          name="time"
          value={reminder.time}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="dosage"
          value={reminder.dosage}
          onChange={handleChange}
          placeholder="Dosage (e.g., 500mg)"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="frequency"
          value={reminder.frequency}
          onChange={handleChange}
          placeholder="Frequency (e.g., twice a day)"
          required
          style={styles.input}
        />
        <textarea
          name="description"
          value={reminder.description}
          onChange={handleChange}
          placeholder="Additional Description"
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Add Reminder</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#e6f7ff',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: 'auto',
  },
  title: {
    textAlign: 'center',
    color: '#007bff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
  },
  textarea: {
    margin: '10px 0',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    resize: 'none',
    height: '100px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s',
  },
};

export default AddReminder;
