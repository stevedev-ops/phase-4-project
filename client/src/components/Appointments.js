import React, { useState, useEffect } from 'react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState({ title: '', date: '', time: '', notes: '' });

  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(savedAppointments);
  }, []);

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (title) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.title !== title);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const handleEditClick = (appointment) => {
    setIsEditing(true);
    setCurrentAppointment(appointment);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAppointment({ ...currentAppointment, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedAppointments = appointments.map((appointment) =>
      appointment.title === currentAppointment.title ? currentAppointment : appointment
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setIsEditing(false);
    setCurrentAppointment({ title: '', date: '', time: '', notes: '' });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Appointments</h2>
      <input
        type="text"
        placeholder="Search for an appointment..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />
      
      {isEditing ? (
        <form onSubmit={handleUpdate} style={styles.editForm}>
          <h3>Edit Appointment</h3>
          <input
            type="text"
            name="title"
            value={currentAppointment.title}
            onChange={handleChange}
            placeholder="Title"
            required
            style={styles.inputField}
          />
          <input
            type="date"
            name="date"
            value={currentAppointment.date}
            onChange={handleChange}
            required
            style={styles.inputField}
          />
          <input
            type="time"
            name="time"
            value={currentAppointment.time}
            onChange={handleChange}
            required
            style={styles.inputField}
          />
          <textarea
            name="notes"
            value={currentAppointment.notes}
            onChange={handleChange}
            placeholder="Notes"
            required
            style={styles.textareaField}
          />
          <button type="submit" style={styles.updateButton}>Update Appointment</button>
        </form>
      ) : (
        <div style={styles.appointmentsList}>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment, index) => (
              <div key={index} style={styles.appointmentCard}>
                <h3>{appointment.title}</h3>
                <p>Date: {appointment.date}</p>
                <p>Time: {appointment.time}</p>
                <p>Notes: {appointment.notes}</p>
                <div style={styles.buttonGroup}>
                  <button onClick={() => handleEditClick(appointment)} style={styles.editButton}>Edit</button>
                  <button onClick={() => handleDelete(appointment.title)} style={styles.deleteButton}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No appointments match your search. Please add one or adjust your search.</p>
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
  appointmentsList: {
    display: 'flex',
    flexDirection: 'column',
  },
  appointmentCard: {
    backgroundColor: 'white',
    margin: '10px 0',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#FFA500',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#FF4500',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
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
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
};

export default Appointments;
