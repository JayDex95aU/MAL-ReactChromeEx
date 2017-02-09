import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';

import { Router, createMemoryHistory } from 'react-router';

import reducers from './reducers';
import routes from './routes';

const history = createMemoryHistory(location)

const store = new Store({
  portName: 'MY_APP'
});

chrome.extension.getBackgroundPage();

const unsubscribe = store.subscribe(() => {
   unsubscribe(); // make sure to only fire once
   ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
    , document.getElementById('container'));
});
