import datetime
import uuid

import bcrypt
import models
import requests
from db.init_db import connect_tg
from fastapi import APIRouter, File, HTTPException, Request, UploadFile
from queries.user import create_user, add_user_info, get_user_by_email, delete_user_by_id

router = APIRouter()
conn = connect_tg()


@router.post("/login")
async def login_user(credentials: models.UserCredentials):
    # get user by email
    db_user = get_user_by_email(credentials.email)

    # if no user found, return error
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db_user_attributes = db_user[0]["attributes"]

    # check if password is correct
    if not bcrypt.checkpw(credentials.password, db_user_attributes["password"]):
        raise HTTPException(status_code=400, detail="Incorrect password")

    # if password is correct, return user
    return {
        "user_id": db_user_attributes["user"],
        "name": db_user_attributes["name"],
        "email": db_user_attributes["emailId"],
        "timezone": db_user_attributes["timezone"],
        "image_url": db_user_attributes["imageUrl"],
        "social_links": db_user_attributes["socialLinks"]
    }


@router.post("/signup")
async def register_user(user: models.User, request: Request):

    # check if user exist
    db_user = get_user_by_email(user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="User already exist")

    # Get info from ip
    # client_ip = request.client.host
    client_ip = "113.193.147.7"
    client_ip_info = requests.get("http://ip-api.com/json/" + client_ip).json()

    user_id = str(uuid.uuid4())
    current_date = str(datetime.datetime.now())

    try:
        result = create_user(user_id, client_ip_info["countryCode"], current_date)
        print(result)
    except Exception as e:
        raise HTTPException(
            status_code=400, detail="Error while creating user")

    # handle user lat and lon
    lat = client_ip_info["lat"]
    lon = client_ip_info["lon"]
    if user.location:
        lat = user.location.latitude
        lon = user.location.longitude

    timezone = client_ip_info['timezone']

    try:
        add_user_info(user_id, user.name, user.email, user.password, lat, lon, timezone, user.social_links)
    except Exception as e:
        delete_user_by_id(user_id)
        raise HTTPException(
            status_code=400, detail="Error while creating user")

    return {
        "user_id": user_id,
        "name": user.name,
        "email": user.email,
        "timezone": timezone
    }


# for development
@router.post("/delete_user/{user_id}")
async def delete_user(user_id: str):
    result = conn.delVerticesById("User", user_id)
    conn.delVerticesById("UserInfo", user_id)
    return result
