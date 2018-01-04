import React, { Component } from 'react';
import './Header.css';
import Logo from '../../images/logo.png';

export default class Header extends Component {
    render(){
        return(
            <div className='header'>
                <a href='/'>
                <img src={Logo} />
                </a>
            </div>
        );
    }
}