import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

export default function Home() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks(
    search,
    statusFilter,
    priorityFilter
  );

  const handleLogout = () => {
    authService.logout();
    navigate('/login', { replace: true });
  };

  const handleCreate = () => {
    setEditingTask(null);
    setSubmitError('');
    setSuccessMsg('');
    setModalOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setSubmitError('');
    setSuccessMsg('');
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTask(null);
    setSubmitError('');
  };

  const handleSubmit = async (data) => {
    setSubmitError('');
    try {
      if (editingTask) {
        await updateTask(editingTask._id, data);
        setSuccessMsg('Task updated');
      } else {
        await createTask(data);
        setSuccessMsg('Task created');
      }
      setModalOpen(false);
      setEditingTask(null);
      setTimeout(() => setSuccessMsg(''), 2000);
    } catch (err) {
      setSubmitError(err.response?.data?.error || 'Failed to save');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      setSuccessMsg('Task deleted');
      setTimeout(() => setSuccessMsg(''), 2000);
    } catch (err) {
      setSubmitError(err.response?.data?.error || 'Failed to delete');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">Task Manager</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {successMsg && (
          <p className="mb-4 p-2 bg-green-100 text-green-800 rounded text-sm">
            {successMsg}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[120px] border border-gray-300 rounded px-3 py-2 text-gray-800"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white"
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white"
          >
            <option value="">All priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded font-medium"
          >
            New task
          </button>
        </div>

        {error && (
          <p className="mb-4 p-2 bg-red-100 text-red-800 rounded text-sm">{error}</p>
        )}

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-600">No tasks. Create one to get started.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li key={task._id}>
                <TaskCard
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </li>
            ))}
          </ul>
        )}
      </main>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-10">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {editingTask ? 'Edit task' : 'New task'}
            </h2>
            {submitError && (
              <p className="mb-2 text-sm text-red-600">{submitError}</p>
            )}
            <TaskForm
              task={editingTask}
              onSubmit={handleSubmit}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
