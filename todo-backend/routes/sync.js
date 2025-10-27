import express from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.userId = user.userId;
    next();
  });
}

// PATCH /api/todolist
router.patch('/todolist', authenticateToken, async (req, res) => {
  try {
    const { lists, settings } = req.body;
    
    // Process list operations
    if (lists) {
      for (const operation of lists) {
        if (operation.action === 'add') {
          await req.db.collection('lists').insertOne({
            ...operation.list,
            user_id: req.userId
          });
        }
        
        if (operation.action === 'update') {
          await req.db.collection('lists').updateOne(
            { _id: new ObjectId(operation.listId), user_id: req.userId },
            { $set: operation.changes }
          );
        }
        
        if (operation.action === 'delete') {
          await req.db.collection('lists').deleteOne({
            _id: new ObjectId(operation.listId),
            user_id: req.userId
          });
        }
      }
    }
    
    // Update settings if provided
    if (settings) {
      await req.db.collection('users').updateOne(
        { _id: new ObjectId(req.userId) },
        { $set: { settings } }
      );
    }
    
    res.json({ success: true, timestamp: new Date() });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/settings
router.get('/settings', authenticateToken, async (req, res) => {
  try {
    const user = await req.db.collection('users').findOne(
      { _id: new ObjectId(req.userId) },
      { projection: { settings: 1 } }
    );
    
    res.json(user?.settings || {});
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/settings
router.put('/settings', authenticateToken, async (req, res) => {
  try {
    await req.db.collection('users').updateOne(
      { _id: new ObjectId(req.userId) },
      { $set: { settings: req.body } }
    );
    
    res.json({ success: true });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;