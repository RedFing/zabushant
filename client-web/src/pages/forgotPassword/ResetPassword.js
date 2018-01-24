import React from 'react';
import { Container, Form, Image } from 'semantic-ui-react';
import axios from 'axios';
import Loader from '../../components/loader/Loader';
import Success from '../../components/success/Success';
import Error from '../../components/error/Error';
import Header from "../../components/header/Header";
import forgotPass from '../../images/forgotPass.svg';
import './ForgotPassword.css';

export default class ResetPassword extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading: true,
            error: false,
            password: '',
            confirmPassword: '',
            success: null,
            //FIXME: extract to constants
            subjectSuccess: 'You have successfully reset your password.',
            paragrafSuccess: 'You can sign in with new password.',
            linkSuccess: '/login',
            buttonTextSuccess: 'Go to login page!',

            subjectError: 'Something went wrong.',
            paragrafError: 'You have not reset your password.',
            linkError: '/forgot-password',
            buttonTextError: 'Try again!',
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
        const { subjectSuccess,
                paragrafSuccess,
                linkSuccess,
                buttonTextSuccess,
                subjectError,
                paragrafError,
                linkError,
                buttonTextError
            } = this.state;

        if (this.state.error){
            return <Error
                        subject={subjectError}
                        paragraf={paragrafError}
                        link={linkError}
                        buttonText={buttonTextError}
                    />
        }
        if (this.state.loading){
            return <Loader/>
        }

        if (this.state.success){
            return <Success
                        subject={subjectSuccess}
                        paragraf={paragrafSuccess}
                        link={linkSuccess}
                        buttonText={buttonTextSuccess}
                    />
        }
        if (this.state.success===false){
            return <Error
                        subject={subjectError}
                        paragraf={paragrafError}
                        link={linkError}
                        buttonText={buttonTextError}
                    />
        }
        return (
            <div>
            <Header/>
            <Container align='center' className="container-position">
                <Image src={forgotPass} centered size='small' />
                <h1>Reset password</h1>
                <p>We’ll send you an email to confirm
                    your address and find existing workspaces
                    you’ve joined or can join.</p>
                <Form align='center'>
                        <input
                            style={{marginBottom:'20px'}}
                            fluid
                            placeholder="new password..."
                            value={this.state.password}
                            onChange={(e)=> this.setState({ password: e.target.value})}
                            type="password"
                        />
                        <input
                            fluid
                            placeholder="confirm new password..."
                            value={this.state.confirmPassword}
                            onChange={(e)=> this.setState({ confirmPassword: e.target.value})}
                            type="password"
                        />

                        <button
                            fluid
                            onClick={this.handlePasswordRecoverySubmit}
                        >
                            Send
                        </button>
                </Form>
            </Container>
            </div>
        )
    }
}