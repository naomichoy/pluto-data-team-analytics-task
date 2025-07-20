// frontend/src/components/GameDetails.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, LinkIcon } from "lucide-react";
import type { Game } from "../types";
import { getWinPercentageColor } from "../utils/colors";

interface GameDetailsProps {
  game: Game;
  winPercentage: number | null;
}

const GameDetails: React.FC<GameDetailsProps> = ({ game, winPercentage }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <p className="text-gray-500">
          {new Date(game.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h2 className="text-4xl font-bold text-gray-800">
          {game.home_team} vs {game.away_team}
        </h2>
      </div>
      <div className="flex justify-around items-start text-center text-2xl font-semibold">
        <div className="flex flex-col items-center">
          <span className="text-gray-700">{game.home_team}</span>
          {winPercentage !== null && (
            <span
              className={`text-sm mt-1 ${getWinPercentageColor(winPercentage)}`}
            >
              Win %: {winPercentage.toFixed(1)}%
            </span>
          )}
        </div>
        <span className="text-gray-400 text-lg pt-2">vs</span>
        <div className="flex flex-col items-center">
          <span className="text-gray-700">{game.away_team}</span>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t">
        <button
          onClick={() =>
            navigate(`/venues/${game.venue_id}/games`, {
              state: {
                venue: { venue_id: game.venue_id, venue_name: game.venue_name },
              },
            })
          }
          className="flex items-center justify-center w-full p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Home className="mr-3 text-gray-600" />
          <span className="text-lg text-gray-800">
            Venue: {game.venue_name}
          </span>
          <LinkIcon className="ml-3 text-cyan-600" />
        </button>
      </div>
    </div>
  );
};

export default GameDetails;
