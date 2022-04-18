import bcrypt
import models
from fastapi import APIRouter, HTTPException, Response
import schemas
from queries import user as user_query
from core import security
from core.settings import settings


router = APIRouter()


@router.post("/", response_model=schemas.User)
async def login_user(credentials: models.UserCredentials, response: Response):
    # get user by email
    db_user = user_query.get_user_by_email(credentials.email)

    if not db_user:
        raise HTTPException(status_code=401, detail="Email or password is incorrect")

    db_user_att = db_user[0]["attributes"]

    # check if password is correct
    if not security.passwords_equal(credentials.password, db_user_att["password"]):
        raise HTTPException(status_code=401, detail="Email or Password is incorrect")

    # create jwt and attach as header
    expires_delta = settings.ACCESS_TOKEN_EXPIRE_MINUTES
    user_jwt = security.generate_access_token(
        data={
            "id": db_user_att["user"],
            "name": db_user_att["name"],
            "email": db_user_att["email"]
            },
        expires_delta=expires_delta
    )

    # set response headers
    response.headers["x-auth-token"] = user_jwt

    # if password is correct, return user
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


# for development
@router.post("/delete_user/{user_id}")
async def delete_user(user_id: str):
    return user_query.delete_user_by_id(user_id) and user_query.delete_user_info_by_id(user_id)
