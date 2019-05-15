import {Component} from "react";
import {saveLogin} from "../shared/services/login-svc";

function extractSpotifyToken(path) {
  return path.split('=')[1].split('&')[0];
}

class LoginCallback extends Component {

  constructor(props) {
    super(props);
    if (window.location.hash) {
      saveLogin(extractSpotifyToken(window.location.hash));
      window.close(); //
    }
  }

  render() {
    return null;
  }

}

export default LoginCallback;