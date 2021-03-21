import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import theme from './Theme';

import NavBar from './components/NavBar/NavBar';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/Signup';

import LandingPage from './pages/LandingPage/LandingPage';
import Travels from './pages/Travels/Travels';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/travels" component={Travels} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
