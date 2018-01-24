import React, { Component } from 'react';
import './Header.css';
import Logo from '../../images/logoZabushant.png';

export default class Header extends Component {
    render(){
        return(
            <div className='header-logo'>
                <a href='/'>
                <img src={Logo} alt=''/>
                </a>
            </div>
        );
    }
}