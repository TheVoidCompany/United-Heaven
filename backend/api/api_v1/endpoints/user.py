from fastapi import APIRouter, HTTPException, UploadFile

from db.init_db import connect_tg
import models
import schemas

router = APIRouter()


# get user by id
@router.get("/", response_model=schemas.User)
async def get_user_by_id(user_id: int):
    return user_id


# edit user profile by id
@router.put("/edit", response_model=schemas.User)
async def edit_user_by_id(user_id: int, user: models.User):
    return user_id


# get user notification
@router.get("/notification")
async def get_user_notification(user_id: int):
    return user_id


# upload user profile picture
@router.post("/upload_profile_pic/{user_id}")
async def upload_profile_pic(user_id: str, file: UploadFile):
    return {"filename": file.filename}
