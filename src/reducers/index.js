import { combineReducers, createStore } from 'redux';
import { wrapStore } from 'react-chrome-redux';

import TestReducer from './reducer_test';

const rootReducer = combineReducers({
  post: TestReducer
});

const store = createStore(rootReducer);
console.log("Hello World I am running");


wrapStore(store, {portName: 'MY_APP'});

chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
  // Remember to add permissions "tabs" to manifest for this check to work
  const url = tab.url;
  if (url !== undefined && changeinfo.status == "complete") {
    console.log("Background updated");
  }
});
