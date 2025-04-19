import AskQuestionSection from "../components/AskQuestionSection";
import SalesListSection from "../components/SalesListSection";
import DealsSection from "../components/DealsSection";
import ChartSelector from "../components/ChartSelector";

export default function Home() {

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sales Dashboard</h1>
      <AskQuestionSection />
      <div className="p-6 max-w-5xl mx-auto">
        <ChartSelector />
      </div>
      <DealsSection />
      <SalesListSection />
    </div>
  );
}
