import DynamicChart from "./DynamicChart";

const chartOptions = [
  { value: "totalSales", label: "Total Deal Value per Sales Rep" },
  { value: "dealCount", label: "Number of Deals per Sales Rep" },
  { value: "regionSales", label: "Total Deal Value per Region" },
  { value: "clientCount", label: "Number of Clients per Sales Rep" },
  { value: "dealStatus", label: "Deal Status Distribution" },
  { value: "skillDistribution", label: "Skill Distribution" },
  { value: "topIndustries", label: "Top Client Industries" },
];

export default function ChartSelector() {
  return (
    <div className="overflow-x-auto py-4">
      <div className="flex space-x-6 px-4">
        {chartOptions.map((chart) => (
          <div
            key={chart.value}
            className="transition-transform duration-300 transform hover:scale-105 hover:z-10 bg-white rounded-lg shadow-md p-4 min-w-[400px]"
          >
            <h3 className="text-center text-sm font-semibold mb-2">{chart.label}</h3>
            <DynamicChart chartType={chart.value} />
          </div>
        ))}
      </div>
    </div>
  );
}
