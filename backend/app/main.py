from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import data, ai 

app = FastAPI(
    title="Sales Dashboard API",
    description="Backend API for Sales Dashboard with FastAPI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.api import data_router, ai_router
app.include_router(data.router, prefix="/api")
app.include_router(ai.router, prefix="/api")
