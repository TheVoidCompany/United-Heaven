from fastapi import APIRouter, Body, Depends, HTTPException

from db.init_db import connect_tg
import models

router = APIRouter()


# get user by id
@router.get("/")
async def get_user_by_id(user_id: int):
    return user_id
