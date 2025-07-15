# app/routers/simulations.py
from fastapi import APIRouter, HTTPException
import db, schemas

router = APIRouter(prefix="/simulations", tags=["simulations"])

@router.get("/", response_model=list[schemas.Simulation])
def list_venues():
    return db.simulations_df.to_dict(orient="records")

@router.get("/{team_id}", response_model=list[schemas.Simulation])
def get_simulation(team_id: int):
    match = db.simulations_df[db.simulations_df["team_id"] == team_id]
    if match.empty:
        raise HTTPException(status_code=404, detail="Game not found")

    return match.to_dict(orient="records")
