import React, { Component } from 'react';
import { Grid, Segment, Input, Comment } from 'semantic-ui-react';
import './Chat.css';
import user from '../../images/users.svg';

class Chat extends Component {
    constructor(props){
        super(props);
        this.state={
            messageInput:''
        };
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }
    componentDidUpdate(prevProps){
        // FIXME: use componenentDidUpdate to check if scroll is needed
        this.scrollToBottom();
    }
    componentDidMount(){
        this.scrollToBottom();
    }
    onSendMessage = (event) => {
        if(event.key === 'Enter') {
            const {messageInput} = this.state;
            this.props.sendMessage(messageInput);
            this.setState({messageInput: ''});
        }
    };
    scrollToBottom(){
        this.chatBody.scrollTop = this.chatBody.scrollHeight - this.chatBody.clientHeight;

    }
    render() {
        const { messageInput } = this.state;
        const { messages } = this.props;

        if (!( messages && messages.channelMessages )) return <div>loading</div>
        return (
          <Grid.Column style={{ width:'calc(100% - 250px)', position:'fixed', right:'0', height:'100vh'}}>
                    <Segment className='chat-header'>
                        #{this.props.channelName}
                    </Segment>
                    <div
                        className='chat-body'
                        ref={(div) => this.chatBody = div}
                    >
                        <Comment.Group size='big'>
                            <Comment>
                                {messages.channelMessages.map( msg =>
                                    <Message message={msg} key={msg.id} />
                                )}
                            </Comment>
                        </Comment.Group>
                    </div>
                    <Input
                        fluid
                        placeholder={'message '+this.props.channelName+'...'}
                        className='input-msg'
                        value={messageInput}
                        icon='arrow circle right'
                        onChange={e => this.setState({ messageInput: e.target.value})}
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
      <span>{message.createdAt}</span>
    </Comment.Metadata>
    <Comment.Text>{message.content}</Comment.Text>
  </Comment.Content>
);

export default Chat;
