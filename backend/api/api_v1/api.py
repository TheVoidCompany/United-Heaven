from fastapi import APIRouter

from api.api_v1.endpoints import auth, user, feed, action, goal, search, suggestion, sight

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(user.router, prefix="/user", tags=["User"])
api_router.include_router(feed.router, prefix="/feed", tags=["Feed"])
api_router.include_router(action.router, prefix="/action", tags=["Action"])
api_router.include_router(goal.router, prefix="/goal", tags=["Goal"])
api_router.include_router(search.router, prefix="/search", tags=["Search"])
api_router.include_router(suggestion.router, prefix="/suggestion", tags=["suggestion"])
api_router.include_router(sight.router, prefix="/sight", tags=["sight"])
