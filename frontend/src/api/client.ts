import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Example: Replace with your actual API host

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});