from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData()

db = SQLAlchemy(metadata = metadata)

class User(db.Model,SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(100), nullable=False)
    gender = db.Column(db.String(10))
    phone_number = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(20), nullable=False)

    serialize_rules = ('-password',)

    # Relationships
    medications = db.relationship('Medication', back_populates='user')
    reminders = db.relationship('Reminder', back_populates='user')

class Medication(db.Model):
    __tablename__ = 'medications'

    id = db.Column(db.Integer, primary_key=True)
    medication_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    frequency = db.Column(db.String(100))
    dosage = db.Column(db.String(50))

    # Foreign key
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Relationships
    user = db.relationship('User', back_populates='medications')
    reminders = db.relationship('MedicationReminder', back_populates='medication')

    def to_dict(self):
        return {
            'id': self.id,
            'medication_name': self.medication_name,
            'description': self.description,
            'frequency': self.frequency,
            'dosage': self.dosage,
            'user_id': self.user_id
        }

     

class Reminder(db.Model):
    __tablename__ = 'reminders'

    id = db.Column(db.Integer, primary_key=True)
    reminder_time = db.Column(db.Time, nullable=False)
    reminder_date = db.Column(db.Date, nullable=False)

    # Foreign key
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Relationships
    user = db.relationship('User', back_populates='reminders')
    medications = db.relationship('MedicationReminder', back_populates='reminder')

    def to_dict(self):
        return {
            'id': self.id,
            'reminder_time': self.reminder_time.isoformat() if self.reminder_time else None,
            'reminder_date': self.reminder_date.isoformat() if self.reminder_date else None,
            'user_id': self.user_id
        }

    

class MedicationReminder(db.Model):
    __tablename__ = 'medication_reminders'

    id = db.Column(db.Integer, primary_key=True)

    # Foreign keys
    medication_id = db.Column(db.Integer, db.ForeignKey('medications.id'))
    reminder_id = db.Column(db.Integer, db.ForeignKey('reminders.id'))

    # Relationships
    medication = db.relationship('Medication', back_populates='reminders')
    reminder = db.relationship('Reminder', back_populates='medications')

    def to_dict(self):
        return {
            'id': self.id,
            'medication_id': self.medication_id,
            'reminder_id': self.reminder_id
        }

      