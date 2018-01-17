import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import LoginReducer from './LoginReducer';
import MessageReducer from './MessageReducer';
import ChannelsReducer from './ChannelsReducer';
import CurrentChannelReducer from './CurrentChannelReducer';
import SocketReducer from './SocketReducer';
export default combineReducers({
    user: UserReducer,
    login: LoginReducer,
    channels: ChannelsReducer,
    message: MessageReducer,
    currectChannel: CurrentChannelReducer,
    socket: SocketReducer


});