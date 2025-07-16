import { Simulation } from "../types";

export async function fetchSimulations(teamId: number): Promise<Simulation[]> {
  const res = await fetch(`http://localhost:8000/simulations/teams/${teamId}`);
  return await res.json();
}

export async function fetchWinPercentage(teamId: number): Promise<{ home_win_percentage: number }> {
  const res = await fetch(`http://localhost:8000/simulations/teams/${teamId}/win_percentage`);
  return await res.json();
}
