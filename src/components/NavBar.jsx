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
  let slideOpacity = 1;
  // let slideOpacity = 0; // slideOpacity sys commented out for future use
  switch (location.pathname) {
    case `/users/${cId}`: 
        sliderPosition = "translateX(0px)"; break;
        // slideOpacity = 1; break;
    case "/users": 
        sliderPosition = "translateX(154px)"; break;
        // slideOpacity = 1; break;
    case `/shows`:
        sliderPosition = "translateX(308px)"; break;
        // slideOpacity = 1; break;
    case `/about`:
        sliderPosition = "translateX(462px)"; break;
        // slideOpacity = 1; break;
    default: break;
  }

  // navbar slider animation catch for userProfile pages not the current user
  if (location.pathname.includes("/shows/")) {
    sliderPosition = "translateX(308px)";
  } else if (location.pathname.includes("/users/")) {
    location.pathname.includes(`/users/${cId}`)
      ? sliderPosition = "translateX(0px)"
      : sliderPosition = "translateX(154px)";
  }


  return (
    <nav>
      <Logo />
      <ul id="navbar">
        <NavLink to={`/users/${cId}`}><li>My Binges</li></NavLink>
        <NavLink to={`/users`} isActive={(match, {pathname}) => pathname.includes("/users/")}><li>Users</li></NavLink>
        <NavLink to={`/shows`}><li>Shows</li></NavLink>
        <NavLink to={`/about`}><li>About</li></NavLink>
        <li id="active-slide" style={{transform: sliderPosition, opacity: slideOpacity}}></li>
      </ul>
    </nav>
  );
}


export default compose( withRouter, connect(state => state.userAuthState) )(NavBar);
