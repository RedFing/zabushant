import {
        CURRENT_CHANNEL_CHANGED,
        CHANNELS_LOADING,
        CHANNELS_LOADED_SUCCESS,
        CHANNELS_LOADED_FAIL
       } from "../actions/ChannelsActions";

const INITIAL_STATE = {
  channels: [],
  loading: true,
  error: '',
  success: null,
};

export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case CHANNELS_LOADED_SUCCESS:
            return {...state, channels: actions.payload, success: true, loading: false };
        case CHANNELS_LOADED_FAIL:
            return {...state, success: false, error: actions.payload, loading: false };
        case CHANNELS_LOADING:
            return {...state, loading: true };
        default:
            return state;
    }
}