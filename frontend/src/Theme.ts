import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#72cff8',
      main: '#3788ac',
      dark: '#0276aa',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ef6694',
      main: '#ec407a',
      dark: '#a52c55      ',
      contrastText: '#000',
    },
  },
});

export default theme;
