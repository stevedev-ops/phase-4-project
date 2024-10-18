## Medical Reminder API - README
- For this project, you'll be building an API to manage medication reminders for users, ensuring they keep track of their prescriptions and dosage schedules.

### DEMO LINK 
https://drive.google.com/file/d/1YnMM8FQ-SaRXxkh2QR5d5nalV27ZARij/view


## Project Overview
![m r](https://github.com/user-attachments/assets/b919cd71-0db0-43d5-ab7f-f92662d306bb)
## In this repository
- There is a Flask application where you will be working on the backend functionality.
    - The database models are defined, and your task will involve creating routes to interact with these models.
    - There are tests included to validate your code. - - You can run them using pytest.
    - Postman collection (medical-reminder.postman_collection.json) is provided to assist you in testing the API routes.

## You can interact with your API using:gi

- Postman to make requests and validate responses.
- pytest to run automated tests.
- Optionally, connect this API to a frontend app to visualize the user interactions.

## Features of the API:

- Manage user profiles and their medications.
- Set up reminders for users to take their medications.
- Track medication dosage and frequency.

## Setup

- To set up the project locally, ensure you're in the root folder of the project and follow these steps:

    - Install dependencies:

- bash

- pipenv install
- pipenv shell

    - Run the Flask API on localhost:5000:

- bash

- python app.py

- Database Setup

- Before you begin using the API, you need to set up the database and run migrations.

    - Initialize the database:

- bash

## flask db init
## flask db migrate -m "Initial migration"
## flask db upgrade

    - Seed the database with sample data:

- bash

- python seed.py

    - You can modify the seed data or add more based on the requirements.

## Models
- The file server/models.py defines the model classes without relationships. Use the following commands to create the initial database app.db:

## export FLASK_APP=server/app.py
## flask db init
## flask db upgrade head

Now you can implement the relationships as shown in the ER Diagram:


## The relationships between these models are:

  - A User can have multiple Medications and Reminders.
  - A Medication belongs to a User and can have multiple Reminders.
  - A Reminder is associated with one or more - Medications through MedicationReminder.

Set serialization rules to limit the recursion depth.

Run the migrations and seed the database:

## flask db revision --autogenerate -m 'message'
## flask db upgrade head
## python server/seed.py

If you aren't able to get the provided seed file working, you are welcome to generate your own seed data to test the application.


## This API uses the following data models:

    - User: Tracks users and their contact details.
    - Medication: Tracks the medications users need to take.
    - Reminder: Stores reminder settings for medications.
    - MedicationReminder: Links a reminder to a specific medication and tracks its dosage and frequency.


## Validations

    User:
        user_name and email are required.
    Medication:
        medication_name is required.
    Reminder:
        Ensures the reminder settings follow a specific schedule format.

## Routes

Set up the following routes. Make sure to return JSON data in the format specified along with the appropriate HTTP verb.

Recall you can specify fields to include or exclude when serializing a model instance to a dictionary using to_dict() (don't forget the comma if specifying a single field).

NOTE: If you choose to implement a Flask-RESTful app, you need to add code to instantiate the Api class in server/app.py.

- GET /users

- Return a list of all users:

json

[
  {
    "id": 1,
    "user_name": "John Doe",
    "email": "johndoe@example.com",
    "gender": "Male",
    "phone_number": "+123456789"
  }
]

## GET /users/

Return details of a specific user, along with their medications and reminders:

json

{
  "id": 1,
  "user_name": "John Doe",
  "email": "johndoe@example.com",
  "medications": [
    {
      "id": 1,
      "medication_name": "Aspirin",
      "dosage": "500mg",
      "frequency": "Twice a day"
    }
  ],
  "reminders": [
    {
      "id": 1,
      "reminder_time": "08:00 AM"
    }
  ]
}

## POST /users

Create a new user:

json

{
  "user_name": "Jane Smith",
  "email": "janesmith@example.com",
  "phone_number": "+987654321",
  "gender": "Female"
}

## GET /medications

Return all medications for all users:

json

[
  {
    "id": 1,
    "medication_name": "Aspirin",
    "dosage": "500mg",
    "frequency": "Twice a day",
    "user_id": 1
  }
]

## POST /medications

Add a new medication for a specific user:

json

{
  "medication_name": "Ibuprofen",
  "dosage": "200mg",
  "frequency": "Once a day",
  "user_id": 1
}

## GET /reminders

Return all reminders for all users:

json

[
  {
    "id": 1,
    "reminder_time": "08:00 AM",
    "user_id": 1
  }
]

## POST /reminders

Create a reminder for a specific medication:

json

{
  "reminder_time": "08:00 AM",
  "medication_id": 1,
  "user_id": 1
}

## PATCH /reminders/

Update the time for a specific reminder:

json

{
  "reminder_time": "09:00 AM"
}

## Testing

- Run the tests using:

- bash

## pytest

- Ensure all tests pass to validate that your API behaves as expected.
