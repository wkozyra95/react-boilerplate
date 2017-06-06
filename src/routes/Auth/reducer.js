/* @flow */

import { Map } from 'immutable';

import type { AuthState, RegisterData, LoginData } from './model';

export const actionType = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_RESPONSE_ERROR: 'LOGIN_RESPONSE_ERROR',
  LOGIN_RESPONSE_SUCCESS: 'LOGIN_RESPONSE_SUCCESS',
  CLEAR_LOGIN_ERROR: 'CLEAR_LOGIN_ERROR',

  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_RESPONSE_ERROR: 'REGISTER_RESPONSE_ERROR',
  REGISTER_RESPONSE_SUCCESS: 'REGISTER_RESPONSE_SUCCESS',
  CLEAR_REGISTER_ERROR: 'CLEAR_REGISTER_ERROR',

  LOGOUT: 'LOGOUT',

  FETCH_ACCOUNT: 'FETCH_ACCOUNT',
  FETCH_ACCOUNT_SUCCESS: 'FETCH_ACCOUNT_SUCCESS',
  FETCH_ACCOUNT_ERROR: 'FETCH_ACCOUNT_ERROR',

  UPDATE_ACCOUNT: 'UPDATE_ACCOUNT',
  UPDATE_ACCOUNT_SUCCESS: 'UPDATE_ACCOUNT_SUCCESS',
  UPDATE_ACCOUNT_ERROR: 'UPDATE_ACCOUNT_ERROR',
  CLEAR_UPDATE_ACCOUNT_ERROR: 'CLEAR_UPDATE_ACCOUNT_ERROR',

  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_ERROR: 'CHANGE_PASSWORD_ERROR',
  CLEAR_CHANGE_PASSWORD_ERROR: 'CLEAR_CHANGE_PASSWORD_ERROR',
};

const ACTION_HANDLERS = {
  [actionType.LOGIN_REQUEST]: (state: AuthState) => {
    return state.merge({ isLoginPending: true });
  },
  [actionType.LOGIN_RESPONSE_SUCCESS]: (state: AuthState, action) => {
    return state.merge({ token: action.token, isLoginPending: false });
  },
  [actionType.LOGIN_RESPONSE_ERROR]: (state: AuthState, action) => {
    return state.merge({ loginError: action.error, isLoginPending: false });
  },
  [actionType.CLEAR_LOGIN_ERROR]: (state: AuthState, action: {field: string}) => {
    return state.deleteIn(['loginError', action.field]);
  },
  [actionType.REGISTER_REQUEST]: (state) => {
    return state.merge({ isRegisterPending: true });
  },
  [actionType.REGISTER_RESPONSE_SUCCESS]: (state) => {
    return state.merge({ isRegisterPending: false });
  },
  [actionType.REGISTER_RESPONSE_ERROR]: (state, action) => {
    return state.merge({ registerError: action.error, isRegisterPending: false });
  },
  [actionType.CLEAR_REGISTER_ERROR]: (state: AuthState, action: {field: string}) => {
    return state.deleteIn(['registerError', action.field]);
  },
  [actionType.LOGOUT]: (state: AuthState) => {
    return state.delete('token');
  },
  [actionType.FETCH_ACCOUNT]: (state: AuthState) => {
    return state.merge({ isFetchAccountPending: true });
  },
  [actionType.FETCH_ACCOUNT_SUCCESS]: (state: AuthState, action) => {
    return state.merge({ isFetchAccountPending: false, user: action.user });
  },
  [actionType.FETCH_ACCOUNT_ERROR]: (state: AuthState, action) => {
    return state.merge({ isFetchAccountPending: false, fetchAccountError: action.error });
  },
  [actionType.UPDATE_ACCOUNT]: (state: AuthState) => {
    return state.merge({ isUpdateAccountPending: true });
  },
  [actionType.UPDATE_ACCOUNT_SUCCESS]: (state: AuthState, action) => {
    return state.merge({ isUpdateAccountPending: false, user: action.user });
  },
  [actionType.UPDATE_ACCOUNT_ERROR]: (state: AuthState, action) => {
    return state.merge({ isUpdateAccountPending: false, updateAccountError: action.error });
  },
  [actionType.CLEAR_UPDATE_ACCOUNT_ERROR]: (state: AuthState, action: {field: string}) => {
    return state.deleteIn(['updateAccountError', action.field]);
  },
  [actionType.CHANGE_PASSWORD]: (state: AuthState) => {
    return state.merge({ isPassChangePending: true });
  },
  [actionType.CHANGE_PASSWORD_SUCCESS]: (state: AuthState) => {
    return state.merge({ isPassChangePending: false });
  },
  [actionType.CHANGE_PASSWORD_ERROR]: (state: AuthState, action) => {
    return state.merge({ isPassChangePending: false, changePassError: action.error });
  },
  [actionType.CLEAR_CHANGE_PASSWORD_ERROR]: (state: AuthState, action: {field: string}) => {
    return state.deleteIn(['changePassError', action.field]);
  },
};

export const actionCreator = {
  login: (user: LoginData) => {
    return { type: actionType.LOGIN_REQUEST, user };
  },
  register: (user: RegisterData) => {
    return { type: actionType.REGISTER_REQUEST, user };
  },
  updateAccount: (user: Object) => {
    return { type: actionType.UPDATE_ACCOUNT, user };
  },
  changePassword: (newPassword: string, oldPassword: string) => {
    return { type: actionType.CHANGE_PASSWORD, newPassword, oldPassword };
  },
  clearLoginError: (field: string) => {
    return { type: actionType.CLEAR_LOGIN_ERROR, field };
  },
  clearRegisterError: (field: string) => {
    return { type: actionType.CLEAR_REGISTER_ERROR, field };
  },
  clearUpdateAccountError: (field: string) => {
    return { type: actionType.CLEAR_UPDATE_ACCOUNT_ERROR, field };
  },
  clearChangePasswordError: (field: string) => {
    return { type: actionType.CLEAR_CHANGE_PASSWORD_ERROR, field };
  },
};

const initialState = Map();
export const reducer = (state: AuthState = initialState, action: { type: string }) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
