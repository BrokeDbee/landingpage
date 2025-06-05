'use client';

import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function TopBar() {
  return (
    <div className="bg-primary text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <a href="tel:+233123456789" className="flex items-center hover:text-gray-200 transition duration-300">
              <FaPhone className="mr-2" />
              <span>+233 12 345 6789</span>
            </a>
            <a href="mailto:src@knutsford.edu.gh" className="flex items-center hover:text-gray-200 transition duration-300">
              <FaEnvelope className="mr-2" />
              <span>src@knutsford.edu.gh</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition duration-300">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition duration-300">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition duration-300">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 