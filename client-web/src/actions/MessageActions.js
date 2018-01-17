import axios from 'axios';
import { setCurrentChannel } from "./CurrentChannelActions";

export const GET_ALL_MESSAGES_STARTED = "GET_ALL_MESSAGES_STARTED";
export const GET_ALL_MESSAGES_SUCCESS = "GET_ALL_MESSAGES_SUCCESS";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const GET_ALL_MESSAGES_FAILED = "GET_ALL_MESSAGES_FAILED";
export const SIGN_OUT = "SIGN_OUT";

export const getAllMessagesAsync = (currentChannel) => dispatch => {
    dispatch (getAllMessagesStarted());
    dispatch(setCurrentChannel(currentChannel));
    axios.get('get-all-messages/'+currentChannel.id)
        .then(res => {
            dispatch(getAllMessagesSuccess(res.data));
        })
        .catch(err => {
           dispatch(getAllMessagesFailed(err));
        });
};

export const getAllMessagesStarted = () => {
    return ({
        type: GET_ALL_MESSAGES_STARTED,
    });
};

export const getAllMessagesSuccess = (messages) => {
    return ({
        type: GET_ALL_MESSAGES_SUCCESS,
        messages: messages,
    });
};

export const getAllMessagesFailed = (error) => {
    return ({
        type: GET_ALL_MESSAGES_FAILED,
        error: error,
    });
};

export const signOut = () => {
    return ({
        type: SIGN_OUT,
    });
}

export const addMessage = (message) {
    return ({
        type: ADD_MESSAGE,
        message: message,
    });
}