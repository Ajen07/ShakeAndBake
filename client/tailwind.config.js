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
  },  
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "light",
  },
};
