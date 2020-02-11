/*
Joseph P. Pasaoa
Client Redux Root Reducer | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import { combineReducers } from 'redux';

import uiReducer from './reducers/uiReducer';


/* COMBINEREDUCERS */
export default combineReducers({ 
  uiState: uiReducer
});
