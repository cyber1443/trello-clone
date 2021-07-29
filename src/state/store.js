import {combineReducers, createStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AuthReducer from '../AuthFlow/Signin/state/reducer';
import {storage} from '../utils/storage';

const appReducer = combineReducers({
  auth: AuthReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, appReducer);
const store = createStore(persistedReducer);

const peristor = persistStore(store);

export {store, peristor};
