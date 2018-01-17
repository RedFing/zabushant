import React, { Component } from 'react';
import {  Menu, Grid, Form, Icon, Dropdown } from 'semantic-ui-react';
import './Sidebar.css';
import Channels from './Channels';
import DirectMessages from './DirectMessages';
import { connect } from 'react-redux';
import { getAllMessagesAsync} from "../../actions/MessageActions";

class Sidebar extends Component {
    render() {
        const trigger = <Icon name='list layout'/>;
        // TODO: options never change in render, extract them
        const options = [
            { key: 'user', text: 'Account', icon: 'user' },
            { key: 'reset-password', text: 'Reset password', icon: 'lock',  as: 'a' },
            { key: 'settings', text: 'Settings', icon: 'settings' },
            { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
        ];
        const { channels, user, currentChannel } = this.props;
        const directMessages = channels.channels.filter(c => c.isDirectMessage);
        const groupChannels  = channels.channels.filter(c => !c.isDirectMessage);
        return (
                <Grid.Column style={{width:'250px'}}>
                    <Menu vertical>
                        <Menu.Item>
                            {user.username}
                            <Dropdown trigger={trigger} options={options} pointing='top left' icon={null} />
                        </Menu.Item>
                        {/* TODO: these two components are nearly identical, use one instead but make
                            it render differently based on additional props passed
                        */}
                        <Channels
                          channelName={currentChannel.currentChannel.name}
                          onChannelChange={(channel) =>this.props.getAllMessagesAsync(channel)}
                          channels={groupChannels}
                        />
                        <DirectMessages
                          channelName={currentChannel.currentChannel.name}
                          username={this.props.user.username}
                          onChannelChange={(channel) =>this.props.getAllMessagesAsync(channel)}
                          channels={directMessages}
                        />
                    </Menu>
                </Grid.Column>
        );
    }
}
const mapStateToProps = ({ channels, currentChannel, user}) => {
    return { channels, currentChannel, user}
};


export default connect(mapStateToProps,
    { getAllMessagesAsync })(Sidebar);
