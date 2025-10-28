import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-2xl font-playfair font-bold mb-6">
              <span className="text-amber-800 text-3xl">W</span>
              <span className="text-gray-900">Shelf Co.</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              Handcrafted live edge wooden shelves, cut to measure and finished with care. 
              Each piece tells the story of a tree that stood for centuries.
            </p>
            <div className="text-sm text-gray-500">
              <p>From the New Forest, England</p>
              <p>Established 2012</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="/shop" className="text-gray-600 hover:text-amber-800 transition-colors">Shop</Link></li>
              <li><Link href="/builder" className="text-gray-600 hover:text-amber-800 transition-colors">Builder</Link></li>
              <li><Link href="/gallery" className="text-gray-600 hover:text-amber-800 transition-colors">Gallery</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-amber-800 transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link href="/faq" className="text-gray-600 hover:text-amber-800 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-amber-800 transition-colors">Contact</Link></li>
              <li><Link href="/shipping" className="text-gray-600 hover:text-amber-800 transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="text-gray-600 hover:text-amber-800 transition-colors">Returns</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-200 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 The Wooden Shelf Company. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-500 hover:text-amber-800 text-sm transition-colors">Privacy</Link>
              <Link href="/terms" className="text-gray-500 hover:text-amber-800 text-sm transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}