import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Sidebar from '../sidebar/Sidebar';
import Chat from '../chat/Chat';
import socketClient from 'socket.io-client';
import axios from 'axios';
import Loader from '../../components/loader/Loader';

class Zabushant extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentChannel: '',
            messages: [],
            channels: [],
            user: {},
            endpoint: "http://127.0.0.1:5000",
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
        this.state.socket.emit('message', messageObj);
    };
    componentDidMount() {
        axios.get('/get-current-user')
            .then( res => {
               this.setState({ user: res.data }, () => {
                   const { endpoint } = this.state;
                   const socket = socketClient(endpoint);
                    this.setState({ socket });
                   socket.on('connect', () => {
                       socket.emit('Register username', this.state.user);
                   });
                   socket.on('received message', (newMessage) =>{
                       console.log('from socket', newMessage);
                       let findChannel = this.state.messages.findIndex(c => c.channelId === newMessage.channelId);{}
                       if (findChannel>-1){
                           let channelToInsert = this.state.messages[findChannel];
                           channelToInsert.channelMessages = [...channelToInsert.channelMessages,
                               { username: newMessage.username, content:newMessage.content, createdAt: newMessage.createdAt}];
                           let messagesCopy = this.state.messages;
                           messagesCopy[findChannel] = channelToInsert;
                           this.setState({ messages: messagesCopy});
                       }
                   } )
               });
               axios.get(`/get-all-channels/${this.state.user.id}`)
                   .then(res => {
                       this.setState({ channels: res.data});
                       console.log('resDATA IS', res.data);
                       const allChannelMessagesRequests = res.data.map(c => {
                           return  axios.get(`/get-all-messages/${c.ChannelId}`)
                       });

                       axios.all(allChannelMessagesRequests)
                           .then(allRes => {
                               const all = allRes.map((res2,i) => {
                                   return {
                                       channelId: res.data[i].ChannelId,
                                       channelMessages: res2.data
                                   }
                               });
                               this.setState({ currentChannel: res.data[0].ChannelId, messages: all, loading: false});

                           })
                           .catch(err => this.setState({ err: true}));

                   })
            });
    }

    render() {
        const { messages, currentChannel, loading } = this.state;
        if (loading) return <Loader/>
        return (
            <Grid>
                <Sidebar username={this.state.user.username} onChannelChange={this.onChannelChange} channels={this.state.channels}/>
                <Chat
                    sendMessage={this.sendMessage}
                    channelName={this.getChannelName()}
                    messages={messages.find(msgObj => msgObj.channelId === currentChannel)} />
            </Grid>
        );
    }
}

export default Zabushant;
