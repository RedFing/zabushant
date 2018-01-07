import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import './Chat.css';

class Chat extends Component {
    constructor(props){
        super(props);
        this.state={
            messageInput:''
        };
    }
    onSendMessage = () => {
        const {messageInput} = this.state;
        this.props.sendMessage(messageInput);
        this.setState({ messageInput: ''})
    };

    render() {
        const { messageInput } = this.state;
        return (
                <Grid.Column style={{background:'#f2f2f2', width:'calc(100% - 250px)', position:'fixed', right:'0', height:'100%'}}>
                    <Segment stacked>
                        {this.props.channelName}
                    </Segment>
                    <pre>{JSON.stringify(this.props.messages,null,2)}</pre>
                    <input type='text'
                           value={messageInput}
                           placeholder="unesite poruku"
                           onChange={e => this.setState({ messageInput: e.target.value})}
                    />
                    <button onClick={this.onSendMessage} >Send</button>
                </Grid.Column>
        );
    }
}

export default Chat;
