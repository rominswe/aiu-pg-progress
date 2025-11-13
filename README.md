# AIU PG Progress

A full-stack application with React frontend and Node.js/Express backend, using MySQL and Redis.

## Prerequisites

- **Docker & Docker Compose** (recommended) OR
- **Node.js** (v18 or higher) and **npm**
- **MySQL** (v8.0 or higher) - if running locally
- **Redis** - if running locally

## Quick Start with Docker (Recommended)

This is the easiest way to run the project as it sets up all services automatically.

### 1. Create Environment File

Create a `.env` file in the `server/` directory:

```bash
# server/.env
PORT=5000
REDIS_HOST=redis
REDIS_PORT=6379
JWT_SECRET=your-secret-key-here
```

### 2. Start All Services

From the project root directory, run:

```bash
docker-compose up --build
```

This will:
- Build and start the MySQL database (port 3307)
- Build and start Redis (port 6379)
- Build and start the server (port 5000)
- Build and start the client (port 5173)
- Start phpMyAdmin (port 8080)

### 3. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **phpMyAdmin**: http://localhost:8080 (username: `root`, password: `root`)

### 4. Stop Services

Press `Ctrl+C` or run:

```bash
docker-compose down
```

To remove volumes (database data):

```bash
docker-compose down -v
```

## Local Development (Without Docker)

### 1. Database Setup

Start MySQL and create a database:

```sql
CREATE DATABASE aiu_pg_progress;
```

### 2. Redis Setup

Start Redis server on port 6379.

### 3. Server Setup

Navigate to the server directory:

```bash
cd server
```

Create a `.env` file:

```bash
PORT=5000
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-secret-key-here
```

Update `server/src/config/db.js` to use localhost instead of "mysql":

```javascript
const sequelize = new Sequelize("aiu_pg_progress", "root", "your_password", {
  host: "localhost",  // Changed from "mysql"
  dialect: "mysql",
  port: 3306,
});
```

Install dependencies and start the server:

```bash
npm install
npm run dev
```

The server will run on http://localhost:5000

### 4. Client Setup

Open a new terminal and navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file (optional, defaults to localhost:5000):

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The client will run on http://localhost:5173

## Project Structure

```
├── client/          # React frontend (Vite)
├── server/          # Node.js/Express backend
├── docker-compose.yaml  # Docker orchestration
└── README.md        # This file
```

## Services

- **Frontend**: React + Vite with Tailwind CSS
- **Backend**: Express.js with Sequelize ORM
- **Database**: MySQL 8.0
- **Cache**: Redis 8.0
- **Admin**: phpMyAdmin for database management

## Troubleshooting

### Database Connection Issues

- Ensure MySQL is running and accessible
- Check that the database credentials match your setup
- For Docker: wait a few seconds for MySQL to fully initialize

### Port Already in Use

If ports are already in use, you can modify them in:
- `docker-compose.yaml` for Docker setup
- `.env` files for local setup

### Redis Connection Issues

- Ensure Redis is running
- Check `REDIS_HOST` and `REDIS_PORT` in your `.env` file
- For Docker: use `redis` as hostname
- For local: use `localhost` as hostname

## Development Scripts

### Server
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Variables

### Server (.env in server/)
- `PORT` - Server port (default: 5000)
- `REDIS_HOST` - Redis hostname (use `redis` for Docker, `localhost` for local)
- `REDIS_PORT` - Redis port (default: 6379)
- `JWT_SECRET` - Secret key for JWT tokens

### Client (.env in client/)
- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:5000/api)

