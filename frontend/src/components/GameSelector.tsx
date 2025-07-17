import React from "react";

export interface Game {
  id: number;
  home_team: string;
  away_team: string;
  date: string;
  venue_id: number;
  venue_name: string;
}

interface GameSelectorProps {
  games: Game[];
  selectedGameId?: number;
  onSelect: (id: number) => void;
}

const GameSelector: React.FC<GameSelectorProps> = ({ games, selectedGameId, onSelect }) => {
  return (
    <div>
      <label htmlFor="game-select" style={{ display: "block", marginBottom: 4 }}>
        Select a Cricket Game
      </label>
      <select
        id="game-select"
        value={selectedGameId ?? ""}
        onChange={e => onSelect(Number(e.target.value))}
      >
        <option value="">-- Choose a Game --</option>
        {games.map(game => (
          <option key={game.id} value={game.id}>
            {game.home_team} vs {game.away_team} - {game.date}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GameSelector;
