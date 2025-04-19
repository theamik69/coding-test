import { askAI } from "../features/ai/services/aiService"; 

describe("askAI", () => {
  beforeAll(() => {
      jest.spyOn(console, "error").mockImplementation(() => {});
    });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return answer when fetch is successful", async () => {
    const mockAnswer = "This is the AI response.";
    
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ answer: mockAnswer }),
    });

    const result = await askAI("Who is the top-selling?");
    
    expect(result).toBe(mockAnswer);
    expect(global.fetch).toHaveBeenCalledTimes(1); 
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/ai",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: "Who is the top-selling?" }),
      })
    );
  });

  it("should throw an error when fetch fails", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    await expect(askAI("Who is the top-selling?")).rejects.toThrow("Network error");
  });

  it("should throw an error if response is not ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    await expect(askAI("Who is the top-selling?")).rejects.toThrow("Failed to fetch AI response");
  });
});
