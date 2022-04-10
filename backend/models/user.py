from pydantic import BaseModel


class UserCredentials(BaseModel):
    email: str
    password: str


class Location(BaseModel):
    latitude: str
    longitude: str
    last_updated: str


class SocialLinks(BaseModel):
    instagram_url: str
    facebook_url: str
    linkedIn_url: str


class User(BaseModel):
    name: str
    email: str
    password: str
    location: Location
    social_links: SocialLinks
