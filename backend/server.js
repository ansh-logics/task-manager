import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './models/index.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.message || err);
  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
