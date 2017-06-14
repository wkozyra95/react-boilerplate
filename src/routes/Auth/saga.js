/* @flow */

import { takeLatest, eventChannel } from 'redux-saga';
import { fork, call, put, take } from 'redux-saga/effects';
import api, { endpoint } from 'api';
import cookie, { key as cookieKey } from 'store/cookie';
import router from 'utils/router';
import { actionType } from './reducer';
import type { RegisterData, LoginData } from './model';

export function* updateAuthToken(token: string): Generator<*, *, *> {
  if (token) {
    yield call(api.saveAuthToken, token);
    yield call(cookie.set, cookieKey.AUTH_TOKEN, token);
  }
}

export function* login(action: { user: LoginData }): Generator<*, *, *> {
  try {
    const response = yield call(
      api.post,
      endpoint.LOGIN,
      { username: action.user.username, password: action.user.password },
    );
    const token = response.data.token;
    yield* updateAuthToken(token);

    if (response.data.user) {
      yield put({ type: actionType.FETCH_ACCOUNT_SUCCESS, user: response.data.user });
    }

    yield put({ type: actionType.LOGIN_RESPONSE_SUCCESS, token });
    router.push('account');
  } catch (error) {
    yield put({ type: actionType.LOGIN_RESPONSE_ERROR, error: error.response.data });
  }
}

export function* register(action: { user: RegisterData }): Generator<*, *, *> {
  try {
    yield call(api.post, endpoint.REGISTER, action.user);
    yield put({ type: actionType.REGISTER_RESPONSE_SUCCESS });
    yield call(login, { user: {
      username: action.user.username,
      password: action.user.password,
    } });
  } catch (error) {
    yield put({ type: actionType.REGISTER_RESPONSE_ERROR, error: error.response.data });
  }
}

export function* fetchAccount(): Generator<*, *, *> {
  try {
    const response = yield call(api.get, endpoint.ACCOUNT);
    yield put({ type: actionType.FETCH_ACCOUNT_SUCCESS, user: response.data });
  } catch (error) {
    yield put({ type: actionType.FETCH_ACCOUNT_ERROR, error: error.response.data || {} });
  }
}

export function* updateAccount(action: { user: Object }): Generator<*, *, *> {
  try {
    const response = yield call(api.post, endpoint.ACCOUNT, action.user);
    yield put({ type: actionType.UPDATE_ACCOUNT_SUCCESS, user: response.data });
  } catch (error) {
    yield put({ type: actionType.UPDATE_ACCOUNT_ERROR, error: error.response.data });
  }
}

export function* changePassword(
  action: { newPassword: string, oldPassword: string },
): Generator<*, *, *> {
  try {
    yield call(api.post, endpoint.CHANGE_PASSWORD, {
      newPassword: action.newPassword,
      oldPassword: action.oldPassword,
    });
    yield put({ type: actionType.CHANGE_PASSWORD_SUCCESS });
  } catch (error) {
    yield put({ type: actionType.CHANGE_PASSWORD_ERROR, error: error.response.data });
  }
}

export function* googleLogin(action: { data: mixed }): Generator<*, *, *> {
  try {
    const response = yield call(api.post, endpoint.GOOGLE_LOGIN, action.data);
    const token = response.data.token;
    yield* updateAuthToken(token);

    if (response.data.user) {
      yield put({ type: actionType.FETCH_ACCOUNT_SUCCESS, user: response.data.user });
    }

    yield put({ type: actionType.GOOGLE_LOGIN_SUCCESS, token });
    router.push('account');
  } catch (error) {
    yield put({ type: actionType.GOOGLE_LOGIN_ERROR, error: error.response.data });
  }
}

export function* logout(): Generator<*, *, *> {
  yield call(api.saveAuthToken, '');
  yield call(cookie.delete, cookieKey.AUTH_TOKEN);
  yield call(router.push, '/logout');
}

export function* watchLogin(): Generator<*, *, *> {
  yield call(takeLatest, actionType.LOGIN_REQUEST, login);
}

export function* watchRegister(): Generator<*, *, *> {
  yield call(takeLatest, actionType.REGISTER_REQUEST, register);
}

export function* watchLogout(): Generator<*, *, *> {
  yield call(takeLatest, actionType.LOGOUT, logout);
}

export function* watchFetchAccount(): Generator<*, *, *> {
  yield call(takeLatest, actionType.FETCH_ACCOUNT, fetchAccount);
}

export function* watchUpdateAccount(): Generator<*, *, *> {
  yield call(takeLatest, actionType.UPDATE_ACCOUNT, updateAccount);
}

export function* watchChangePassword(): Generator<*, *, *> {
  yield call(takeLatest, actionType.CHANGE_PASSWORD, changePassword);
}

export function* watchGoogleLogin(): Generator<*, *, *> {
  yield call(takeLatest, actionType.GOOGLE_LOGIN, googleLogin);
}

export function* watch403InterceptorChannel(): Generator<*, *, *> {
  const emitterWrapper = (emitter) => {
    api.registerInterceptor(
      (response) => {
        if (response.status === 403) {
          emitter(403);
        }
        return response;
      },
      (error) => {
        throw error;
      },
    );
    return () => null;
  };
  const channel = eventChannel(emitterWrapper);

  for (;;) {
    try {
      yield take(channel);
      yield put({ type: actionType.LOGOUT });
    } catch (error) {
      // ignore errors
    }
  }
}

export default function* authSaga(): Generator<*, *, *> {
  yield call(fetchAccount);
  yield [
    fork(watch403InterceptorChannel),
    fork(watchLogin),
    fork(watchRegister),
    fork(watchFetchAccount),
    fork(watchUpdateAccount),
    fork(watchChangePassword),
    fork(watchGoogleLogin),
    fork(watchLogout),
  ];
}
