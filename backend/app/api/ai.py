from fastapi import APIRouter, HTTPException
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from app.models.ai import AIRequest
import json
from pathlib import Path
from dotenv import load_dotenv
import os
import logging

load_dotenv()
router = APIRouter()
logging.basicConfig(level=logging.INFO)

file_path = Path(__file__).parent.parent / "dummyData.json"
with open(file_path, "r") as f:
    data_json = json.load(f)

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

chain = LLMChain(llm=llm, prompt=prompt)

@router.post("/ai", tags=["AI"])
async def ai_endpoint(body: AIRequest):
    question = body.question

    if not question:
        raise HTTPException(status_code=400, detail="The question cannot be empty")

    try:
        result = chain.run(context=context, question=question)
        return {"answer": result}
    except Exception as e:
        logging.error(f"AI processing failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to process the AI request. Please try again later.")
