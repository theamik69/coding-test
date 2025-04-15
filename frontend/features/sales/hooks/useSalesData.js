import { useEffect, useState } from "react";
import { getSalesData } from "../services/salesService";

export default function useSalesData() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    getSalesData().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = [...users];

    if (search) {
      result = result.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (region !== "All") {
      result = result.filter((user) => user.region === region);
    }

    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "deals") {
      result.sort((a, b) => (b.deals?.length || 0) - (a.deals?.length || 0));
    }

    setFilteredUsers(result);
  }, [users, search, region, sortBy]);

  const regions = ["All", ...new Set(users.map((u) => u.region))];

  return {
    users,
    filteredUsers,
    loading,
    search,
    setSearch,
    region,
    setRegion,
    sortBy,
    setSortBy,
    regions,
  };
}
