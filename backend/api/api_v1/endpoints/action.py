from fastapi import APIRouter, Body, Depends, HTTPException
from typing import List, Optional

from db.init_db import connect_tg
import models
import schemas

router = APIRouter()


# get all recommended actions for a user
@router.get("/", response_model=List[schemas.Action])
async def get_all_actions_for_user(user_id: int):
    return user_id


# get trending actions
@router.get("/trending", response_model=List[schemas.ActionShortInfo])
async def get_trending_actions():
    return {"trending": "true"}


# get action by action id
@router.get("/{action_id}", response_model=schemas.Action)
async def get_action_by_id(action_id: int):
    return action_id


# get own created actions by user id
@router.get("/own", response_model=List[schemas.ActionShortInfo])
async def get_created_action_by_user_id(user_id: int):
    return user_id


# get participated actions by user id
@router.get("/participated", response_model=List[schemas.ActionShortInfo])
async def get_participated_action_by_user_id(user_id: int):
    return user_id


# create action
@router.post("/create", response_model=schemas.Action)
async def create_action(action: models.Action, user_id: int):
    return {
        action: action,
        user_id: user_id
    }


# like action
@router.post("/like")
async def like_action(user_id: int, action_id: int):
    return user_id


# unlike action
@router.post("/unlike")
async def unlike_action(user_id: int, action_id: int):
    return user_id


# participate action
@router.post("/participate")
async def participate_action(user_id: int, action_id: int):
    return user_id


# edit action
@router.put("/{action_id}", response_model=schemas.Action)
async def edit_action(action_id: int, action: models.Action):
    return {
        action: action,
        action_id: action_id
    }


# delete action
@router.delete("/{action_id}")
async def delete_action(action_id: int):
    return {"deleted": True}
