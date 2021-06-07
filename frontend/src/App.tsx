import { MuiThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import theme from './Theme';

import NavBar from './components/NavBar/NavBar';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

import LandingPage from './pages/LandingPage/LandingPage';
import Travels from './pages/Travels/Travels';
import NewTravel from './pages/NewTravel/NewTravel';
import { useStores } from './stores/index';

const PrivateRoute: React.FC<RouteProps> = observer(({ children, path }) => {
  // console.log('lalala sessionId : ', localStorage.get('sessionId'));
  console.log('lalala token : ', document.cookie);

  const { userStore } = useStores();
  console.log('is user logged ', userStore.isUserLogged);

  return (
    <Route
      exact
      path={path}
      render={() =>
        userStore.isUserLogged ? children : <Redirect to="/signin" />
      }
    />
  );
});

function App(): JSX.Element {
  const { userStore } = useStores();
  console.log('is user logged ', userStore.isUserLogged);
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/travels" component={Travels} />
          <PrivateRoute path="/travels/new">
            <NewTravel />
          </PrivateRoute>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default observer(App);
