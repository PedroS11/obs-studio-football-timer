import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { createTheme, ThemeProvider } from "@mui/material/styles";

export let theme = createTheme({
    typography: {
        h4: {
            fontFamily: "Druk-Wide-Medium",
        }
    },
    palette: {
        mode: 'dark',
    },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <React.Fragment>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <App />
          </React.Fragment>
      </ThemeProvider>,
  </React.StrictMode>
);