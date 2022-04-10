import datetime

from pydantic import BaseModel
from typing import List, Optional


class Action(BaseModel):
    title: str
    description: str
    related_goals: List[int]
    start_date: datetime.datetime
    end_date: datetime.datetime
    is_online: bool
    location: Optional[str]
    related_url: str
    image: str
