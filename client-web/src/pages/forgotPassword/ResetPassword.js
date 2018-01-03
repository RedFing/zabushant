import React from 'react';
import { Container, Form} from 'semantic-ui-react';
import axios from 'axios';


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
        axios.post(`/checkresetpassword/`, { token })
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
        axios.post('/reset-password', { password, confirmPassword, token })
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
            return <div>Loading</div>
        }

        if (this.state.success){
            return <div>Success!</div>
        }
        if (this.state.success===false){
            return <div>Error!</div>
        };
        return (
            <Container>
                <h1>Reset password</h1>
                <Form>
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