import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import './Sidebar.css';
class DirectMessages extends Component {
    constructor(props){
        super(props);

    }

    handleItemClick = (e, { name }) => {
        this.props.onChannelChange(name);
    };
    render() {
        return (
                <Menu.Item>
                    Direct messages <Icon name='add circle'/>
                    <Menu.Menu>
                {this.props.channels.map(directMsg =>
                    <Menu.Item name={directMsg.ChannelId}  onClick={this.handleItemClick}>
                        <Icon name='circle'  />
                        {directMsg.name}
                    </Menu.Item>
                )}
                    </Menu.Menu>
                </Menu.Item>
        );
    }
}

export default DirectMessages;
