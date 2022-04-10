import datetime

from pydantic import BaseModel
from typing import List, Optional


class Action(BaseModel):
    action_id: str
    title: str
    description: str
    related_goals: List[int]
    start_date: datetime.datetime
    end_date: datetime.datetime
    is_online: bool
    location: Optional[str]
    related_url: str
    image: str


class ActionShortInfo(BaseModel):
    action_id: str
    title: str
    image: str
