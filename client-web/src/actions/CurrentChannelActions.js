export const CURRENT_CHANNEL_CHANGED = "CURRENT_CHANNEL_CHANGED";

export const setCurrentChannel = (currentChannel) => {
    return {
        type: CURRENT_CHANNEL_CHANGED,
        currentChannel: currentChannel
    }
};