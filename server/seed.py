from datetime import datetime, time
from app import app
from models import db, User, Medication, Reminder, MedicationReminder

def seed_database():
    # Clear existing data
    db.drop_all()
    db.create_all()

    # Create users
    print('Creating user objects...')
    user1 = User(user_name="Elsa Kimani", gender="Male", phone_number="123-456-7890", email="elsak@example.com")
    user2 = User(user_name="Mariah Stellar", gender="Female", phone_number="987-654-3210", email="mstella@example.com")

    db.session.add_all([user1, user2])
    db.session.commit()

    # Create medications
    print('Creating medication objects...')
    med1 = Medication(medication_name="Aspirin", description="Pain reliever", frequency="Daily", dosage="1 tablet", user=user1)
    med2 = Medication(medication_name="Vitamin C", description="Immune booster", frequency="Daily", dosage="500mg", user=user1)
    med3 = Medication(medication_name="Insulin", description="Diabetes management", frequency="As needed", dosage="10 units", user=user2)

    db.session.add_all([med1, med2, med3])
    db.session.commit()

    # Create reminders
    print('Creating reminder objects...')
    rem1 = Reminder(reminder_time=time(8, 0), reminder_date=datetime.now().date(), user=user1)
    rem2 = Reminder(reminder_time=time(20, 0), reminder_date=datetime.now().date(), user=user1)
    rem3 = Reminder(reminder_time=time(12, 0), reminder_date=datetime.now().date(), user=user2)

    db.session.add_all([rem1, rem2, rem3])
    db.session.commit()

    # Create medication reminders
    print('Creating med-reminder objects...')
    med_rem1 = MedicationReminder(medication=med1, reminder=rem1)
    med_rem2 = MedicationReminder(medication=med2, reminder=rem2)
    med_rem3 = MedicationReminder(medication=med3, reminder=rem3)

    print('Adding all objects to transaction')
    db.session.add_all([med_rem1, med_rem2, med_rem3])

    print('Commiting transaction')
    db.session.commit()

    print("Database seeded successfully!")

if __name__ == "__main__":
    with app.app_context():
        seed_database()
