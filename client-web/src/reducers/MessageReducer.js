import {
    GET_ALL_MESSAGES_SUCCESS,
    ADD_MESSAGE,
    SIGN_OUT
} from "../actions/MessageActions";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_MESSAGES_SUCCESS:
            return action.messages;
        case ADD_MESSAGE:
            return [...state, action.message];
        case SIGN_OUT:
            return [];
        default:
            return state;
    }
}