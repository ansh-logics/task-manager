import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  TextField,
  MenuItem,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  Alert,
  CircularProgress,
  Snackbar,
  Stack
} from '@mui/material';

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
    } catch (err) {
      setSubmitError(err.response?.data?.error || 'Failed to save');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      setSuccessMsg('Task deleted');
    } catch (err) {
      setSubmitError(err.response?.data?.error || 'Failed to delete');
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMsg('');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <AppBar position="static" color="inherit">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Task Manager
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Log out
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" component="main" sx={{ py: 4, flexGrow: 1 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }} alignItems="center">
          <TextField
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            sx={{ flexGrow: 1 }}
          />
          <TextField
            select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
          <TextField
            select
            label="Priority"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">All Priorities</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{ minWidth: 120, height: 40 }}
          >
            New Task
          </Button>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : tasks.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography color="text.secondary">No tasks found. Create one to get started.</Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {tasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task._id}>
                <TaskCard
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>{editingTask ? 'Edit Task' : 'New Task'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}
            <TaskForm
              key={editingTask ? editingTask._id : 'new'}
              task={editingTask}
              onSubmit={handleSubmit}
              onCancel={handleCloseModal}
            />
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={!!successMsg}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={successMsg}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}
