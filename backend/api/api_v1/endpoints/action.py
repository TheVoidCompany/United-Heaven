from fastapi import APIRouter, Body, Depends, HTTPException
import models
import schemas
from queries import action as action_query


router = APIRouter()


# create an action
@router.post("/", response_model=schemas.Action)
async def create_action(user_id: str):
    return user_id


# get action by action id
@router.get("/{action_id}", response_model=schemas.Action)
async def get_action_by_id(action_id: int):
    db_action = action_query.get_action_by_id(action_id)
    db_action_att = db_action[0]["attributes"]
    return


# get trending actions
@router.get("/trending", response_model=list[schemas.Action])
async def get_trending_actions():
    return {"trending": "true"}


# get recommended actions for a user
@router.get("/recommended", response_model=list[schemas.Action])
async def get_recommended_actions():
    return


# get all current || past actions
@router.get("/", response_model=list[schemas.Action])
async def get_created_action_by_user_id(user_id: int, status: str):
    return user_id


# like action
@router.post("/like")
async def like_action(body: models.UserAction):
    return

# unlike action
@router.post("/unlike")
async def unlike_action(body: models.UserAction):
    return


# participate action
@router.post("/participate")
async def participate_action(body: models.UserAction):
    return


# un participate action
@router.post("/un_participate")
async def un_participate_action(body: models.UserAction):
    return


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
