import React, {Component} from "react";
import {Link} from "react-router-dom";
import {albums} from "../data.js";
import bindMethodsToObject from "../shared/helpers/bind-methods.js";
import SpotifyApi from "../api/spotify.js";
import AlbumList from "./list.js";
import Search from "./search.js"

const FEEDBACK = {
  LOADING: "loading",
  READY: "ready",
  ERROR: "error"
};

class Albums extends Component {

  constructor(props) {
    super(props);

    this.state = {
      albums: null,
      feedback: FEEDBACK.LOADING
    };

    bindMethodsToObject(this, "_handleGetDataSuccess", "_handleGetDataFailed", "_handleSearchData");
  }

  componentDidMount() {
    SpotifyApi.getNewReleases().then(this._handleGetDataSuccess, this._handleGetDataFailed);
  }

  _handleSearchData(searchData) {
    this.setState({feedback: FEEDBACK.LOADING});
    SpotifyApi.getAlbums(searchData.value).then(this._handleGetDataSuccess, this._handleGetDataFailed);
  }

  _handleGetDataSuccess(response) {
    this.setState({
      albums: response.data.albums,
      feedback: FEEDBACK.READY
    })
  }

  _handleGetDataFailed(error) {
    this.setState({
      feedback: FEEDBACK.ERROR,
      error: error
    });
    console.error("something went horribly wrong!", error)
  }

  _renderLoading() {
    return <div className="center">Loading data from spotify</div>
  }

  _renderReady() {
    return (
      <div className="row">
        <AlbumList albums={this.state.albums.items}/>
      </div>
    )
  }

  _renderError() {
    if (this.state.error &&
      this.state.error.response.status === 401)
    {
      return <div className="center bg-danger">Login token expired, please relogin!</div>
    }
    return <div className="center bg-danger">PC Broke!</div>
  }


  render() {
    let child;

    switch (this.state.feedback) {
      case FEEDBACK.LOADING:
        child = this._renderLoading();
        break;
      case FEEDBACK.READY:
        child = this._renderReady();
        break;
      default:
        child = this._renderError();
    }

    return <div className="container">
      <h2>Albums</h2>
      <Search onSearch={this._handleSearchData} />
      {child}
    </div>;
  }
}

export default Albums;
