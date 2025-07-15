from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class Venue(Base):
    __tablename__ = "venues"
    id = Column(Integer, primary_key=True, index=True)
    venue_id = Column(Integer)
    venue_name = Column(String)
    games = relationship("Game", back_populates="venue")
    

class Game(Base):
    __tablename__ = "games"
    id = Column(Integer, primary_key=True, index=True)
    home_team = Column(String)
    away_team = Column(String)
    date = Column(String)
    venue_id = Column(Integer, ForeignKey("venues.id"))
    
    venue = relationship("Venue", back_populates="games")

class Simulation(Base):
    __tablename__ = "simulations"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    team_id = Column(Integer, index=True)
    team = Column(String, index=True)
    simulation_run = Column(Integer)
    results = Column(Integer)
