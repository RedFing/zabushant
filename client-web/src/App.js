import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import MainRouter from './router/MainRouter';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <MainRouter/>
        </BrowserRouter>
    );
  }
}

axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')?localStorage.getItem('token'): '';
export default App;
