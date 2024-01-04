const BASE_URL = 'http://localhost:8080/api';

const api = {
    get: async (endpoint: any) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        } catch (error: any) {
            throw new Error(`Error during GET request: ${error.message}`);
        }
    },

    post: async (endpoint: any, data: any) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        } catch (error: any) {
            throw new Error(`Error during POST request: ${error.message}`);
        }
    },
    put: async (endpoint: any, data: any) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        } catch (error: any) {
            throw new Error(`Error during POST request: ${error.message}`);
        }
    },
    delete: async (endpoint: any) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        } catch (error: any) {
            throw new Error(`Error during POST request: ${error.message}`);
        }
    },
};

export default api;
