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
        lDark: "#434343",
        mGray: "#979797",
        sideGray: "#2C2D31",
        sideIcon: "#979797",
        danger: "#C84B4B",
        lSuccess: "#90E586",
        success: "#0CAB2C",
        disabled: "#E6E6E6",
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
