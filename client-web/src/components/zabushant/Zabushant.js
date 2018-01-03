import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Sidebar from '../sidebar/Sidebar';
import Chat from '../chat/Chat';

class Zabushant extends Component {
    render() {
        return (
            <Grid>
                <Sidebar/>
                <Chat/>
            </Grid>
        );
    }
}

export default Zabushant;
