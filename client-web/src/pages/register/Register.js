import React, { Component } from 'react';
import { Grid, Header, Segment, Button, Message, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
        }
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

    render() {
        return (
            <div>
                <Grid>
                    <Grid.Column mobile={16} tablet={8} computer={4}>
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
                                    value={this.state.username}
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
                                    value={this.state.password}
                                    name="confirmPassword"
                                />

                                <Button
                                    color='teal'
                                    fluid size='large'
                                    onClick={this.handleLogin}
                                >
                                    Register</Button>
                            </Segment>
                        </Form>
                        <Message>
                            Already registered? <Link to="/login"> Sign in </Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Register;
