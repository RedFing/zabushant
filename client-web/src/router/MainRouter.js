import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Zabushant from '../components/zabushant/Zabushant';
import ForgotPassword from '../pages/forgotPassword/ForgotPassword';
import ResetPassword from '../pages/forgotPassword/ResetPassword';
import CreateChannel from "../pages/createChannel/CreateChannel";
class MainRouter extends Component {
    render() {
        return (
                <Switch>
                    <Route exact path="/" component={Zabushant} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/create-channel" component={CreateChannel} />
                    <Route exact path="/forgot-password" component={ForgotPassword} />
                    <Route path="/forgot-password/:token" component={ResetPassword} />
                </Switch>
    );
    }
}

export default MainRouter;
