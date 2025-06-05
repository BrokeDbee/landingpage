'use client';

import { useState, useEffect } from 'react';
import { FaClock, FaCalendarAlt, FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';

export default function TopBar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New SRC meeting scheduled", time: "2 hours ago" },
    { id: 2, message: "Registration for cultural festival is open", time: "1 day ago" },
    { id: 3, message: "Academic calendar updated", time: "2 days ago" }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notifications-panel') && !target.closest('.notifications-button')) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Bar with Time and Quick Actions */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FaClock className="mr-2" />
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                <span>{currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="notifications-button hover:text-gray-200 transition duration-300 relative"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <FaBell />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              <button 
                className="hover:text-gray-200 transition duration-300"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <FaSearch />
              </button>
              <button className="hover:text-gray-200 transition duration-300">
                <FaUserCircle />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-lg p-4 w-full max-w-2xl mx-4">
            <div className="flex items-center border-b pb-4">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search for news, events, or resources..."
                className="w-full outline-none"
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="ml-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Quick Links</h3>
              <div className="grid grid-cols-2 gap-2">
                <a href="#" className="text-primary hover:text-secondary">Academic Calendar</a>
                <a href="#" className="text-primary hover:text-secondary">Student Handbook</a>
                <a href="#" className="text-primary hover:text-secondary">Events</a>
                <a href="#" className="text-primary hover:text-secondary">News</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Panel */}
      {isNotificationsOpen && (
        <div className="notifications-panel fixed right-4 top-20 bg-white rounded-lg shadow-lg p-4 w-80 z-40">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Notifications</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsNotificationsOpen(false)}
            >
              ✕
            </button>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {notifications.map(notification => (
              <div key={notification.id} className="border-b pb-2">
                <p className="text-sm">{notification.message}</p>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
} 