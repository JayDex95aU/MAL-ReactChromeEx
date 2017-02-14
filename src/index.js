import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import { Router, createMemoryHistory } from 'react-router';

import routes from './routes';

const history = createMemoryHistory(location)

const store = new Store({
  portName: 'MAL'
});

chrome.extension.getBackgroundPage();

chrome.browserAction.setBadgeText({text: `0`});

const unsubscribe = store.subscribe(() => {
   unsubscribe(); // make sure to only fire once
   ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
    , document.getElementById('container'));
});
