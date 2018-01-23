import axios from 'axios';
import {setUser, setUserToken} from "./UserActions";

export const USERNAME_CHANGED = "USERNAME_CHANGED";
export const PASSWORD_CHANGED = "PASSWORD_CHANGED";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";
export const LOGIN_USER = "LOGIN_USER";

export const usernameChanged = (username) => {
    return {
        type: USERNAME_CHANGED,
        payload: username
    }
}

export const passwordChanged = (password) =>{
    return {
        type: PASSWORD_CHANGED,
        payload: password
    }
}

export const loginUserFail = (dispatch, error) => {
    dispatch( {
        type: LOGIN_USER_FAIL,
        payload: error
    });
}

export const loginUserSuccess = (dispatch, user) =>{
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
}

export const getUser = () => dispatch => {
    dispatch({type: 'GET_CURRENT_USER'});
    axios.get('/get-current-user')
        .then(res => {
            dispatch(setUser({ username: res.data.username, id: res.data.id, token: res.data.token}));
            localStorage.setItem('token', res.data.token);
            dispatch({type: 'GET_CURRENT_USER_SUCCESS'});

        }).catch(err => {
            dispatch({type: 'GET_CURRENT_USER_'});
    })
};

export  const loginUser = ({username, password}) => dispatch => {
    dispatch({ type: LOGIN_USER });
    axios.post('/login', {username, password})
        .then(res => {
            dispatch(setUser({ username: res.data.username, id: res.data.id, token: res.data.token}));
            loginUserSuccess(dispatch, res.data);
            //TODO: remove later
            localStorage.setItem('token', res.data.token);
        })
        .catch( () => loginUserFail(dispatch, 'Invalid login!'));
};