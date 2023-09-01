/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "landing-page":
          "url('/src/assets/Cakes/umesh-soni-LDnmyOaA-ew-unsplash.jpg')",
        bgimage: "url('/src/assets/Cakes/bgimg.png)",
      },
      colors: {
        "thulian-pink": "#E56399",
        "thulian-pink-md": "#FA81B1",
        "thulian-pink-light": "#F2A2C3",
        "thulian-pink-very-light": "#FFE3EE",
      },
    },
    screens:{
      '2xl':{
        'max':'1024px'
      },
      'sm': '576px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

    }
  },  
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "light",
  },
};
