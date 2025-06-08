Here’s a complete and professional `README.md` file for your **Full Stack Blog Application**, covering all the important parts you've worked on including Docker, MongoDB, Postgres, authentication, microservices, and development setup:

---

```md
# 📝 Full Stack Blog Application

A fully functional full-stack blog application built with **React (TypeScript)** on the frontend and **Node.js/Express (TypeScript)** on the backend, supporting JWT-based authentication, protected routes, and full CRUD capabilities for posts.

---

## 📁 Project Structure

```

├── frontend/               # React TypeScript (Client)
└── backend/                # Node/Express Microservices (API)
├── auth-service/       # Authentication microservice
└── post-service/       # Blog post management microservice

````

---

## 🚀 Tech Stack

### Frontend
- React + TypeScript
- Redux Toolkit
- React Hook Form
- Axios
- DaisyUI + Tailwind CSS
- React Router DOM
- JWT Authentication

### Backend
- Node.js + Express + TypeScript
- PostgreSQL (Posts)
- MongoDB (Auth)
- Mongoose + Prisma
- JWT + Refresh Tokens
- Middleware-based error handling
- Request validation
- RESTful API
- Docker & Docker Compose
- AWS-ready structure (SQS, RabbitMQ supported for future messaging)

---

## 🐳 Dockerized Services

Your app includes Docker containers for:
- `MongoDB` + `mongo-express`
- `PostgreSQL`
- Each backend service (`auth-service`, `post-service`) can be containerized separately.

Run Docker services with:

```bash
docker compose up -d
````

---

## ⚙️ Getting Started

### ✅ Prerequisites

* Node.js (v18+)
* Docker & Docker Compose
* PostgreSQL & MongoDB
* Yarn or npm

---

## 🧩 Backend Setup

### 📦 Install dependencies

```bash
cd backend/auth-service
npm install

cd ../post-service
npm install
```

### ⚙️ Environment Variables

**auth-service: `.env`**

```env
PORT=4001
MONGODB_URI=mongodb://mongo:mongo@localhost:27017/auth-service?authSource=admin
JWT_SECRET=your-secret-key
```

**post-service: `.env`**

```env
PORT=4002
DATABASE_URL=postgresql://postgres:password@localhost:5432/post-service
JWT_SECRET=your-secret-key
```

> Make sure these DBs match your Docker Compose setup.

### ▶️ Run Dev Servers

```bash
# Auth service
cd backend/auth-service
npm run dev

# Post service
cd ../post-service
npm run dev
```

---

## 🌐 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App should now be running at: `http://localhost:5173` (or whatever Vite shows)

---

## 🔐 API Endpoints

### 🧑‍💻 Authentication (Auth Service)

| Method | Endpoint                  | Description            |
| ------ | ------------------------- | ---------------------- |
| POST   | `/api/auth/register`      | Register a new user    |
| POST   | `/api/auth/login`         | Login with credentials |
| POST   | `/api/auth/logout`        | Logout user            |
| POST   | `/api/auth/refresh-token` | Refresh access token   |
| GET    | `/api/auth/me`            | Get current user       |

### ✍️ Blog Posts (Post Service)

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| GET    | `/api/posts`     | Get all posts   |
| GET    | `/api/posts/:id` | Get post by ID  |
| POST   | `/api/posts`     | Create new post |
| PUT    | `/api/posts/:id` | Update post     |
| DELETE | `/api/posts/:id` | Delete post     |

---

## 🧪 Testing APIs with `curl`

### Register

```bash
curl -X POST http://localhost:4001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"test123","name":"John"}'
```

### Login

```bash
curl -X POST http://localhost:4001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"test123"}'
```

### Create Post

```bash
curl -X POST http://localhost:4002/api/posts \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Post", "content":"This is a blog post"}'
```

---

## 🛠 Common Errors & Fixes

* **MongoDB Authentication Failed**:
  Ensure `MONGODB_URI` matches the Mongo container’s credentials. If using Docker, the hostname should be `mongo` not `localhost`.

* **Permission Denied on ts-node-dev**:

  ```bash
  chmod +x node_modules/.bin/ts-node-dev
  ```

* **Container Name Already in Use**:

  ```bash
  docker rm -f <container_name>
  ```

* **Mongoose Not Found Error**:

  ```bash
  npm install mongoose
  ```

---

## 🧼 Scripts

```bash
npm run dev       # Start development server
npm run build     # Compile TypeScript
npm run lint      # Run linter
```

---

## 💬 Future Enhancements

* Commenting system
* Like/Bookmark functionality
* Admin dashboard
* WebSockets for real-time updates
* Email notifications
* GraphQL API layer
* Deployment to AWS/GCP

---

## 🧑‍💻 Author

**Mohammed Iqbal**
Full Stack Developer
Skills: React, Node.js, MongoDB, PostgreSQL, AWS, Docker, TypeScript

---

## 📄 License

MIT License

```

---

Let me know if you also want a separate `docker-compose.yml` section or deployment instructions for production (e.g. with Nginx, CI/CD, etc.).
```
