from fastapi import APIRouter, Body, Depends, HTTPException

from db.init_db import connect_tg
import models

router = APIRouter()


# get all goal suggestions for globe
@router.get("/goal")
async def get_all_goal_suggestions_for_globe():
    return "globe"


# get all target suggestions for globe
@router.get("/target")
async def get_all_target_suggestions_for_globe():
    return "globe"


# get all goal suggestions for nation
@router.get("/goal/{iso_3}")
async def get_all_goal_suggestions_for_nation(iso_3: str):
    return "nation"


# get all target suggestions for nation
@router.get("/target/{iso_3}")
async def get_all_target_suggestions_for_nation(iso_3: str):
    return "nation"
