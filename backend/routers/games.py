from utils import calculate_home_win_percentage
from fastapi import APIRouter, HTTPException
import db, schemas

router = APIRouter(prefix="/games", tags=["games"])

@router.get("/", response_model=list[schemas.Game])
def list_games():
    games = db.games_join_venue_df.to_dict(orient="records")
    if not games:
        raise HTTPException(status_code=404, detail="No games found")
    return games

@router.get("/{game_id}", response_model=schemas.Game)
def get_game(game_id: int):
    match = db.games_join_venue_df[db.games_join_venue_df["id"] == game_id]
    if match.empty:
        raise HTTPException(status_code=404, detail="Game not found")

    game = match.iloc[0]
    return {
        "id": int(game["id"]),
        "home_team": game["home_team"],
        "away_team": game["away_team"],
        "date": game["date"],
        "venue_id": int(game["venue_id"]),
        "venue_name": game["venue_name"]
    }

@router.get("/{game_id}/home_win_percentage")
def home_win_percentage(game_id: int):
    # Look up the game
    game = db.games_df[db.games_df["id"] == game_id]
    if game.empty:
        raise HTTPException(status_code=404, detail="Game not found.")
    home_team = game.iloc[0]['home_team']
    away_team = game.iloc[0]['away_team']

    # Calculate and return home win %
    win_pct = calculate_home_win_percentage(home_team, away_team, db.simulations_df)
    return {"home_win_percentage": win_pct}
