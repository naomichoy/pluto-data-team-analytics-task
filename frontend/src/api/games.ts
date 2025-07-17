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
};