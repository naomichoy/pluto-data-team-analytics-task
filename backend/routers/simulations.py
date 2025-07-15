from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
import db, schemas

router = APIRouter(prefix="/simulations", tags=["simulations"])

@router.get("/", response_model=list[schemas.Simulation])
def list_simulations():
    return db.simulations_df.to_dict(orient="records")

@router.get("/teams", response_model=list[schemas.Team])
def list_unique_teams():
    unique_teams = db.simulations_df[['team_id', 'team']].drop_duplicates()
    unique_teams = unique_teams.to_dict(orient='records')
    if not unique_teams:
        raise HTTPException(status_code=404, detail="No teams found")
    # return JSONResponse(content={"teams": list(unique_teams)})
    return unique_teams

@router.get("/teams/{team_id}", response_model=list[schemas.Simulation])
def get_simulation(team_id: int):
    match = db.simulations_df[db.simulations_df["team_id"] == team_id]
    if match.empty:
        raise HTTPException(status_code=404, detail="Simulation not found for this team")
    return match.to_dict(orient="records")
