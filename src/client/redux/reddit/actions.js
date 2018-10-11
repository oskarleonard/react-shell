import { getSubRedditPosts } from '@client/connectivity/api.reddit';
import {
  FETCH_AND_HANDLE_REDDIT_SUCCESS,
  FETCH_AND_HANDLE_REDDIT_FAILURE,
} from './reducer';

export function fetchAndHandleReddit(subReddit, tab) {
  return function(dispatch) {
    return getSubRedditPosts(subReddit, tab)
      .then((response) => {
        return dispatch({
          type: FETCH_AND_HANDLE_REDDIT_SUCCESS,
          data: response.data,
        });
      })
      .catch(() => {
        dispatch({
          type: FETCH_AND_HANDLE_REDDIT_FAILURE,
          message: 'Fetching reddit error',
        });
      });
  };
}
