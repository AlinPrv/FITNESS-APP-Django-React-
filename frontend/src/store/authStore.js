import { create } from 'zustand';

const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem('access_token') || null,
  refreshToken: localStorage.getItem('refresh_token') || null,
  username: localStorage.getItem('username') || null,
  isAuthenticated: !!localStorage.getItem('access_token'),

  login: (access, refresh, username) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('username', username);
    set({
      accessToken: access,
      refreshToken: refresh,
      username,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    set({
      accessToken: null,
      refreshToken: null,
      username: null,
      isAuthenticated: false,
    });
  },
}));

export default useAuthStore;
