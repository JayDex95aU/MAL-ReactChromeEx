import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import SuggestAssist from './components/suggest_assist';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={SuggestAssist} />
  </Route>
);
