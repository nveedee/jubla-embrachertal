/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#283583',
          dark: '#1e2666',
          light: '#3a4a9e',
        },
        secondary: {
          DEFAULT: '#2598D5',
          dark: '#1a7aaa',
          light: '#3faee0',
        },
        accent: {
          DEFAULT: '#E6007E',
          dark: '#b8005f',
          light: '#ff1a8c',
        },
        jubla: {
          bg: '#FFFFFF',
          dark: '#111827',
          light: '#F8FAFC',
          gray: '#6B7280',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(8px)', opacity: '0.5' },
        }
      },
      backgroundImage: {
        'gradient-jubla': 'linear-gradient(135deg, #283583 0%, #2598D5 100%)',
        'gradient-accent': 'linear-gradient(135deg, #E6007E 0%, #283583 100%)',
        'gradient-dark': 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
      },
      boxShadow: {
        'jubla': '0 20px 60px rgba(40, 53, 131, 0.2)',
        'jubla-lg': '0 30px 80px rgba(40, 53, 131, 0.3)',
        'accent': '0 10px 40px rgba(230, 0, 126, 0.3)',
      }
    },
  },
  plugins: [],
}
