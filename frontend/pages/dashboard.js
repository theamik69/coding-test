import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [sortKey, setSortKey] = useState("name");

  useEffect(() => {
    fetch("http://localhost:8000/api/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const filteredData = data
    .filter((rep) =>
      rep.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((rep) => (regionFilter ? rep.region === regionFilter : true))
    .sort((a, b) => {
      if (sortKey === "deals") return b.deals.length - a.deals.length;
      return a.name.localeCompare(b.name);
    });

  const chartData = {
    labels: filteredData.map((rep) => rep.name),
    datasets: [
      {
        label: "Total Deals",
        data: filteredData.map((rep) => rep.deals.length),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Sales Representative Dashboard</h1>

      <div className="flex flex-wrap gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          <option value="">All Regions</option>
          {[...new Set(data.map((rep) => rep.region))].map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        <select
          className="border p-2 rounded"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="deals">Sort by Deals Count</option>
        </select>
      </div>

      <Bar data={chartData} className="max-w-2xl" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredData.map((rep) => (
          <div key={rep.id} className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold">{rep.name}</h2>
            <p className="text-gray-600">{rep.role} ({rep.region})</p>
            <p><strong>Skills:</strong> {rep.skills.join(", ")}</p>

            <div className="mt-2">
              <strong>Deals:</strong>
              <ul className="list-disc ml-5">
                {rep.deals.map((deal, i) => (
                  <li key={i}>
                    {deal.client} - ${deal.value} ({deal.status})
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-2">
              <strong>Clients:</strong>
              <ul className="list-disc ml-5">
                {rep.clients.map((client, i) => (
                  <li key={i}>
                    {client.name} ({client.industry}) - {client.contact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
