import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';

class MainRouter extends Component {
    render() {
        return (
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
    );
    }
}

export default MainRouter;
