export default function DetailCard({ title, children }) {
  return (
    <div className="rounded-2xl shadow-lg overflow-hidden border border-gray-200 bg-white transition-transform hover:-translate-y-1 hover:shadow-xl duration-300">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 font-semibold text-lg tracking-wide">
        {title}
      </div>
      <div className="px-5 py-4 text-gray-700 text-sm space-y-2">
        {children}
      </div>
    </div>
  );
}
