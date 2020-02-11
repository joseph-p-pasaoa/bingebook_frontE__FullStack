/*
Joseph P. Pasaoa
NavBar Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './NavBar.css';
import Logo from './Logo';


/* MAIN */
const NavBar = ({cId}) => {
  return (
    <nav>
      <Logo />
      <ul id="navbar">
        <NavLink to={`/users/${cId}`}><li>My Binges</li></NavLink>
        <NavLink to={`/users`}><li>Users</li></NavLink>
        <NavLink to={`/shows`}><li>Shows</li></NavLink>
        <NavLink to={`/about`}><li>About</li></NavLink>
      </ul>
    </nav>
  );
}


export default connect(state => state.userAuthState)(NavBar);
