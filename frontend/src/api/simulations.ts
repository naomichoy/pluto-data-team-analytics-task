// frontend/src/api/simulations.ts

import { apiClient } from './client';
import type { Team, Simulation, WinPercentageData, HistogramResponse } from '../types/index';

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
            // Fetch the win percentage data for the specified team.
            const response = await apiClient.get(`/simulations/teams/${team_id}/home_win_percentage`);
            
            // Directly return the data from the API response.
            // The structure of response.data should match the ApiWinPercentageData interface.
            return response.data;

        } catch (error) {
            console.error(`Error fetching win percentage for team ${team_id}:`, error);
            // Return an empty array on error to prevent the app from crashing.
            return [];
        }
    },
    getHistogramData: async (): Promise<HistogramResponse> => {
        try {
            const response = await apiClient.get<HistogramResponse>('/simulations/histogram');
            return response.data;
        } catch (error) {
            console.error("Error fetching histogram data:", error);
            return { bins: [], teams: {} };
        }

    }
};