// NPM modules
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';

// Components
import Main from './components';

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Main} />
  </Router>
);

ReactDOM.render(routes, document.getElementById('app'));
