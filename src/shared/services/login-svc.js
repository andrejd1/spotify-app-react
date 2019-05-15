import {environment} from "../../environment.js";

const TOKEN_KEY = "spotifyToken";

function login() {
  // try to obtain token
  openLoginWindow();
}

function saveLogin(token) {
  // store obtained token
  localStorage.setItem(TOKEN_KEY, token);
}

function getSavedLogin() {
  // load token from local storage
  return localStorage.getItem(TOKEN_KEY);
}

function logout() {
  // remove token
  localStorage.removeItem(TOKEN_KEY);
}


function buildLoginUrl() {
  return `${environment.spotifyApi.authorizeUrl}?client_id=${environment.spotifyApi.clientId}` +
    `&redirect_uri=${encodeURIComponent(environment.spotifyApi.redirectUri)}&scope${
      encodeURIComponent(environment.spotifyApi.scope)}` +
    `&response_type=${environment.spotifyApi.responseType}`;
}

function openLoginWindow() {
  return window.open(buildLoginUrl(), 'Spotify');
}

export {login, saveLogin, getSavedLogin, logout}