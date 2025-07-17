import { apiClient } from './client';
import type { Team, Simulation, WinPercentageData } from '../types/index';

export const simulationsApi = {
  listTeams: async (): Promise<Team[]> => {
      try {
          const response = await apiClient.get<Team[]>('/simulations/teams');
          return response.data;
      } catch (error) {
          console.error("Error fetching teams:", error);
          return [];
      }
  },
  listAllSimulations: async (): Promise<Simulation[]> => {
      try {
          const response = await apiClient.get<Simulation[]>('/simulations/');
          return response.data;
      } catch (error) {
          console.error("Error fetching all simulations:", error);
          return [];
      }
  },
  getSimulationsForTeam: async (team_id: number): Promise<Simulation[]> => {
      try {
          const response = await apiClient.get<Simulation[]>(`/simulations/teams/${team_id}`);
          return response.data;
      } catch (error) {
          console.error(`Error fetching simulations for team ${team_id}:`, error);
          return [];
      }
  },
  getHomeWinPercentageForTable: async (team_id: number): Promise<WinPercentageData[]> => {
      try {
          // NOTE: The OpenAPI spec for this endpoint returns an empty object `{}`.
          // The code below is a rough implementation that assumes you might expand the API
          // to return more detailed data. You may need to adjust this based on your final API implementation.
          const response = await apiClient.get(`/simulations/teams/${team_id}/win_percentage`);
          
          // Mocking transformation based on a hypothetical detailed response.
          // In reality, you would process `response.data` here.
          console.log(`Received from /win_percentage endpoint for team ${team_id}:`, response.data);
          return [
              { metric: 'Overall Home Win %', value: `${(Math.random() * 20 + 50).toFixed(1)}%` },
              { metric: 'Home Win % vs. Top 5 Teams', value: `${(Math.random() * 20 + 40).toFixed(1)}%` },
              { metric: 'Home Win % vs. Bottom 5 Teams', value: `${(Math.random() * 10 + 65).toFixed(1)}%` },
              { metric: 'Home Win % (Last 10 Games)', value: `${(Math.random() * 30 + 45).toFixed(1)}%` },
          ];

      } catch (error) {
          console.error(`Error fetching win percentage for team ${team_id}:`, error);
          return [];
      }
  }
};