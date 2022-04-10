from pydantic import BaseModel
from typing import List, Optional


class Location(BaseModel):
    latitude: str
    longitude: str
    last_updated: str


class SocialLinks(BaseModel):
    instagram_url: str
    facebook_url: str
    linkedIn_url: str


class User(BaseModel):
    user_id: str
    name: str
    email: str
    location: Location
    social_links: SocialLinks
    followed_goals: List[int]
