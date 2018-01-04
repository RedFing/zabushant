import React, {Component} from 'react';
import { Container, Form, Image } from 'semantic-ui-react';
import axios from 'axios';
import forgotPass from '../../images/forgotPass.svg';

export default class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            success: null,
            error: false,
        };
        this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    }

    handleEmailSubmit() {
        const {email} = this.state;
        axios.post('/forgot-password', {email})
            .then(res => {
                this.setState({success: true});
            }).catch(err => {
            this.setState({success: false});
        });
    }

    render(){
        if (this.state.success===false){
            return <ErrorMessage />
        }
        if (this.state.success){
            return <SuccessMessage />
        }
        return(
            <Container align='center' style={{width:'400px', display:'block', margin:'auto', marginTop:'80px'}}>
                <Image src={forgotPass} centered size='small' />
                <h1>Forgot password</h1>
                <p>We’ll send you an email to confirm your address and find
                    existing profile.
                    Please enter your email address.
                </p>
                <Form>
                    <Form.Group>
                        <Form.Input style={{width:'300px'}}
                            placeholder="your email..."
                            value={this.state.email}
                            onChange={(e)=> this.setState({ email: e.target.value})}
                            type="email"
                        />
                        <Form.Button style={{width:'100px'}}
                            onClick={this.handleEmailSubmit}
                        >
                        Send
                        </Form.Button>
                    </Form.Group>
                </Form>
            </Container>
        );
    }
}


const SuccessMessage = (props) => (
    <div>Check your email!</div>
);

const ErrorMessage = (props) => (
    <div>There was an error.</div>
);