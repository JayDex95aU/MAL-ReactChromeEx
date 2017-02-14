import axios from 'axios';

export const TAB_SUGGESTION = 'TAB_SUGGESTION';
export const BAD_ACTION = 'BAD_ACTION';
export const ANIME_ADD = 'ANIME_ADD';

const SEARCH_URL = "https://myanimelist.net/search/prefix.json?type=all&keyword="


/**
 URL cases handled include:
 - kissanime.ru
**/
export function searchMAL(url) {
  var query = '';
  var episode = '';
  console.log(url);

  if (!url) return {type: BAD_ACTION};
  switch(url.domain) {
    case "kissanime":
      if (url.one != 'Anime') {
        return {type: BAD_ACTION};
      }
      query = url.two;
      try {
        episode = url._.slice(8, 11).replace(/^0+/, '');
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
    type: [ TAB_SUGGESTION, episode ],
    payload: request
  }
}

export function addAnimeToMAL(id) {
  return {
    type: ANIME_ADD,
    payload: id
  }
}
