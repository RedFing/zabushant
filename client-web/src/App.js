import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import MainRouter from './router/MainRouter';

class App extends Component {
  render() {
    return (
        <Container>
            <BrowserRouter>
                <MainRouter/>
            </BrowserRouter>
        </Container>
    );
  }
}

axios.defaults.baseURL = 'http://localhost:5000/';
export default App;
