from fastapi import APIRouter, HTTPException
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from app.models.ai import AIRequest
from app.utils import error_handler
from pathlib import Path
from dotenv import load_dotenv
import json
import os

load_dotenv()
router = APIRouter()

file_path = Path(__file__).parent.parent / "dummyData.json"

try:
    with open(file_path, "r") as f:
        data_json = json.load(f)
        context = json.dumps(data_json["salesReps"], indent=2)
except FileNotFoundError:
    error_handler.handle_file_not_found(str(file_path))
except json.JSONDecodeError as e:
    error_handler.handle_json_decode_error(e)
except KeyError as e:
    error_handler.handle_key_error(e)
except Exception as e:
    error_handler.handle_generic_error(e)

context = json.dumps(data_json["salesReps"], indent=2)

llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash-exp",
    temperature=0.3,
    google_api_key=os.getenv("GOOGLE_API_KEY")
)

prompt = PromptTemplate(
    input_variables=["context", "question"],
    template="""
You are an AI assistant helping analyze sales data.

Sales Data:
{context}

User Question:
{question}

Answer:"""
)

chain = prompt | llm

@router.post("/ai", tags=["AI"])
async def ai_endpoint(body: AIRequest):
    question = body.question.strip()

    if not question:
        raise HTTPException(status_code=400, detail="The question cannot be empty.")

    try:
        result = chain.invoke({"context": context, "question": question})
        return {"answer": result.content if hasattr(result, "content") else str(result)}
    except Exception as e:
        error_handler.handle_ai_processing_error(e)
