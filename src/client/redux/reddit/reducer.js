import Immutable from 'immutable';
export const FETCH_AND_HANDLE_REDDIT_SUCCESS = 'test/FETCHING_DATA';
export const FETCH_AND_HANDLE_REDDIT_FAILURE = 'test/FETCHING_DATA';

let defaultState = Immutable.fromJS({
  redditPosts: null,
  errorMessage: null,
});

export default function(state = defaultState, action = {}) {
  switch (action.type) {
    case FETCH_AND_HANDLE_REDDIT_SUCCESS:
      return state.merge({
        redditPosts: action.data,
        errorMessage: null,
      });
    case FETCH_AND_HANDLE_REDDIT_FAILURE:
      return state.merge({
        errorMessage: action.message,
      });
    default:
      return state;
  }
}
