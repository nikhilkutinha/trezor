from fastapi import APIRouter

from app.api.routes import pastes

router = APIRouter()

router.include_router(pastes.router, tags=["pastes"], prefix="/pastes")