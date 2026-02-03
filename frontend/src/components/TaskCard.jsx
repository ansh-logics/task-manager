import { Card, CardContent, Typography, Chip, Box, Button } from '@mui/material';

export default function TaskCard({ task, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'info';
      default: return 'default';
    }
  };

  return (
    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.2s', '&:hover': { borderColor: 'text.secondary' } }}>
      <CardContent sx={{ flexGrow: 1, p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 500, lineHeight: 1.3, mr: 1 }}>
            {task.title}
          </Typography>
        </Box>
        
        {task.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {task.description}
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip label={task.status} size="small" color={getStatusColor(task.status)} variant="outlined" sx={{ textTransform: 'capitalize' }} />
          <Chip label={task.priority} size="small" color={getPriorityColor(task.priority)} variant="outlined" sx={{ textTransform: 'capitalize' }} />
          {task.dueDate && (
            <Chip label={`Due ${new Date(task.dueDate).toLocaleDateString()}`} size="small" variant="outlined" />
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
          <Button size="small" onClick={() => onEdit(task)} sx={{ minWidth: 0, px: 1 }}>Edit</Button>
          <Button size="small" color="error" onClick={() => onDelete(task._id)} sx={{ minWidth: 0, px: 1 }}>Delete</Button>
        </Box>
      </CardContent>
    </Card>
  );
}
