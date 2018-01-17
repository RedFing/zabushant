import React, { Component } from 'react';
import { Grid, Segment, Input, Comment } from 'semantic-ui-react';
import './Chat.css';
import user from '../../images/users.svg';
import { connect } from 'react-redux';
import moment from 'moment';
import { addMessage } from '../../actions/MessageActions';
class Chat extends Component {
    constructor(props){
        super(props);
        this.state={
            messageInput:''
        };
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }
    componentDidUpdate(prevProps, prevState){
        // FIXME: use componenentDidUpdate to check if scroll is needed
        this.scrollToBottom();
    }

    // TODO: use auth
    sendMessage = (content) => {
        const messageObj = {
            userId: this.props.user.id,
            content: content,
            channelId: this.props.currentChannel.currentChannel.ChannelId,
            username: this.props.user.username
        };

        this.props.socket.emit('message', messageObj);
    };

    onSendMessage = (event) => {
        if(event.key === 'Enter') {
            const messageInput = this.input.inputRef.value;
            if (messageInput.length){
                this.sendMessage(messageInput);
                this.input.inputRef.value='';
            }
        }
    };
    scrollToBottom(){
        this.chatBody.scrollTop = this.chatBody.scrollHeight - this.chatBody.clientHeight;

    }
    render() {
        const { messageInput } = this.state;
        const { messages, currentChannel } = this.props;
        console.log(messages);

        if (currentChannel.loading) return <div>loading</div>
        return (
          <Grid.Column style={{ width:'calc(100% - 250px)', position:'fixed', right:'0', height:'100vh'}}>
                    <Segment className='chat-header'>
                        #{this.props.currentChannel.currentChannel.name}
                    </Segment>
                    <div
                        className='chat-body'
                        ref={(div) => this.chatBody = div}
                    >
                        <Comment.Group size='big'>
                            <Comment>
                                {messages.map( msg =>
                                    <Message message={msg} key={msg.id} />
                                )}
                            </Comment>
                        </Comment.Group>
                    </div>
                    <Input
                        fluid
                        placeholder={'message '+this.props.currentChannel.currentChannel.name+'...'}
                        className='input-msg'
                        icon='arrow circle right'
                        ref={input => this.input = input}
                        onKeyPress={this.onSendMessage}
                    />
                </Grid.Column>
        );
    }
}
// TODO: extract to separate file
const Message = ({ message }) => (
  <Comment.Content>
    <Comment.Avatar as='a' src={user} />
    <Comment.Author as='a'>{message.username}</Comment.Author>
    <Comment.Metadata>
      <span>{formatTimestamp(message.createdAt)}</span>
    </Comment.Metadata>
    <Comment.Text>{message.content}</Comment.Text>
  </Comment.Content>
);

// TODO: add error handling
const formatTimestamp = timestamp => moment(timestamp).add(10,'hours').add(10, 'minutes').fromNow();

const mapStateToProps = ({ user, messages, currentChannel, socket}) => {
    return { user, messages, currentChannel, socket};
};


export default connect(mapStateToProps,{addMessage})(Chat);
