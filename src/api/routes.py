"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError, DataError
from sqlalchemy import select, delete, and_, or_, func
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)



@api.route('/private', methods=['GET'])
@jwt_required()
def visualize_private():
    logged = get_jwt_identity()
    stmt = select(User).where(User.id==logged)
    user = db.session.execute(stmt).scalar_one_or_none()

    if user:
        return jsonify({"success": "User found and logged in", "user": {
                "email": user.email,
            }}), 200
    else:
        return jsonify({"error": "Not found any user logged"}), 404
    
@api.route('/signup', methods=['POST'])
def register():
    try:
        email = request.json.get("email")
        password = request.json.get("password")


        if not email or not password:
            return jsonify({"error": "Fields username/password are empty"}), 400
        
        encrypted_password = generate_password_hash(password)


        user = User(email=email, password=encrypted_password)
        db.session.add(user)
        db.session.commit()
            
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"error": True, "response": str(e)}), 409
    except DataError as e:
        db.session.rollback()
        return jsonify({"error": "Incorrect format"}), 422
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "User couldnt be created"}), 500
    
    return jsonify({"success": True}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = request.json.get("email")
    password = request.json.get("password")
    if not email or not password:
        return jsonify({"error":"Fields username/password are empty"}), 400
    
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error":"User not found"}), 404
    elif not check_password_hash(user.password, data["password"]):
        return jsonify({"error":"Password is incorrect"}), 401
    
    token = create_access_token(identity=user.id)
    
    return jsonify({"success": "User logged successfully", "token": token}),200
    


    


        
    


    

    
