import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'
import App from './pages/App/App';

const history = createBrowserHistory()

ReactDOM.render((
  <Router history={history}>
    <Route component={App}>
    </Route>
  </Router>
), document.getElementById('app'));

