import pytest
from httpx import AsyncClient
from httpx._transports.asgi import ASGITransport
from app.main import app

transport = ASGITransport(app=app)

@pytest.mark.asyncio
async def test_ai_success():
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post("/api/ai", json={"question": "Who is the sales representative with the highest total deal value?"})
    assert response.status_code == 200
    assert "answer" in response.json()

@pytest.mark.asyncio
async def test_ai_empty_question():
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post("/api/ai", json={"question": ""})
    assert response.status_code == 400
    assert response.json()["detail"] == "The question cannot be empty."

@pytest.mark.asyncio
async def test_ai_missing_question_field():
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post("/api/ai", json={})
    assert response.status_code == 422
