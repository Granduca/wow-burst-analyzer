/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern color palette
        'primary': '#3b82f6',      // Blue
        'secondary': '#8b5cf6',    // Purple
        'accent': '#06b6d4',       // Cyan
        'success': '#10b981',      // Emerald
        'warning': '#f59e0b',      // Amber
        'danger': '#ef4444',       // Red
        
        // Dark theme colors
        'bg-primary': '#1e293b',   // Slate 800
        'bg-secondary': '#0f172a', // Slate 900
        'bg-tertiary': '#334155',  // Slate 700
        'text-primary': '#f8fafc', // Slate 50
        'text-secondary': '#cbd5e1', // Slate 300
        'text-muted': '#94a3b8',   // Slate 400
        'border': '#475569',       // Slate 600
        
        // Burst colors
        'burst-small': '#3b82f6',  // Blue
        'burst-large': '#ef4444',  // Red
        'burst-combined': '#f97316', // Orange
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
    },
  },
  plugins: [],
}

