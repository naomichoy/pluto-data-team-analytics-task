export interface Game {
  id: number;
  home_team: string;
  away_team: string;
  date: string;
  venue_id: number;
  venue_name: string;
  home_win_percentage: number;
}

export interface Venue {
  venue_id: number;
  venue_name: string;
}

export interface Team {
  team_id: number;
  team: string;
}

export interface Simulation {
  team_id: number;
  team: string;
  simulation_run: number;
  results: number;
}

export interface WinPercentageData {
  id: number;
  home_team: string;
  away_team: string;
  date: string;
  venue_id: number;
  venue_name: string;
  home_win_percentage: number;
}
export interface HistogramResponse {
  bins: string[];
  teams: {
      [teamName: string]: {
          [bin: string]: number;
      };
  };
}



