from fastapi import APIRouter, HTTPException

from db.init_db import connect_tg
import models

router = APIRouter()


# get user by id
@router.get("/")
async def get_user_by_id(user_id: int):
    return user_id


# edit user profile by id
@router.put("/edit")
async def edit_user_by_id(user_id: int, user: models.User):
    return user_id


# get user notification
@router.get("/notification")
async def get_user_notification(user_id: int):
    return user_id
