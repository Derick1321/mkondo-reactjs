import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist/es/constants';
import { REGISTER } from 'redux-persist/es/constants';
import { FLUSH, PAUSE, PERSIST, REHYDRATE } from 'redux-persist/es/constants';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

import reducer from './reducers';

const rootReducer = combineReducers({...reducer});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
  whitelist: [], //blacklisting a store attribute name, will not persist that store attribute.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store);
export default store;
