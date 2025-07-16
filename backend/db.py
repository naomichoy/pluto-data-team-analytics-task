from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
import models
from pathlib import Path
import pandas as pd

DATABASE_URL = "sqlite:///./pluto.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Load CSV and populate DB
def init_db():
    from models import Base
    Base.metadata.create_all(bind=engine)

    session = SessionLocal()

    # Load CSVs
    global games_df, venues_df, simulations_df, games_join_venue_df, team_names_df
    data_path = Path(__file__).resolve().parent / "data"
    print(f"Loading data from {data_path}")
    
    games_df = pd.read_csv(data_path / "games.csv")
    games_df.insert(0, 'id', range(1, 1 + len(games_df)))
    venues_df = pd.read_csv(data_path /"venues.csv")
    simulations_df = pd.read_csv(data_path / "simulations.csv")
    
    games_join_venue_df = games_df.merge(venues_df, on="venue_id", how="left")
    team_names_df = simulations_df[['team_id', 'team']].drop_duplicates()
    # print(team_names_df.head())

    # Optional: Clear old data
    session.query(models.Game).delete()
    session.query(models.Venue).delete()
    session.query(models.Simulation).delete()

    # Populate tables
    session.bulk_save_objects([models.Venue(**row) for row in venues_df.to_dict(orient="records")])
    session.bulk_save_objects([models.Game(**row) for row in games_df.to_dict(orient="records")])
    session.bulk_save_objects([models.Simulation(**row) for row in simulations_df.to_dict(orient="records")])
    session.commit()
