/*
Joseph P. Pasaoa
ShowCard Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React from 'react';
import { withRouter, Route, Link, useRouteMatch } from 'react-router-dom';

import './ShowCard.css';
const placeholder = require('../assets/images/placeholder-show.svg');


/* MAIN */
const ShowCard = (props) => {

  let imgUrl = placeholder;
  if (props.imgUrl && props.imgUrl !== "N/A") {
    imgUrl = props.imgUrl;
  }

  /* CONFIGURE COMPONENT BY PATHNAME */
  const { pathname } = props.location;
  let sectionImage = (<img src={imgUrl} alt={`${props.title} poster`} className="card-show--img" />);
  let sectionTitle = (
    <h2 className="card-show--title">
      {props.title}
    </h2>
  );
  let sectionGenres = null,
    sectionWatchers = null,
    watchStatus = null
  ;
  const atAddShowPage = useRouteMatch("/users/:id/addShow");
  const atUserShowPage = useRouteMatch("/shows/:show_id/user/:user_id");

    // ADD SHOW PAGE

  if (atAddShowPage) {
    sectionGenres = (
      <p className="card--text-single card-show--genres">
        <strong>Genre(s):</strong> {props.genres}
      </p>
    );

    // USER-SHOW RELATIONSHIP PAGE

  } else if (atUserShowPage) {
    sectionGenres = (
      <p className="card--text-single card-show--genres">
        <strong>Genre(s):</strong> {props.genres}
      </p>
    );

    // USER PROFILE PAGES
  } else if (pathname.includes("/user")) {
    sectionImage = (
      <Link to={`/shows/${props.showId}/user/${props.userId}`}>
        <img src={imgUrl} alt={`${props.title} poster`} className="card-show--img" />
      </Link>
    );
    sectionTitle = (
      <Link to={`/shows/${props.showId}/user/${props.userId}`} className="card-show--title-link">
        <h2 className="card-show--title">
          {props.title}
        </h2>
      </Link>
    );
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

    // ALL SHOWS PAGE
  } else if (pathname.includes("/shows")) {
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
  }


  return (
    <li className="card-show">

      {/* IMAGE */}
      {sectionImage}

      <div className="card-show--right-side">
        <div className="card-show--header">

          {/* TITLE */}
          {sectionTitle}

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
        <Route path={"/users/:id/addShow"}>
          <button
            type="button"
            onClick={(e) => props.handleAddShowClick(e, props.imdbId)}
            className="addshow-btn"
          >
            Add Show
          </button>
        </Route>

      </div>
    </li>
  );
}


export default withRouter(ShowCard);
