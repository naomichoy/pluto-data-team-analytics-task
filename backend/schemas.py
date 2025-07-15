# app/schemas.py
from pydantic import BaseModel
from typing import List

class Game(BaseModel):
    id: int
    home_team: str
    away_team: str
    venue_id: int

class Venue(BaseModel):
    id: int
    name: str

class GameDetail(BaseModel):
    home_team: str
    away_team: str
    venue: str

class SimulationResult(BaseModel):
    home_team: str
    away_team: str
    home_runs: List[int]
    away_runs: List[int]

