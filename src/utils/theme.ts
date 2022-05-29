import { createTheme } from '@mui/material';
const theme = createTheme({
  palette: {
    primary: {
      main: '#6585F3',
      dark: '#0F23F5',
      contrastText: '#172B4D',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
  },
});

export { theme };
