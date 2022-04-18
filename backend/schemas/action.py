import datetime
from pydantic import BaseModel
from typing import List, Optional


class Action(BaseModel):
    action_id: str
    title: str
    description: str
    goals: list[str]
    target: list[str]
    start_date: datetime.datetime
    end_date: datetime.datetime
    is_online: bool
    location: str | None = None
    related_url: str | None = None
    image: str
    creator: str


class ActionShortInfo(BaseModel):
    action_id: str
    title: str
    image: str
