import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import SuggestAssist from './containers/suggest_assist';
import Landing from './components/landing';
import Login from './components/login';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Landing} />
    <Route path='login' component={Login} />
  </Route>
);
