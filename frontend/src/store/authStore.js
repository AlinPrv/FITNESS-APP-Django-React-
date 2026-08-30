import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem("access_token") || null,
  refreshToken: localStorage.getItem("refresh_token") || null,
  isAuthenticated: !!localStorage.getItem("access_token"),

  login: (access, refresh) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    set({ accessToken: access, refreshToken: refresh, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    set({ accessToken: null, refreshToken: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
