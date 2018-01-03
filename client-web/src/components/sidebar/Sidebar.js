import React, { Component } from 'react';
import {  Menu, Grid } from 'semantic-ui-react';
import './Sidebar.css';
import Channels from './Channels';
import DirectMessages from './DirectMessages';
import Chat from '../chat/Chat';

class Sidebar extends Component {
    render() {
        return (
                <Grid.Column style={{width:'250px'}}>
                    <Menu vertical>
                        <Channels/>
                        <DirectMessages/>
                    </Menu>
                </Grid.Column>
        );
    }
}

export default Sidebar;
