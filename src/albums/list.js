import React from "react";
import {Link} from "react-router-dom";

const AlbumList = ({albums}) => (
  <React.Fragment>
    {albums.map(album => (
      <div className="col-3 my-2" key={album.id}>
        <Link to={`/albums/${album.id}`}>
          <img src={album.images[0].url} alt="album thumbnail" className="img-thumbnail rounded-circle"/>
          <div className='p-1'>
            <strong>{album.name}</strong>
            <div>Release: {album.release_date} | <span>Tracks: {album.total_tracks}</span></div>
          </div>
        </Link>
      </div>
    ))}
  </React.Fragment>
);

export default AlbumList;