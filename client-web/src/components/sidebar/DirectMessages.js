import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import './Sidebar.css';

class DirectMessages extends Component {
    constructor(props){
        super(props);
        this.state = {
            directMsg: ['Haris', 'Muks'],
        }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem, directMsg } = this.state;
        return (
            <div>
                {directMsg.map(directMsg =>
                    <Menu.Item name='{directMsg}' active={activeItem === {directMsg}} onClick={this.handleItemClick}>
                        <Icon name='circle'  />
                        {directMsg}
                    </Menu.Item>
                )}
            </div>
        );
    }
}

export default DirectMessages;
