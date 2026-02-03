export const validateTask = (task) => {
  const errors = [];

  if (!task.title || task.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (task.title && task.title.length > 200) {
    errors.push('Title cannot exceed 200 characters');
  }

  if (task.description && task.description.length > 1000) {
    errors.push('Description cannot exceed 1000 characters');
  }

  if (task.status && !['pending', 'in-progress', 'completed'].includes(task.status)) {
    errors.push('Status must be one of: pending, in-progress, completed');
  }

  if (task.priority && !['low', 'medium', 'high'].includes(task.priority)) {
    errors.push('Priority must be one of: low, medium, high');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
