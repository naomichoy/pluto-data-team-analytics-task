from fastapi import APIRouter, HTTPException
import db, schemas

from utils import calculate_home_win_percentage

router = APIRouter(prefix="/simulations", tags=["simulations"])

@router.get("/", response_model=list[schemas.Simulation])
def list_simulations():
    return db.simulations_df.to_dict(orient="records")

@router.get("/teams", response_model=list[schemas.Team])
def list_unique_teams():
    unique_teams = db.team_names_df.to_dict(orient='records')
    if not unique_teams:
        raise HTTPException(status_code=404, detail="No teams found")
    return unique_teams

@router.get("/teams/{team_id}", response_model=list[schemas.Simulation])
def get_simulation(team_id: int):
    match = db.simulations_df[db.simulations_df["team_id"] == team_id]
    if match.empty:
        raise HTTPException(status_code=404, detail="Simulation not found for this team")
    return match.to_dict(orient="records")

@router.get("/teams/{team_id}/win_percentage")
def home_win_percentage(team_id: int):
    home_team_name_from_id = db.team_names_df[db.team_names_df['team_id'] == team_id]['team'].iloc[0]
    print(f"[Home Win percentage] Home team name from ID: {home_team_name_from_id}")
    if home_team_name_from_id is None:
        raise HTTPException(status_code=404, detail="Simulation not found for this team")
    
    team_games_df = db.games_join_venue_df[db.games_join_venue_df["home_team"] == home_team_name_from_id]
    print(f"[Home Win percentage] Team games: {team_games_df}")
    if team_games_df.empty:
        raise HTTPException(status_code=404, detail="No games found for this team")
    
    win_percentages = []
    for _, row in team_games_df.iterrows():
        home_team = row["home_team"]
        away_team = row["away_team"]
        win_percentages.append(calculate_home_win_percentage(home_team, away_team, db.simulations_df))
        
    team_games_df["home_win_percentage"] = win_percentages   
    return team_games_df.to_dict(orient="records")