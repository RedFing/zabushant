import React from 'react';
import { Container, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';
import Loader from '../../components/loader/Loader';


export default class ResetPassword extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading: true,
            error: false,
            password: '',
            confirmPassword: '',
            success: null,
        };
        this.handlePasswordRecoverySubmit = this.handlePasswordRecoverySubmit.bind(this);
    }
    componentDidMount(){
        const { token } = this.props.match.params;
        axios.get(`/forgot-password/reset-password/${token}`)
            .then(res => {
                this.setState({
                    loading: false
                })
            }).catch(err => {
                this.setState({ error: true})
        })
    }
    handlePasswordRecoverySubmit(){
        const { token } = this.props.match.params;
        const { password, confirmPassword} = this.state;
        // TODO add error if pass's dont match & validation
        if (password !== confirmPassword) return;
        axios.post('/forgot-password/reset-password', { password, confirmPassword, token })
            .then(res => {
                this.setState({ success: true});
            }).catch(err => {
                this.setState({ success: false});
        });

    }
    render(){
        if (this.state.error){
            return <div>Error!</div>
        };
        if (this.state.loading){
            return <Loader/>
        }

        if (this.state.success){
            return <div>Success!</div>
        }
        if (this.state.success===false){
            return <div>Error!</div>
        };
        return (
            <Container align='center'>
                <h1>Reset password</h1>
                <p>We’ll send you an email to confirm
                    your address and find existing workspaces
                    you’ve joined or can join.</p>
                <Form align='center'>
                    <Form.Group>
                        <Form.Input
                            placeholder="your password..."
                            value={this.state.password}
                            onChange={(e)=> this.setState({ password: e.target.value})}
                            type="password"
                        />
                        <Form.Input
                            placeholder="confirm password..."
                            value={this.state.confirmPassword}
                            onChange={(e)=> this.setState({ confirmPassword: e.target.value})}
                            type="password"
                        />

                        <Form.Button
                            onClick={this.handlePasswordRecoverySubmit}
                        >
                            Send
                        </Form.Button>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}