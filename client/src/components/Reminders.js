import React, { useState, useEffect } from 'react';

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReminder, setCurrentReminder] = useState({ title: '', date: '', time: '', description: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    setReminders(savedReminders);
  }, []);

  const handleEditClick = (reminder) => {
    setIsEditing(true);
    setCurrentReminder(reminder);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentReminder({ ...currentReminder, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedReminders = reminders.map((reminder) =>
      reminder.title === currentReminder.title ? currentReminder : reminder
    );
    setReminders(updatedReminders);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders));
    setIsEditing(false);
    setCurrentReminder({ title: '', date: '', time: '', description: '' });
  };

  const handleDelete = (title) => {
    if (window.confirm(`Are you sure you want to delete the reminder titled "${title}"?`)) {
      const updatedReminders = reminders.filter((reminder) => reminder.title !== title);
      setReminders(updatedReminders);
      localStorage.setItem('reminders', JSON.stringify(updatedReminders));
    }
  };

  const filteredReminders = reminders.filter((reminder) =>
    reminder.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Medical Reminders</h2>

      <input
        type="text"
        placeholder="Search for a reminder..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />

      {isEditing ? (
        <div style={styles.editForm}>
          <h3>Edit Reminder</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="title"
              value={currentReminder.title}
              onChange={handleChange}
              placeholder="Title"
              required
              style={styles.inputField}
            />
            <input
              type="date"
              name="date"
              value={currentReminder.date}
              onChange={handleChange}
              required
              style={styles.inputField}
            />
            <input
              type="time"
              name="time"
              value={currentReminder.time}
              onChange={handleChange}
              required
              style={styles.inputField}
            />
            <textarea
              name="description"
              value={currentReminder.description}
              onChange={handleChange}
              placeholder="Description"
              required
              style={styles.textareaField}
            />
            <button type="submit" style={styles.updateButton}>Update Reminder</button>
          </form>
        </div>
      ) : (
        <div style={styles.remindersGrid}>
          {filteredReminders.length > 0 ? (
            filteredReminders.map((reminder, index) => (
              <div key={index} style={styles.reminderCard}>
                <h3>{reminder.title}</h3>
                <p>Date: {reminder.date}</p>
                <p>Time: {reminder.time}</p>
                <p>Description: {reminder.description}</p>
                <div style={styles.buttonGroup}>
                  <button onClick={() => handleEditClick(reminder)} style={styles.editButton}>Edit</button>
                  <button onClick={() => handleDelete(reminder.title)} style={styles.deleteButton}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No reminders match your search. Please add one or adjust your search.</p>
          )}
        </div>
      )}
    </div>
  );
};


const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2em',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  editForm: {
    marginBottom: '20px',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  textareaField: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  updateButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
  remindersGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  reminderCard: {
    backgroundColor: 'white',
    margin: '10px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    flexGrow: 1,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  editButton: {
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#FFA500',
    color: 'white',
    flex: 1,
    margin: '0 5px',
  },
  deleteButton: {
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#FF4500',
    color: 'white',
    flex: 1,
    margin: '0 5px',
  },
};

export default Reminders;
