import React, { Component } from 'react';
import {Grid, Form, Header, Image, Button, Message, Segment} from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleLogin() {
        const { username, password } = this.state;
        axios.post('/login', { username, password })
            .then(res => {
               console.log(res.data.token);
            });
    }

    render() {
        return (
            <div>
                <Grid centered>
                    <Grid.Column mobile={16} tablet={8} computer={4}>
                        <Header as='h2' color='teal' textAlign='center'>
                            {' '}Log-in to your account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    onChange={this.handleInputChange}
                                    value={this.state.username}
                                    name="username"
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange={this.handleInputChange}
                                    value={this.state.password}
                                    name="password"
                                />

                                <Button
                                    color='teal'
                                    fluid size='large'
                                    onClick={this.handleLogin}
                                >Login</Button>
                            </Segment>
                        </Form>
                        <Message>
                            Not registered? <Link to="/register"> Sign up </Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Login;
