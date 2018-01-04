import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import './Sidebar.css';

class Channels extends Component {
    constructor(props){
        super(props);
        this.state = {
            channels: ['kanal1', 'kanal2'],
        }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem, channels } = this.state;
        return (
                    <Menu.Item>
                        Channels <Icon name='add circle'/>
                        <Menu.Menu>
                            {channels.map(channel =>
                         <Menu.Item name={channel} active={activeItem === {channel}} onClick={this.handleItemClick}>
                            <Icon name='hashtag'  />
                            {channel}
                         </Menu.Item>
                )}
                        </Menu.Menu>
                    </Menu.Item>
        );
    }
}

export default Channels;