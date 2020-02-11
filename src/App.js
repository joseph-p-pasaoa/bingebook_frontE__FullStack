/*
JOSEPH P. PASAOA
Client App MAIN Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS & LOCALS */
import React from 'react';

import './App.css';
import NavBar from './components/NavBar';


/* MAIN */
function App() {
  return (
    <div className="App">
      <div id="stage">
        <h1>Outlander (2014-)</h1>
        <p>Hello world, Bingebook loading...!</p>
      </div>
      <NavBar />
    </div>
  );
}


export default App;
