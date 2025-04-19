from fastapi import HTTPException
import logging

logging.basicConfig(level=logging.INFO)

def handle_file_not_found(path: str):
    logging.error(f"File not found: {path}")
    raise HTTPException(status_code=404, detail="Data file not found.")

def handle_json_decode_error(e: Exception):
    logging.error(f"JSON decode error: {e}")
    raise HTTPException(status_code=400, detail="Invalid JSON format.")

def handle_key_error(e: Exception):
    logging.error(f"Missing key: {e}")
    raise HTTPException(status_code=422, detail=str(e))

def handle_ai_processing_error(e: Exception):
    logging.error(f"AI processing failed: {e}")
    raise HTTPException(status_code=500, detail="Failed to process the AI request. Please try again later.")

def handle_generic_error(e: Exception):
    logging.error(f"Unexpected error: {e}")
    raise HTTPException(status_code=500, detail="Internal server error.")
