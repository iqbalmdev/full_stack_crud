# Full Stack Blog Application

This is a full-stack blog application with React TypeScript frontend and Node.js/Express TypeScript backend.

## Project Structure
```
├── frontend/           # React TypeScript frontend
└── backend/           # Node.js/Express TypeScript backend
```

## Frontend Features
- React with TypeScript
- Redux Toolkit for state management
- React Hook Form for form handling
- Axios for API calls
- DaisyUI for styling
- JWT authentication
- Protected routes
- CRUD operations for posts

## Backend Features
- Node.js with Express and TypeScript
- JWT authentication with refresh tokens
- PostgreSQL database
- Docker configuration
- Error handling middleware
- Request validation
- Session management

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL

### Backend Setup
1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Frontend Setup
1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- POST /api/auth/logout - Logout user
- POST /api/auth/refresh-token - Refresh access token

### Posts
- GET /api/posts - Get all posts
- GET /api/posts/:id - Get post by ID
- POST /api/posts - Create new post
- PUT /api/posts/:id - Update post
- DELETE /api/posts/:id - Delete post 