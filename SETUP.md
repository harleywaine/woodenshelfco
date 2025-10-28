# Setup Guide

## Quick Start

1. **Create environment file:**
```bash
cp env.example .env.local
```

2. **Add your Supabase credentials to `.env.local`:**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

3. **Start the development server:**
```bash
npm run dev
```

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your URL and keys
3. Run the SQL schema from the README.md in the SQL editor
4. Add your credentials to `.env.local`

## Stripe Setup (Optional for now)

The app will work without Stripe configured - checkout will show a "not configured" message.

When ready to add Stripe:
1. Create account at [stripe.com](https://stripe.com)
2. Get your API keys from the dashboard
3. Add to `.env.local`:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Current Status

✅ **Working:**
- Home page with hero and sections
- Shop page with product grid
- Custom builder (without real pricing)
- Gallery, About, FAQ pages
- User authentication
- Shopping cart
- Admin panel

⚠️ **Needs Supabase:**
- Product data loading
- User authentication
- Order management

⚠️ **Needs Stripe:**
- Payment processing
- Checkout completion

The app will run and show placeholder content without Supabase, but you'll need it for full functionality.
