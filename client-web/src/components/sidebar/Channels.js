import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import './Sidebar.css';

class Channels extends Component {

    handleItemClick = (e, { name }) => {
        this.props.onChannelChange(name);
    };

    render() {
        return (
                    <Menu.Item>
                        Channels <Link to='/create-channel'><Icon name='add circle'/></Link>
                        <Menu.Menu>
                            {this.props.channels.map((channel) =>
                         <Menu.Item active={this.props.channelName === channel.name} onClick={this.handleItemClick} key={channel.name}>
                            <Icon name='hashtag'  />
                            {channel.name}
                         </Menu.Item>
                )}
                        </Menu.Menu>
                    </Menu.Item>
        );
    }
}

export default Channels;
