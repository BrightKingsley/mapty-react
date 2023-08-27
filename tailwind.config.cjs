/** @type {import('tailwindcss').Config} */
module.exports = {
  // prefix: "tw-",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // extend: { fontFamily: ["Poppins"] },
    extend: {
      content: {
        // sectionTwoImageTwo: "url('src/components/SectionTwo/assets/img-2.jpg')",
        // sectionTwoImageThree:
        //   "url('src/components/SectionTwo/assets/img-3.jpg')",
      },
    },
  },
  plugins: [],
  // Apply Materialize Styles
  "@layer base": {
    '@import "materialize-css";': {},
  },
};
