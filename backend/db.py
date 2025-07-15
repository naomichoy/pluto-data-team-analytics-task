from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from app import models
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
    from app.models import Base
    Base.metadata.create_all(bind=engine)

    session = SessionLocal()

    # Load CSVs
    data_path = Path(__file__).resolve().parent.parent / "data"
    games_df = pd.read_csv(data_path / "games.csv")
    venues_df = pd.read_csv(data_path / "venues.csv")
    simulations_df = pd.read_csv(data_path / "simulations.csv")

    # Optional: Clear old data
    session.query(models.Game).delete()
    session.query(models.Venue).delete()
    session.query(models.Simulation).delete()

    # Populate tables
    session.bulk_save_objects([models.Venue(**row) for row in venues_df.to_dict(orient="records")])
    session.bulk_save_objects([models.Game(**row) for row in games_df.to_dict(orient="records")])
    session.bulk_save_objects([models.Simulation(**row) for row in simulations_df.to_dict(orient="records")])
    session.commit()
