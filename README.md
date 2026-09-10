# Robotics API - Full-Stack App

A simple full-stack web application with a **FastAPI** backend and a **React** (Vite) frontend, containerized with **Docker** and **Docker Compose**.

---

## Project Structure

```text
├── backend/
│   ├── .env                  # Environment variables (Student ID, Name)
│   ├── .env.example          # Example configuration template
│   ├── .dockerignore         # Docker ignore rules
│   ├── Dockerfile            # Backend Docker instructions
│   ├── main.py               # FastAPI application & routes
│   └── requirements.txt      # Python dependencies
│
├── frontend/
│   ├── .dockerignore         # Docker ignore rules
│   ├── Dockerfile            # Frontend Docker instructions
│   ├── index.html            # Main HTML entry point
│   ├── package.json          # Node dependencies & scripts
│   ├── vite.config.js        # Vite configuration
│   └── src/
│       ├── App.css           # Styling
│       ├── App.jsx           # Dashboard component
│       ├── index.css         # Base reset styles
│       └── main.jsx          # React DOM render entry
│
├── .gitignore                # Git ignore rules
├── docker-compose.yml        # Orchestrates backend & frontend containers
└── README.md                 # Project documentation
```

---

## API Endpoints

| Method | Endpoint | Description | Example Response |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Returns student info and message | `{"student_id":"IT12345678","name":"Makila Damsuka","message":"My robotics API is alive"}` |
| `GET` | `/health` | Health check endpoint | `{"status":"ok"}` |
| `GET` | `/docs` | Swagger interactive API docs | *Interactive Swagger UI* |

---

## Getting Started with Docker Compose (Recommended)

Docker Compose starts both the backend and frontend together with a single command.

### 1. Start Both Services

From the root directory of the project:

```bash
docker compose up --build
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:8000](http://localhost:8000)
- **API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

*(To run in the background detached mode, add `-d`: `docker compose up --build -d`)*

### 2. Stop the Services

```bash
docker compose down
```

---

## Running Containers Individually

If you prefer building and running containers separately without Docker Compose:

### 1. Backend Container

```bash
# Navigate to backend and build image
cd backend
docker build -t backend .

# Run container on port 8000
docker run -p 8000:8000 backend
```

### 2. Frontend Container

```bash
# Navigate to frontend and build image
cd frontend
docker build -t frontend .

# Run container (mapping port 3000 to avoid port collisions)
docker run -p 3000:5173 frontend
```

---

## Running Locally (Without Docker)

### 1. Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Configuration

You can update your student credentials anytime in `backend/.env`:

```ini
STUDENT_ID=IT12345678
STUDENT_NAME=Makila Damsuka
API_MESSAGE=My robotics API is alive
PORT=8000
```
