# The Wooden Shelf Company

A modern, minimal e-commerce website for custom live edge wooden shelves built with Next.js, Supabase, and Stripe.

## Features

- **Custom Shelf Builder**: Interactive configurator with real-time pricing
- **Product Catalog**: Browse and filter shelves by wood type, dimensions, and finish
- **User Authentication**: Secure login/signup with order history
- **Shopping Cart**: Persistent cart with localStorage and Supabase sync
- **Stripe Checkout**: Secure payment processing with embedded Payment Element
- **Admin Panel**: Product management and order tracking
- **Responsive Design**: Mobile-first design with smooth animations
- **SEO Optimized**: Proper meta tags and structured data

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Auth, Storage)
- **Payments**: Stripe Payment Element
- **Animations**: Framer Motion
- **UI Components**: Headless UI, Lucide React icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd woodenshelfco
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Database Setup

1. Create a new Supabase project
2. Run the following SQL to create the database schema:

```sql
-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  wood_type TEXT NOT NULL,
  description TEXT NOT NULL,
  base_price DECIMAL(10,2) NOT NULL,
  default_length INTEGER NOT NULL,
  default_depth INTEGER NOT NULL,
  default_finish TEXT NOT NULL,
  default_bracket TEXT NOT NULL,
  min_length INTEGER NOT NULL,
  max_length INTEGER NOT NULL,
  min_depth INTEGER NOT NULL,
  max_depth INTEGER NOT NULL,
  image_urls TEXT[] DEFAULT '{}',
  stock_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wood types table
CREATE TABLE wood_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  color_hex TEXT NOT NULL,
  price_multiplier DECIMAL(3,2) DEFAULT 1.0,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Finishes table
CREATE TABLE finishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price_modifier DECIMAL(10,2) DEFAULT 0,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brackets table
CREATE TABLE brackets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  stripe_payment_intent_id TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address JSONB NOT NULL,
  items JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO wood_types (name, description, color_hex, price_multiplier, image_url) VALUES
('Walnut', 'Rich, dark grain with natural character', '#6B4E34', 1.2, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64'),
('Oak', 'Classic strength with beautiful grain patterns', '#D2B48C', 1.0, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7'),
('Maple', 'Light, clean aesthetic with subtle figuring', '#F5DEB3', 0.9, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64'),
('Cherry', 'Warm reddish tones that deepen over time', '#DEB887', 1.1, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7');

INSERT INTO finishes (name, description, price_modifier, image_url) VALUES
('Natural Oil', 'Enhances natural wood grain', 0, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64'),
('Clear Polyurethane', 'Durable protective finish', 25, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7'),
('Custom Stain', 'Custom color matching available', 50, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64');

INSERT INTO brackets (name, description, price, image_url) VALUES
('Floating Brackets', 'Minimalist floating shelf brackets', 15, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64'),
('Decorative Brackets', 'Ornate decorative shelf brackets', 25, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7'),
('Industrial Brackets', 'Modern industrial-style brackets', 35, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64');
```

### Stripe Setup

1. Create a Stripe account and get your API keys
2. Set up a webhook endpoint pointing to `https://yourdomain.com/api/stripe/webhook`
3. Configure the webhook to listen for `payment_intent.succeeded` events

### Development

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main application pages
│   ├── admin/             # Admin panel
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── home/             # Home page components
│   ├── shop/             # Shop page components
│   ├── product/          # Product page components
│   ├── builder/          # Custom builder components
│   ├── cart/             # Cart components
│   └── checkout/         # Checkout components
├── lib/                  # Utility libraries
│   ├── supabase/         # Supabase client configuration
│   ├── stripe/           # Stripe client configuration
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   └── types/            # TypeScript type definitions
└── public/               # Static assets
```

## Key Features

### Custom Shelf Builder
- Interactive dimension sliders
- Real-time price calculation
- Wood type, finish, and bracket selection
- Visual preview of configuration

### Product Management
- Admin panel for CRUD operations
- Product filtering and search
- Image gallery with thumbnails
- Stock management

### Shopping Cart
- Persistent cart with localStorage
- Supabase sync for authenticated users
- Real-time price updates
- Quantity management

### Checkout Process
- Stripe Payment Element integration
- Secure payment processing
- Order confirmation and tracking
- Email notifications

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

1. Build the application:
```bash
npm run build
```

2. Deploy the `out` directory to your hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email hello@woodenshelfco.com or create an issue in the repository.