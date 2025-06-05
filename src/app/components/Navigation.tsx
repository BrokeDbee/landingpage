'use client';

import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">Knutsford University SRC</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#news" className="text-gray-600 hover:text-primary transition duration-300">News</a>
            <a href="#events" className="text-gray-600 hover:text-primary transition duration-300">Events</a>
            <a href="#executives" className="text-gray-600 hover:text-primary transition duration-300">Executives</a>
            <a href="#resources" className="text-gray-600 hover:text-primary transition duration-300">Resources</a>
            <a href="#contact" className="text-gray-600 hover:text-primary transition duration-300">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 hover:text-primary transition duration-300"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a 
                href="#news" 
                className="block px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition duration-300"
                onClick={toggleMenu}
              >
                News
              </a>
              <a 
                href="#events" 
                className="block px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition duration-300"
                onClick={toggleMenu}
              >
                Events
              </a>
              <a 
                href="#executives" 
                className="block px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition duration-300"
                onClick={toggleMenu}
              >
                Executives
              </a>
              <a 
                href="#resources" 
                className="block px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition duration-300"
                onClick={toggleMenu}
              >
                Resources
              </a>
              <a 
                href="#contact" 
                className="block px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition duration-300"
                onClick={toggleMenu}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 