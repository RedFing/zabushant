import React, { Component } from 'react';
import {  Menu, Grid } from 'semantic-ui-react';
import './Sidebar.css';
import Channels from './Channels';
import DirectMessages from './DirectMessages';

class Sidebar extends Component {
    render() {
        return (
            <Grid>
                <Grid.Column style={{width:'250px'}}>
                    <Menu vertical>
                        <Channels/>
                        <DirectMessages/>
                    </Menu>
                </Grid.Column>
                <Grid.Column style={{background:'red', width:'calc(100% - 250px)'}}>
                    aaa
                </Grid.Column>
            </Grid>
        );
    }
}

export default Sidebar;
