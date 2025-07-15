from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import get_db, init_db
from routers import games, venues, simulations

app = FastAPI()

# Allow CORS (adjust for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    init_db()
    
@app.get("/")
def read_root():
    return {"message": "Welcome to the Baseball Simulation API"}

# Register API routers
app.include_router(games.router)
app.include_router(venues.router)
app.include_router(simulations.router)




