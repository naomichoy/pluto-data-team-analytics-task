# app/routers/venues.py
from fastapi import APIRouter, HTTPException
import db, schemas

router = APIRouter(prefix="/venues", tags=["venues"])

@router.get("/", response_model=list[schemas.Venue])
def list_venues():
    return db.venues_df.to_dict(orient="records")

@router.get("/{venue_id}", response_model=schemas.Venue)
def get_venue(venue_id: int):
    match = db.venues_df[db.venues_df["venue_id"] == venue_id]
    if match.empty:
        raise HTTPException(status_code=404, detail="Venue not found")

    venue = match.iloc[0]
    return {
        "venue_id": int(venue["venue_id"]),
        "venue_name": venue["venue_name"]
    }
    
@router.get("/{venue_id}/games", response_model=list[schemas.Game])
def get_venue_games(venue_id: int):
    match = db.games_join_venue_df[db.games_join_venue_df["venue_id"] == venue_id]
    if match.empty:
        raise HTTPException(status_code=404, detail="No game found for this venue")

    return match.to_dict(orient="records")



