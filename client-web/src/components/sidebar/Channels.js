import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import './Sidebar.css';

class Channels extends Component {

    handleItemClick = (id) => {
        this.props.onChannelChange(id);
    };

    render() {
        return (
                    <Menu.Item>
                        Channels <Link to='/create-channel'><Icon name='add circle'/></Link>
                        <Menu.Menu>
                            <div className='channels-content'>
                                    {this.props.channels.map((channel) =>
                                 <Menu.Item active={this.props.channelName === channel.name} onClick={(e) => this.handleItemClick(channel)} key={channel.name}>
                                    <Icon name='hashtag'  />
                                    {channel.name}
                                 </Menu.Item>
                                  )}
                            </div>
                        </Menu.Menu>
                    </Menu.Item>
        );
    }
}

export default Channels;
