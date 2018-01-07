import React, { Component } from 'react';
import {  Menu, Grid } from 'semantic-ui-react';
import './Sidebar.css';
import Channels from './Channels';
import DirectMessages from './DirectMessages';
import Chat from '../chat/Chat';

class Sidebar extends Component {
    render() {
        const { channels } = this.props;
        const directMessages = channels.filter(c => c.isDirectMessage);
        const groupChannels = channels.filter(c => !c.isDirectMessage);
        return (
                <Grid.Column style={{width:'250px'}}>
                    <Menu vertical>
                        <Channels onChannelChange={this.props.onChannelChange} channels={groupChannels}/>
                        <DirectMessages onChannelChange={this.props.onChannelChange} channels={directMessages}/>
                    </Menu>
                </Grid.Column>
        );
    }
}

export default Sidebar;
