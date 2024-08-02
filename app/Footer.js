export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <p>&copy; 2024 Dubai Invest. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    );
  }