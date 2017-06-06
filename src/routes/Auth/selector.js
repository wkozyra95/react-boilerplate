/* @flow */

import type { Store } from 'store/reducers';
import { Map } from 'immutable';

const authSelector = (state: Store) => state.auth;

const loginSelector = (state: Store) => {
  const auth = authSelector(state);

  return {
    isLoginPending: auth.get('isLoginPending', false),
    loginError: auth.get('loginError', Map()).toJS(),
  };
};

const registerSelector = (state: Store) => {
  const auth = authSelector(state);

  return {
    isRegisterPending: auth.get('isRegisterPending', false),
    registerError: auth.get('registerError', Map()).toJS(),
  };
};

const accountSelector = (state: Store): Object => {
  const auth = authSelector(state);

  return {
    user: auth.get('user', Map()).toJS(),
    updateError: auth.get('updateAccountError', Map()).toJS(),
  };
};

const changePasswordSelector = (state: Store): Object => {
  const auth = authSelector(state);

  return {
    formError: auth.get('changePassError', Map()).toJS(),
  };
};

export default {
  authSelector,
  loginSelector,
  registerSelector,
  accountSelector,
  changePasswordSelector,
};
