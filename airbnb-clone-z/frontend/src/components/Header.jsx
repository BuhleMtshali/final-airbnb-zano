import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SearchIcon, GlobeIcon, MenuIcon, UserIcon } from 'lucide-react';
export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const userMenuRef = useRef(null);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput) {
      navigate(`/location/${searchInput}`);
      setSearchInput("");
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/* Left - Logo */}
      <div className="relative flex items-center h-10 cursor-pointer my-auto">
        <Link to="/">
          <div className="flex items-center">
            <svg 
              className="h-8 text-[#FF5A5F]" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12.0002 2C12.9112 2 13.7129 2.36979 14.2764 3.03469C14.8398 3.69959 15.1357 4.57458 15.1357 5.48469C15.1357 6.39479 14.8398 7.26978 14.2764 7.93468C13.7129 8.59958 12.9112 8.96937 12.0002 8.96937C11.0892 8.96937 10.2874 8.59958 9.72396 7.93468C9.16051 7.26978 8.86463 6.39479 8.86463 5.48469C8.86463 4.57458 9.16051 3.69959 9.72396 3.03469C10.2874 2.36979 11.0892 2 12.0002 2ZM12.0002 22C10.9158 22 9.83158 21.8795 8.7473 21.6385C7.66302 21.3975 6.67132 21.0151 5.77219 20.4913C4.87306 19.9675 4.15803 19.3023 3.6271 18.4957C3.09616 17.6892 2.83069 16.7413 2.83069 15.6521C2.83069 14.5629 3.09616 13.615 3.6271 12.8085C4.15803 12.0019 4.87306 11.3367 5.77219 10.8129C6.67132 10.2891 7.66302 9.90673 8.7473 9.66573C9.83158 9.42472 10.9158 9.30422 12.0002 9.30422C13.0845 9.30422 14.1688 9.42472 15.253 9.66573C16.3373 9.90673 17.329 10.2891 18.2282 10.8129C19.1273 11.3367 19.8423 12.0019 20.3733 12.8085C20.9042 13.615 21.1697 14.5629 21.1697 15.6521C21.1697 16.7413 20.9042 17.6892 20.3733 18.4957C19.8423 19.3023 19.1273 19.9675 18.2282 20.4913C17.329 21.0151 16.3373 21.3975 15.253 21.6385C14.1688 21.8795 13.0845 22 12.0002 22Z" />
            </svg>
            <span className="text-[#FF5A5F] font-bold text-xl ml-1">airbnb</span>
          </div>
        </Link>
      </div>
      {/* Middle - Search */}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          type="text"
          placeholder="Start your search"
        />
        <button onClick={handleSearch} className="hidden md:inline-flex bg-[#FF5A5F] text-white rounded-full p-2 cursor-pointer md:mx-2">
          <SearchIcon className="h-4" />
        </button>
      </div>
      {/* Right - User Menu */}
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeIcon className="h-6 cursor-pointer" />
        <div className="relative" ref={userMenuRef}>
          <div 
            className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <MenuIcon className="h-5" />
            <UserIcon className="h-5" />
          </div>
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                {user ? (
                  <>
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                    <Link to="/my-listings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My listings</Link>
                    <Link to="/reservations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Reservations</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                    <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign up</Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};