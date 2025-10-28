'use client';

import { AuthProvider } from '@/lib/hooks/useAuth';
import { CartProvider } from '@/lib/hooks/useCart';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
}
