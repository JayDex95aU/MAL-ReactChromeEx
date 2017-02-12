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

wrapStore(store, {portName: 'MAL'});

// Chrome listeners for background events
chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
  const url = tab.url;
  if (url !== undefined && changeinfo.status == "complete") {
    
      console.log("Tab listener fired");
      const pattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(\\::port)(/:1)(/:2)(/:3)(/:4)(/*)');
      console.log(pattern.match(tab.url));
      store.dispatch(searchMAL());
    // console.log("Tab listener fired");
    // store.dispatch(testMAL());
  }
});
