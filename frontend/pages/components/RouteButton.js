import Link from 'next/link';

export default function RouteButton({ href, name }) {
  return (
    <Link href={href}>
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        {name}
      </button>
    </Link>
  );
}
