import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import './Chat.css';

class Chat extends Component {
    render() {
        return (
                <Grid.Column style={{background:'#f2f2f2', width:'calc(100% - 250px)', position:'fixed', right:'0', height:'100%'}}>
                    <Segment stacked>
                        Naziv kanala
                    </Segment>
                </Grid.Column>
        );
    }
}

export default Chat;
