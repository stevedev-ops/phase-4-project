import os

from flask import Flask,jsonify,make_response
from flask_migrate import Migrate
from flask_restful import Resource,Api
from flask_cors import CORS
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from models import db, User, Medication, Reminder
from resources.user import UserResource, LoginResource
from resources.medication import MedicationResource
from resources.reminder import ReminderResource

load_dotenv()


# create flask instance
app = Flask(__name__)

# setup cors
CORS(app)

# setup flask-restful
api = Api(app)

# set up flask-bcrypt
bcrypt = Bcrypt(app)

jwt = JWTManager(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET_KEY')

migrate = Migrate(app,db)

db.init_app(app)

class Index(Resource):
    def get(self):
        return {"Message":"welcome"}

api.add_resource(Index, '/')
api.add_resource(UserResource,'/users')
api.add_resource(LoginResource,'/login')
api.add_resource(MedicationResource,'/medication','/medication/<id>')
api.add_resource(ReminderResource,'/reminder','/reminder/<id>')

if __name__ == '__main__':
    app.run(debug=True)