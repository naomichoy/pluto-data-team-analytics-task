import React, { useEffect, useState } from "react";
import { fetchGames, fetchGame } from "./api/games";
import { fetchSimulations, fetchWinPercentage } from "./api/simulations";
import { Game, Simulation } from "./types";
import GameSelector from "./components/GameSelector";
import GameDetails from "./components/GameDetails";
import SimulationHistogram from "./components/SimulationHistogram";
import WinPercentage from "./components/WinPercentage";

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<number>();
  const [selectedGame, setSelectedGame] = useState<Game>();
  const [homeSims, setHomeSims] = useState<number[]>([]);
  const [awaySims, setAwaySims] = useState<number[]>([]);
  const [winPercentage, setWinPercentage] = useState<number>(0);

  useEffect(() => {
    fetchGames().then(setGames);
  }, []);

  useEffect(() => {
    if (!selectedGameId) return;

    fetchGame(selectedGameId).then(game => {
      setSelectedGame(game);

      Promise.all([
        fetchSimulationsByTeam(game.home_team),
        fetchSimulationsByTeam(game.away_team),
        fetchWinPercentage(game.id)  // assuming win % calculated for the game
      ]).then(([homeData, awayData, winData]) => {
        setHomeSims(homeData.map(d => d.results));
        setAwaySims(awayData.map(d => d.results));
        setWinPercentage(winData.home_win_percentage);
      });
    });
  }, [selectedGameId]);

  return (
    <div>
      <h1>Cricket Simulation Viewer</h1>
      <GameSelector
        games={games}
        selectedGameId={selectedGameId}
        onSelect={setSelectedGameId}
      />
      <GameDetails game={selectedGame} />
      <WinPercentage value={winPercentage} team={selectedGame?.home_team ?? ""} />
      <SimulationHistogram
        homeSimulations={homeSims}
        awaySimulations={awaySims}
        homeTeam={selectedGame?.home_team ?? ""}
        awayTeam={selectedGame?.away_team ?? ""}
      />
    </div>
  );
}

export default App;
