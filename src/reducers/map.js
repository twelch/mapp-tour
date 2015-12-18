import { createReducer } from 'utils';

// Action type
const CHANGE_BASELAYER = 'CHANGE_BASELAYER';
const SET_LOADED = 'SET_LOADED';

// Reducer
const initialState = {
  baselayer: 'streets',
  loaded: false
};
export default createReducer(initialState, {
  [CHANGE_BASELAYER] : (state, payload) => {
    return Object.assign({}, state, {
      baselayer: payload
    });
  },
  [SET_LOADED] : (state, payload) => {
    return Object.assign({}, state, {
      loaded: payload
    });
  }
});
