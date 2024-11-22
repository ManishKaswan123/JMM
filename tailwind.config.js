/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  plugins: [
    function ({addUtilities}) {
      addUtilities({
        '.parent-font-medium > *': {
          '@apply font-medium': {},
        },
      })
    },
  ],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  variants: {
    extend: {
      backgroundColor: ['active', 'even', 'odd'],
      // ...
      borderColor: ['focus-visible', 'first'],
      // ...
      textColor: ['visited'],
    },
  },
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    screens: {
      // 'xxs': '380px',
      xs: '300px',
      sm: '320px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
      colors: {
        gray: {
          400: '#DEDFE4', // light
        },
      },
      transitionDuration: {
        1500: '1500ms',
      },
      backgroundColor: ['even'],
      colors: {
        'light-blue': '#03A9F4',
      },
      width: {
        inherit: 'inherit',
      },
      boxShadow: {
        round: '0px 0px 8px 1px #e7e7e7',
        new: '2px 2px 8px -1px #0000003d',
        white: '2px 2px 8px -1px #fff',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': {transform: 'rotate(-3deg)'},
          '50%': {transform: 'rotate(3deg)'},
        },
        
      },
      backgroundImage: (theme) => ({
        // sx: "url('/src/assets/img/sx.jpg')",
      }),
    },
  },
}
