import React from 'react';
import { Container, Form} from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { connect} from 'react-redux';

import Loader from '../../components/loader/Loader';
import './CreateChannel.css';

class CreateChannel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedUsers : this.props.isDM ? '' : [],
            users: [],
            channelName: '',
            loading: true,
            success: null,
            error: false,
            errorMessage: ''

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
                console.log(err.response.data.err);
                let errorMessage='';
                if (err.response.data.err) errorMessage=err.response.data.err;
                this.setState({ success: false, errorMessage});
        });
    }
    componentDidMount(){
        axios.get('/get-all-users')
            .then(res => {
                const users = res.data.map(el => {return {...el, key: el.id, value: el.id, text:el.username}});
                const { user } = this.props;
                const users2 = users.filter(el => el.id != user.id);
                this.setState({ loading: false, users: users2});
            })
    }

    render(){
        if(this.state.loading) return <Loader/>;
        if (this.state.success) return <Redirect to="/" />;

        return(
            <Container style={{paddingTop: '50px', width:'60%'}} >
                <p style={{width:'100px', float:'right'}}><Link to='/'>Go back!</Link></p>
                <h2>{this.props.isDM ?'Create direct message' :'Create channel!'}</h2>
                <Form>
                    {!this.props.isDM && <Form.Input
                        label="Channel name:"
                        fluid placeholder="enter your channel name..."
                        value={this.state.channelName}
                        onChange={(e) => this.setState({channelName: e.target.value})}/>
                    }
                    <Form.Dropdown
                        label={this.props.isDM ? 'User:' : 'Users:'}
                        value={this.state.selectedUsers}
                        name='selectedUsers'
                        placeholder='add users...'
                        onChange={this.handleUsersSelected}
                        fluid selection
                        options={this.state.users}
                        search
                        multiple={!this.props.isDM}
                    />
                    <Form.Button
                        color='teal'
                        onClick={this.submitNewChannel}
                    >Create channel</Form.Button>
                </Form>
                { this.state.errorMessage!=='' &&  <div>{this.state.errorMessage}</div>}
            </Container>
        );
    }
}
const mapStateToProps = ({ user}) => ({user});
CreateChannel = connect(mapStateToProps, () => {})(CreateChannel);
export default CreateChannel;
export const CreateChannelDM = (props) => <CreateChannel isDM={true}/>