'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/product' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`
      w-full z-50 bg-white/80 backdrop-blur-md transition-all duration-300
      ${isScrolled ? 'fixed top-0 shadow-md' : 'relative'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              ShopLogo
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="relative text-gray-700 hover:text-blue-600 px-2 py-1 text-sm font-medium transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform duration-200 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-200">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-full border border-transparent hover:border-blue-100 hover:bg-blue-50 transition-all duration-200">
              <User className="h-4 w-4" />
              <Link href={'/login'}><span>Sign In</span></Link>
            </button>
            <Link href={'/cart'}>
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-sm hover:shadow-md transition-all duration-200">
              <ShoppingCart className="h-4 w-4" />
              <span>Cart (0)</span>
            </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4 px-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg border border-gray-200 hover:border-blue-100 hover:bg-blue-50 transition-all duration-200">
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart (0)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
