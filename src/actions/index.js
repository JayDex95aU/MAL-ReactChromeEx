import axios from 'axios';

export const FETCH_SUGGESTION = 'FETCH_SUGGESTION';
export const TAB_SUGGESTION = 'TAB_SUGGESTION';

const ROOT_URL = "https://myanimelist.net/api"

export function fetchSuggestions(text) {
  return {
    type: FETCH_SUGGESTION,
    payload: text
  };
}

// Username & Password static for the time being
export function testMAL(username, password, query) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/anime/search.xml?q=bleach`,
    auth: {
      username: 'JayDex',
      password: '95life95aU'
    },
  });

  return {
    type: TAB_SUGGESTION,
    payload: request
  }
}
