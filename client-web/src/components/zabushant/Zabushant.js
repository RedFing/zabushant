import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Sidebar from '../sidebar/Sidebar';
import Chat from '../chat/Chat';
import socketClient from 'socket.io-client';
import axios from 'axios';
import Loader from '../../components/loader/Loader';


// TODO extract
const api = {
  getCurrentUser          : ()          => axios.get('/get-current-user'),
  getAllChannels          : (userId)    => axios.get(`/get-all-channels/${userId}`),
  getAllMessagesForChannel: (channelId) => axios.get(`/get-all-messages/${channelId}`),
};

// TODO extract constant
const SOCKET_ENDPOINT = "http://127.0.0.1:5000";

class Zabushant extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentChannel: '',
            messages: [],
            channels: [],
            user: {},
            loading: true,
            socket: {},
        }
    }
    onChannelChange = (channelId) => {
        this.setState({ currentChannel: channelId});
    };

    getChannelName = () => {
        const { currentChannel, channels} = this.state;
        const selectedChannel = channels.find(c => c.ChannelId === currentChannel);
        if (selectedChannel && selectedChannel.name) return selectedChannel.name;
        return '';
    };

    sendMessage = (content) => {
        const messageObj = {
            userId: this.state.user.id,
            content: content,
            channelId: this.state.currentChannel,
            username: this.state.user.username
        };
        this.socket.emit('message', messageObj);
    };

    onMessageReceived = (newMessage) => {
        console.log(newMessage);
        const { messages } = this.state;
        let findChannelId = messages.findIndex(c => c.channelId === newMessage.channelId);
        if (findChannelId>-1){
            let channelToInsert = messages[findChannelId];
            channelToInsert.channelMessages = [...channelToInsert.channelMessages,
              { username: newMessage.username, content:newMessage.content, createdAt: newMessage.createdAt}];
            let messagesCopy = this.state.messages;
            messagesCopy[findChannelId] = channelToInsert;
            this.setState({ messages: messagesCopy});
        }
    };

    initSocket = () => {
      const socket = socketClient(SOCKET_ENDPOINT);
      this.socket = socket;
      socket.on('connect', () => socket.emit('Register username', this.state.user));
      socket.on('received message', (newMessage) => this.onMessageReceived(newMessage));
    };

    // TODO add error handling
    async componentDidMount(){
        try {
          let currentUser = await api.getCurrentUser();
          this.setState({user: currentUser.data}, this.initSocket);
          let allChannels = await api.getAllChannels(currentUser.data.id);
          this.setState({channels: allChannels.data});
          let allMessages = await axios.all(allChannels.data.map(c => api.getAllMessagesForChannel(c.ChannelId)));
          const allMessages2 = allMessages.map((ch, i) =>
            ({channelId: allChannels.data[i].ChannelId, channelMessages: ch.data}));
          this.setState({currentChannel: allChannels.data[0].ChannelId, messages: allMessages2, loading: false});
        } catch (err){
          this.setState({error: true});
          console.log(err);
        }
      }

    render() {
        const { messages, currentChannel, channels, user, loading } = this.state;
        if (loading) return <Loader/>;
        return (
            <div>
                <Grid>
                    <Sidebar
                        username={user.username}
                        onChannelChange={this.onChannelChange}
                        channels={channels}
                        channelName={this.getChannelName()}
                    />
                    <Chat
                        sendMessage={this.sendMessage}
                        channelName={this.getChannelName()}
                        // TODO this prop calculation is not optimized
                        messages={messages.find(msgObj => msgObj.channelId === currentChannel)} />
                </Grid>
            </div>
        );
    }
}

export default Zabushant;
