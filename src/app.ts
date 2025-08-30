import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import './config/container';

import { AppDataSource } from './config/database';
import authRoutes from './routes/auth';
import eventRoutes from './routes/event';
import ticketRoutes from './routes/ticket';
import bookingRoutes from './routes/booking';
import stripeRoutes from './routes/stripe';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/stripe', stripeRoutes);
app.use(errorHandler);

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => console.log('Server running on port 3000'));
  } catch (err) {
    console.error('Error starting server:', err);
  }
};

startServer();

export default app;