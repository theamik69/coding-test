import React from "react";

export default function FilterControls({
  search,
  setSearch,
  region,
  setRegion,
  sortBy,
  setSortBy,
  regions,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-white p-4 rounded shadow">

      <input
        type="text"
        className="border rounded px-3 py-2 flex-1"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border rounded px-3 py-2"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >
        {regions.map((reg) => (
          <option key={reg} value={reg}>
            {reg}
          </option>
        ))}
      </select>

      <select
        className="border rounded px-3 py-2"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="name">Sort by Name</option>
        <option value="deals">Sort by Deals Count</option>
      </select>
    </div>
  );
}
