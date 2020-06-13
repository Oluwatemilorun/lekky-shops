// eslint-disable-next-line no-unused-vars
const jwt = require('jsonwebtoken');

export const getTokenFromCookie = (req) => {
  if (!req || !req.headers.cookie) return;

  const jwtCookie = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith('token='));

  if (!jwtCookie) return;

  const token = jwtCookie.split('=')[1];

  return token;
};

export const getUserFromLocalStorage = () => {
  const json = window.localStorage.user;
  return json ? JSON.parse(json) : undefined;
};

export const getAdminToken = (req) => {
  if (!req || !req.headers.cookie) return;

  const jwtCookie = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith('admin_token='));

  if (!jwtCookie) return;

  const token = jwtCookie.split('=')[1];

  return token;
};
