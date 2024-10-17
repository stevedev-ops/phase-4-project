from flask_restful import Resource, reqparse
from flask import request
from flask_jwt_extended import jwt_required
from models import Reminder, db

class ReminderResource(Resource):
    parser = reqparse.RequestParser()

    parser.add_argument('reminder_time', required=True, help="Time is required")
    parser.add_argument('reminder_date', required=True, help="Date is required")
    
    def post(self):
        data = self.parser.parse_args()

        reminder = Reminder(**data)

        db.session.add(reminder)

        db.session.commit()

        return{
            "message":"reminder added successfully",
            "reminder":reminder.to_dict()
        },201

    def patch(self,id):
        data = self.parser.parse_args()

        reminder = Reminder.query.filter_by(id = id).first()

        if reminder == None:
            return {"message":"Reminder not found"}, 404

        reminder.reminder_time = data['reminder_time']
        reminder.reminder_date= data['reminder_date']
        
        db.session.commit()

        return {
            "message":"reminder added successfully",
            "reminder":reminder.to_dict()
        }

    def delete(self,id):
        reminder = reminder.query.filter_by(id = id).first()

        if reminder == None:
            return {"mesage":"Reminder not found"}, 404

        db.session.delete(reminder)

        db.session.commit()

        return {
            "message":"reminder deleted successfully"
        }