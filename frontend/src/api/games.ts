import { apiClient } from './client';
import type { Game } from '../types/index';


export const gamesApi = {
  listGames: async (): Promise<Game[]> => {
      try {
          const response = await apiClient.get<Game[]>('/games/');
          return response.data;
      } catch (error) {
          console.error("Error fetching games:", error);
          return []; // Return empty array on error
      }
  },
  getGame: async (gameId: number): Promise<Game | null> => {
        try {
            const response = await apiClient.get<Game>(`/games/${gameId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching game ${gameId}:`, error);
            return null;
        }
    },
    getHomeWinPercentage: async (gameId: number): Promise<{ home_win_percentage: number } | null> => {
        try {
            const response = await apiClient.get<{ home_win_percentage: number }>(`/games/${gameId}/home_win_percentage`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching home win percentage for game ${gameId}:`, error);
            return null;
        }
    }
};