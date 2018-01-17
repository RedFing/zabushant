const INITIAL_STATE = null;

export const initSocketToStore = (socket) => {
    return {
        type: INIT_SOCKET,
        socket: socket
    }
};

const INIT_SOCKET = 'INIT_SOCKET';
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_SOCKET:
            return action.socket;
        default:
            return state;

    }
}