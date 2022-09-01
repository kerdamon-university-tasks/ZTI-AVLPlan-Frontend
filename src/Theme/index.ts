import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    available: Palette['primary'];
  }
  interface PaletteOptions {
    available: PaletteOptions['primary'];
  }
  interface Palette {
    maybeAvailable: Palette['primary'];
  }
  interface PaletteOptions {
    maybeAvailable: PaletteOptions['primary'];
  }
  interface Palette {
    notAvailable: Palette['primary'];
  }
  interface PaletteOptions {
    notAvailable: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3E3F59',
      light: '#7F80A0',
      dark: '#343545'
    },
    available: {
      main: '#729B5F'
    },
    maybeAvailable: {
      main: '#EAC955'
    },
    notAvailable: {
      main: '#E8E9EF'
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
    ].join(','),
    fontSize: 12,
  }
});

