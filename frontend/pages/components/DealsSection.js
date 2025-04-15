import { useEffect, useState } from "react";
import formatCurrency from "../../features/sales/utils/formatCurrency";
import { getSalesData } from "../../features/sales/services/salesService";

export default function DealsSection() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSalesData().then((data) => {
            setUsers(data);
            setLoading(false);
        });
    }, []);

  const allDeals = users.flatMap((user) =>
    user.deals.map((deal) => ({ ...deal, salesName: user.name }))
  );

  const grouped = {
    "Closed Won": [],
    "In Progress": [],
    "Closed Lost": [],
  };

  allDeals.forEach((deal) => {
    if (grouped[deal.status]) {
      grouped[deal.status].push(deal);
    }
  });

  const statusColor = {
    "Closed Won": "bg-green-100 text-green-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
    "Closed Lost": "bg-red-100 text-red-800",
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">All Deals by Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(grouped).map(([status, deals]) => (
          <div
            key={status}
            className="bg-white border border-gray-200 rounded-xl shadow p-4"
          >
            <h3 className="text-lg font-semibold mb-3">{status}</h3>
            <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {deals.length === 0 ? (
                <p className="text-gray-400 text-sm italic">No deals</p>
              ) : (
                deals.map((deal, index) => (
                  <li
                    key={index}
                    className={`p-3 rounded-md bg-gray-50 border-l-4 ${
                      status === "Closed Won"
                        ? "border-green-500"
                        : status === "In Progress"
                        ? "border-yellow-500"
                        : "border-red-500"
                    }`}
                  >
                    <p className="font-medium">
                      {deal.client} — {formatCurrency(deal.value)}
                    </p>
                    <p className="text-sm text-gray-500">
                      by {deal.salesName}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
