import { colors, createTheme } from "@mui/material";
import { color } from "./color";
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    errorContained: true;
    orangeContained: true;
    errorOutlined: true;
    cancel: true;
    cancelSmall: true;
    outlinedGreen: true;
    cancelOutlined: true;
    primary: true;
    containedGreen: true;
    OutlinedRed: true;
  }
}

export const Theme = createTheme({
  palette: {
    secondary: {
      main: color.main,
    },
  },
  typography: {
    htmlFontSize: 14,
    fontSize: 14,
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      // color: color.textPrimary,
      // [breakpoints.down('xs')]: {
      //     fontSize: pxToRem(12),
      // },
    },
    body2: {
      fontSize: "0.75rem",
      // [breakpoints.down('xs')]: {
      //     fontSize: pxToRem(12),
      // },
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: 500,
      // [breakpoints.down('xs')]: {
      //     fontSize: pxToRem(12),
      // },
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 500,
      // [breakpoints.down('xs')]: {
      //     fontSize: pxToRem(14),
      // },
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 500,
      // [breakpoints.down('xs')]: {
      //     fontSize: '1rem',
      // },
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 500,
      // [breakpoints.down('xs')]: {
      //     fontSize: '1,25rem',
      // },
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      // [breakpoints.down('xs')]: {
      //     fontSize: '1.5rem',
      // },
    },
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
      // [breakpoints.down('xs')]: {
      //     fontSize: '2rem',
      // },
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "1.25rem",
      color: "#333333",
      // [breakpoints.down('xs')]: {
      //     fontSize: '1.125rem',
      // },
    },
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
      styleOverrides: {
        root: {},
      },
      variants: [
        {
          props: { variant: "OutlinedRed" },
          style: {
            "&:hover": {
              border: "1px solid red !important",
            },
            background: "transparent",
            color: color.btnRed,
            border: 1,
            borderStyle: "solid",
            padding: "4px 44px",
            borderRadius: "10px",
            borderColor: color.btnRed,
          },
        },

        {
          props: { variant: "containedGreen" },
          style: {
            "&:hover": {
              background: color.BtnDartGreen,
            },
            background: color.BtnDartGreen,
            border: 1,
            color: color.white,
            borderStyle: "solid",
            padding: "9px 40px",
            borderRadius: "10px",
            borderColor: color.BtnDartGreen,
          },
        },
      ],
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "10px",
        },
      },
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
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: "1280px !important",
        },
      },
    },
  },
});
