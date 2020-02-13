/*
Joseph P. Pasaoa
UserCard Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './UserCard.css';


/* MAIN */
const UserCard = ({ avatarUrl, username, id }) => {
  const [ cardColor, setCardColor ] = useState("#fff");
  const [ borderColor, setBorderColor ] = useState("#b0bd8f");
  const [ usernameColor, setUsernameColor ] = useState("olive");


  const handleMouseOver = () => {
    setCardColor("#fff2f2");
    setBorderColor("red");
    setUsernameColor("indianred");
  }
  const handleMouseOut = () => {
    setCardColor("#fff");
    setBorderColor("#b0bd8f");
    setUsernameColor("olive");
  }


  return (
    <li className="card-user" style={{ backgroundColor: cardColor, borderColor: borderColor }}>
      <Link
        to={`/users/${id}`}
        className="card-user--profile-link"
        onMouseOver={handleMouseOver} 
        onMouseOut={handleMouseOut}
      >
        <img src={avatarUrl} alt={`${username} avatar`} className="card-user--avatar"/>
      </Link>
      <div className="card-user--info">
        <Link
          to={`/users/${id}`}
          className="card-user--profile-link"
          onMouseOver={handleMouseOver} 
          onMouseOut={handleMouseOut}
        >
          <h2 className="card-user--username" style={{ color: usernameColor }}>
            {username}
          </h2>
        </Link>
      </div>
      <input type="hidden" value={id} id="id" />
    </li>
  );
}


export default UserCard;
