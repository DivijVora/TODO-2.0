import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Attach db instance (will be set after connection)
app.use((req, res, next) => {
  req.db = app.locals.db;
  next();
});

// Start up function: connect to MongoDB, create indexes, register routes and start server
async function start() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  // Note: do not pass unsupported legacy options (e.g. keepAlive) to MongoClient
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db('todoapp');
    app.locals.db = db;
    console.log('Connected to MongoDB');

    // Ensure important indexes exist
    try {
      await db.collection('users').createIndex({ email: 1 }, { unique: true });
      await db.collection('lists').createIndex({ user_id: 1 });
      console.log('Ensured indexes on users and lists collections');
    } catch (indexErr) {
      console.warn('Warning: could not create indexes:', indexErr.message || indexErr);
    }

    // Dynamically import routes after DB is ready
    const authRoutes = (await import('./routes/auth.js')).default;
    const syncRoutes = (await import('./routes/sync.js')).default;

    app.use('/api/auth', authRoutes);
    app.use('/api', syncRoutes);

    // Start server after routes are registered
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB or start server:', error);
    process.exit(1);
  }
}

start();