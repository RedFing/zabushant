import React, { Component } from 'react';
import {  Menu, Grid, Form, Icon, Dropdown } from 'semantic-ui-react';
import './Sidebar.css';
import Channels from './Channels';
import DirectMessages from './DirectMessages';
import Chat from '../chat/Chat';

class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state={
            activeChannel: null,
            channelSearch: ''
        }
    }
    render() {
        const trigger = <Icon name='list layout'/>;
        const options = [
            { key: 'user', text: 'Account', icon: 'user' },
            { key: 'reset-password', text: 'Reset password', icon: 'lock',  as: 'a' },
            { key: 'settings', text: 'Settings', icon: 'settings' },
            { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
        ];
        const { channels, username } = this.props;
        const directMessages = channels.filter(c => c.isDirectMessage).filter(c => c.name.includes(this.state.channelSearch));
        const groupChannels = channels.filter(c => !c.isDirectMessage).filter(c => c.name.includes(this.state.channelSearch));
        return (
                <Grid.Column style={{width:'250px'}}>
                    <Menu vertical>
                        <Menu.Item>
                            {this.props.username}
                            <Dropdown trigger={trigger} options={options} pointing='top left' icon={null} />
                        </Menu.Item>
                        <Menu.Item className='search-custom'>
                            <Form.Input
                                icon='search'
                                placeholder="search channels...."
                                fluid
                                size="mini"
                                value={this.state.channelSearch}
                                onChange={(e) => this.setState({ channelSearch: e.target.value })}
                            />
                        </Menu.Item>
                        <Channels channelName={this.props.channelName} onChannelChange={this.props.onChannelChange} channels={groupChannels}/>
                        <DirectMessages channelName={this.props.channelName} username={this.props.username} onChannelChange={this.props.onChannelChange} channels={directMessages}/>
                    </Menu>
                </Grid.Column>
        );
    }
}

export default Sidebar;
