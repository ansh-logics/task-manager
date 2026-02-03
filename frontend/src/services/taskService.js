import api from './api.js';

export const taskService = {
  getAllTasks: async (params = {}) => {
    const { data } = await api.get('/tasks', { params });
    return data;
  },
  getTaskById: async (id) => {
    const { data } = await api.get(`/tasks/${id}`);
    return data;
  },
  createTask: async (body) => {
    const { data } = await api.post('/tasks', body);
    return data;
  },
  updateTask: async (id, body) => {
    const { data } = await api.put(`/tasks/${id}`, body);
    return data;
  },
  deleteTask: async (id) => {
    const { data } = await api.delete(`/tasks/${id}`);
    return data;
  },
};
