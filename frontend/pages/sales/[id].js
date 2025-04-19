import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DetailCard from "../../components/DetailCard";
import RouteButton from "../../components/RouteButton";
import formatCurrency from "../../features/sales/utils/formatCurrency";
import { getSalesData } from "../../features/sales/services/salesService";

export default function SalesDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [sales, setSales] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchSalesDetail() {
      try {
        setLoading(true);
        const result = await getSalesData();

        if (!result.success || !result.data) {
          throw new Error(result.error);
        }

        const data = result.data;
        const selected = data.find((item) => item.id === parseInt(id));
        setSales(selected);
      } catch (err) {
        console.log(err.message);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchSalesDetail();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500 animate-pulse">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        <p className="text-lg font-semibold">{error}</p>
        <div className="mt-5">
          <RouteButton href="/" name="← Back" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Sales Detail: {sales.name}</h1>
      <DetailCard title="Role">
        <p>{sales.role}</p>
      </DetailCard>
      <DetailCard title="Region">
        <p>{sales.region}</p>
      </DetailCard>
      <DetailCard title="Skills">
        <ul className="list-disc ml-5">
          {sales.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </DetailCard>
      <DetailCard title="Deals">
        <ul className="list-disc ml-5">
          {sales.deals.map((deal, idx) => (
            <li key={idx}>
              <span className="font-medium">{deal.client}</span> - {formatCurrency(deal.value)} ({deal.status})
            </li>
          ))}
        </ul>
      </DetailCard>
      <DetailCard title="Clients">
        <ul className="list-disc ml-5 space-y-1">
          {sales.clients.map((client, idx) => (
            <li key={idx}>
              <span className="font-medium">{client.name}</span> ({client.industry}) - {client.contact}
            </li>
          ))}
        </ul>
      </DetailCard>
      <div className="mt-5">
        <RouteButton href="/" name="← Back" />
      </div>
    </div>
  );
}
