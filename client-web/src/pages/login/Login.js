import React, { Component } from 'react';
import {Grid, Form, Header, Image, Button, Message, Segment} from 'semantic-ui-react';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        }
        this.handleLogin = this.handleLogin.bind(this);
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
                <Grid centered columns={4}>
                    <Grid.Column>
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
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                />

                                <Button
                                    color='teal'
                                    fluid size='large'
                                    onClick={this.handleLogin}
                                >Login</Button>
                            </Segment>
                        </Form>
                        <Message>

                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Login;
