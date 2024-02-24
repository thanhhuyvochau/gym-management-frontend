import axios from "axios";
import api from "../_ultils/api";

interface LoginResponse {
    token: string;
}

const authService = {
    // Function to authenticate the user
    login: async (username: string, password: string): Promise<string> => {
        try {
            const response: LoginResponse = await api.post("auth/login", { username, password });
            // Assuming your API returns a token upon successful login
            const token = response.token;
            // Save the token to localStorage or secure storage
            localStorage.setItem('token', token);
            return token;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    },

    // Function to log out the user
    logout: (): void => {
        // Remove the token from localStorage or secure storage
        localStorage.removeItem('token');
    },

    // Function to check if the user is authenticated
    isAuthenticated: (): boolean => {
        // Check if the token is present in localStorage or secure storage
        return !!localStorage.getItem('token');
    },

    // Function to get the authentication token
    getToken: (): string | null => {
        // Retrieve the token from localStorage or secure storage
        return localStorage.getItem('token');
    },
};

export default authService;
