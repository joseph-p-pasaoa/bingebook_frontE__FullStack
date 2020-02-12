/*
Joseph P. Pasaoa
ShowsList Page Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React, {useState, useEffect } from 'react';
// import { connect } from 'react-redux';
import axios from 'axios';

// import './ShowsList.css';
import { hostname } from '../helpers/urls';


/* MAIN */
const ShowsList = () => {
  const [ shows, setShows ] = useState([]);

  useEffect(() => {
      const getAllShows = async () => {
        const response = await axios.get(hostname + "/shows/");
        console.log(response.data.payload);
        setShows(response.data.payload);
      };

      getAllShows();
  }, []);


  const listShows = shows.map(show => <li key={show.id}>{JSON.stringify(show)}</li>)

  return (
    <div id="stage">
      {listShows}
      {/* <h1>Outlander (2014-)</h1>
      <p>Hello world, Bingebook loading...!</p> */}
    </div>
  );
}


export default ShowsList;
