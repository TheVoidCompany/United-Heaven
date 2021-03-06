# import secrets
# from typing import List
from datetime import timedelta
from pydantic import AnyHttpUrl, BaseSettings


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"

    # SECRET_KEY: str = secrets.token_urlsafe(32)
    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: timedelta = 60 * 24 * 8

    BACKEND_CORS_ORIGINS: list[AnyHttpUrl] = ["http://localhost:3000",
                                              "https://localhost:3000",
                                              "http://united-heaven.org",
                                              "https://united-heaven.org"]

    PROJECT_NAME: str = 'United-Heaven'

    SECURITY_ALGORITHM: str = "HS256"


settings = Settings()
