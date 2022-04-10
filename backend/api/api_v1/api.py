from fastapi import APIRouter

from api.api_v1.endpoints import auth, user, action, goal, search, suggestion, sight

api_router = APIRouter()
api_router.include_router(auth.router, tags=["auth"])
api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(action.router, prefix="/action", tags=["action"])
api_router.include_router(goal.router, prefix="/goal", tags=["goal"])
api_router.include_router(search.router, prefix="/search", tags=["search"])
api_router.include_router(suggestion.router, prefix="/suggestion", tags=["suggestion"])
api_router.include_router(sight.router, prefix="/sight", tags=["sight"])