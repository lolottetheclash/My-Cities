import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Router, Route, Switch } from 'react-router-dom';
import history from 'history/browser';

import theme from './Theme';

import LandingPage from './components/LandingPage/LandingPage';
import Travels from './components/Travels/Travels';

import './App.css';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/travels" component={Travels} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
