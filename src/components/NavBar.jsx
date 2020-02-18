/*
Joseph P. Pasaoa
NavBar Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NavLink, withRouter, useRouteMatch } from 'react-router-dom';

import './NavBar.css';
import Logo from './Logo';


/* MAIN */
const NavBar = ({cId}) => {
  let sliderStyle = { transX: "translateX(0px)", opacity: 0 };

  let isCurrentUserRoute = useRouteMatch(`/users/${cId}`);
  let isUsersRoute = useRouteMatch(`/users`);
  let isShowsRoute = useRouteMatch(`/shows`);
  let isAboutRoute = useRouteMatch(`/about`);

  if (isCurrentUserRoute) {
    sliderStyle = { transX: "translateX(0px)", opacity: 1 };
  } else if (isUsersRoute) {
    sliderStyle = { transX: "translateX(154px)", opacity: 1 };
  } else if (isShowsRoute) {
    sliderStyle = { transX: "translateX(308px)", opacity: 1 };
  } else if (isAboutRoute) {
    sliderStyle = { transX: "translateX(462px)", opacity: 1 };
  }


  return (
    <nav>
      <Logo />
      <ul id="navbar">
        <NavLink to={`/users/${cId}`}><li>My Binges</li></NavLink>
        <NavLink to={`/users`} isActive={(match, {pathname}) => pathname.includes("/users/")}><li>Users</li></NavLink>
        <NavLink to={`/shows`}><li>Shows</li></NavLink>
        <NavLink to={`/about`}><li>About</li></NavLink>
        <li id="active-slide" style={{transform: sliderStyle.transX, opacity: sliderStyle.opacity}}></li>
      </ul>
    </nav>
  );
}


export default compose( withRouter, connect(state => state.userAuthState) )(NavBar);
