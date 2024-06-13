// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#3f51b5',
    },
    text: {
        primary: '#00000',
      },
  },
  typography: {
    allVariants: {
      color: '#fffff', 
      fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
    },
    },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
          minHeight: '100vh',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        },
      },
    },
  },
});

export default theme;
