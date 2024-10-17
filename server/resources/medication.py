from flask_restful import Resource, reqparse
from flask import request
from flask_jwt_extended import jwt_required
from models import Medication, db

class MedicationResource(Resource):
    parser = reqparse.RequestParser()

    parser.add_argument('medication_name', required=True, help="Medication name is required")
    parser.add_argument('description', required=True, help="Description is required")
    parser.add_argument('dosage', required=True, help="Dosage is required")
    parser.add_argument('frequency', required=True, help="Frequency intake is required")

    def post(self):
        data = self.parser.parse_args()

        medication = Medication(**data)

        db.session.add(medication)

        db.session.commit()

        return{
            "message":"medicine added successfully",
            "medication":medication.to_dict()
        },201

    def patch(self,id):
        data = self.parser.parse_args()

        medication = Medication.query.filter_by(id = id).first()

        if medication == None:
            return {"message":"Medication not found"}, 404

        medication.medication_name = data['medication_name']
        medication.description = data['description']
        medication.dosage = data['dosage']
        medication.frequency = data['frequency']

        db.session.commit()

        return {
            "message":"medication added successfully",
            "medication":medication.to_dict()
        }

    def delete(self,id):
        medication = Medication.query.filter_by(id = id).first()

        if medication ==None:
            return {"mesage":"Medication not found"}, 404

        db.session.delete(medication)

        db.session.commit()

        return {
            "message":"medication deleted successfully"
        }
        