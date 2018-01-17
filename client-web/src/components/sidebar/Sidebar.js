import React, { Component } from 'react';
import {  Menu, Grid, Form, Icon, Dropdown } from 'semantic-ui-react';
import './Sidebar.css';
import Channels from './Channels';
import DirectMessages from './DirectMessages';
import { setCurrentChannel} from '../../actions/CurrentChannelActions';

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
        const { channels, user, currrentChannel } = this.props;
        const directMessages = channels.filter(c => c.isDirectMessage);
        const groupChannels  = channels.filter(c => !c.isDirectMessage);
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
                          channelName={currrentChannel.name}
                          onChannelChange={(id) =>this.props.setCurrentChannel(id)}
                          channels={groupChannels}
                        />
                        <DirectMessages
                          channelName={currrentChannel.name}
                          username={this.props.user.username}
                          onChannelChange={(id) =>this.props.setCurrentChannel(id)}
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
    { setCurrentChannel})(Sidebar);
