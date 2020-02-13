/*
Joseph P. Pasaoa
OMDb API Communication Helper | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS & LOCALS */
import axios from 'axios';

import apiKey from './secret';


/* FETCHES */
export const getApiSearch = async (search) => {
  const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=`;
  const url = baseUrl + search;

  try {
    const response = await axios.get(url);
    return response.data.Search;
  } catch (err) {
    console.log("error during API get: ", err);
  }
}

export const getApiShow = async (imdbId) => {
  const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=`;
  const url = baseUrl + imdbId;

  try {
    const response = await axios.get(url);
    console.log(response);
    // return response;
  } catch (err) {
    console.log("error during API get: ", err);
  }
}


export default {
  getApiSearch,
  getApiShow
};
