/*
Joseph P. Pasaoa
ShowCard Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React from 'react';
// import { Link } from 'react-router-dom';

import './ShowCard.css';


/* MAIN */
const ShowCard = (props) => {
  return (
    <li className="card-show">
      <img src={props.imgUrl} alt={`${props.title} poster`} className="card-show--img" />
      <div>
        <div className="card-show--header">
          <h2>{props.title}</h2>
          <h3>y.{props.year}</h3>
        </div>
        <p className="card-show--genres"><strong>Genre(s):</strong> {props.genres}</p>
        <a className="card-show--imdb-link"
          href={`https://www.imdb.com/title/${props.imdbId}/`}
          target="_blank" rel="noopener noreferrer"
        >IMDb page</a>
        <ul className="watchers">
          <li><strong>Users binging this:</strong></li>
          {props.watchers}
        </ul>
      </div>
      <input type="hidden" value={props.id} />
    </li>
  );
}


export default ShowCard;
