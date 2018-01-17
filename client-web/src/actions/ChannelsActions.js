import axios from 'axios';

export const CHANNELS_LOADED_SUCCESS = "CHANNELS_LOADED_SUCCESS";
export const CHANNELS_LOADED_FAIL = "CHANNELS_LOADED_FAIL";
export const CHANNELS_LOADING = "CHANNELS_LOADING";


export const channelsLoadedSuccess = (channels) => {
    dispatch ({
        type: CHANNELS_LOADED_SUCCESS,
        payload: channels
    });
};

export const channelsLoadedFail = (error) => {
    dispatch ({
        type: CHANNELS_LOADED_FAIL,
        payload: error
    });
};

export const channelLoading = () => dispatch => {
    dispatch({ type: CHANNELS_LOADING });
    axios.get('/get-all-channels')
        .then(res => {
            channelsLoadedSuccess(res.data);
        })
        .catch( () => channelsLoadedFail('Error!'));
}