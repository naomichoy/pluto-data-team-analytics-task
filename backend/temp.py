# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load CSVs into memory or DB (you can expand this into full ORM)
games_df = pd.read_csv("data/games.csv")
venues_df = pd.read_csv("data/venues.csv")
simulations_df = pd.read_csv("data/simulations.csv")


@app.get("/games")
def get_games():
    return games_df.to_dict(orient="records")


@app.get("/venues")
def get_venues():
    return venues_df.to_dict(orient="records")


@app.get("/game/{game_id}")
def get_game_details(game_id: int):
    game = games_df[games_df["id"] == game_id].iloc[0].to_dict()
    venue = venues_df[venues_df["id"] == game["venue_id"]].iloc[0].to_dict()
    return {
        "home_team": game["home_team"],
        "away_team": game["away_team"],
        "venue": venue["name"],
    }


@app.get("/simulations/{game_id}")
def get_simulation_data(game_id: int):
    game = games_df[games_df["id"] == game_id].iloc[0]
    home = game["home_team"]
    away = game["away_team"]

    subset = simulations_df[simulations_df["game_id"] == game_id]
    return {
        "home_team": home,
        "away_team": away,
        "home_runs": subset[subset["team"] == home]["runs"].tolist(),
        "away_runs": subset[subset["team"] == away]["runs"].tolist(),
    }