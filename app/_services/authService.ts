import api from '../_ultils/api';
import { ApiResponse } from '../_models/ApiResponse';
import { JwtResponse } from '../_models/JwtResponse';
import { isTokenExpired } from '../_ultils/jwt';

const authService = {
  // Function to authenticate the user
  login: async (email: string, password: string) => {
    const { data } = await api.post<ApiResponse<JwtResponse>>('api/auth/login', { email, password });

    localStorage.setItem('access_token', data.data.token);
  },

  logout: (): void => {
    localStorage.removeItem('access_token');
  },

  isAuthenticated: (): boolean => {
    let access_token = localStorage.getItem('access_token');
    return !!localStorage.getItem('access_token') && isTokenExpired(access_token);
  },

  getToken: (): string | null => {
    return localStorage.getItem('access_token');
  },
  getProfile: async () => {
    const { data } = await api.get<JwtResponse>('api/accounts/profile');

    return data.data;
  },
  getOtpForgotPassword: async ({ email }: { email: string }) => {
    await api.get('api/accounts/otp/forget-password', {
      params: {
        email,
      },
    });
  },
  updateForgotPassword: async (payload: { email: string; otpCode: string; password: string }) => {
    await api.put('api/accounts/forget-password', {
      payload,
    });
  },
};

export default authService;
