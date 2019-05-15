export const environment = {
  spotifyApi: {
    authorizeUrl: 'https://accounts.spotify.com/authorize',
    host: 'https://api.spotify.com/v1',
    clientId: '7d113906625e4207b994a2dc5cf61ec9', // Your client id
    secretId: '82bc2e4c1573464cbc37e8477e76420c', // Your secret
    scope: 'user-read-private user-read-email user-library-read user-library-modify playlist-read-private',
    redirectUri: 'http://localhost:3000/logged', // Your redirect uri for registered app
    responseType: 'token'
  }
};