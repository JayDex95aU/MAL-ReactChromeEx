import { combineReducers, createStore, dispatch } from 'redux';
import { wrapStore } from 'react-chrome-redux';
import { connect } from 'react-redux'

import SuggestionsReducer from './reducer_suggestions';
import { fetchSuggestions } from '../actions/index';

const rootReducer = combineReducers({
  suggestion: SuggestionsReducer
});

const store = createStore(rootReducer);
wrapStore(store, {portName: 'MY_APP'});

chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
  // Remember to add permissions "tabs" to manifest for this check to work
  const url = tab.url;
  if (url !== undefined && changeinfo.status == "complete") {
    console.log("Background updated");
    store.dispatch(fetchSuggestions('Bye'));
  }
});
