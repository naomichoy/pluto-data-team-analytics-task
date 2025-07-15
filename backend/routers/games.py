from fastapi import APIRouter, HTTPException
import db, schemas

router = APIRouter(prefix="/games", tags=["games"])

@router.get("/", response_model=list[schemas.Game])
def list_games():
    # Return all games, including all schema fields.
    games = db.games_df.to_dict(orient="records")
    return games

@router.get("/{game_id}", response_model=schemas.Game)
def get_game(game_id: int):
    match = db.games_df[db.games_df["id"] == game_id]
    if match.empty:
        raise HTTPException(status_code=404, detail="Game not found")

    game = match.iloc[0]
    return {
        "id": int(game["id"]),
        "home_team": game["home_team"],
        "away_team": game["away_team"],
        "date": game["date"],
        "venue_id": int(game["venue_id"])
    }
