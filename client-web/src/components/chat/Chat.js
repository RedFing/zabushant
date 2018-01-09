import React, { Component } from 'react';
import { Grid, Segment, Item, Input } from 'semantic-ui-react';
import './Chat.css';

class Chat extends Component {
    constructor(props){
        super(props);
        this.state={
            messageInput:''
        };
    }
    onSendMessage = (event) => {
        if(event.key === 'Enter') {
            const {messageInput} = this.state;
            this.props.sendMessage(messageInput);
            this.setState({messageInput: ''});
        }
    };

    scrollToBottom = () => {
        this.el.scrollIntoView({ behavior: 'smooth' });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        const { messageInput } = this.state;
        const { messages } = this.props;

        if (!( messages && messages.channelMessages )) return <div>loading</div>
        return (
                <Grid.Column style={{background:'#f2f2f2', width:'calc(100% - 250px)', position:'fixed', right:'0', height:'100%'}}>
                    <Segment>
                        #{this.props.channelName}
                    </Segment>
                    <div className='chat-body' ref={(el) => { this.el = el; }}>
                        <Item.Group>
                            {messages.channelMessages.map( msg =>
                            <Item>
                                <Item.Content>
                                    <Item.Header>{msg.username}</Item.Header>
                                    <Item.Description>{msg.content}</Item.Description>
                                </Item.Content>
                            </Item>
                            )}
                        </Item.Group>
                    </div>

                    <Input
                        fluid
                        placeholder={'message '+this.props.channelName+'...'}
                        className='input-msg'
                        value={messageInput}

                        onChange={e => this.setState({ messageInput: e.target.value})}
                        onKeyPress={this.onSendMessage}
                    />

                </Grid.Column>
        );
    }
}

export default Chat;
