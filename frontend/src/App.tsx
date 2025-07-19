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
import GameDetailsPage from './pages/GameDetailsPage';

// Import types
import type { Venue, Team } from './types';

// Import API clients
import { venuesApi } from './api/venues';
import { simulationsApi } from './api/simulations';

const App: React.FC = () => {
    const [page, setPage] = useState('Home');
    const [pageHistory, setPageHistory] = useState<string[]>(['Home']);
    const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);
    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
    const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
    
    const [venues, setVenues] = useState<Venue[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    useEffect(() => { venuesApi.listVenues().then(setVenues); simulationsApi.listTeams().then(setTeams); }, []);
    
    const selectedVenue = venues.find(v => v.venue_id === selectedVenueId);
    const selectedTeam = teams.find(t => t.team_id === selectedTeamId);

    const navigateTo = (newPage: string) => {
        setPageHistory(prev => [...prev, newPage]);
        setPage(newPage);
    }

    const goBack = () => {
        const newHistory = [...pageHistory];
        newHistory.pop();
        const prevPage = newHistory[newHistory.length - 1] || 'Home';
        setPageHistory(newHistory);
        setPage(prevPage);
    }

    const resetAndNavigate = (newPage: string) => {
        setPageHistory([newPage]);
        setPage(newPage);
        setSelectedGameId(null);
        setSelectedTeamId(null);
        setSelectedVenueId(null);
    }

    const handleSelectGame = (gameId: number) => {
        setSelectedGameId(gameId);
        navigateTo('GameDetails');
    }

    const handleSelectVenue = (venueId: number) => {
        setSelectedVenueId(venueId);
        navigateTo('VenueDetails');
    }

    const renderPage = () => {
        switch (page) {
            case 'Games': 
                return <GamesPage onSelectGame={handleSelectGame} />;
            case 'GameDetails':
                return selectedGameId ? <GameDetailsPage gameId={selectedGameId} onBack={goBack} onSelectVenue={handleSelectVenue} /> : null;
            case 'Venues': 
                return <VenueListPage onSelectVenue={handleSelectVenue} />;
            case 'VenueDetails': 
                return selectedVenue ? <VenueGamesPage venue={selectedVenue} onBack={goBack} onSelectGame={handleSelectGame} /> : null;
            case 'Simulations': 
                return <SimulationTeamListPage onShowWinPercentage={(id) => { setSelectedTeamId(id); navigateTo('TeamWinPercentage'); }} onShowDetails={(id) => { setSelectedTeamId(id); navigateTo('SimulationDetails'); }} />;
            case 'TeamWinPercentage': 
                return selectedTeam ? <TeamWinPercentagePage team={selectedTeam} onBack={goBack} /> : null;
            case 'SimulationDetails': 
                return selectedTeam ? <SimulationDetailsPage team={selectedTeam} onBack={goBack} /> : null;
            case 'Histogram': 
                return <HistogramPage />;
            case 'Home': 
            default: 
                return <HomePage />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Header activePage={page} setActivePage={resetAndNavigate} />
            <main className="container mx-auto px-4 py-6">{renderPage()}</main>
        </div>
    );
}

export default App;