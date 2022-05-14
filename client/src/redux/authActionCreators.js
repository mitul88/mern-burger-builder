import * as actionTypes from "./actionTypes";
import axios from "axios";

import env from "react-dotenv";

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId
        }
    }
}

export const authFailed = errMsg => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: errMsg,
    }
}

export const authLoading = isLoading => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: isLoading,
    }
}

export const auth = (email, password, mode) => dispatch =>{
    dispatch(authLoading(true));
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true,
    }

    let url = "http://localhost:3001";
    let authUrl = null;

    if(mode === "register") {
        authUrl=`${url}/user`;
    }
     else {
        authUrl=`${url}/user/auth`;
    }

  

    axios.post( authUrl + API_KEY, authData )
        .then(response=> {
            if(response.status === 200) {
                dispatch(authLoading(false));
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('expirationTime', expirationTime);
                dispatch(authSuccess( response.data.idToken, response.data.localId ));
            }
        })
        .catch(err=>{
                dispatch(authLoading(false))
                dispatch(authFailed(err.response.data.error.message))
            } 
         )
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token')
    if(!token) {
        dispatch(logout())

    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if(expirationTime <= new Date()) {
            dispatch(logout())
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId))
        }
    }
}