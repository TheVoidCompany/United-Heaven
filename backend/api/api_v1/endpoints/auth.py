from fastapi import APIRouter, Body, Depends, HTTPException

from db.init_db import connect_tg
import models

router = APIRouter()


@router.get("/")
def testing():
    return {"Hello": "World"}


@router.post("/login")
async def login_user(credentials: models.UserCredentials):
    return credentials


@router.post("/signup")
async def register_user(user: models.User):
    return user
