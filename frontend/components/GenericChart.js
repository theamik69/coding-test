
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
  } from "chart.js";
  import { Bar, Pie, Doughnut } from "react-chartjs-2";
  
  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
  
  const chartComponents = {
    bar: Bar,
    pie: Pie,
    doughnut: Doughnut,
  };
  
  export default function GenericChart({ type = "bar", title = '', labels, datasets, options = {} }) {
    const ChartComponent = chartComponents[type];
  
    const data = {
      labels,
      datasets,
    };
  
    if (!ChartComponent) return <p className="text-red-500">Invalid chart type</p>;
  
    return (
      <div className="mt-12">
        {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200 max-w-3xl mx-auto">
          <ChartComponent data={data} options={options} />
        </div>
      </div>
    );
  }
  