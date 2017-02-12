import axios from 'axios';

export const TAB_SUGGESTION = 'TAB_SUGGESTION';

const SEARCH_URL = "https://myanimelist.net/search/prefix.json?type=all&keyword="

// Username & Password static for the time being
export function searchMAL(query) {
  const query2 = "Battle-Spirits-Double-Drive"
  const request = axios({
    method: 'get',
    url: `${SEARCH_URL}${query2}`
  });

  return {
    type: TAB_SUGGESTION,
    payload: request
  }
}
