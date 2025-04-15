import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SalesCard from "./components/SalesCard";
import FilterControls from "./components/FilterControls";
import useSalesData from "../features/sales/hooks/useSalesData";
import DealsSection from "./components/DealsSection";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(""); 

  const {
    filteredUsers,
    search,
    setSearch,
    region,
    setRegion,
    sortBy,
    setSortBy,
    regions,
    loading,
  } = useSalesData();

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
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sales Dashboard</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Ask a Question</h2>
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

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">List Sales</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <>
            <FilterControls
              search={search}
              setSearch={setSearch}
              region={region}
              setRegion={setRegion}
              sortBy={sortBy}
              setSortBy={setSortBy}
              regions={regions}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user, index) => (
                <SalesCard key={user.id} user={user} index={index} />
              ))}
            </div>
          </>
        )}
      </section>
     
      <DealsSection/>

    </div>
  );
}
