// frontend/src/pages/GameDetailsPage.tsx

import React, { useEffect, useState } from 'react';
import { gamesApi } from '../api/games';
import { Home, LinkIcon } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import type { Game } from '../types';

import { getWinPercentageColor } from '../utils/colors';
interface GameDetailsPageProps { gameId: number; onBack: () => void; onSelectVenue: (venueId: number) => void; }
const GameDetailsPage: React.FC<GameDetailsPageProps> = ({ gameId, onBack, onSelectVenue }) => {
    const [game, setGame] = useState<Game | null>(null);
    const [winPercentage, setWinPercentage] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            gamesApi.getGame(gameId),
            gamesApi.getHomeWinPercentage(gameId)
        ]).then(([gameData, winPctData]) => {
            setGame(gameData);
            if (winPctData) {
                setWinPercentage(winPctData.home_win_percentage);
            }
            setLoading(false);
        });
    }, [gameId]);

    if (loading) return <div className="text-center p-10">Loading game details...</div>;
    if (!game) return <div className="text-center p-10 text-red-500">Could not load details for game ID {gameId}.</div>;

    return (
        <div className="p-6">
            <PageHeader title="Game Details" onBack={onBack} />
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
                <div className="text-center mb-6">
                    <p className="text-gray-500">{new Date(game.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <h2 className="text-4xl font-bold text-gray-800">{game.home_team} vs {game.away_team}</h2>
                </div>
                <div className="flex justify-around items-start text-center text-2xl font-semibold">
                    <div className="flex flex-col items-center">
                        <span className="text-gray-700">{game.home_team}</span>
                        {winPercentage !== null && (
                            <span className={`text-sm mt-1 ${getWinPercentageColor(winPercentage)}`}>
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
                        onClick={() => onSelectVenue(game.venue_id)} 
                        className="flex items-center justify-center w-full p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <Home className="mr-3 text-gray-600" />
                        <span className="text-lg text-gray-800">Venue: {game.venue_name}</span>
                        <LinkIcon className="ml-3 text-cyan-600" />
                    </button>
                </div>
            </div>
        </div>
    );
};


export default GameDetailsPage;