/*
Joseph P. Pasaoa
ShowCard Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React from 'react';
import { withRouter } from 'react-router-dom';

import './ShowCard.css';


/* MAIN */
const ShowCard = (props) => {

  let showId = null, sectionWatchers = null, watchStatus = null, sectionUserShowId = null;
  if (props.location.pathname.includes("/shows")) {
    showId = props.id;
    sectionWatchers = (
      <>
        <p className="card--text-single">
          <strong>Who's binging this:</strong>
        </p>
        <ul className="card-show--watchers">
          {props.watchers}
        </ul>
      </>
    );
  } else if (props.location.pathname.includes("/users")) {
    showId = props.show_id;
    const describe = {
      "now": "CURRENTLY BINGING",
      "onRadar": "ON MY WATCHLIST",
      "watched": "ANOTHER BINGE COMPLETED!"
    };
    watchStatus = (<p className="card--text-single">{`Binge status: ${describe[props.watchStatus]}`}</p>);
    sectionUserShowId = (<input type="hidden" value={props.id} id="userShowId" />);
  }


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
        {sectionWatchers}

        {/* BINGE STATUS */}
        {watchStatus}

      </div>
      <input type="hidden" value={showId} id="showId" />
      {sectionUserShowId}
    </li>
  );
}


export default withRouter(ShowCard);
