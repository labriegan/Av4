from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

path = os.path.dirname(os.path.abspath(__file__)) 
db_file = os.path.join(path, 'filmes.db') 

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///"+db_file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
db = SQLAlchemy(app)