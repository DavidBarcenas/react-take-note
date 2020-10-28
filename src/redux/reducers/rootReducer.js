import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { noteReducer } from './noteReducer';
import { uiReducer } from './uiReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  notes: noteReducer,
  ui: uiReducer,
});
