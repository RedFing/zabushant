import React, { Component } from 'react';
import {  Menu, Grid, Form, Icon, Dropdown } from 'semantic-ui-react';
import './Sidebar.css';
import Channels from './Channels';
import DirectMessages from './DirectMessages';


class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state={
            activeChannel: null,
            channelSearch: ''
        };
    }
    render() {
        const trigger = <Icon name='list layout'/>;
        // TODO: options never change in render, extract them
        const options = [
            { key: 'user', text: 'Account', icon: 'user' },
            { key: 'reset-password', text: 'Reset password', icon: 'lock',  as: 'a' },
            { key: 'settings', text: 'Settings', icon: 'settings' },
            { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
        ];
        const { channels, username, channelName } = this.props;
        const { channelSearch } = this.state;
        const directMessages = channels.filter(c => c.isDirectMessage).filter(c => c.name.includes(channelSearch));
        const groupChannels  = channels.filter(c => !c.isDirectMessage).filter(c => c.name.includes(channelSearch));
        return (
                <Grid.Column style={{width:'250px'}}>
                    <Menu vertical>
                        <Menu.Item>
                            {username}
                            <Dropdown trigger={trigger} options={options} pointing='top left' icon={null} />
                        </Menu.Item>
                        <Menu.Item className='search-custom'>
                            <Form.Input
                                icon='search'
                                placeholder="search channels...."
                                fluid
                                size="mini"
                                value={channelSearch}
                                onChange={(e) => this.setState({ channelSearch: e.target.value })}
                            />
                        </Menu.Item>
                        {/* TODO: these two components are nearly identical, use one instead but make
                            it render differently based on additional props passed
                        */}
                        <Channels
                          channelName={channelName}
                          onChannelChange={this.props.onChannelChange}
                          channels={groupChannels}
                        />
                        <DirectMessages
                          channelName={channelName}
                          username={this.props.username}
                          onChannelChange={this.props.onChannelChange}
                          channels={directMessages}
                        />
                    </Menu>
                </Grid.Column>
        );
    }
}

export default Sidebar;
