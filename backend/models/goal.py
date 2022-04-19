from pydantic import BaseModel


class UserGoal(BaseModel):
    goal_id: str
    user_id: str
