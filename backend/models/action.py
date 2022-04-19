import datetime

from pydantic import BaseModel


class Action(BaseModel):
    title: str
    description: str
    goals: list[str]
    targets: list[str]
    start_date: datetime.datetime
    end_date: datetime.datetime
    is_online: bool
    location: str | None = None
    online_action_url: str | None = None
    image_url: str | None = None
    creator: str
    country: str


class UserAction(BaseModel):
    action_id: str
    user_id: str
