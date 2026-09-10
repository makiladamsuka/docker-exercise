import os
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env if present
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

app = FastAPI(
    title="Robotics API",
    description="FastAPI backend for robotics assignment",
    version="1.0.0",
)

# Allow CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for easy development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

STUDENT_ID = os.getenv("STUDENT_ID", "245532U")
STUDENT_NAME = os.getenv("STUDENT_NAME", "Makila Damsuka")
API_MESSAGE = os.getenv("API_MESSAGE", "My robotics API is alive")


@app.get("/")
def get_root():
    """Route 1 (/): Returns student ID, name, and status message."""
    return {
        "student_id": STUDENT_ID,
        "name": STUDENT_NAME,
        "message": API_MESSAGE,
    }


@app.get("/health")
def get_health():
    """Route 2 (/health): Returns exactly {"status": "ok"}."""
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
