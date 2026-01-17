import { combineReducers } from '@reduxjs/toolkit';
import { baseApiReducer } from '@services/api';
import { pokemonQueryReducer } from '@services/pokemon';
import { authReducer, settingsReducer } from '@slices/index';

const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  ...baseApiReducer,
  ...pokemonQueryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
