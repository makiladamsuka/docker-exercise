# Docker Exercise - FastAPI & React Full-Stack App

Minimal full-stack application featuring a FastAPI backend and a React frontend.

## API Specification

### Route 1: `GET /`
Returns student information and robotics status message:
```json
{
  "student_id": "IT12345678",
  "name": "Makila Damsuka",
  "message": "My robotics API is alive"
}
```

### Route 2: `GET /health`
Returns exact health confirmation:
```json
{
  "status": "ok"
}
```

---

## Quick Start

### 1. Backend Setup
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --port 8000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:5173` (or next available port) and interactively test both FastAPI endpoints.
