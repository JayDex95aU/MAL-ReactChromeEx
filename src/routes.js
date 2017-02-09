import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Test from './components/test';
import Test2 from './components/test2';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Test} />
    <Route path='test' component={Test2} />
  </Route>
);
