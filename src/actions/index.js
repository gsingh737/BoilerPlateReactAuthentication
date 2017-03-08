const ROOT_URL = 'http://localhost:3000';
import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from './types';
export function signinUser({email, password}) {

    console.log(email, password);
    return dispatch => {
        //submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, {email, password})
            .then(response => {
                //if request is good...
                //-update state to indicate user is authenticated
                dispatch({type: AUTH_USER});
                //-save the JWT token
                localStorage.setItem('token', response.data.token);
                //-redirect to the route '/feature'
                browserHistory.push('/feature');
            })
            .catch(() => {
                    dispatch(authError('Bad Login Info'));
            });

        //if request is bad
        //-show an error
    }


}

export function  authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutuser() {
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER
    }
}