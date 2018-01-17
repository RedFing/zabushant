import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import LoginReducer from './LoginReducer';

export default combineReducers({
    user: UserReducer,
    login: LoginReducer,
});