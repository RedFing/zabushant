import React, { Component } from 'react';
import {Grid, Form, Header, Image, Button, Message, Segment, Container} from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cover from '../cover/Cover';
import Logo from '../../images/logo.png';
import './Login.css';

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
                <Container>
                    <Grid centered>
                        <Grid.Column mobile={16} tablet={8} computer={6}>
                            <Image className='logo' src={Logo} size='medium'/>
                            <Header as='h2' color='teal' textAlign='center'>
                                Log-in to your account
                            </Header>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc scelerisque at nulla eu porttitor. Fusce rutrum volutpat magna, sit amet volutpat odio. Morbi venenatis dolor sem, et pulvinar nulla sagittis quis. Pellentesque et condimentum diam, in fringilla ex. Praesent quis vestibulum urna. Duis eleifend orci at erat tristique, ut laoreet nulla imperdiet. Integer quis libero ac nunc lobortis ultrices in eu quam. </p>
                            <Form size='large'>
                                <Segment raised>
                                    <Form.Input
                                        fluid
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='Username'
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
                        <Grid.Column mobile={16} tablet={8} computer={10}>
                            <Cover/>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Login;
