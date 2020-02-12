/*
JOSEPH P. PASAOA
Client App MAIN Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS & LOCALS */
import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import UserProfile from './pages/UserProfile';
import UsersList from './pages/UsersList';
import ShowsList from './pages/ShowsList';
import About from './pages/About';


/* MAIN */
const App = ({cId}) => {
  return (
    <div className="App">
      <ErrorBoundary>
        <Switch>
          <Route path={`/users/${cId}`} component={UserProfile} />
          <Route path={`/users`} component={UsersList} />
          <Route path={`/shows`} component={ShowsList} />
          <Route path={`/about`} render={About} />
          <Route path={`/`} component={Home} />
        </Switch>
      </ErrorBoundary>
      <NavBar />
    </div>
  );
}


export default connect(state => state.userAuthState)(App);;
