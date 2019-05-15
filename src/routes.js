import Home from "./home/home.js";
import Albums from "./albums/albums.js";
import AlbumDetail from "./albums/detail.js";
import LoginCallback from "./login-callback/login-callback.js";
import NotFound from "./not-found/not-found.js";

export default [
  {
    path: "/albums/:id",
    component: AlbumDetail
  },
  {
    path: "/albums",
    component: Albums
  },
  {
    path: "/logged",
    component: LoginCallback
  },
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    component: NotFound
  }
]