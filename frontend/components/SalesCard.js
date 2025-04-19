import RouteButton from './RouteButton'; 

const roleColor = {
    'Senior Sales Executive': 'bg-pink-100 text-pink-800',
    'Sales Representative': 'bg-green-100 text-green-800',
    'Account Manager': 'bg-blue-100 text-blue-800',
    'Business Development Manager': 'bg-yellow-100 text-yellow-800',
    'Regional Sales Manager': 'bg-purple-100 text-purple-800',
  };

export default function SalesCard({ user, index }) {
  return (
    <div className="border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
      <div className="text-sm text-gray-400 mb-2 font-medium">#{index + 1}</div>
      <h3 className="text-lg font-semibold mb-1">{user.name}</h3>
      <p className="text-sm text-gray-600 mb-3">{user.region}</p>

      <span
        className={`inline-block text-xs px-2 py-1 rounded-full font-medium mb-3 ${roleColor[user.role] || 'bg-gray-100 text-gray-700 border border-gray-300'}`}
      >
        {user.role}
      </span>

      {user.skills && user.skills.length > 0 && (
        <div className="mb-3">
          <p className="text-sm font-medium mb-1 text-gray-700">Skills:</p>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <RouteButton href={`/sales/${user.id}`} name="View Detail" />
    </div>
  );
}
