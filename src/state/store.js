import {combineReducers, createStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AuthReducer from '../AuthFlow/Signin/state/reducer';
import ProfileReducer from '../AuthFlow/state/reducer';
import BoardsReducer from '../Boards/state/reducer';
import ListsReducer from '../Lists/state/reducer';
import CommentsReducer from '../Card/state/reducer';
import {storage} from '../utils/storage';

const appReducer = combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer,
  boards: BoardsReducer,
  lists: ListsReducer,
  comments: CommentsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'profile'],
};

const persistedReducer = persistReducer(persistConfig, appReducer);
const store = createStore(persistedReducer);

const peristor = persistStore(store);

export {store, peristor};
