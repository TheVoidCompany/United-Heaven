from fastapi import APIRouter, Body, Depends, HTTPException

from db.init_db import connect_tg
import models

router = APIRouter()


# get recommended goals for a user
@router.get("/")
async def get_recommended_goals_for_user(user_id: int):
    return user_id


# get related actions by goal id
@router.get("/get_related_actions/{goal_id}")
async def get_related_actions_by_goal_id(goal_id: int):
    return goal_id


# get statistics for goal by id
@router.get("/statistics/{goal_id}")
async def get_statistics_by_goal_id(goal_id: int):
    return goal_id


# follow goal
@router.post("/follow")
async def follow_goal(goal_id: int, user_id: int):
    return goal_id
