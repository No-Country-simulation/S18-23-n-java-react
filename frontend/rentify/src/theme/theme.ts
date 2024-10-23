import { createTheme } from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#40becb",
        },
        secondary: {
          main: "#254353",
        },
        background: {
          paper: "#fff",
          default: "#f7f7f7",
        },
        text: {
          primary: "#254353",
          secondary: "#4a4a4a",
        },
        success: {
          main: "#28a745",
        },
        warning: {
          main: "#ffc107",
        },
        error: {
          main: "#dc3545",
        },
      },
    },
  },
});

export default theme;
