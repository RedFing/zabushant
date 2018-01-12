import React, { Component } from 'react';
import {Grid, Form, Header, Image, Button, Message, Segment, Container} from 'semantic-ui-react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Cover from '../cover/Cover';
import Logo from '../../images/logoZabushant.png';
import './Login.css';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            success: null,
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
                this.setState({ success: true });
                localStorage.setItem('token', res.data.token);
               console.log(res.data.token);
            });
    }

    render() {
        if ( this.state.success) {
            return <Redirect to='/' />;
            }
        return (
            <div className='background'>
                <Container>
                    <Grid centered>
                        <Grid.Column mobile={16} tablet={8} computer={6}>
                            <Image className='logo' src={Logo} size='big' centered/>
                            <Header as='h4' textAlign='center'>
                                Log-in to your account
                            </Header>
                            <Form className='input-custom'>
                                <Form.Input
                                        fluid
                                        iconPosition='left'
                                        placeholder='Username'
                                        onChange={this.handleInputChange}
                                        value={this.state.username}
                                        name="username"
                                    />
                                    <Form.Input
                                        fluid
                                        iconPosition='left'
                                        placeholder='Password'
                                        type='password'
                                        onChange={this.handleInputChange}
                                        value={this.state.password}
                                        name="password"
                                    />
                                    <Button
                                        color='white'
                                        fluid size='large'
                                        onClick={this.handleLogin}
                                    >Login</Button>

                            </Form>
                            <Message>
                                <h3>Not registered?</h3> <Link to="/register"> Sign up </Link>
                                <div style={{clear: 'both'}}>
                                    <h3>Forgot password?</h3> <Link to="/forgot-password"> Forgot password </Link>
                                </div>
                            </Message>
                        </Grid.Column>

                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Login;
