import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import App from './App';  

/* 🔹 Brand Theme */
const theme = createTheme({
  colors: {
    brand: [
      '#fef3e3', // brand-light
      '#f7d9b8',
      '#f0bf8d',
      '#e9a562',
      '#f7941d', // brand-secondary
      '#d67e19',
      '#b56815',
      '#945211',
      '#6a1b1a', // brand-primary
      '#0d103aff', // brand-dark
    ],
  },

  primaryColor: 'brand',
   // brand-primary

  fontFamily: "Poppins",

  headings: {
    fontFamily: "'Poppins'",
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>
);
