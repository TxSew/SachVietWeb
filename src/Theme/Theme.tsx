import { colors, createTheme } from "@mui/material";
import { color } from "./color";

export const Theme = createTheme({
  palette: {
    secondary: {
      main: color.main,
    },
  },
  typography: {
    h1: {},
  },
  components: {
    MuiTextField: {
      defaultProps: {
        InputProps: {},
        InputLabelProps: {
          shrink: true,
        },
      },
      styleOverrides: {
        root: {
          backgroundColor: color.white,
          "& .MuiOutlinedInput-input": {
            padding: "7px 14px",
            fontWeight: 400,
            color: "gray",
            fontSize: "14px",
          },
        },
      },
    },

    MuiOutlinedInput: {
      defaultProps: {},
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-input": {
            padding: "7px 14px",
            fontWeight: 400,
            color: "gray",
          },
          "&.MuiFormLabel-root": {
            top: "-5",
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: { variant: "caption" },
      styleOverrides: {
        root: {
          fontFamily: "Sans-Serif",
          fontSize: "14px",
        },
        caption: {
          fontSize: "14px",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {},
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            backgroundColor: "red",
            color: "white",
            borderWidth: 1,
          },
        },
      ],
    },
    MuiStack: {
      defaultProps: {
        sx: {
          display: "flex",
          alignItems: "center",
        },
      },
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
        },
      },
    },
    MuiContainer: {},
  },
});
