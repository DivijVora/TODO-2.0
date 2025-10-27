import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let db;
MongoClient.connect(process.env.MONGODB_URI)
  .then(client => {
    db = client.db('todoapp');
    console.log('Connected to MongoDB');
  })
  .catch(error => console.error(error));

// Make db accessible to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
import authRoutes from './routes/auth.js';
import syncRoutes from './routes/sync.js';

app.use('/api/auth', authRoutes);
app.use('/api', syncRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});