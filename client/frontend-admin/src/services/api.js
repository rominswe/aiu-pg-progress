import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export const authService = {
  login: (role, credentials) => {
    const roleMap = {
      cgs: "/cgs/login"
    };

    if (!roleMap[role]) throw new Error("Invalid role selected");
    return api.post(roleMap[role], credentials).then(res => res.data);

  },
  refresh: () => api.post('/refresh').then(res => res.data),
  logout: () => api.post('/logout').then(res => res.data),
  me: () => api.get('/me').then(res => res.data)
};

export default api;