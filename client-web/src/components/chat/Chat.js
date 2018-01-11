import React, { Component } from 'react';
import { Grid, Segment, Item, Input, Comment, List, Image, Icon } from 'semantic-ui-react';
import StayScrolled from 'react-stay-scrolled';
import './Chat.css';
import moment from 'moment';
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
        console.log(this.chatBody);
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
                                <Comment.Content>
                                    <Comment.Avatar as='a' src={user} />
                                    <Comment.Author as='a'>{msg.username}</Comment.Author>
                                    <Comment.Metadata>
                                        <span>{msg.createdAt}</span>
                                    </Comment.Metadata>
                                    <Comment.Text>{msg.content}</Comment.Text>
                                </Comment.Content>
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

export default Chat;
