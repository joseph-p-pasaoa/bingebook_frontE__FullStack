/*
Joseph P. Pasaoa
AddShowForm Page Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import './AddShowForm.css';
import ShowCard from '../components/ShowCard';
import { getApiSearch, getApiShow } from '../helpers/omdbApiComm';
import { hostname } from '../helpers/urls';


/* MAIN */
const AddShowForm = ({cId}) => {
  const [ searchTxt, setSearchTxt ] = useState("");
  const [ errorMsg, setErrorMsg ] = useState("");
  const [ results, setResults ] = useState([]);

  let history = useHistory();

  const refBtnSearch = React.createRef();
  const refBtnClear = React.createRef();


  const handleChange = (e) => {
    setSearchTxt(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTxt || !searchTxt.trim()) {
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
          console.log("showData: ", showData);
    // add to our database
    const addUserShowRes = await axios.post(hostname + `/users-shows/add/${cId}/${imdbId}`, showData);
    const payload = addUserShowRes.data.payload;

    // add genres to shows-genres table in database
    if (payload.wasShowJustCreated === true) {
      const genres = showRes.Genre.toLowerCase().split(', ');
      const addGenres = genres.map(genre => axios.post(hostname + `/shows-genres/create/${payload.show_id}/${genre}`));
      const results = await Promise.all(addGenres);
      results.forEach(x => console.log("forEach: ", x));
    }
    history.push(`/shows/${payload.show_id}/user/${cId}`);
  }


  const getSearchResults = async (search) => {
    const results = await getApiSearch(search);
    setErrorMsg("");
    if (results.length === 0) {
      results[0] = "no results found";
    };
    setResults(results);
  }


  let listResults = null;
  if (results.length && results[0] !== "no results found") {
    listResults = results.map(result => {
        const imdbId = result.imdbID;
        const title = result.Title;
        const year = result.Year;
        const imgUrl = result.Poster;

        return (
          <ShowCard
            key={imdbId}
            imdbId={imdbId}
            title={title}
            year={year}
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
      <h1>add a show</h1>

      <form onSubmit={handleSubmit} className="addshow--form">
        <input
          type="text"
          name="searchTxt"
          className="addshow--input-txt"
          value={searchTxt}
          onChange={handleChange}
          placeholder="Search..."
        />
        <button className="addshow--btn-search" ref={refBtnSearch}>Search</button>
        <button className="addshow--btn-clear" onClick={handleClear} ref={refBtnClear}>Clear</button>
      </form>

      <div className="addshow--msg-error">{errorMsg}</div>

      <div className="addshow--results">
        {showing}
      </div>

    </>
  );
}


export default connect(state => state.userAuthState)(AddShowForm);
