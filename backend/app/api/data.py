from fastapi import APIRouter, HTTPException
import json
from pathlib import Path
from typing import List
from app.models.sales import SalesRep
import logging

router = APIRouter()

logging.basicConfig(level=logging.INFO)

file_path = Path(__file__).parent.parent / "dummyData.json"

try:
    with open(file_path, "r") as f:
        raw_data = json.load(f)
        if "salesReps" not in raw_data:
            raise keyError("'salesReps' key not found in dummyData.json")
except FileNotFoundError:
    logging.error(f"The file dummyData.json was not found at the specified path: {file_path}")
    raise HTTPException(status_code=500, detail="Data file not found.")
except json.JSONDecodeError as e:
    logging.error(f"Failed to read the JSON file: {e}")
    raise HTTPException(status_code=500, detail="Invalid JSON format.")
except KeyError as e:
    logging.error(f"Key error occurred while reading the data: {e}")
    raise HTTPException(status_code=500, detail=str(e))
except Exception as e:
    logging.error(f"Unexpected error occurred while loading the data: {e}")
    raise HTTPException(status_code=500, detail="Internal server error occurred while loading the data.")

@router.get("/data", response_model=List[SalesRep], tags=["Data"])
def get_data():
    """
    Returns list of sales representatives (with validated structure).
    """
    try:
        return raw_data["salesReps"]
    except KeyError:
        raise HTTPException(status_code=500, detail="'salesReps' key not found in loaded data.")