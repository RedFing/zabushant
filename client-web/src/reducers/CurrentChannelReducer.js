import {
    GET_ALL_MESSAGES_STARTED,
    GET_ALL_MESSAGES_FAILED
} from "../actions/MessageActions";
import { CURRENT_CHANNEL_CHANGED } from "../actions/CurrentChannelActions";

const INIITIAL_STATE = {
    loading: false,
    success: false,
    error: null,
    currentChannel: {
        name: '',
        id: ''
    },
}

export default (state = INIITIAL_STATE, action) => {
    switch (action.type) {
        case CURRENT_CHANNEL_CHANGED:
            return {...state, currentChannel: action.currentChannel };
        case GET_ALL_MESSAGES_STARTED:
            return {...state, loading: false, success: true};
        case GET_ALL_MESSAGES_FAILED:
            return {...state, error: 'ERROR!'};
        default:
            return state;
    }
}