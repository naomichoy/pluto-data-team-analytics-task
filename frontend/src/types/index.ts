export interface Game {
    id: number;
    home_team: string;
    away_team: string;
    venue_id: number;
    date: string;
    venue_name: string;
  }
  
  export interface Venue {
    venue_id: number;
    venue_name: string;
  }
  
  export interface Simulation {
    team_id: number;
    team: string;
    simulation_run: number;
    results: number;
  }
  
  export interface Team {
    team_id: number;
    team: string;
  }
  