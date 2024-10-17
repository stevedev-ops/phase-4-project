import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const [reminders, setReminders] = useState([]);
  const [appointments, setAppointments] = useState([]); 

  useEffect(() => {
    const savedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    setReminders(savedReminders);
    
    const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || []; 
    setAppointments(savedAppointments);
  }, []);

  const handleDateChange = (date) => {
    setDate(date);
  };

  
  const remindersForSelectedDate = reminders.filter(reminder => 
    new Date(reminder.date).toDateString() === date.toDateString()
  );

  
  const appointmentsForSelectedDate = appointments.filter(appointment => 
    new Date(appointment.date).toDateString() === date.toDateString()
  );

  const tileContent = ({ date, view }) => {
    const hasReminders = reminders.some(reminder => 
      new Date(reminder.date).toDateString() === date.toDateString()
    );

    const hasAppointments = appointments.some(appointment => 
      new Date(appointment.date).toDateString() === date.toDateString()
    );

    return (
      <>
        {hasReminders && <span style={styles.dot} />}
        {hasAppointments && <span style={{ ...styles.dot, backgroundColor: 'blue' }} />} {/* Change color for appointments */}
      </>
    );
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Your Medication Schedule</h2>
      <Calendar 
        onChange={handleDateChange} 
        value={date} 
        tileContent={tileContent} 
      />
      <h3 style={{ marginTop: '20px' }}>Reminders for {date.toDateString()}:</h3>
      <hr style={styles.line} />
      {remindersForSelectedDate.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {remindersForSelectedDate.map((reminder, index) => (
            <li key={index} style={styles.reminderItem}>
              <strong style={styles.reminderTitle}>{reminder.title}</strong><br />
              <span style={styles.reminderDetails}>Time: {reminder.time}</span><br />
              <span style={styles.reminderDetails}>Description: {reminder.description}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.noReminders}>You have no reminders scheduled for this date. Consider adding some!</p>
      )}

      <h3 style={{ marginTop: '20px' }}>Appointments for {date.toDateString()}:</h3>
      <hr style={styles.line} />
      {appointmentsForSelectedDate.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {appointmentsForSelectedDate.map((appointment, index) => (
            <li key={index} style={styles.appointmentItem}>
              <strong style={styles.appointmentTitle}>{appointment.title}</strong><br />
              <span style={styles.appointmentDetails}>Time: {appointment.time}</span><br />
              <span style={styles.appointmentDetails}>Notes: {appointment.notes}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.noAppointments}>You have no appointments scheduled for this date. Consider adding some!</p>
      )}
    </div>
  );
};

const styles = {
  dot: {
    display: 'block',
    width: '6px',
    height: '6px',
    backgroundColor: 'red', 
    borderRadius: '50%',
    margin: '0 auto', 
  },
  line: {
    margin: '10px 0',
    border: 'none',
    borderTop: '1px solid #ccc', 
  },
  reminderItem: {
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  reminderTitle: {
    fontSize: '18px',
  },
  reminderDetails: {
    fontSize: '14px',
    color: '#555',
  },
  noReminders: {
    fontStyle: 'italic',
    color: '#777',
  },
  appointmentItem: {
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#e9f9e9',
  },
  appointmentTitle: {
    fontSize: '18px',
  },
  appointmentDetails: {
    fontSize: '14px',
    color: '#555',
  },
  noAppointments: {
    fontStyle: 'italic',
    color: '#777',
  },
};

export default CalendarView;
