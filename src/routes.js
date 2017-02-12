import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import SuggestAssist from './containers/suggest_assist';
import Login from './components/login';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Login} />
    <Route path='suggest' component={SuggestAssist} />
  </Route>
);
