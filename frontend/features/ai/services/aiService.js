export async function askAI(question) {
    try {
      const response = await fetch("http://localhost:8000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }
  
      const data = await response.json();
      return data.answer;
    } catch (error) {
      throw error;
    }
  }
  