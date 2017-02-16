import axios from 'axios';
import x2js from 'x2js';

export const TAB_SUGGESTION = 'TAB_SUGGESTION';
export const BAD_ACTION = 'BAD_ACTION';
export const ANIME_ADD = 'ANIME_ADD';
export const REMOVE_ANIME = 'REMOVE_ANIME';
export const LOGIN_DETAILS = 'LOGIN_DETAILS';
export const DELETE_LOGIN_DETAILS = 'DELETE_LOGIN_DETAILS';
export const USER_ANIME = 'USER_ANIME';
export const CLEAR_USER_ANIME = 'CLEAR_USER_ANIME';
export const LOGIN_UPDATE_EXISTING_SUGGESTIONS = 'LOGIN_UPDATE_EXISTING_SUGGESTIONS';

const SEARCH_URL = "https://myanimelist.net/search/prefix.json?type=all&keyword="


/**
 URL cases handled include:
 - kissanime.ru
**/
export function searchMAL(url, useranime, domData) {

  var query = '';
  var episode = '';
  // console.log(url);

  if (!url) return {type: BAD_ACTION};
  switch(url.domain) {



    case "9anime":
      if (url.one != 'watch') {
        return {type: BAD_ACTION};
      }
      query = domData.name;
      episode = domData.ep.replace(/^0+/, '');
      break;
    case "kissanime":
      if (url.one != 'Anime') {
        return {type: BAD_ACTION};
      }
      query = url.two;
      try {
        var ep = url._;
        episode = ep.substring(ep.lastIndexOf("-")+1, ep.lastIndexOf("?"));
        episode = episode.replace(/^0+/, '');
        if (isNaN(episode)) {
          episode = "Film";
        }
      }
      catch(err) {
        episode = "Film";
      }
      break;
    default:
      return {type: BAD_ACTION}
  }

  const request = axios({
    method: 'get',
    url: `${SEARCH_URL}${query}`
  });

  return {
    type: [ TAB_SUGGESTION, episode, useranime ],
    payload: request,
  }
}

export function removeAnimeSuggestion(id) {
  return {
    type: [REMOVE_ANIME],
    id: id
  }
}

export function saveDetailToReducer(username, password) {
  return {
    type: [LOGIN_DETAILS],
    username: username,
    password: password
  }
}

export function clearDetailsInReducer() {
  return {
    type: [DELETE_LOGIN_DETAILS]
  }
}

export function specialgetUserAnime(data) {
  return {
    type: [USER_ANIME],
    payload: data
  }
}

export function getUserAnime(username) {
  const request = axios({
    method: 'get',
    url: `https://myanimelist.net/malappinfo.php?u=${username}&status=all&type=anime`
  });
  return {
    type: [USER_ANIME],
    payload: request,
  }
}

export function clearUserAnime() {
  return {
    type: [CLEAR_USER_ANIME]
  }
}

export function updateExistingSuggestions(useranime) {
  var parser = new x2js();
  parser = parser.xml2js(useranime.data).myanimelist.anime;
  return {
    type: [LOGIN_UPDATE_EXISTING_SUGGESTIONS],
    payload: parser
  }
}
