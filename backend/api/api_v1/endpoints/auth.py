from fastapi import APIRouter, HTTPException

from db.init_db import connect_tg
import models

router = APIRouter()


@router.post("/login")
async def login_user(credentials: models.UserCredentials):
    return credentials


@router.post("/signup")
async def register_user(user: models.User):
    return user
