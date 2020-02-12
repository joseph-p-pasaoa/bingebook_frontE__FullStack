/*
Joseph P. Pasaoa
UserCard Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React from 'react';
import { Link } from 'react-router-dom';

import './UserCard.css';


/* MAIN */
const UserCard = ({ avatarUrl, username, id }) => {
  return (
    <li className="card-user">
      <Link to={`/users/${id}`} className="card-user--profile-link">
        <img src={avatarUrl} alt={`${username} avatar`} className="card-user--avatar" />
      </Link>
      <div className="card-user--info">
        <Link to={`/users/${id}`} className="card-user--profile-link">
          <h2 className="card-user--username">
            {username}
          </h2>
        </Link>
      </div>
      <input type="hidden" value={id} id="id" />
    </li>
  );
}


export default UserCard;
