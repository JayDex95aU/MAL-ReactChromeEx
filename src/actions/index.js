import axios from 'axios';

export const TAB_SUGGESTION = 'TAB_SUGGESTION';

const ROOT_URL = "https://myanimelist.net/api"

// Username & Password static for the time being
export function testMAL(query) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/anime/search.xml?q=bleach`,
    auth: {
      username: username,
      password: password
    },
  });

  return {
    type: TAB_SUGGESTION,
    payload: request
  }
}
