/*
Joseph P. Pasaoa
UserProfile Page Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './UserProfile.css';
import ShowCard from '../components/ShowCard';
import { hostname } from '../helpers/urls';


/* MAIN */
const UserProfile = (props) => {
  const [ peekedUser, setPeekedUser ] = useState({});
  const [ usersShows, setUsersShows ] = useState([]);

  const peekedId = Number(props.match.params.id);
  const isCurrentUser = peekedId === props.cId;

  useEffect(() => {
    const getPeekedUserComplete = async () => {
      const [ userRes, showsRes ] = await Promise.all([
        axios.get(hostname + `/users/${peekedId}`),
        axios.get(hostname + `/users-shows/user/${peekedId}`)
      ]);
      setPeekedUser(userRes.data.payload);
      setUsersShows(showsRes.data.payload);
    }

    getPeekedUserComplete();
  }, [peekedId]);

  const listFavs = [];
  const listNonFavs = [];
  const listShows = usersShows.map(show => {
    return (
      <ShowCard
        {...show}
      />
    );
  });


  return (
    <div id="stage">
      <h1>{isCurrentUser ? "my binges" : `${peekedUser.username}'s binges`}</h1>
      <div className="peeked-user--data-container">
        <div className="peeked-user--username">{peekedUser.username}</div>
        <img src={peekedUser.avatar_url} className="peeked-user--avatar" alt={`${peekedUser.username}'s avatar`} />
      </div>
      <div className="card-shows--container">{listShows}</div>
    </div>
  );
}


export default connect(state => state.userAuthState)(UserProfile);
