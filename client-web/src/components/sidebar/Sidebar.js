import React, { Component } from 'react';
import {  Menu, Grid } from 'semantic-ui-react';
import './Sidebar.css';
import Channels from './Channels';
import DirectMessages from './DirectMessages';

class Sidebar extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });
    render() {
        const { activeItem } = this.state;
        return (
            <Grid columns={3} stretched>
                <Grid.Column>
                    <Menu vertical>
                        <Menu.Item>
                            Channels
                            <Menu.Menu>
                                <Channels/>
                            </Menu.Menu>
                        </Menu.Item>
                        <Menu.Item>
                            Direct messages
                            <Menu.Menu>
                                <DirectMessages/>
                            </Menu.Menu>
                        </Menu.Item>
                    </Menu>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Sidebar;
