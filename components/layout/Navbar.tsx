'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if current page has light background
  const isLightPage = pathname === '/shop' || pathname === '/builder' || pathname === '/gallery' || pathname === '/about' || pathname === '/faq';
  const shouldShowDarkText = isScrolled || isLightPage;

  const navLinks = [
    { name: 'Shop', href: '/shop' },
    { name: 'Builder', href: '/builder' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldShowDarkText
          ? 'bg-white/90 backdrop-blur-sm shadow-sm text-gray-800'
          : 'bg-transparent text-white'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-playfair font-bold">
          <span className="text-amber-800 text-3xl">W</span>
          <span className={`${shouldShowDarkText ? 'text-gray-800' : 'text-white'}`}>Shelf Co.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`hover:text-amber-800 transition-colors ${
                shouldShowDarkText ? 'text-gray-700' : 'text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button className={`p-2 rounded-lg transition-colors ${
            shouldShowDarkText ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}>
            <Search className="h-5 w-5" />
          </button>

          <button className={`relative p-2 rounded-lg transition-colors ${
            shouldShowDarkText ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}>
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs text-white">
              0
            </span>
          </button>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${
                shouldShowDarkText ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-amber-800 bg-amber-50'
                    : 'text-gray-700 hover:text-amber-800 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}