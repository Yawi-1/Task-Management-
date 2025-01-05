import React, { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {setUser} = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout =()=>{
    localStorage.removeItem('user');
    toast.success('Logged out...')
    setUser(null)
  }
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <CheckSquare className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">TaskFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-x-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
            <Link to="/add" className="text-gray-600 hover:text-indigo-600">Tasks</Link>
            <Link to="/user" className="text-gray-600 hover:text-indigo-600">Profile</Link>
          </div>
          <div className="hidden md:flex items-center gap-x-4 text-gray-600">
            <p>Organize your day, achieve more</p>
            <button onClick={logout} className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Logout
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              <span className="sr-only">Open Menu</span>
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 bg-gray-50 p-4 rounded shadow-md">
            <Link to="/" className="block text-gray-600 hover:text-indigo-600">Home</Link>
            <Link to="/add" className="block text-gray-600 hover:text-indigo-600">Tasks</Link>
            <Link to="/user" className="block text-gray-600 hover:text-indigo-600">Profile</Link>
            <button onClick={logout} className="w-full mt-4 px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
