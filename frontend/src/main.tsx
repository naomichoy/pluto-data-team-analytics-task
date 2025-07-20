// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx'; // Your main layout component
import './index.css'; // Your main CSS/Tailwind styles

// Import all your page components from the 'pages' directory
import GameDetailsPage from './pages/GameDetailsPage.tsx';
import GamesPage from './pages/GamesPage.tsx';
import HistogramPage from './pages/HistogramPage.tsx';
import HomePage from './pages/HomePage.tsx';
import SimulationDetailsPage from './pages/SimulationDetailsPage.tsx';
import SimulationTeamListPage from './pages/SimulationTeamListPage.tsx';
import TeamWinPercentagePage from './pages/TeamWinPercentagePage.tsx';
import VenueGamesPage from './pages/VenueGamesPage.tsx';
import VenueListPage from './pages/VenueListPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App is now your main layout component that contains the <Outlet />
    children: [
      {
        index: true, // This route will be rendered when the path is exactly '/'
        element: <HomePage />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      // Games Routes
      {
        path: 'games',
        element: <GamesPage />,
      },
      {
        path: 'games/:gameId', 
        element: <GameDetailsPage />,
      },
      // Venues Routes
      {
        path: 'venues',
        element: <VenueListPage />,
      },
      {
        path: 'venues/:venueId/games', 
        element: <VenueGamesPage />,
      },
      // Simulations Routes
      {
        path: 'simulations', // Base path for simulation-related pages
        children: [
          {
            index: true, 
            element: <SimulationTeamListPage />,
          },
          {
            path: ':teamId/win-percentage', 
            element: <TeamWinPercentagePage />,
          },
          {
            path: ':teamId/details', 
            element: <SimulationDetailsPage />,
          },
        ],
      },
      // Other standalone pages
      {
        path: 'histogram',
        element: <HistogramPage />,
      },
      // Catch-all route for any undefined paths (404 Page)
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);