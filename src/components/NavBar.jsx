/*
Joseph P. Pasaoa
NavBar Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import './NavBar.css';
import Logo from './Logo';


/* MAIN */
const NavBar = ({cId, location}) => {
  let sliderPosition = "translateX(-229px) translateY(0px)";
  switch (location.pathname) {
    case `/users/${cId}`: 
        sliderPosition = "translateX(0px)"; break;
    case "/users": 
        sliderPosition = "translateX(154px)"; break;
    case `/shows`:
        sliderPosition = "translateX(308px)"; break;
    case `/about`:
        sliderPosition = "translateX(462px)"; break;
    default: break;
  }

  return (
    <nav>
      <Logo />
      <ul id="navbar">
        <NavLink to={`/users/${cId}`}><li>My Binges</li></NavLink>
        <NavLink to={`/users`}><li>Users</li></NavLink>
        <NavLink to={`/shows`}><li>Shows</li></NavLink>
        <NavLink to={`/about`}><li>About</li></NavLink>
        <li id="active-slide" style={{transform: sliderPosition}}></li>
      </ul>
    </nav>
  );
}


export default compose( withRouter,connect(state => state.userAuthState) )(NavBar);
