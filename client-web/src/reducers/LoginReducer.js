import {
        LOGIN_USER,
        LOGIN_USER_SUCCESS,
        LOGIN_USER_FAIL,
        USERNAME_CHANGED,
        PASSWORD_CHANGED
      } from "../actions/LoginActions";

const INITIAL_STATE = {
    username: '',
    password: '',
    loading: false,
    error: '',
    successLogin: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USERNAME_CHANGED:
            return {...state, username: action.payload };
        case PASSWORD_CHANGED:
            return {...state, password: action.payload };
        case LOGIN_USER_SUCCESS:
            return {...INITIAL_STATE, successLogin: true};
        case LOGIN_USER_FAIL:
            return {...state, error: action.payload, loading: false };
        case LOGIN_USER:
            return {...state, loading: true };
        default:
            return state;
    }
}