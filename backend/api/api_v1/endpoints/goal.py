from fastapi import APIRouter, Body, Depends, HTTPException
from db.init_db import connect_tg
import models
from queries import goal as goal_query
from datetime import datetime

router = APIRouter()

# get all followed goals, follow goal, unfollow goal

# get recommended goals for a user
@router.get("/")
async def get_recommended_goals_for_user(user_id: int):
    return user_id


# get related actions by goal id
@router.get("/get_related_actions/{goal_id}")
async def get_related_actions_by_goal_id(goal_id: int):
    return goal_id


# follow goal
@router.post("/follow")
async def follow_goal(user_goal: models.UserGoal):
    liked_date = str(datetime.now())
    goal_query.user_follow_goal(user_goal.user_id, user_goal.goal_id, liked_date)


# unfollow goal
@router.post("/unfollow")
async def unfollow_goal(user_goal: models.UserGoal):
    goal_query.user_unfollow_goal(user_goal.user_id, user_goal.goal_id)