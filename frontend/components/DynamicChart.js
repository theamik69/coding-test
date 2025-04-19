import { useEffect, useState } from "react";
import { getSalesData } from "../features/sales/services/salesService";
import GenericChart from "./GenericChart";
import formatCurrency from "../features/sales/utils/formatCurrency";

export default function DynamicChart({ chartType }) {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [options, setOptions] = useState({});
  const [chartMode, setChartMode] = useState("bar");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getSalesData();

        if (!result.success || !result.data) {
          throw new Error(result.error);
        }

        const users = result.data;

        const colors = [
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(251, 191, 36, 0.7)",
          "rgba(239, 68, 68, 0.7)",
          "rgba(168, 85, 247, 0.7)",
          "rgba(14, 165, 233, 0.7)",
          "rgba(244, 114, 182, 0.7)",
        ];

        let labels = [];
        let data = [];
        let datasets = [];
        let options = {};
        let type = "bar";

        switch (chartType) {
          case "totalSales":
            labels = users.map((user) => user.name);
            data = users.map((user) =>
              (user.deals || [])
                .filter((d) => d.status === "Closed Won")
                .reduce((sum, d) => sum + d.value, 0)
            );
            datasets = [{
              label: "Total Sales (Closed Won)",
              data,
              backgroundColor: data.map((_, i) => colors[i % colors.length]),
            }];
            options = {
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (ctx) => formatCurrency(ctx.parsed.y),
                  },
                },
              },
              scales: {
                y: {
                  ticks: {
                    callback: (v) => formatCurrency(v),
                  },
                },
              },
            };
            break;

          case "dealCount":
            labels = users.map((user) => user.name);
            data = users.map((user) => (user.deals || []).length);
            datasets = [{
              label: "Number of Deals",
              data,
              backgroundColor: data.map((_, i) => colors[i % colors.length]),
            }];
            break;

          case "regionSales":
            const regionMap = {};
            users.forEach((user) => {
              const total = (user.deals || [])
                .filter((d) => d.status === "Closed Won")
                .reduce((sum, d) => sum + d.value, 0);
              regionMap[user.region] = (regionMap[user.region] || 0) + total;
            });
            labels = Object.keys(regionMap);
            data = Object.values(regionMap);
            datasets = [{
              label: "Total Sales per Region",
              data,
              backgroundColor: data.map((_, i) => colors[i % colors.length]),
            }];
            break;

          case "clientCount":
            labels = users.map((user) => user.name);
            data = users.map((user) => (user.clients || []).length);
            datasets = [{
              label: "Number of Clients",
              data,
              backgroundColor: data.map((_, i) => colors[i % colors.length]),
            }];
            break;

          case "dealStatus":
            const statusMap = {};
            users.forEach((user) => {
              (user.deals || []).forEach((deal) => {
                statusMap[deal.status] = (statusMap[deal.status] || 0) + 1;
              });
            });
            labels = Object.keys(statusMap);
            data = Object.values(statusMap);
            datasets = [{
              label: "Deal Status Distribution",
              data,
              backgroundColor: data.map((_, i) => colors[i % colors.length]),
            }];
            type = "pie";
            break;

          case "skillDistribution":
            const skillMap = {};
            users.forEach((user) => {
              (user.skills || []).forEach((skill) => {
                skillMap[skill] = (skillMap[skill] || 0) + 1;
              });
            });
            labels = Object.keys(skillMap);
            data = Object.values(skillMap);
            datasets = [{
              label: "Number of Sales Reps",
              data,
              backgroundColor: data.map((_, i) => colors[i % colors.length]),
            }];
            type = "doughnut";
            break;

          case "topIndustries":
            const industryMap = {};
            users.forEach((user) => {
              (user.clients || []).forEach((client) => {
                industryMap[client.industry] = (industryMap[client.industry] || 0) + 1;
              });
            });
            labels = Object.keys(industryMap);
            data = Object.values(industryMap);
            datasets = [{
              label: "Number of Clients",
              data,
              backgroundColor: data.map((_, i) => colors[i % colors.length]),
            }];
            break;

          default:
            throw new Error("Invalid chart type");
        }

        setLabels(labels);
        setDatasets(datasets);
        setOptions(options);
        setChartMode(type);
      } catch (err) {
        console.error("Failed to fetch chart data:", err);
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chartType]);

  if (loading) {
    return <p className="text-gray-500">Loading chart data...</p>;
  }

  if (error) {
    return <p className="text-red-600 bg-red-100 p-4 rounded">{error}</p>;
  }

  return (
    <GenericChart
      type={chartMode}
      labels={labels}
      datasets={datasets}
      options={options}
    />
  );
}
