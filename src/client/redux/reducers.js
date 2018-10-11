import { combineReducers } from 'redux';
import reddit from './reddit';

export default function createRootReducer(injectedReducers = {}, initialState) {
  const reducers = {
    reddit,
    ...injectedReducers,
  };

  // If initialState contains state we have not loaded the reducer-code for yet,
  // make sure we preserve that state by creating an empty reducer for it
  if (initialState) {
    const reducerNames = Object.keys(reducers);
    Object.keys(initialState).forEach((initialStateKey) => {
      if (reducerNames.indexOf(initialStateKey) === -1) {
        reducers[initialStateKey] = (state = null) => state;
      }
    });
  }

  return combineReducers(reducers);
}
