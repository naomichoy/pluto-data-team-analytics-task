import React, { useState, useEffect } from 'react';

// Import components
import Header from './components/Header';
import PageHeader from './components/PageHeader';

// Import pages
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import VenueListPage from './pages/VenueListPage';
import VenueGamesPage from './pages/VenueGamesPage';
import SimulationTeamListPage from './pages/SimulationTeamListPage';
import TeamWinPercentagePage from './pages/TeamWinPercentagePage';
import SimulationDetailsPage from './pages/SimulationDetailsPage';
import HistogramPage from './pages/HistogramPage';

// Import types
import type { Venue, Team } from './types';

// Import API clients
import { venuesApi } from './api/venues';
import { simulationsApi } from './api/simulations';

const App: React.FC = () => {
    const [page, setPage] = useState('Home');
    const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);
    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
    const [venues, setVenues] = useState<Venue[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        venuesApi.listVenues().then(setVenues);
        simulationsApi.listTeams().then(setTeams);
    }, []);
    
    const selectedVenue = venues.find(v => v.venue_id === selectedVenueId);
    const selectedTeam = teams.find(t => t.team_id === selectedTeamId);

    const renderPage = () => {
        switch (page) {
            case 'Games': return <GamesPage />;
            case 'Venues': return <VenueListPage onSelectVenue={(id) => { setSelectedVenueId(id); setPage('VenueDetails'); }} />;
            case 'VenueDetails': return selectedVenue ? <VenueGamesPage venue={selectedVenue} onBack={() => setPage('Venues')} /> : null;
            case 'Simulations': return <SimulationTeamListPage onShowWinPercentage={(id) => { setSelectedTeamId(id); setPage('TeamWinPercentage'); }} onShowDetails={(id) => { setSelectedTeamId(id); setPage('SimulationDetails'); }} />;
            case 'TeamWinPercentage': return selectedTeam ? <TeamWinPercentagePage team={selectedTeam} onBack={() => setPage('Simulations')} /> : null;
            case 'SimulationDetails': return selectedTeam ? <SimulationDetailsPage team={selectedTeam} onBack={() => setPage('Simulations')} /> : null;
            case 'Histogram': return <HistogramPage />;
            case 'Home': default: return <HomePage />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Header activePage={page} setActivePage={(p) => { setPage(p); setSelectedTeamId(null); setSelectedVenueId(null); }} />
            <main className="container mx-auto px-4 py-6">{renderPage()}</main>
        </div>
    );
}

export default App;