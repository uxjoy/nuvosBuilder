/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  presets: [require("@spartan-ng/brain/hlm-tailwind-preset")],
  content: ["./src/**/*.{html,js,ts,jsx,tsx,scss}", "./libs/ui/**/*.{html,ts}"],

  theme: {
    extend: {
      // colors: {
      //   primaryTxt: colors.slate[900],
      //   secondaryTxt: colors.slate[800],
      //   tertiaryTxt: colors.slate[700],
      //   disabledTxt: colors.slate[500],
      //   brandTxt: colors.sky[500],
      //   borderBase: colors.slate(200),
      //   borderLight: colors.slate(100),
      //   borderPrimary: colors.slate(200),
      // },
    },
  },
  plugins: [],
};
