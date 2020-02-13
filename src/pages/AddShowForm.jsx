/*
Joseph P. Pasaoa
AddShowForm Page Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React, { useState } from 'react';
// import { connect } from 'react-redux';

import './AddShowForm.css';
import ShowCard from '../components/ShowCard';
import { getApiSearch } from '../helpers/omdbApiComm';


/* MAIN */
const AddShowForm = () => {
  const [ searchTxt, setSearchTxt ] = useState("");
  const [ errorMsg, setErrorMsg ] = useState("");
  const [ results, setResults ] = useState([]);

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


export default AddShowForm;
