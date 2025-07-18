import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <FileText className="h-8 w-8" />
            <span className="text-xl font-bold">Resume Builder</span>
          </Link>
          <nav className="flex space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;