import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Sidebar.css';


class DirectMessages extends Component {
    constructor(props){
        super(props);
        this.getDMName = this.getDMName.bind(this);
    }

    handleItemClick = (id) => {
        this.props.onChannelChange(id);
    };
    getDMName = (name) => {
        // 'mux - haris'
        const userArr = name.split(' - ');
        if (userArr && userArr[0]===userArr[1]) return 'me';
        if (userArr && userArr[0]) return userArr[0]===this.props.username?userArr[1]:userArr[0];
        return name;
    }
    render() {
        return (
                <Menu.Item>
                    Direct messages <Link to='/create-channel-dm'><Icon name='add circle'/></Link>
                    <Menu.Menu>
                    <div className='channels-content'>
                        {this.props.channels.map(directMsg =>
                            <Menu.Item active={this.props.channelName === directMsg.name} onClick={(e) => this.handleItemClick(directMsg)} key={directMsg.name}>
                                <Icon name='circle'  />
                                {this.getDMName(directMsg.name)}
                            </Menu.Item>
                        )}
                    </div>
                    </Menu.Menu>
                </Menu.Item>
        );
    }
}

export default DirectMessages;
