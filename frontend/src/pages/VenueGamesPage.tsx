// src/pages/VenueGamesPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { venuesApi } from '../api/venues';
import type { Game, Venue } from '../types';
import FilterableTable from '../components/FilterableTable';
import PageHeader from '../components/PageHeader';

interface VenueGamesParams extends Record<string, string | undefined> {
    venueId: string;
}

const VenueGamesPage: React.FC = () => {
    const { venueId: venueIdParam } = useParams<VenueGamesParams>();
    const navigate = useNavigate();
    const location = useLocation();

    const venue = location.state?.venue as Venue | undefined;

    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!venueIdParam) {
            setError("No Venue ID provided in the URL.");
            setLoading(false);
            return;
        }

        const id = parseInt(venueIdParam, 10);
        if (isNaN(id)) {
            setError(`Invalid Venue ID: "${venueIdParam}".`);
            setLoading(false);
            return;
        }

        if (!venue || venue.venue_id !== id) {
            setError("Venue data not found or mismatched. Please navigate from the venue list.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        venuesApi.getVenueGames(id).then(data => {
            setGames(data);
            setLoading(false);
        }).catch(caughtError => {
            console.error("Failed to fetch games for venue:", caughtError);
            setError("Failed to load games for venue. Please try again.");
            setLoading(false);
        });
    }, [venueIdParam, venue]);

    const columns: { key: keyof Game; label: string }[] = [
        { key: 'id', label: 'ID' },
        { key: 'home_team', label: 'Home Team' },
        { key: 'away_team', label: 'Away Team' },
        { key: 'date', label: 'Date' }
    ];

    if (loading) {
        return <div className="text-center p-10">Loading games for {venue?.venue_name || 'venue'}...</div>;
    }
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
    if (!venue) return <div className="text-center p-10 text-red-500">Venue data is missing. Cannot display games.</div>;

    return (
        <div className="p-6">
            <PageHeader title={`Games at ${venue.venue_name}`} onBack={() => navigate(-1)} />
            <FilterableTable<Game>
                data={games}
                columns={columns}
                filterableCols={[
                    { key: 'home_team', label: 'Home Team' },
                    { key: 'away_team', label: 'Away Team' },
                    { key: 'date', label: 'Date' }
                ]}
                renderActions={(game) => (
                    <button
                        onClick={() => navigate(`/games/${game.id}`, { state: { game: game } })}
                        className="bg-cyan-600 text-white px-3 py-1 rounded-md hover:bg-cyan-700"
                    >
                        Details
                    </button>
                )}
            />
        </div>
    );
};

export default VenueGamesPage;