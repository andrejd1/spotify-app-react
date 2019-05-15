import SpotifyHttpService from "./spotify-http-svc.js";

export default {
  getNewReleases() {
    return SpotifyHttpService.get("/browse/new-releases", { params: {country: "CZ" } });
    // https://api.spotify.com/v1/browse/new-releases?country=CZ
  },

  getAlbums(searchString) {
    return SpotifyHttpService.get("/search", { params: {type: "album", q: searchString}})
  },

  getAlbumDetail(id) {
    return SpotifyHttpService.get(`/albums/${id}`);
  }
}