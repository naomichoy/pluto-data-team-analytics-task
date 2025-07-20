// frontend/src/pages/GameDetailsPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gamesApi } from '../api/games';
import PageHeader from '../components/PageHeader';
import type { Game } from '../types';
import GameDetailsCard from '../components/GameDetails'; // Import the new component

interface GameRouteParams extends Record<string, string | undefined> {
  gameId: string;
}

const GameDetailsPage: React.FC = () => {
    const { gameId: gameIdParam } = useParams<GameRouteParams>();
    const navigate = useNavigate();

    const [game, setGame] = useState<Game | null>(null);
    const [winPercentage, setWinPercentage] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!gameIdParam) {
            setError("No Game ID provided in the URL.");
            setLoading(false);
            return;
        }

        const id = parseInt(gameIdParam, 10);
        if (isNaN(id)) {
            setError(`Invalid Game ID: "${gameIdParam}".`);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        Promise.all([
            gamesApi.getGame(id),
            gamesApi.getHomeWinPercentage(id)
        ]).then(([gameData, winPctData]) => {
            setGame(gameData);
            if (winPctData) {
                setWinPercentage(winPctData.home_win_percentage);
            }
            setLoading(false);
        }).catch(err => {
            console.error("Failed to fetch game details:", err);
            setError("Failed to load game details. Please try again.");
            setLoading(false);
        });
    }, [gameIdParam]);

    if (loading) return <div className="text-center p-10">Loading game details...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
    if (!game) return <div className="text-center p-10 text-red-500">Game not found.</div>;

    return (
        <div className="p-6">
            <PageHeader title="Game Details" onBack={() => navigate(-1)} />
            <GameDetailsCard game={game} winPercentage={winPercentage} />
        </div>
    );
};

export default GameDetailsPage;