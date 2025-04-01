
import React from 'react';
import { Calculator, Mail, Download } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-soft py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Calculator className="w-8 h-8 text-white mr-2" />
          <h1 className="text-white text-xl font-bold">Deal Size Visualizer Pro</h1>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center text-white hover:text-accent transition-colors">
            <Mail className="mr-1 w-5 h-5" />
            <span className="text-sm">Share</span>
          </button>
          <button className="flex items-center text-white hover:text-accent transition-colors">
            <Download className="mr-1 w-5 h-5" />
            <span className="text-sm">Download</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
