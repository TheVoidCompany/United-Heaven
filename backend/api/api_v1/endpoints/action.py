from fastapi import APIRouter, Body, Depends, HTTPException, Header, UploadFile
import models
import schemas
from queries import action as action_query
import uuid
import cloudinary
import cloudinary.uploader
import cloudinary.api
import config as cfg
from datetime import datetime


router = APIRouter()
cloudinary.config(
  cloud_name=cfg.CLOUDINARY_CLOUD_NAME,
  api_key=cfg.CLOUDINARY_API_KEY,
  api_secret=cfg.CLOUDINARY_API_SECRET,
  secure=True
)


# create an action
@router.post("/", response_model=schemas.Action)
async def create_action(action: models.Action):
    # create action vertex
    action_id = str(uuid.uuid4())
    current_date = datetime.now()
    creation_date = str(current_date)
    db_action = action_query.create_action(
        action_id,
        action.title,
        action.description,
        action.goals,
        action.targets,
        str(action.start_date),
        str(action.end_date),
        action.is_online,
        action.location,
        action.online_action_url,
        action.creator,
        creation_date
    )

    print(action_id)

    # create edge between user and action: creation
    action_query.user_creates_action(action.creator, action_id, creation_date)

    # create edge between user and action: participation
    action_query.user_participates_action(action.creator, action_id, creation_date)

    # create edge between action and year
    year = str(current_date.year)
    action_query.action_in_year(action_id, year)

    # create edge between action  and country
    action_query.action_in_country(action_id, action.country)

    # create edge between goals and  action
    action_goals = []
    for goal in action.goals:
        action_goals.append((action_id, goal))
    print(action_goals)
    action_query.action_has_goals(action_goals)

    # create edge between targets and action
    action_targets = []
    for target in action.targets:
        action_targets.append((action_id, target))
    print(action_targets)
    action_query.action_has_targets(action_targets)

    return {
        "action_id": action_id,
        "title": action.title,
        "description": action.description,
        "goals": action.goals,
        "targets": action.targets,
        "start_date": action.start_date,
        "end_date": action.end_date,
        "is_online": action.is_online,
        "location": action.location,
        "online_action_url": action.online_action_url,
        "image_url": action.image_url,
        "creator": action.creator
    }


# get action by action id
@router.get("/{action_id}", response_model=schemas.Action)
async def get_action_by_id(action_id: str):
    db_action = action_query.get_action_by_id(action_id)
    db_action_att = db_action[0]["attributes"]
    print(db_action_att)
    return {
        "action_id": db_action_att["id"],
        "title": db_action_att["title"],
        "description": db_action_att["description"],
        "goals": db_action_att["goals"],
        "targets": db_action_att["targets"],
        "start_date": db_action_att["startDate"],
        "end_date": db_action_att["endDate"],
        "is_online": db_action_att["isOnline"],
        "location": db_action_att["location"],
        "online_action_url": db_action_att["onlineActionUrl"],
        "image_url": db_action_att["imageUrl"],
        "creator": db_action_att["creator"]
    }


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
async def get_created_action_by_user_id(user_id: str, status: str):
    return user_id


# like action
@router.post("/like")
async def like_action(body: models.UserAction):
    current_date = datetime.now()
    liked_date = str(current_date)
    action_query.user_liked_action(body.user_id, body.action_id, liked_date)
    return


# unlike action
@router.post("/unlike")
async def unlike_action(body: models.UserAction):
    current_date = datetime.now()
    action_query.user_unliked_action(body.user_id, body.action_id)
    return


# participate action
@router.post("/participate")
async def participate_action(body: models.UserAction):
    current_date = datetime.now()
    participation_date = str(current_date)
    action_query.user_participates_action(body.user_id, body.action_id, participation_date)
    return


# un participate action
@router.post("/unparticipate")
async def un_participate_action(body: models.UserAction):
    current_date = datetime.now()
    action_query.user_unparticipates_action(body.user_id, body.action_id)
    return


# edit action
@router.put("/{action_id}", response_model=schemas.Action)
async def edit_action(action_id: str, action: models.Action):
    db_action = action_query.get_action_by_id(action_id)
    db_action_att = db_action[0]["attributes"]
    new_db_action = action_query.create_action(
        db_action_att["id"],
        action.title,
        action.description,
        action.goals,
        action.targets,
        str(action.start_date),
        str(action.end_date),
        action.is_online,
        action.location,
        action.online_action_url,
        db_action_att["creator"],
        db_action_att["creationDate"]
    )

    # change country
    # get action country
    action_query.get_action_country
    action_query.remove_action_in_country(action_id, )
    action_query.action_in_country(action_id, action.country)

    # change goals and targets

    return


# delete action
@router.delete("/{action_id}")
async def delete_action(action_id: str):
    action_query.delete_action_by_id(action_id)
    return


# update action picture (Auth)
@router.put("/{action_id}/upload-picture", response_model=schemas.Action)
async def upload_profile_pic(action_id: str, file: UploadFile, x_auth_token: str | None = Header(None)):
    # upload file to cloudinary
    image_result = cloudinary.uploader.upload(
        file.file,
        folder="united-heaven/images/actions",
        resource_type="image"
    )

    # update the image_url for the required user
    db_action = action_query.get_action_by_id(action_id)
    db_action_att = db_action[0]["attributes"]

    # update user details
    new_db_user = action_query.update_action(
        db_action_att["id"],
        db_action_att["title"],
        db_action_att["description"],
        db_action_att["goals"],
        db_action_att["targets"],
        db_action_att["startDate"],
        db_action_att["endDate"],
        db_action_att["isOnline"],
        db_action_att["location"],
        db_action_att["onlineActionUrl"],
        image_result["secure_url"],
        db_action_att["creator"],
        db_action_att["creationDate"]
    )

    return {
        "action_id": db_action_att["id"],
        "title": db_action_att["title"],
        "description": db_action_att["description"],
        "goals": db_action_att["goals"],
        "targets": db_action_att["targets"],
        "start_date": db_action_att["startDate"],
        "end_date": db_action_att["endDate"],
        "is_online": db_action_att["isOnline"],
        "location": db_action_att["location"],
        "online_action_url": db_action_att["onlineActionUrl"],
        "image_url": image_result["secure_url"],
        "creator": db_action_att["creator"]
    }

