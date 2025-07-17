import React from "react";
import type { Game } from "./GameSelector";

interface GameDetailsProps {
  game?: Game;
}

const GameDetails: React.FC<GameDetailsProps> = ({ game }) => {
  if (!game) return <p>Please select a game</p>;
  return (
    <div>
      <h2>{game.home_team} vs {game.away_team}</h2>
      <p>Date: {game.date}</p>
      <p>Venue: {game.venue_name}</p>
    </div>
  );
};

export default GameDetails;
