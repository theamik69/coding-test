import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/data")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      });
  }, []);

  const handleAskQuestion = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error("Error in AI request:", error);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sales Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Dummy Data</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <strong>{user.name}</strong> - {user.role} ({user.region})<br />
                  Skills: {user.skills.join(", ")}<br />
                  Deals Closed: {user.deals.filter(d => d.status === "Closed Won").length}
                </li>
              ))}
            </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Ask a Question (AI Endpoint)</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="border p-2 flex-1 rounded"
            placeholder="Enter your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            onClick={handleAskQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Ask
          </button>
        </div>
        {answer && (
          <div className="bg-gray-100 p-4 rounded">
            <strong>AI Response:</strong> {answer}
          </div>
        )}
      </section>
    </div>
  );
}
