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
  typography: {
    h1: {
      fontSize: "clamp(56px, 2vw, 64px)",
      lineHeight: "72px",
    },
    h2: {
      fontSize: "clamp(48px, 2vw, 56px)",
      lineHeight: "64px",
    },
    h3: {
      fontSize: "clamp(40px, 2vw, 48px)",
      lineHeight: "56px",
    },
    h4: {
      fontSize: "clamp(26px, 2vw, 34px)",
      lineHeight: "42px",
    },
    subtitle1: {
      fontSize: "clamp(20px, 2vw, 24px)",
      lineHeight: "32px",
    },
    body1: {
      fontSize: "clamp(14px, 2vw, 18px)",
      lineHeight: "26px",
    },
    body2: {
      fontSize: "clamp(14px, 2vw, 16px)",
      lineHeight: "24px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "clamp(14px, 2vw, 18px)",
          lineHeight: "26px",
          borderRadius: "20px",
          padding: "8px 16px",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontSize: "clamp(14px, 2vw, 16px)",
          lineHeight: "24px",
        },
      },
    },
  },
});

export default theme;
