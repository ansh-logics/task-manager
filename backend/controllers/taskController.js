import Task from '../models/Task.js';

function buildQuery(userId, query) {
  const q = { userId };
  if (query.q && query.q.trim()) {
    const search = query.q.trim();
    q.$or = [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
    ];
  }
  if (query.status && query.status.trim()) {
    q.status = query.status.trim();
  }
  if (query.priority && query.priority.trim()) {
    q.priority = query.priority.trim();
  }
  return q;
}

export const getAllTasks = async (req, res, next) => {
  try {
    const filter = buildQuery(req.userId, req.query);
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate, tags } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const task = await Task.create({
      userId: req.userId,
      title: title.trim(),
      description: description?.trim() || '',
      status: status || 'pending',
      priority: priority || 'medium',
      dueDate: dueDate || undefined,
      tags: Array.isArray(tags) ? tags : [],
    });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};
