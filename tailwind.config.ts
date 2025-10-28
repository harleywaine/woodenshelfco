import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'walnut-50': '#F8F6F3',
        'walnut-100': '#F0EBE4',
        'walnut-200': '#E1D5C8',
        'walnut-300': '#D2BFA8',
        'walnut-400': '#C3A988',
        'walnut-500': '#B49368',
        'walnut-600': '#A57D48',
        'walnut-700': '#6B4E34',
        'walnut-800': '#5A422C',
        'walnut-900': '#493624',
        'charcoal-50': '#F5F5F5',
        'charcoal-100': '#E5E5E5',
        'charcoal-200': '#CCCCCC',
        'charcoal-300': '#B3B3B3',
        'charcoal-400': '#999999',
        'charcoal-500': '#808080',
        'charcoal-600': '#666666',
        'charcoal-700': '#4D4D4D',
        'charcoal-800': '#333333',
        'charcoal-900': '#2F2F2F',
        'cream': '#F8F6F3',
        'forest-50': '#F0F2F0',
        'forest-100': '#D9E0D9',
        'forest-200': '#B3C1B3',
        'forest-300': '#8DA28D',
        'forest-400': '#6B836B',
        'forest-500': '#4C5B4A',
        'forest-600': '#3D493C',
        'forest-700': '#2E372E',
        'forest-800': '#1F251F',
        'forest-900': '#101310',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['6rem', { lineHeight: '1.1', fontWeight: '500' }],
        'hero-mobile': ['4rem', { lineHeight: '1.1', fontWeight: '500' }],
        'section-title': ['3rem', { lineHeight: '1.2', fontWeight: '300' }],
        'section-title-mobile': ['2.25rem', { lineHeight: '1.2', fontWeight: '300' }],
        'body-large': ['1.25rem', { lineHeight: '1.6', fontWeight: '300' }],
        'body': ['1.125rem', { lineHeight: '1.6', fontWeight: '300' }],
        'body-small': ['1rem', { lineHeight: '1.5', fontWeight: '300' }],
        'button': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        'caption': ['0.875rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
