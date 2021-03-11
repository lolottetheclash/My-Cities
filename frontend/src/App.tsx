import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import LandingPage from './components/landingPage/LandingPage';
import Travels from './components/travels/Travels';

import './App.css';

const history = createBrowserHistory();

function App(): JSX.Element {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/travels" component={Travels} />
      </Switch>
    </Router>
  );
}

export default App;
