/*
JOSEPH P. PASAOA
Client App MAIN Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS & LOCALS */
import React from 'react';
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
const App = () => {
  return (
    <div className="App">
      <ErrorBoundary>
        <div id="stage--padding-right">
          <div id="stage--column-flex">
            <Switch>
              <Route path={`/users/:id`} component={UserProfile} />
              <Route path={`/users`} component={UsersList} />
              <Route path={`/shows`} component={ShowsList} />
              <Route path={`/about`} render={About} />
              <Route path={`/`} component={Home} />
            </Switch>
          </div>
        </div>
      </ErrorBoundary>
      <NavBar />
    </div>
  );
}


export default App;
