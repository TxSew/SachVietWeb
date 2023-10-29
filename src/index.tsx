import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline, ThemeProvider } from "@mui/material";
import GlobalStyle from "./sass/GlobalStyle";
import { Theme } from "./Theme/Theme";
import { Provider } from "react-redux";
import { store } from "./redux/storeClient";
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <GlobalStyle>
        <Provider store={store}>
          <ToastContainer />
          <App />
        </Provider>
      </GlobalStyle>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
