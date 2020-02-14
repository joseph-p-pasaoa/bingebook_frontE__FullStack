/*
Joseph P. Pasaoa
AddShowForm Page Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import './AddShowForm.css';
import ShowCard from '../components/ShowCard';
import { getApiSearch, getApiShow } from '../helpers/omdbApiComm';
import { hostname } from '../helpers/urls';


/* MAIN */
const AddShowForm = ({cId, match}) => {
  /* DECLARATIONS AND HOOKS */
  const [ searchTxt, setSearchTxt ] = useState("");
  const [ errorMsg, setErrorMsg ] = useState("");
  const [ selectedGenre, setSelectedGenre ] = useState("default");
  const [ genres, setGenres ] = useState([]);
  const [ results, setResults ] = useState([]);

  const refInputTxt = React.createRef();
  const refBtnSearch = React.createRef();
  const refBtnClear = React.createRef();

  let history = useHistory();

  useEffect(() => {
    const getGenres = async () => {
      const resGenres = await axios.get(hostname + "/genres/");
      setGenres(resGenres.data.payload);
    }
    getGenres();
  }, [])


  /* HANDLERS */
  const handleChange = (e) => {
    setSearchTxt(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTxt || !searchTxt.trim()) {
      refInputTxt.current.focus();
      setErrorMsg("Missing search. Please enter something valid to search for.");
    } else {
      refBtnSearch.current.blur();
      getSearchResults(searchTxt);
    }
  }

  const handleClear = (e) => {
    e.preventDefault();
    refBtnClear.current.blur();
    setSearchTxt("");
    setErrorMsg("");
  }

  const handleSelect = (e) => {
    setSelectedGenre(e.target.value);
  }

  const handleAddShowClick = async (e, imdbId) => {
    e.preventDefault();

    // grab all show details from OMDb API
    const showRes = await getApiShow(imdbId);
    const showData = {
      imdbId: imdbId,
      title: showRes.Title,
      year: showRes.Year,
      imgUrl: showRes.Poster,
      watchStatus: "onRadar"
    }

    // add show to our database (catch if show already exists is in back-end)
    const addUserShowRes = await axios.post(hostname + `/users-shows/add/${cId}/${imdbId}`, showData);
    const payload = addUserShowRes.data.payload;

    // auto-add genres to shows-genres table in database (catches if genres already exist are in back-end)
    if (payload.wasShowJustCreated === true) {
      const genres = showRes.Genre.toLowerCase().split(', ');
      const addGenres = genres.map(genre => axios.post(hostname + `/shows-genres/create/${payload.show_id}/${genre}`));
      const results = await Promise.all(addGenres);
      results.forEach(x => console.log("forEach: ", x));
    }

    // auto-redirect user to specified relationship page
    history.push(`/shows/${payload.show_id}/user/${cId}`);
  }


  /* HELPERS */
  const getSearchResults = async (search) => {
    const results = await getApiSearch(search);
    setErrorMsg("");
    // stop here if no results
    if (results.length === 0) {
      results[0] = "no results found";

    // otherwise, get all genres of results and add to result objects
    } else {
      const resultImdbIds = [];
      for (let result of results) {
        resultImdbIds.push(result.imdbID);
      }
      const getShows = resultImdbIds.map(imdbId => getApiShow(imdbId));
      const shows = await Promise.all(getShows);
      const genresMap = {};
      for (let show of shows) {
        genresMap[show.imdbID] = show.Genre.toLowerCase();
      }
      for (let result of results) {
        result["genres"] = genresMap[result.imdbID];
      }
    };
    setResults(results);
  }


  /* PRE-RETURN */
  let listGenres = null;
  if (genres.length > 0) {
    listGenres = genres.map(genre => {
        return (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        );
    });
  }

  let listResults = null;
  if (results.length && results[0] !== "no results found") {
    listResults = results.map(result => {
        const imdbId = result.imdbID;
        const title = result.Title;
        const year = result.Year;
        const genres = result.genres;
        const imgUrl = result.Poster;

        return (
          <ShowCard
            key={imdbId}
            imdbId={imdbId}
            title={title}
            year={year}
            genres={genres}
            imgUrl={imgUrl}
            handleAddShowClick={handleAddShowClick}
          />
        );
    });
  }

  let showing = null;
  if (results[0] === "no results found") {
    showing = <p className="result-response">Sorry, no search results found. Try your search again above.</p>;
  } else if (results.length === 0) {
    showing = <p className="result-response">What show are you looking for?</p>;
  } else {
    showing = listResults;
  }


  return(
    <>
      {/* REDIRECT AWAY IF CURRENT USER IS NOT TARGET USER */}
      {Number(match.params.id) !== cId ? <Redirect to={`/users/${match.params.id}`} /> : null}

      <h1>add a show</h1>

      <div className="add-show--header-grid">
        <form onSubmit={handleSubmit} className="addshow--form">
          <input
            type="text"
            name="searchTxt"
            className="addshow--input-txt"
            value={searchTxt}
            onChange={handleChange}
            ref={refInputTxt}
            placeholder="Search..."
          />
          <button className="addshow--btn-search" ref={refBtnSearch}>Search</button>
          <button className="addshow--btn-clear" onClick={handleClear} ref={refBtnClear}>Clear</button>
          <div className="addshow--msg-error">{errorMsg}</div>
        </form>

        <form className="flex-column">
          <label htmlFor="genreSelect">Or, display shows by genre:</label>
          <select id="genreSelect" value={selectedGenre} onChange={handleSelect}>
            <option value="default" disabled>Choose a genre --</option>
            {listGenres}
          </select>
        </form>
      </div>


      <div className="addshow--results">
        {showing}
      </div>

    </>
  );
}


export default connect(state => state.userAuthState)(AddShowForm);
