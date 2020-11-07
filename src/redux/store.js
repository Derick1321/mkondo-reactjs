import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import reducer from './reducers';

const store = configureStore({
  reducer,
});

export default store;
