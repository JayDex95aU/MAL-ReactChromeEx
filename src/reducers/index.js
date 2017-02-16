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

// chrome.extension.onRequest.addListener(
//   function(request, sender, sendResponse) {
//     // LOG THE CONTENTS HERE
//     var htmlDOCO = request.content;
//     //episode = ep.substring(ep.lastIndexOf("-")+1, ep.lastIndexOf("?"));
//
//     htmlDOCO = htmlDOCO.substring(htmlDOCO.lastIndexOf("Episode <span>")+14).split(/[<]/)[0];
//     // console.log(htmlDOCO);
//     return htmlDOCO;
//   });
//
// chrome.tabs.onUpdated.addListener(function(tab) {
//
//   //Tool to grab 9anime ID
//   chrome.tabs.executeScript(tab.id, {
//        code: "chrome.extension.sendRequest({content: document.body.innerHTML}, function(response) { console.log('success'); });"
//      }, null);
//
// });
//
setTimeout(() => {
  // Chrome listeners for background events
  chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab) {
    const url = tab.url;
    var domData;
    if (url !== undefined && changeInfo.audible) {
      const useranime = store.getState().useranime.anime;

      //Updated listener to only fire when video plays
      const pattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(\\::port)(/:one)(/:two)(/:three)(/:four)(/*)');
      const urlSplit = pattern.match(tab.url);
      // Adding super special case for 9anime (And other DOM related pages)

      switch(urlSplit.domain) {
        case "9anime":
          console.log("SPECIAL!!");


          chrome.tabs.executeScript(tab.id, {
                code: "document.body.innerHTML"
              }, (result) => {
                var domData = (result[0]);
                var _9animedataName = domData.substring(domData.lastIndexOf("<h1 class=\"title\">")+18).split(/[<]/)[0];
                var _9animedataEP = domData.substring(domData.lastIndexOf("Episode <span>")+14).split(/[<]/)[0];
                var processedDomData = {name: _9animedataName, ep: _9animedataEP};
                store.dispatch(searchMAL(urlSplit, useranime, processedDomData))
              });

          return;
        default:
          store.dispatch(searchMAL(urlSplit, useranime, domData));
      }

    }
  });
}, 500);
