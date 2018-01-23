import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Sidebar from '../sidebar/Sidebar';
import Chat from '../chat/Chat';
import socketClient from 'socket.io-client';
import { connect } from 'react-redux';
import { initSocketToStore }from '../../reducers/SocketReducer';
import {addMessage} from '../../actions/MessageActions';
import { channelsLoading } from '../../actions/ChannelsActions';
import { getUser } from '../../actions/LoginActions';
import Loader from "../loader/Loader";

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
      this.socket.on('connect', () => socket.emit('Register username', this.props.user));
      this.socket.on('received message', (newMessage) => {
          console.log(currentChannel);
          if (this.props.currentChannel.currentChannel.ChannelId == newMessage.channelId){
              this.props.addMessage(newMessage);
          }
      });
    };

    // TODO add error handling
    componentDidMount(){
        this.props.getUser();
        this.props.channelsLoading();

      }
    componentDidUpdate(){
        console.log('CURRENT CHANNEL', this.props.currentChannel);
    }
    render() {
        if (this.props.channels.loading) return <Loader/>;
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

const mapStateToProps = ({ user, currentChannel, channels }) => {
    return { user, currentChannel, channels };
};
export default connect(mapStateToProps, {channelsLoading, addMessage, initSocketToStore, getUser})(Zabushant);
