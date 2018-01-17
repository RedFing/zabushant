import axios from 'axios';
import {setCurrentChannel} from "./CurrentChannelActions";

export const CHANNELS_LOADED_SUCCESS = "CHANNELS_LOADED_SUCCESS";
export const CHANNELS_LOADED_FAIL = "CHANNELS_LOADED_FAIL";
export const CHANNELS_LOADING = "CHANNELS_LOADING";


export const channelsLoadedSuccess = (channels) => {
    return {
        type: CHANNELS_LOADED_SUCCESS,
        payload: channels
    };
};

export const channelsLoadedFail = (error) => {
    return {
        type: CHANNELS_LOADED_FAIL,
        payload: error
    };
};

export const channelsLoading = () => dispatch => {
    dispatch({ type: CHANNELS_LOADING });
    axios.get('/get-all-channels')
        .then(res => {
            dispatch(channelsLoadedSuccess(res.data));
            dispatch(setCurrentChannel(res.data[0]))
        })
        .catch( () => channelsLoadedFail('Error!'));
}