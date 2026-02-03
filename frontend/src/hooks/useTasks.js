import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/taskService.js';

export function useTasks(search = '', status = '', priority = '') {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (search.trim()) params.q = search.trim();
      if (status) params.status = status;
      if (priority) params.priority = priority;
      const data = await taskService.getAllTasks(params);
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [search, status, priority]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (body) => {
    const created = await taskService.createTask(body);
    setTasks((prev) => [created, ...prev]);
    return created;
  };

  const updateTask = async (id, body) => {
    const updated = await taskService.updateTask(id, body);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    return updated;
  };

  const deleteTask = async (id) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask };
}
