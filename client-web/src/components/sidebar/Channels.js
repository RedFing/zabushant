import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import './Sidebar.css';

class Channels extends Component {
    constructor(props){
        super(props);
    }

    handleItemClick = (e, { name }) => {
        this.props.onChannelChange(name);
    };

    render() {
        return (
                    <Menu.Item>
                        Channels <Icon name='add circle'/>
                        <Menu.Menu>
                            {this.props.channels.map(channel =>
                         <Menu.Item name={channel.ChannelId} onClick={this.handleItemClick}>
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
