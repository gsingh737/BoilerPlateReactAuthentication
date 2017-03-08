import { combineReducers } from 'redux';
import {reducer as form } from 'redux-form';
import auth_reducer from './auth_reducer';
const rootReducer = combineReducers({
  form,
    auth: auth_reducer
});

export default rootReducer;
