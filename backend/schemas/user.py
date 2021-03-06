from pydantic import BaseModel
# from typing import List, Optional


class Location(BaseModel):
    latitude: float
    longitude: float


class SocialLinks(BaseModel):
    instagram_url: str
    facebook_url: str
    linkedIn_url: str


class User(BaseModel):
    user_id: str
    name: str
    email: str
    image_url: str
    social_links: SocialLinks
    timezone: str
    location: Location
