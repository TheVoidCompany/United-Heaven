from pydantic import BaseModel


class UserCredentials(BaseModel):
    email: str
    password: str


class Location(BaseModel):
    latitude: float
    longitude: float


class SocialLinks(BaseModel):
    instagram_url: str
    facebook_url: str
    linkedIn_url: str


class User(BaseModel):
    name: str
    email: str
    password: str
    location: Location | None = None  # Optional[Location]
    social_links: SocialLinks


class Password(BaseModel):
    old_pass: str
    new_pass: str
