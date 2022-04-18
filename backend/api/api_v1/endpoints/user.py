from fastapi import APIRouter, HTTPException, UploadFile, Request, Response, Header
import requests
import uuid
from datetime import datetime
import json
import models
import schemas
import queries.user as user_query
from core import security
from core.settings import settings
import cloudinary
import cloudinary.uploader
import cloudinary.api
import config as cfg
from pyTigerGraph.pyTigerGraph import TigerGraphException
from jose import JWTError


router = APIRouter()
cloudinary.config(
  cloud_name=cfg.CLOUDINARY_CLOUD_NAME,
  api_key=cfg.CLOUDINARY_API_KEY,
  api_secret=cfg.CLOUDINARY_API_SECRET,
  secure=True
)


# register user
@router.post("/", response_model=schemas.User)
async def register_user(user: models.User, request: Request, response: Response):
    # check if user already exists
    try:
        db_user = user_query.get_user_by_email(user.email)
    except TigerGraphException:
        raise HTTPException(status_code=500, detail="Error occurred while creating user -1")

    if db_user:
        raise HTTPException(status_code=401, detail="User already exists")

    # Get info from ip
    # client_ip = request.client.host
    client_ip = "123.193.147.7"
    client_ip_info = requests.get("http://ip-api.com/json/" + client_ip).json()

    # convert iso2 country code to iso3
    json_file = open("utils/country_details.json")
    countries = json.load(json_file)
    country_code = ""
    for country in countries:
        if country["code"] == client_ip_info["countryCode"]:
            country_code = country["code3"]

    # generate user_id and get current datetime
    user_id = str(uuid.uuid4())
    current_date = datetime.now()
    creation_date = str(current_date)

    # create user vertex
    try:
        new_db_user = user_query.create_user(user_id, country_code, creation_date)
    except TigerGraphException:
        raise HTTPException(status_code=500, detail="Error occurred while creating user -2")

    # create user_info vertex
    # handle user lat and lon
    lat = client_ip_info["lat"]
    lon = client_ip_info["lon"]
    if user.location:
        lat = user.location.latitude
        lon = user.location.longitude

    timezone = client_ip_info["timezone"]

    # check if this throws error
    hashed_password = security.generate_hashed_password(user.password)

    try:
        db_user_info = user_query.create_user_info(
            user_id,
            user.name,
            user.email,
            hashed_password,
            lat,
            lon,
            timezone,
            user.social_links
        )
    except TigerGraphException:
        user_query.delete_user_by_id(user_id)
        raise HTTPException(status_code=500, detail="Error occurred while creating user -3")

    # create user_has_info edge
    try:
        user_query.connect_user_user_info(user_id)
    except TigerGraphException:
        user_query.delete_user_by_id(user_id)
        user_query.delete_user_info_by_id(user_id)
        raise HTTPException(status_code=500, detail="Error occurred while creating user -4")

    # create user_in_country edge
    try:
        user_query.connect_user_country(user_id, country_code)
    except TigerGraphException:
        user_query.delete_user_by_id(user_id)
        user_query.delete_user_info_by_id(user_id)
        raise HTTPException(status_code=500, detail="Error occurred while creating user -5")

    # create user_in year edge
    # extract year from datetime
    year = str(current_date.year)
    try:
        user_query.connect_user_year(user_id, year)
    except TigerGraphException:
        user_query.delete_user_by_id(user_id)
        user_query.delete_user_info_by_id(user_id)
        raise HTTPException(status_code=500, detail="Error occurred while creating user -6")

    # create jwt for the user and set the x-auth-token header
    expires_delta = settings.ACCESS_TOKEN_EXPIRE_MINUTES
    user_jwt = security.generate_access_token(
        data={"id": user_id, "name": user.name, "email": user.email},
        expires_delta=expires_delta
    )
    response.headers["x-auth-token"] = user_jwt

    return {
        "user_id": user_id,
        "name": user.name,
        "email": user.email,
        "image_url": None,
        "location": {
            "latitude": lat,
            "longitude": lon
        },
        "timezone": timezone,
        "social_links": {
            "instagram_url": user.social_links.instagram_url,
            "facebook_url": user.social_links.facebook_url,
            "linkedIn_url": user.social_links.linkedIn_url
        }
    }


