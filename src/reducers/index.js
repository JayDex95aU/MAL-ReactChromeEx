import { combineReducers, createStore, dispatch, applyMiddleware } from 'redux';
import { wrapStore, alias } from 'react-chrome-redux';
import { connect } from 'react-redux'
import promiseMiddleware from 'redux-promise';

import SuggestionsReducer from './reducer_suggestions';
import { fetchSuggestions, testMAL } from '../actions/index';

const rootReducer = combineReducers({
  suggestion: SuggestionsReducer
});


const store = createStore(rootReducer, applyMiddleware(promiseMiddleware));

wrapStore(store, {portName: 'MAL'});

// Chrome listeners for background events
chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
  const url = tab.url;
  if (url !== undefined && changeinfo.status == "complete") {
    // console.log("Tab listener fired");
    // store.dispatch(testMAL());
  }
});
