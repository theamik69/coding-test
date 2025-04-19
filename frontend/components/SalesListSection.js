import FilterControls from "./FilterControls";
import SalesCard from "./SalesCard";
import useSalesData from "../features/sales/hooks/useSalesData";

export default function SalesListSection() {
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
    error,
  } = useSalesData();

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4">List Sales</h2>

      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading...</p>
      ) : error ? (
        <p className="text-red-600 font-semibold">{error}</p>
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
          {filteredUsers.length === 0 ? (
            <p className="text-gray-400 italic mt-4">No sales data found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {filteredUsers.map((user, index) => (
                <SalesCard key={user.id || index} user={user} index={index} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
