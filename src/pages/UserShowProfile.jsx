/*
Joseph P. Pasaoa
UserShowProfile Page Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './UserShowProfile.css';
import UserCard from '../components/UserCard';
import ShowCard from '../components/ShowCard';
import { hostname } from '../helpers/urls';


/* MAIN */
const UserShowProfile = (props) => {
  const [ userShowData, setUserShowData ] = useState({
    username: "",
    title: ""
  });

  const showId = props.match.params.show_id;
  const userId = props.match.params.user_id;

  useEffect(() => {
    const getUserShowData = async () => {
      const response = await axios.get(hostname + `/users-shows/show/${showId}/user/${userId}`);
      setUserShowData(response.data.payload);
    }

    getUserShowData();
  }, [showId, userId]);


  const {
    user_id, 
    avatar_url,
    username,
    show_id,
    title, 
    year,
    imdb_id,
    img_url,
    genres,
    is_top3,
    watch_status,
    usershow_id
  } = userShowData;


  return (
    <>
      <h1>{`${userShowData.username}'s ${userShowData.title} binge`}</h1>

      <div className="user-show--header-grid">
        <UserCard
          userId={user_id}
          avatarUrl={avatar_url}
          username={username}
        />
        <ShowCard
          showId={show_id}
          title={title}
          year={year}
          imdbId={imdb_id}
          imgUrl={img_url}
          genres={genres}
          isTop3={is_top3}
          watchStatus={watch_status}
        />
      </div>
    </>
  );
}


export default connect(state => state.userAuthState)(UserShowProfile);
