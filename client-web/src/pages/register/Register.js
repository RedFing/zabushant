import React, { Component } from 'react';
import { Grid, Header, Segment, Button, Message, Form, Container, Image } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../images/logo.png';
import Cover from '../../pages/cover/Cover';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            success: null,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleRegister(){
        const { username, password, confirmPassword, email } = this.state;
        //TODO add validation
        if (password !== confirmPassword) return;
        if (!username || !password || !confirmPassword || !email) return;
        axios.post('/users', { username, password, email })
            .then(res => {
                this.setState({ success: true });
            })
            .catch( err => this.setState({ success: false }));
    }

    render() {
        if (this.state.success){
            return <Redirect to='/login' />
        }
        if (this.state.success === false ) {
            return <div>Error</div>
        }
        return (
            <div>
                <Container>
                    <Grid centered>
                        <Grid.Column mobile={16} tablet={8} computer={6}>
                            <Image className='logo' src={Logo} size='medium'/>
                            <Header as='h2' color='teal' textAlign='center'>
                                Please complete your registration by filling the form
                            </Header>
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
                                        icon='mail'
                                        iconPosition='left'
                                        placeholder='E-mail address'
                                        onChange={this.handleInputChange}
                                        value={this.state.email}
                                        name="email"
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
                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Confirm password'
                                        type='password'
                                        onChange={this.handleInputChange}
                                        value={this.state.confirmPassword}
                                        name="confirmPassword"
                                    />

                                    <Button
                                        color='teal'
                                        fluid size='large'
                                        onClick={this.handleRegister}
                                    >
                                        Register</Button>
                                </Segment>
                            </Form>
                            <Message>
                                Already registered? <Link to="/login"> Sign in </Link>
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

export default Register;
