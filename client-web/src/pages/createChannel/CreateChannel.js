import React from 'react';
import { Container, Form} from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/loader/Loader';
import './CreateChannel.css';

export default class CreateChannel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedUsers : [],
            users: [],
            channelName: '',
            loading: true,
            success: null,
            error: false,

        };
        this.handleUsersSelected = this.handleUsersSelected.bind(this);
        this.submitNewChannel = this.submitNewChannel.bind(this);
    }
    handleUsersSelected(event, {value}){
        this.setState({ selectedUsers: value});
    }
    submitNewChannel(){
        axios.post('/create-channel', { users: this.state.selectedUsers, channelName: this.state.channelName})
            .then(res => {
                this.setState({ success: true});
            }).catch(err => {
                this.setState({ success: false});
        });
    }
    componentDidMount(){
        axios.get('/get-all-users')
            .then(res => {
                const users = res.data.map(el => {return {...el, key: el.id, value: el.id, text:el.username}});
                this.setState({ loading: false, users});
            })
    }

    render(){
        if(this.state.loading) return <Loader/>;
        if (this.state.success) return <Redirect to="/" />;

        return(
            <Container style={{paddingTop: '50px', width:'60%'}} >
                <p style={{width:'100px', float:'right'}}><Link to='/'>Go back!</Link></p>
                <h2>Create channel!</h2>
                <Form>
                    <Form.Input
                        label="Channel name:"
                        fluid placeholder="enter your channel name..."
                        value={this.state.channelName}
                        onChange={(e) => this.setState({ channelName: e.target.value })}/>
                    <Form.Dropdown
                        label='Users:'
                        value={this.state.selectedUsers}
                        name='selectedUsers'
                        placeholder='add users...'
                        onChange={this.handleUsersSelected}
                        fluid selection
                        options={this.state.users}
                        search multiple
                    />
                    <Form.Button
                        color='teal'
                        onClick={this.submitNewChannel}
                    >Create channel</Form.Button>
                </Form>
            </Container>
        );
    }
}