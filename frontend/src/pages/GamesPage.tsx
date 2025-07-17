import React, { useState, useEffect } from 'react';
import { gamesApi } from '../api/games';
import type { Game } from '../types';
import FilterableTable from '../components/FilterableTable';
import PageHeader from '../components/PageHeader';
import type { Column } from '../components/FilterableTable';

const GamesPage: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => { gamesApi.listGames().then(data => { setGames(data); setLoading(false); }); }, []);
    const columns: Column<Game>[] = [{ key: 'id', label: 'ID' }, { key: 'home_team', label: 'Home Team' }, { key: 'away_team', label: 'Away Team' }, { key: 'date', label: 'Date' }, { key: 'venue_name', label: 'Venue' }];
    if (loading) return <div className="text-center p-10">Loading games...</div>;
    return (<div className="p-6"><PageHeader title="Games" /><FilterableTable<Game> data={games} columns={columns} filterableCols={[{ key: 'home_team', label: 'Home Team' }, { key: 'away_team', label: 'Away Team' }, { key: 'venue_name', label: 'Venue' }, { key: 'date', label: 'Date' }]} /></div>);
};

export default GamesPage;