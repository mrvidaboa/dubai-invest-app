import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">Dubai Invest</Link>
          <div className="space-x-4">
            <Link href="/" className="text-gray-800 hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/#search" className="text-gray-800 hover:text-blue-600 transition-colors">Search</Link>
            <Link href="/#calculator" className="text-gray-800 hover:text-blue-600 transition-colors">Calculator</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

