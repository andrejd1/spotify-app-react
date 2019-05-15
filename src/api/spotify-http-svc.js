import axios from 'axios';
import {environment} from './../environment';
import {getSavedLogin} from "../shared/services/login-svc";

const SpotifyHttpService =  {

  get(endPoint, options = {}){
    const api = environment.spotifyApi.host;

    this.addHeadersToOptions(options);
    return axios.get(api + endPoint, options);
  },

  addHeadersToOptions(options) {
    if (!options.headers) {
      options.headers = {Authorization: `Bearer ${getSavedLogin()}`};
    }
  }
};

export default SpotifyHttpService;