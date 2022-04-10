from fastapi import APIRouter, HTTPException

from db.init_db import connect_tg
import models

router = APIRouter()


@router.get("/")
async def search(query: str):
    return query

