import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden -mt-16 pt-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/HeroShelf.png"
            alt="Beautiful live edge wooden shelf mounted on dark textured wall"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-left px-4 max-w-5xl ml-8 lg:ml-16">
              <h1 className="text-hero-mobile md:text-hero text-white mb-6 font-serif">
            The <span className="text-amber-300">Wooden Shelf</span> Company
          </h1>
          
          <p className="text-body-large text-white/90 mb-8 max-w-3xl">
            Each live edge shelf tells the story of a tree that stood for centuries.
            We preserve that legacy through meticulous handcrafting, creating functional art
            that brings the soul of the forest into your home.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-start mb-12">
            <a 
              href="/builder" 
              className="group bg-amber-800 text-white px-10 py-4 rounded-lg text-button hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Design Your Legacy
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a 
              href="/gallery" 
              className="group border-2 border-white text-white px-10 py-4 rounded-lg text-button hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              See Our Stories
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
          
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Premium Customization Section */}
      <section className="relative py-32 bg-gradient-to-b from-gray-50 to-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Staining.png"
            alt="Wood staining and finishing process"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-24">
            <div className="inline-block px-6 py-2 bg-amber-100 text-amber-800 text-sm font-medium tracking-wider uppercase rounded-full mb-8">
              Bespoke Craftsmanship
            </div>
            <h2 className="text-section-title-mobile md:text-section-title text-gray-900 mb-8 font-serif">
              Crafted Exclusively for You
            </h2>
            <p className="text-body-large text-gray-600 max-w-4xl mx-auto">
              Every shelf is a unique creation, meticulously crafted to your exact specifications.
              From wood selection to final dimensions, every detail is tailored to your vision.
            </p>
          </div>
          
        </div>
      </section>

      {/* New Forest Section - Full Bleed */}
      <section className="relative min-h-screen flex items-center">
        {/* Full Bleed Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/NewForest1.jpg"
            alt="Ancient New Forest woodland with majestic oak trees"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-white">
          <div className="max-w-2xl">
            <h2 className="text-section-title-mobile md:text-section-title mb-8 font-serif">
              From the New Forest
            </h2>
                <p className="text-body-large text-white/90 mb-8">
                  Our wood comes from the legendary New Forest of England – a 1,000-year-old royal hunting ground
                  established by William the Conqueror in 1079. This isn't just timber; it's living history.
                </p>
                <p className="text-body text-white/80 mb-10">
                  Each piece of wood we source carries the weight of history. From the mighty oaks
                  that have stood for centuries to the elegant beeches that have witnessed countless
                  seasons, every grain tells a story of endurance, strength, and natural beauty.
                </p>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section - Left/Right Layout */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <h2 className="text-section-title-mobile md:text-section-title text-gray-900 mb-6 font-serif">
                Cut to Your Exact Specification
              </h2>
                  <p className="text-body text-gray-600 mb-6">
                    Our master craftsmen work with precision tools and decades of experience to cut
                    each shelf to your exact dimensions. No approximations, no compromises – just
                    perfect craftsmanship.
                  </p>
                  <p className="text-body text-gray-600 mb-8">
                    Every measurement is double-checked, every cut is made with care, and every edge
                    is finished by hand. This attention to detail ensures your shelf fits perfectly
                    in your space and will last for generations.
                  </p>
            </div>
            
            {/* Image */}
            <div className="relative">
              <img
                src="/Sawmill2.png"
                alt="Master craftsman working at sawmill, cutting wood to exact specifications"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Installation Section - Left/Right Layout */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src="/Shelf1.png"
                alt="Beautiful wooden shelf installed in modern home interior"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            {/* Content */}
            <div>
              <h2 className="text-section-title-mobile md:text-section-title text-gray-900 mb-6 font-serif">
                Add a Bespoke Feel to Your Home
              </h2>
                  <p className="text-body text-gray-600 mb-6">
                    Transform any space with a handcrafted wooden shelf that's been cut to your exact
                    specifications. Each piece is designed to complement your home's unique character
                    and enhance your living experience.
                  </p>
                  <p className="text-body text-gray-600 mb-8">
                    From modern minimalist spaces to traditional country homes, our shelves adapt to
                    any interior style. The natural beauty of the wood grain and live edges create
                    a focal point that draws the eye and adds warmth to your space.
                  </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-amber-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-section-title-mobile md:text-section-title text-white mb-6 font-serif">
            Ready to Create Your Legacy?
          </h2>
          <p className="text-body-large text-amber-100 mb-8">
            Each shelf tells a story. What will yours be?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/builder"
              className="group bg-white text-amber-900 px-10 py-4 rounded-lg text-button hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Design Your Shelf
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="/gallery"
              className="group border-2 border-white text-white px-10 py-4 rounded-lg text-button hover:bg-white hover:text-amber-900 transition-all duration-300 transform hover:scale-105"
            >
              See Our Stories
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}