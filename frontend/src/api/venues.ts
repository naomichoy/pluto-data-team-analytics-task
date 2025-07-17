import { apiClient } from './client';
import type { Venue, Game } from '../types/index';

export const venuesApi = {
    listVenues: async (): Promise<Venue[]> => {
        try {
            const response = await apiClient.get<Venue[]>('/venues/');
            return response.data;
        } catch (error) {
            console.error("Error fetching venues:", error);
            return [];
        }
    },
    getVenueGames: async (venueId: number): Promise<Game[]> => {
        try {
            const response = await apiClient.get<Game[]>(`/venues/${venueId}/games`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching games for venue ${venueId}:`, error);
            return [];
        }
    }
};