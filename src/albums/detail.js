import React, {Component, Fragment} from "react";
import bindMethodsToObject from "../shared/helpers/bind-methods";
import SpotifyApi from "../api/spotify";

class Detail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      album: null
    };

    bindMethodsToObject(this, "_handleGetDataSuccess", "_handleGetDataFailed");
  }

  componentDidMount() {
    SpotifyApi.getAlbumDetail(this.props.match.params.id).then(this._handleGetDataSuccess, this._handleGetDataFailed)
  }

  _handleGetDataSuccess(response) {
    this.setState({
      album: response.data
    })
  }

  _handleGetDataFailed(error) {
    console.error("failed to load album", error)
  }

  getTrackList(tracks) {
    return (
      <ul className="list-group list-group-flush mt-4">
        {
          tracks.map((track, idx) => {
            return (
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                <span className="badge badge-primary badge-pill">{idx + 1}.</span>
                <div className="media-body px-2">
                  <h5 className="mt-0 mb-1">{track.name}</h5>
                </div>
                <div className="media-body px-2">
                  <p className="mb-1 text-center">
                    {track.artists.map(artist => artist.name).join(', ')}
                  </p>
                </div>
                <div className="media-body px-2 text-right">
                  <span>{(track.duration_ms)}</span>
                </div>
              </li>
            );
          })
        }
      </ul>
    );
  }

  _renderStyled(album) {
    const {name, artists, images, popularity, release_date, total_tracks, tracks} = album;
    return (
      <Fragment>
        <div style={{height: '300px'}}>
          <div style={{
            backgroundImage: `url(${images[0].url})`,
            height: '100%',
            backgroundPosition: 'center center'
          }}/>
        </div>
        <section className='py-5'>
          <div className='container'>
            <small>Album</small><h1>{name}</h1>
            <div className='lead'>
              Author: <strong>{artists.map(artist => artist.name).join(', ')}</strong>
            </div>
            <div className='lead'>Release: <span className='badge badge-info'>{release_date}</span>
            </div>
            <div className='lead'>Popularity: <span className='badge badge-success'>{popularity}</span>
            </div>
            <div className='lead'>Total tracks: <span className='badge badge-success'>{total_tracks}</span>
            </div>
            {this.getTrackList(tracks.items)}
          </div>
        </section>
      </Fragment>
    );
  }

  render() {
    if(!this.state.album) {
      return null;
    }
    // let album = details.find(detail => detail.id === this.props.match.params.id);
    let album = this.state.album;
    return this._renderStyled(album);
    return (
      <div>
        <div>Název: {album.name}</div>
        <div>Autoři: {album.artists.map(author => author.name).join(", ")}</div>
        <div>Vydáno: {album.release_date}</div>
        <div>Popularita: {album.popularity}</div>
        <div>Písní: {album.total_tracks}</div>
        <div>{album.tracks.items.map((item) => (
          <div key={item.id}>{item.track_number} - {item.name} - {item.duration_ms}</div>
        ))}</div>
      </div>
    )
  }
}

export default Detail;