import { Game } from "../types";

export async function fetchGames(): Promise<Game[]> {
  const res = await fetch("http://localhost:8000/games/");
  return await res.json();
}

export async function fetchGame(gameId: number): Promise<Game> {
  const res = await fetch(`http://localhost:8000/games/${gameId}`);
  return await res.json();
}
