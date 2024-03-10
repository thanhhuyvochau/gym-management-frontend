'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import authService from '../_services/authService';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const {
    data: profile,
    refetch,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => authService.getProfile(),
    staleTime: Infinity,
    enabled: Boolean(accessToken),
  });

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      setAccessToken(token);
    }
  }, []);

  const { mutate: login, isError: isLoginError } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return authService.login(email, password);
    },
    onSuccess: () => {
      refetch();
      toast.success('Login successfully!');
    },
  });

  function logout() {
    authService.logout();
    queryClient.setQueriesData({ queryKey: ['profile'] }, null);
    toast.success('Logout successfully!');
  }

  return { profile, isLoading, isFetched, logout, refetch, login, isLoginError };
};
