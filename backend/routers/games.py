# app/routers/games.py
from fastapi import APIRouter, HTTPException
from app import db, schemas

router = APIRouter(prefix="/games", tags=["games"])

@router.get("/", response_model=list[schemas.Game])
def list_games():
    return db.games_df.to_dict(orient="records")

@router.get("/{game_id}", response_model=schemas.GameDetail)
def get_game(game_id: int):
    match = db.games_df[db.games_df["id"] == game_id]
    if match.empty:
        raise HTTPException(status_code=404, detail="Game not found")

    game = match.iloc[0]
    venue = db.venues_df[db.venues_df["id"] == game["venue_id"]].iloc[0]
    return {
        "home_team": game["home_team"],
        "away_team": game["away_team"],
        "venue": venue["name"],
    }
