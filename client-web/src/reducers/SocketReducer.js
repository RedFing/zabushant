const INITIAL_STATE = null;

export const initSocketToStore = (socket) => {
    return {
        type: INITIAL_STATE,
        socket: socket
    }
};

const INIT_SOCKET = 'INIT_SOCKET';
export const SocketReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_SOCKET:
            return action.socket;
        default:
            return INITIAL_STATE;

    }
}