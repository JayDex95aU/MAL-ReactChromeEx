import { combineReducers, createStore, dispatch, applyMiddleware } from 'redux';
import { wrapStore, alias } from 'react-chrome-redux';
import { connect } from 'react-redux'
import promiseMiddleware from 'redux-promise';
import UrlPattern from 'url-pattern';

import SuggestionsReducer from './reducer_suggestions';
import LoginReducer from './reducer_login';
import UserAnimeReducer from './reducer_useranime';
import { searchMAL, saveDetailToReducer, clearDetailsInReducer, getUserAnime } from '../actions/index';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  suggestion: SuggestionsReducer,
  form: formReducer,
  login: LoginReducer,
  useranime: UserAnimeReducer
});


const store = createStore(rootReducer, applyMiddleware(promiseMiddleware));

wrapStore(store, {portName: 'MAL'});

chrome.storage.local.get({username_MAL_95au: '', password_MAL_95au: ''}, (details) => {
  if (details.username_MAL_95au != '' && details.password_MAL_95au != '') {
    store.dispatch(saveDetailToReducer(details.username_MAL_95au, details.password_MAL_95au));
    store.dispatch(getUserAnime(details.username_MAL_95au));
  }
})

setTimeout(() => {
  // Chrome listeners for background events
  chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab) {
    const url = tab.url;
    if (url !== undefined && changeInfo.audible) {
      const useranime = store.getState().useranime.anime;

      //Updated listener to only fire when video plays
      const pattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(\\::port)(/:one)(/:two)(/:three)(/:four)(/*)');
      const urlSplit = pattern.match(tab.url);
      store.dispatch(searchMAL(urlSplit, useranime));
    }
  });
}, 500);  
