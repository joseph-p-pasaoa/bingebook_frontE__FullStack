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

      {/* IMAGE */}
      <img src={props.imgUrl} alt={`${props.title} poster`} className="card-show--img" />
      <div>
        <div className="card-show--header">

          {/* TITLE */}
          <h2 className="card-show--title">
            {props.title}
          </h2>

          {/* YEAR */}
          <h3 className="card-show--year">
            y.{props.year}
          </h3>
        </div>

        {/* GENRES */}
        <p className="card--text-single card-show--genres">
          <strong>Genre(s):</strong> {props.genres}
        </p>

        {/* IMDB LINK */}
        <a className="card--text-single regular-copy"
          href={`https://www.imdb.com/title/${props.imdbId}/`}
          target="_blank" rel="noopener noreferrer"
        >
          IMDb page
        </a>

        {/* USERS WHO WATCH SHOW */}
        <p className="card--text-single">
          <strong>Who's binging this:</strong>
        </p>
        <ul className="card-show--watchers">
          {props.watchers}
        </ul>

      </div>
      <input type="hidden" value={props.id} id="showId" />
    </li>
  );
}


export default ShowCard;
