import React, {Component} from 'react';
import { Container, Form, Image } from 'semantic-ui-react';
import axios from 'axios';
import forgotPass from '../../images/forgotPass.svg';
import './ForgotPassword.css';
import Success from '../../components/success/Success';
import Error from '../../components/error/Error';
import Header from '../../components/header/Header';

export default class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            success: null,
            error: false,

            subjectSuccess: 'Please check your email.',
            paragrafSuccess: 'We have sent you an email.',
            linkSuccess: '',
            buttonTextSuccess: '',

            subjectError: 'Something went wrong.',
            paragrafError: 'We have sent you an email.',
            linkError: '/register',
            buttonTextError: 'Sign up!',
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
        const { subjectSuccess,
                paragrafSuccess,
                linkSuccess,
                buttonTextSuccess,
                subjectError,
                paragrafError,
                linkError,
                buttonTextError
              } = this.state;

        if (this.state.success===false){
            return <Error
                        subject={subjectError}
                        paragraf={paragrafError}
                        link={linkError}
                        buttonText={buttonTextError}
                    />
        }
        if (this.state.success){
            return <Success
                        subject={subjectSuccess}
                        paragraf={paragrafSuccess}
                        link={linkSuccess}
                        buttonText={buttonTextSuccess}
                   />
        }
        return(
            <div>
                <Header/>
            <Container align='center' className="container-position">
                <Image src={forgotPass} centered size='small' />
                <h1>Forgot password</h1>
                <p>We’ll send you an email to confirm your address and find
                    existing profile.
                    Please enter your email address.
                </p>
                <Form>
                        <input
                            placeholder="your email..."
                            value={this.state.email}
                            onChange={(e)=> this.setState({ email: e.target.value})}
                            type="email"
                            fluid
                        />
                        <button
                            fluid
                            onClick={this.handleEmailSubmit}
                        >
                        Send
                        </button>
                </Form>
            </Container>
            </div>
        );
    }
}
