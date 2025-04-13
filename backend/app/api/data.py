from fastapi import APIRouter, HTTPException
from app.models.sales import SalesRep
from app.utils import error_handler
from pathlib import Path
from typing import List
import json

router = APIRouter()

file_path = Path(__file__).parent.parent / "dummyData.json"

try:
    with open(file_path, "r") as f:
        raw_data = json.load(f)
        if "salesReps" not in raw_data:
            raise KeyError("'salesReps' key not found")
except FileNotFoundError:
    error_handler.handle_file_not_found(str(file_path))
except json.JSONDecodeError as e:
    error_handler.handle_json_decode_error(e)
except KeyError as e:
    error_handler.handle_key_error(e)
except Exception as e:
    error_handler.handle_generic_error(e)

@router.get("/data", response_model=List[SalesRep], tags=["Data"])
def get_data():
    """
    Returns list of sales representatives (with validated structure).
    """
    try:
        return raw_data["salesReps"]
    except KeyError:
        raise HTTPException(status_code=500, detail="'salesReps' key not found in loaded data.")