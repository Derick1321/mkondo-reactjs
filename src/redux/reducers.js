import { combineReducers } from 'redux'

import authenticationReducer from './features/authentication';

const reducers = combineReducers({
  authentication: authenticationReducer,
});

export default reducers;
