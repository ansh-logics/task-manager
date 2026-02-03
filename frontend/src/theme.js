import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1C1C1E', // Near-black charcoal
    },
    secondary: {
      main: '#8E8E93', // Apple system gray
    },
    background: {
      default: '#F5F5F7', // Apple light gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1C1C1E',
      secondary: '#6E6E73',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2rem', fontWeight: 500 },
    h2: { fontSize: '1.75rem', fontWeight: 500 },
    h3: { fontSize: '1.5rem', fontWeight: 500 },
    h4: { fontSize: '1.25rem', fontWeight: 500 },
    h5: { fontSize: '1.1rem', fontWeight: 500 },
    h6: { fontSize: '1rem', fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // White app bar
          color: '#1C1C1E',
          boxShadow: 'none',
          borderBottom: '1px solid #E5E5E5',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: '#1C1C1E',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#3A3A3C',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #E5E5EA', // Very subtle border
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#E5E5EA',
            },
            '&:hover fieldset': {
              borderColor: '#8E8E93',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1C1C1E',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          boxShadow: '0px 10px 30px rgba(0,0,0,0.05)', // Soft shadow
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
