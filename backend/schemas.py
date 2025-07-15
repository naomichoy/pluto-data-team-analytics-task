from pydantic import BaseModel

# 1. Venue Schemas
class VenueBase(BaseModel):
    venue_id: int
    venue_name: str

class VenueCreate(VenueBase):
    pass

class Venue(VenueBase):

    class Config:
        from_attributes = True

# 2. Game Schemas
class GameBase(BaseModel):
    home_team: str
    away_team: str
    date: str
    venue_id: int

class GameCreate(GameBase):
    pass

class Game(GameBase):
    id: int
    venue_name: str

    class Config:
        from_attributes = True

# 3. Simulation Schemas
class SimulationBase(BaseModel):
    team_id: int
    team: str
    simulation_run: int
    results: int

class SimulationCreate(SimulationBase):
    pass

class Simulation(SimulationBase):
    
    class Config:
        from_attributes = True

# 4. Team Schemas        
class Team(BaseModel):
    team_id: int
    team: str