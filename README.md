# TODO 2.0

A modern, feature-rich todo application with real-time synchronization and responsive design.

## Features

- ✨ Responsive minimalist design
- 🎨 Dark/light theme support
- ⏰ Due dates and times for tasks
- 🏷️ Custom labels and filtering
- ⭐ Task prioritization and starring
- 💾 Autosave with undo/redo
- 🔒 Secure user authentication
- 📱 Optimized for all screen sizes

## Tech Stack

- **Frontend**:
  - React + Vite
  - TailwindCSS for styling
  - Modern React Hooks for state management

- **Backend**:
  - Express.js server
  - MongoDB database
  - JWT authentication

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
cd TODO-2.0
```

2. Install dependencies
```bash
# Install frontend dependencies
cd my-todo
npm install

# Install backend dependencies
cd ../todo-backend
npm install
```

3. Set up environment variables
```bash
# In todo-backend/.env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000  # Optional, defaults to 5000
```

4. Run the application
```bash
# Start backend server
cd todo-backend
nodemon server.js

# In another terminal, start frontend
cd my-todo
npm run dev
```

## Project Structure

```
TODO 2.0/
├── my-todo/               # Frontend React application
│   ├── src/
│   ├── public/
│   └── package.json
├── todo-backend/         # Backend Express server
│   ├── routes/
│   ├── server.js
│   └── package.json
└── .github/             # Project documentation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.