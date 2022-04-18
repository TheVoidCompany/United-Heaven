from fastapi import APIRouter, HTTPException

from db.init_db import connect_tg
import models

router = APIRouter()

# search for actions, news, and events inside of feed -> home and actions tab
# could search for actions, events and news

@router.get("/")
async def search(query: str):
    return query

