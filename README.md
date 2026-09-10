# Robotics API & Frontend (Docker Exercise)

A simple full-stack app with a FastAPI backend and a React frontend.

## Project Structure

```text
├── backend/
│   ├── .dockerignore
│   ├── .env
│   ├── .env.example
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
├── .gitignore
├── docker-compose.yml
└── README.md
```

## API Routes

- `GET /` - Returns student ID, name, and status message:
  ```json
  {
    "student_id": "IT12345678",
    "name": "Makila Damsuka",
    "message": "My robotics API is alive"
  }
  ```
- `GET /health` - Health check:
  ```json
  {
    "status": "ok"
  }
  ```

---

## How to Run with Docker

### Option 1: Docker Compose (Both frontend and backend together)

Run from the project root:

```bash
docker compose up --build
```

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **Swagger Docs:** http://localhost:8000/docs

To stop both containers:
```bash
docker compose down
```

---

### Option 2: Running Containers Individually

#### 1. Backend:
```bash
cd backend
docker build -t backend .
docker run -p 8000:8000 backend
```

#### 2. Frontend:
```bash
cd frontend
docker build -t frontend .
docker run -p 3000:5173 frontend
```

---

## Running Locally (Without Docker)

### Backend:
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend:
```bash
cd frontend
npm install
npm run dev
```
