/*
Joseph P. Pasaoa
ShowCard Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React from 'react';
import { withRouter } from 'react-router-dom';

import './ShowCard.css';
import BtnAddShow from './BtnAddShow';
const placeholder = require('../assets/images/placeholder-show.svg');


/* MAIN */
const ShowCard = (props) => {

  let imgUrl = placeholder;
  if (props.imgUrl && props.imgUrl !== "N/A") {
    imgUrl = props.imgUrl;
  }

  /* CONFIGURE COMPONENT BY PATHNAME */
  let sectionGenres = null,
    sectionWatchers = null,
    watchStatus = null,
    sectionAdd = null,
    sectionShowId = null,
    sectionUserShowId = null
  ;

  // ALL SHOWS PAGE
  if (props.location.pathname.includes("/shows")) {
    sectionGenres = (
      <p className="card--text-single card-show--genres">
        <strong>Genre(s):</strong> {props.genres}
      </p>
    );
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
    sectionShowId = (<input type="hidden" value={props.id} id="showId" />);

  // ADDSHOW PAGE
  } else if (props.location.pathname.includes("/addShow")) {
    sectionAdd = (<BtnAddShow />);

  // USER PROFILE PAGES
  } else if (props.location.pathname.includes("/users")) {
    sectionGenres = (
      <p className="card--text-single card-show--genres">
        <strong>Genre(s):</strong> {props.genres}
      </p>
    );
    const describe = {
      "now": "CURRENTLY BINGING",
      "onRadar": "ON MY WATCHLIST",
      "watched": "ANOTHER BINGE COMPLETED!"
    };
    watchStatus = (<p className="card--text-single">{`Binge status: ${describe[props.watchStatus]}`}</p>);
    sectionShowId = (<input type="hidden" value={props.show_id} id="showId" />);
    sectionUserShowId = (<input type="hidden" value={props.id} id="userShowId" />);
  }


  return (
    <li className="card-show">

      {/* IMAGE */}
      <img src={imgUrl} alt={`${props.title} poster`} className="card-show--img" />
      <div className="card-show--right-side">
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
        {sectionGenres}

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

        {/* ADD SHOW BUTTON */}
        {sectionAdd}

      </div>
      {sectionShowId}
      {sectionUserShowId}
    </li>
  );
}


export default withRouter(ShowCard);
