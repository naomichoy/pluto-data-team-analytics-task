import React, { useState, useEffect } from 'react';
import { venuesApi } from '../api/venues';
import type { Game, Venue } from '../types';
import FilterableTable from '../components/FilterableTable';
import PageHeader from '../components/PageHeader';

interface VenueGamesPageProps {
    venue: Venue;
    onBack: () => void;
}

const VenueGamesPage: React.FC<VenueGamesPageProps> = ({ venue, onBack }) => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        venuesApi.getVenueGames(venue.venue_id).then(data => {
            setGames(data);
            setLoading(false);
        });
    }, [venue.venue_id]);

    const columns: { key: keyof Game; label: string }[] = [
        { key: 'id', label: 'ID' },
        { key: 'home_team', label: 'Home Team' },
        { key: 'away_team', label: 'Away Team' },
        { key: 'date', label: 'Date' }
    ];

    if (loading) {
        return <div className="text-center p-10">Loading games for {venue.venue_name}...</div>;
    }

    return (
        <div className="p-6">
            <PageHeader title={`Games at ${venue.venue_name}`} onBack={onBack} />
            <FilterableTable<Game>
                data={games}
                columns={columns}
                filterableCols={[
                    { key: 'home_team', label: 'Home Team' },
                    { key: 'away_team', label: 'Away Team' }
                ]}
            />
        </div>
    );
};

export default VenueGamesPage;