import { Router, Route, Switch } from 'react-router-dom';
import history from 'history/browser';

import LandingPage from './components/landingPage/LandingPage';
import Travels from './components/travels/Travels';

import './App.css';

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
