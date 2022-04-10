from fastapi import APIRouter, Body, Depends, HTTPException

from db.init_db import connect_tg
import models

router = APIRouter()


# get all country index
@router.get("/index")
async def get_all_country_index():
    return "index"
