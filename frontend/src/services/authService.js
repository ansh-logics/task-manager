import api from './api.js';

export const authService = {
  signup: async (email, password) => {
    const { data } = await api.post('/auth/signup', { email, password });
    if (data.token) localStorage.setItem('token', data.token);
    return data;
  },
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.token) localStorage.setItem('token', data.token);
    return data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
  getToken: () => localStorage.getItem('token'),
};
