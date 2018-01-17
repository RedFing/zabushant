import {SET_USER, REMOVE_USER} from "../actions/UserActions";

const INITIAL_STATE = {
    username: '',
    id: '',
    token: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, ...action.payload };
        case REMOVE_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
}