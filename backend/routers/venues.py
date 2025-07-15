# app/routers/venues.py
from fastapi import APIRouter
from app import db, schemas

router = APIRouter(prefix="/venues", tags=["venues"])

@router.get("/", response_model=list[schemas.Venue])
def list_venues():
    return db.venues_df.to_dict(orient="records")
