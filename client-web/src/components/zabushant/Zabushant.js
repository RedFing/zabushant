import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Sidebar from '../sidebar/Sidebar';
import Chat from '../chat/Chat';
import socketClient from 'socket.io-client';
import connect from 'react-redux';
import { initSocketToStore }from '../../reducers/SocketReducer';
import {addMessage} from '../../actions/MessageActions';
import { channelsLoading } from '../../actions/ChannelsActions';

const SOCKET_ENDPOINT = "http://127.0.0.1:5000";

class Zabushant extends Component {
    constructor(props){
        super(props);

        this.initSocket();
    }

    initSocket = () => {
      const { user, currentChannel} = this.props;
      const socket = socketClient(SOCKET_ENDPOINT);
      this.socket = socket;
      this.props.initSocketToStore(socket);
      // FIXME: don't send user, use auth
      socket.on('connect', () => socket.emit('Register username', this.props.user));
      socket.on('received message', (newMessage) => {
          if (currentChannel.channelId == newMessage.channelId){
              this.props.addMessage();
          }
          });
    };

    // TODO add error handling
    componentDidMount(){
          this.props.channelsLoading();
      }

    render() {
        return (
            <div>
                <Grid>
                    <Sidebar/>
                    <Chat />
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = ({ user, currentChannel }) => {
    return { user, currentChannel };
};
export default connect(mapStateToProps, {channelsLoading, addMessage, initSocketToStore})(Zabushant);
