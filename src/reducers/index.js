import { combineReducers, createStore, dispatch, applyMiddleware } from 'redux';
import { wrapStore } from 'react-chrome-redux';
import { connect } from 'react-redux'
import ReduxPromise from 'redux-promise';

import SuggestionsReducer from './reducer_suggestions';
import { fetchSuggestions } from '../actions/index';

const rootReducer = combineReducers({
  suggestion: SuggestionsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxPromise));
wrapStore(store, {portName: 'MY_APP'});

// Chrome listeners for background events
chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
  const url = tab.url;
  if (url !== undefined && changeinfo.status == "complete") {
    console.log("Background updated");
    store.dispatch(fetchSuggestions('Bye'));

  }
});
