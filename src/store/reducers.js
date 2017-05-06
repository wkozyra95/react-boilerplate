/* @flow */

import { combineReducers } from 'redux';

import { routerReducer as routing } from 'react-router-redux';
import { i18nReducer as i18n } from 'react-redux-i18n';

import { reducer as auth } from '../routes/Auth/reducer';

import type { AuthState } from '../routes/Auth/model';

const rootReducer = combineReducers({
  routing,
  i18n,
  auth,
});

export type Store = {
  routing: Object,
  i18n: Object,
  auth: AuthState,
};

export default rootReducer;
