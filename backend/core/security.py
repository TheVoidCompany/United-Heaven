# from typing import Any, Union
# from passlib.context import CryptContext
from datetime import datetime, timedelta
from core.settings import settings
from jose import JWTError, jwt
import config
import bcrypt


def generate_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=60*24*8)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, config.JWT_SECRET_KEY, algorithm=settings.SECURITY_ALGORITHM)
    return encoded_jwt


def check_access_token(token: str):
    payload = jwt.decode(token, config.JWT_SECRET_KEY, algorithms=[settings.SECURITY_ALGORITHM])
    return payload


def generate_hashed_password(password: str):
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed_password.decode('utf-8')


def passwords_equal(gvn_pass: str, strd_pass: str):
    given_pass = gvn_pass
    stored_pass = strd_pass
    return bcrypt.checkpw(gvn_pass.encode('utf-8'), stored_pass.encode('utf-8'))

# from jose import jwt
# from core.settings import settings
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# ALGORITHM = "HS256"
#
#
# def create_access_token(
#     subject: Union[str, Any], expires_delta: timedelta = None
# ) -> str:
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(
#             minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
#         )
#     to_encode = {"exp": expire, "sub": str(subject)}
#     encoded_jwt = jwt.encode(
#         to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt
#
#
# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     return pwd_context.verify(plain_password, hashed_password)
#
#
# def get_password_hash(password: str) -> str:
#     return pwd_context.hash(password)
