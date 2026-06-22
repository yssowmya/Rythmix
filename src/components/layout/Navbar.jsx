import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Music, Disc, ListMusic, Download, User, LogIn, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Music className="h-5 w-5" /> },
    { name: 'Albums', path: '/albums', icon: <Disc className="h-5 w-5" /> },
    { name: 'Playlists', path: '/playlists', icon: <ListMusic className="h-5 w-5" /> },
    { name: 'Downloads', path: '/downloads', icon: <Download className="h-5 w-5" /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Music className="h-8 w-8 text-pink-500" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
            RhythMix
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-1 hover:text-pink-400 transition-colors ${
                location.pathname === link.path ? 'text-pink-500 font-semibold' : ''
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}

          {isAuthenticated ? (
            <Link
              to="/profile"
              className={`flex items-center gap-1 hover:text-pink-400 transition-colors ${
                location.pathname === '/profile' ? 'text-pink-500 font-semibold' : ''
              }`}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
          ) : (
            <Link
              to="/signin"
              className="flex items-center gap-1 px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-full transition-colors"
            >
              <LogIn className="h-5 w-5" />
              <span>Sign In</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-gray-900 bg-opacity-95 flex flex-col pt-20">
          <div className="flex flex-col space-y-6 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 text-xl hover:text-pink-400 transition-colors ${
                  location.pathname === link.path ? 'text-pink-500 font-semibold' : ''
                }`}
                onClick={toggleMenu}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            {isAuthenticated ? (
              <Link
                to="/profile"
                className={`flex items-center gap-3 text-xl hover:text-pink-400 transition-colors ${
                  location.pathname === '/profile' ? 'text-pink-500 font-semibold' : ''
                }`}
                onClick={toggleMenu}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            ) : (
              <Link
                to="/signin"
                className="flex items-center gap-3 text-xl px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-full transition-colors w-full justify-center"
                onClick={toggleMenu}
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;