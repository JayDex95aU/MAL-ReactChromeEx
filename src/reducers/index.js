import { combineReducers, createStore, dispatch, applyMiddleware } from 'redux';
import { wrapStore, alias } from 'react-chrome-redux';
import { connect } from 'react-redux'
import promiseMiddleware from 'redux-promise';
import UrlPattern from 'url-pattern';

import SuggestionsReducer from './reducer_suggestions';
import { fetchSuggestions, searchMAL } from '../actions/index';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  suggestion: SuggestionsReducer,
  form: formReducer
});


const store = createStore(rootReducer, applyMiddleware(promiseMiddleware));

chrome.browserAction.setBadgeText({text: "10+"});

wrapStore(store, {portName: 'MAL'});

// Chrome listeners for background events
chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
  const url = tab.url;
  if (url !== undefined && changeinfo.status == "complete") {
      const pattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(\\::port)(/:one)(/:two)(/:three)(/:four)(/*)');
      const urlSplit = pattern.match(tab.url);
      store.dispatch(searchMAL(urlSplit));
  }
});
