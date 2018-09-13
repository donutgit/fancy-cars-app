import React from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  },
  overrides: {
    MuiButton: {
      disabled: {
        color: "rgba(171, 171, 171, 0.3)"
      }
    },
    MuiLinearProgress: {
      colorPrimary: {
        backgroundColor: "#1a1d21"
      },
      barColorPrimary: {
        backgroundColor: "#00BCD4"
      }
    },
    MuiInput: {
      underline: {
        "&:after": {
          borderBottom: "2px solid #00BCD4"
        }
      }
    },
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "#00BCD4"
        }
      }
    }
  }
});

const withThemeConfig = Component => {
  const WithThemeConfig = () => {
    return (
      <MuiThemeProvider theme={theme}>
        <Component />
      </MuiThemeProvider>
    );
  };
  return WithThemeConfig;
};

export default withThemeConfig;
