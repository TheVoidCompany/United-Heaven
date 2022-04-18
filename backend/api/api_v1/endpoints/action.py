from fastapi import APIRouter, Body, Depends, HTTPException
from typing import List, Optional
from db.init_db import connect_tg
import models
import schemas


router = APIRouter()


# create an action
@router.post("/", response_model=schemas.Action)
async def create_action(user_id: str):
    return user_id


# get action by action id
@router.get("/{action_id}", response_model=schemas.Action)
async def get_action_by_id(action_id: int):
    return action_id


# get trending actions
@router.get("/trending", response_model=List[schemas.ActionShortInfo])
async def get_trending_actions():
    return {"trending": "true"}


# get own created actions by user id
@router.get("/own", response_model=List[schemas.ActionShortInfo])
async def get_created_action_by_user_id(user_id: int, status: str):
    return user_id


# like action
@router.post("/like")
async def like_action(body: models.UserAction):



# unlike action
@router.post("/unlike")
async def unlike_action(body: models.UserAction):
    return user_id


# participate action
@router.post("/participate")
async def participate_action(body: models.UserAction):
    return user_id


# un participate action
@router.post("/un_participate")
async def un_participate_action(body: models.UserAction):
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
