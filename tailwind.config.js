module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: "#1F169C",
        dBrand: "#140e63",
        bg: "#F5EEFF",
        dark: "#17181C",
        mGray: "#979797",
        sideGray: "#2C2D31",
        sideIcon: "#979797",
        danger: "#C84B4B",
      },
      borderRadius: {
        DEFAULT: ".5rem",
      },
      fontFamily: {
        sans: ["Open Sans"],
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled", "hover"],
    },
  },
  plugins: [],
};
