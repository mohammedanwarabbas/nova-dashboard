/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors - using your flag-red as accent
        'nova-primary': {
          50: '#fce9eb',
          100: '#f9d2d6',
          200: '#f2a6ad',
          300: '#ec7985',
          400: '#e64c5c',
          500: '#df2033', // Main primary
          600: '#b31929',
          700: '#86131f',
          800: '#590d14',
          900: '#2d060a',
          950: '#1f0407',
        },
        
        // Secondary colors - using your dusty-olive
        'nova-secondary': {
          50: '#f1f4f1',
          100: '#e3e9e2',
          200: '#c7d2c6',
          300: '#abbca9',
          400: '#8ea58d',
          500: '#728f70', // Main secondary
          600: '#5b725a',
          700: '#455643',
          800: '#2e392d',
          900: '#171d16',
          950: '#101410',
        },
        
        // Neutral/background - using your dim-grey
        'nova-gray': {
          50: '#f1f1f3',
          100: '#e3e4e8',
          200: '#c7c8d1',
          300: '#acadb9',
          400: '#9092a2',
          500: '#74768b',
          600: '#5d5f6f',
          700: '#464753',
          800: '#2e2f38',
          900: '#17181c',
          950: '#101113',
        },
        
        // Accent colors - using your old-rose
        'nova-accent': {
          50: '#f8edee',
          100: '#f0dbdd',
          200: '#e2b6ba',
          300: '#d39298',
          400: '#c56d76',
          500: '#b64954', // Main accent
          600: '#923a43',
          700: '#6d2c32',
          800: '#491d21',
          900: '#240f11',
          950: '#1a0a0c',
        },
        
        // Success/Error states
        'nova-success': {
          500: '#728f70', // From dusty-olive
          600: '#5b725a',
        },
        'nova-error': {
          500: '#df2033', // From flag-red
          600: '#b31929',
        },
        'nova-warning': {
          500: '#b64954', // From old-rose
          600: '#923a43',
        },
        
        // Semantic shortcuts
        primary: 'var(--color-nova-primary-500)',
        secondary: 'var(--color-nova-secondary-500)',
        accent: 'var(--color-nova-accent-500)',
        dark: 'var(--color-nova-gray-900)',
        light: 'var(--color-nova-gray-50)',
      },

backgroundImage: {
  'gradient-nova': 'linear-gradient(135deg, var(--color-nova-primary-500) 0%, var(--color-nova-accent-500) 100%)',
  'gradient-nova-light': 'linear-gradient(135deg, var(--color-nova-primary-100) 0%, var(--color-nova-accent-100) 100%)',
  'gradient-nova-dark': 'linear-gradient(135deg, var(--color-nova-primary-700) 0%, var(--color-nova-accent-700) 100%)',
},
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      
      boxShadow: {
        'nova': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'nova-lg': '0 10px 40px rgba(0, 0, 0, 0.12)',
        'nova-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      
      borderRadius: {
        'nova': '0.75rem',
        'nova-lg': '1rem',
      },
    },
  },
  plugins: [],
}