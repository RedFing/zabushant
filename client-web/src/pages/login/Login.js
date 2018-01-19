import React, { Component } from 'react';
import {Grid, Form, Header, Image, Button, Message, Segment, Container} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import Cover from '../cover/Cover';
import Logo from '../../images/logoZabushant.png';
import './Login.css';
import { connect } from 'react-redux';
import { usernameChanged, passwordChanged, loginUser } from '../../actions/LoginActions';

class Login extends Component {

    handleUsernameChanged = e => {
       this.props.usernameChanged(e.target.value);
    };
    handlePasswordChanged = e => {
        this.props.passwordChanged(e.target.value);
    };
    handleLogin = () => {
        const { username, password } = this.props;
        this.props.loginUser({ username, password });
    };

    render() {
        if ( this.props.successLogin) {
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
                                        onChange={this.handleUsernameChanged}
                                        value={this.props.username}
                                        name="username"
                                    />
                                    <Form.Input
                                        fluid
                                        iconPosition='left'
                                        placeholder='Password'
                                        type='password'
                                        onChange={this.handlePasswordChanged}
                                        value={this.props.password}
                                        name="password"
                                    />
                                    <Button
                                        color='white'
                                        fluid size='large'
                                        onClick={this.handleLogin}
                                        loading={this.props.loading}
                                    >Login</Button>
                                    {this.props.error && <div>{this.props.error}</div>}
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

const mapStateToProps = ({ login }) => {
    const { username, password, error, successLogin, loading} = login;
    return { username, password, error, successLogin, loading};
};

export default connect(mapStateToProps, {
    usernameChanged, passwordChanged, loginUser
})(Login);