# get user by id (Auth)
@router.get("/{user_id}", response_model=schemas.User)
async def get_user_details(user_id: str, x_auth_token: str | None = Header(None)):
    # check jwt
    if x_auth_token is None:
        raise HTTPException(status_code=401, detail="Authentication failed, No auth token")

    try:
        payload = security.check_access_token(x_auth_token)
    except JWTError:
        raise HTTPException(status_code=401, detail="Authentication failed, Signature verification failed")

    # check if the jwt id is the same id as user else return 403
    if payload.get("id") != user_id:
        raise HTTPException(status_code=403, detail="Not authorized, Access forbidden")

    db_user = user_query.get_user_by_id(user_id)
    db_user_att = db_user[0]["attributes"]
    if not db_user_att:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "user_id": db_user_att["user"],
        "name": db_user_att["name"],
        "email": db_user_att["email"],
        "image_url": db_user_att["imageUrl"],
        "location": {
            "latitude": db_user_att["latitude"],
            "longitude": db_user_att["longitude"]
        },
        "timezone": db_user_att["timezone"],
        "social_links": {
            "instagram_url": db_user_att["socialLinks"]["instagramUrl"],
            "facebook_url": db_user_att["socialLinks"]["facebookUrl"],
            "linkedIn_url": db_user_att["socialLinks"]["linkedInUrl"]
        }
    }


# edit user profile by id (Auth)
@router.put("/{user_id}", response_model=schemas.User)
async def update_user_details(user_id: str, user: models.User, x_auth_token: str | None = Header(None)):
    # get previous user details
    db_user_att = user_query.get_user_by_id(user_id)
    db_user_att = db_user_att[0]["attributes"]

    # update user details
    new_db_user = user_query.update_user_by_id(
        user_id,
        user.name,
        db_user_att["email"],
        db_user_att["password"],
        db_user_att["imageUrl"],
        db_user_att["latitude"],
        db_user_att["longitude"],
        db_user_att["timezone"],
        {
            "instagramUrl": user.social_links.instagram_url,
            "facebookUrl": user.social_links.facebook_url,
            "linkedInUrl": user.social_links.linkedIn_url
        }
    )

    return {
        "user_id": user_id,
        "name": user.name,
        "email": db_user_att["user"],
        "image_url": db_user_att["imageUrl"],
        "location": {
            "latitude": db_user_att["latitude"],
            "longitude": db_user_att["longitude"]
        },
        "timezone": db_user_att["timezone"],
        "social_links": {
            "instagram_url": user.social_links.instagram_url,
            "facebook_url": user.social_links.facebook_url,
            "linkedIn_url": user.social_links.linkedIn_url
        },
    }


# update user password (Auth)
@router.put("/{user_id}/pass")
async def update_user_password(user_id: str,  passwords: models.Password, x_auth_token: str | None = Header(None)):
    # check if the old password is matching
    db_user = user_query.get_user_by_id(user_id)
    db_user_att = db_user[0]["attributes"]
    if not security.passwords_equal(passwords.old_pass, db_user_att["password"]):
        raise HTTPException(status_code=403, detail="Password is wrong, Can't change password")

    # update the new pass
    hashed_new_pass = security.generate_hashed_password(passwords.new_pass)
    new_db_user = user_query.update_user_by_id(
        user_id,
        db_user_att["name"],
        db_user_att["email"],
        hashed_new_pass,
        db_user_att["imageUrl"],
        db_user_att["latitude"],
        db_user_att["longitude"],
        db_user_att["timezone"],
        db_user_att["socialLinks"]
    )

    return


# get user notification (Auth)
@router.get("/{user_id}/notification")
async def get_user_notification(user_id: str):
    return None


# update user profile picture (Auth)
@router.put("/{user_id}/upload-profile", response_model=schemas.User)
async def upload_profile_pic(user_id: str, file: UploadFile, x_auth_token: str | None = Header(None)):
    # upload file to cloudinary
    image_result = cloudinary.uploader.upload(
        file.file,
        folder="united-heaven/images",
        resource_type="image"
    )

    # update the image_url for the required user
    db_user = user_query.get_user_by_id(user_id)
    db_user_att = db_user[0]["attributes"]

    # update user details
    new_db_user = user_query.update_user_by_id(
        user_id,
        db_user_att["name"],
        db_user_att["email"],
        db_user_att["password"],
        image_result["secure_url"],
        db_user_att["latitude"],
        db_user_att["longitude"],
        db_user_att["timezone"],
        db_user_att["socialLinks"]
    )

    return {
        "user_id": db_user_att["user"],
        "name": db_user_att["name"],
        "email": db_user_att["email"],
        "image_url": db_user_att["imageUrl"],
        "location": {
            "latitude": db_user_att["latitude"],
            "longitude": db_user_att["longitude"]
        },
        "timezone": db_user_att["timezone"],
        "social_links": {
            "instagram_url": db_user_att["socialLinks"]["instagramUrl"],
            "facebook_url": db_user_att["socialLinks"]["facebookUrl"],
            "linkedIn_url": db_user_att["socialLinks"]["linkedInUrl"]
        }
    }
