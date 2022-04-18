from fastapi import APIRouter, Body, Depends, HTTPException
from typing import List, Optional

from db.init_db import connect_tg
import models
import schemas

router = APIRouter()

# get feed for the user according to his goal following, action likes, participation and creation
# feed will include actions, news and events
# should be able to filter feed ->

# get feed for a user
@router.get("/")
async def get_feed_for_user(user_id: int):
    return user_id
