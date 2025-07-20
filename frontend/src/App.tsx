import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';

import type { Venue, Team } from './types';

import { venuesApi } from './api/venues';
import { simulationsApi } from './api/simulations';

const App: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    venuesApi.listVenues().then(setVenues);
    simulationsApi.listTeams().then(setTeams);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default App;