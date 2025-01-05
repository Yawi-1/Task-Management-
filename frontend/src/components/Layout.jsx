import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-1 bg-white p-4 sm:p-6 lg:p-8 shadow-sm">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;