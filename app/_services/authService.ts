import axios from "axios";
import api from "../_ultils/api";
import { log } from "console";
import { ApiResponse } from "../_models/ApiResponse";
import { JwtResponse } from "../_models/JwtResponse";
import { isTokenExpired } from "../_ultils/jwt";
import { UserProfileResponse } from "../_models/UserProfileResponse";

const authService = {
    // Function to authenticate the user
    login: async (email: string, password: string): Promise<ApiResponse<JwtResponse>> => {
        try {
            const response: ApiResponse<JwtResponse> = await api.post("/auth/login", { email, password });
            // Assuming your API returns a token upon successful login
            // Save the token to localStorage or secure storage
            localStorage.setItem('access_token', response.data.token);
            return response;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    },

    // Function to log out the user
    logout: (): void => {
        // Remove the token from localStorage or secure storage
        localStorage.removeItem('access_token');
    },

    // Function to check if the user is authenticated
    isAuthenticated: (): boolean => {
        // Check if the token is present in localStorage or secure storage
        let access_token = localStorage.getItem('access_token');
        return !!localStorage.getItem('access_token') && isTokenExpired(access_token);
    },

    // Function to get the authentication token
    getToken: (): string | null => {
        // Retrieve the token from localStorage or secure storage
        return localStorage.getItem('access_token');
    }
};

export default authService;
