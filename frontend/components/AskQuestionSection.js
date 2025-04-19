import { useState } from "react";
import { askAI } from "../features/ai/services/aiService";

export default function AskQuestionSection() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      return;
    }

    setLoading(true);
    setError(null);
    setAnswer("");

    try {
      const aiAnswer = await askAI(question);
      setAnswer(aiAnswer);
    } catch (err) {
      setError("Failed to get a response from the AI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="m-5">
      <h2 className="text-xl font-semibold m-2">Ask AI</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-1 rounded"
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
        />
        <button
          onClick={handleAskQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Asking..." : "Ask"}
        </button>
      </div>

      {error && (
        <div className="text-red-600 bg-red-100 p-3 rounded mb-3">
          {error}
        </div>
      )}

      {answer && (
        <div className="bg-gray-100 p-4 rounded">
          <strong className="block mb-1 text-gray-700">AI Response:</strong>
          <p className="text-sm text-gray-800 whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </section>
  );
}
