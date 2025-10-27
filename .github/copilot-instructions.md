# AI Agent Instructions for TODO 2.0

This document guides AI agents in understanding and working with the TODO 2.0 application codebase.

## Project Architecture

- **Frontend (`my-todo/`)**: React + Vite application with TailwindCSS styling
  - Responsive minimalist design
  - Dark/light theme support
  - Undo/redo functionality
  - Autosave feature
- **Backend (`todo-backend/`)**: Express.js server with MongoDB integration
- Communication via REST API endpoints between frontend and backend

### Key Components

1. **Authentication System**
   - JWT-based auth implemented in `todo-backend/routes/auth.js`
   - Endpoints: `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`
   - Token format: `Bearer <jwt_token>` in Authorization header

2. **Data Synchronization**
   - Main sync endpoint: `PATCH /api/todolist` in `todo-backend/routes/sync.js`
   - Supports batch operations for lists: add/update/delete
   - Settings management via `/api/settings` endpoints

3. **Frontend Structure**
   - Single page app with collapsible sidebar (`App.jsx`)
   - TailwindCSS for styling with dark theme in sidebar
   - Component hierarchy focuses on list management and settings

## Development Workflow

1. **Running the Application**
   ```bash
   # Frontend (my-todo/)
   npm run dev     # Development server
   npm run build   # Production build
   npm run preview # Preview production build
   
   # Backend (todo-backend/)
   nodemon server.js
   ```

2. **Environment Setup**
   - Backend requires `.env` file with:
     - `MONGODB_URI`: MongoDB connection string
     - `JWT_SECRET`: Secret for JWT signing
     - `PORT`: Optional, defaults to 5000

## Project-Specific Patterns

1. **Authentication Flow**
   - All API routes except auth endpoints require JWT token
   - Token expiry set to 7 days
   - Client-side logout (token deletion)

2. **Data Operations**
   - Batch processing for todo list operations
   - User settings stored in user document
   - MongoDB operations always scoped to `user_id`

3. **Frontend Conventions**
   - TailwindCSS utility classes for styling
   - State management via React hooks
   - Responsive sidebar with animation (`w-64` expanded, `w-16` collapsed)

## Integration Points

1. **MongoDB Collections**
   - `users`: User accounts and settings
     ```javascript
     {
         _id: ObjectId,
         email: String,
         password_hash: String
     }
     ```
   - `lists`: Todo lists with user_id reference
     ```javascript
     {
         _id: ObjectId,
         user_id: ObjectId,
         title: String,
         list: [
             {
                 id: Number,
                 task: String,
                 completed: Boolean,
                 due_date: Date,
                 due_time: Time,
                 starred: Boolean,
                 priority: Number
             }
         ]
     }
     ```

2. **API Authentication**
   ```javascript
   // Required headers for authenticated requests
   headers: {
     'Authorization': 'Bearer <jwt_token>',
     'Content-Type': 'application/json'
   }
   ```

## Common Gotchas

1. Always include `user_id` filter in MongoDB queries to maintain data isolation
2. JWT verification middleware (`authenticateToken`) required for protected routes
3. Frontend transitions require proper state management for sidebar animation
4. List items must maintain order - use array indices or order fields
5. Autosave implementation requires careful state tracking to avoid race conditions

## Feature Implementation Notes

1. **Todo Item Features**
   - Support for due dates and times
   - Label/tag system for filtering
   - Priority levels
   - Star/favorite capability
   - Separate complete/delete actions
   - Drag-and-drop reordering

2. **Settings Management**
   - Font size customization
   - Theme switching (dark/light)
   - Background image support
   - Label/marker configuration

3. **Future Enhancements**
   - Voice note integration
   - Todo transcription
   - AI-assisted list creation
   - Smart suggestions

For questions or improvements to these instructions, please discuss with the team.