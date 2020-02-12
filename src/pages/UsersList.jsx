/*
Joseph P. Pasaoa
UsersList Page Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './UsersList.css';
import UserCard from '../components/UserCard';
import { hostname } from '../helpers/urls';


/* MAIN */
const UsersList = () => {
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await axios.get(hostname + `/users/`);
      setUsers(response.data.payload);
    };

    getAllUsers();
  }, []);


  const listUsers = users.map(user => {
      return (
        <UserCard
          key={user.id}
          id={user.id}
          username={user.username}
          avatarUrl={user.avatar_url}
        />
      );
  });
console.log(users)

  return (
    <div id="stage">
      <h1>find users</h1>
      <div className="users-container--flex">
        {listUsers}
      </div>
    </div>
  );
}


export default UsersList;
