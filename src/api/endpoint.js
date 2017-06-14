/* @flow */

export const baseURL = BASE_URL;

export type Endpoint = 'LOGIN' |
  'REGISTER';

const endpoints = {
  LOGIN: 'auth/login',
  REGISTER: 'auth/register',
  GOOGLE_LOGIN: 'auth/google',
  ACCOUNT: 'user',
  CHANGE_PASSWORD: 'auth/change_password',
};

export default endpoints;
