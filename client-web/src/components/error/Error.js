import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
import ErrorImg from '../../images/error.png';
import Header from '../header/Header';

export default class Error extends Component {
    render(){
        return (
            <div>
                <Header/>
            <Container align='center' className="container-position">
                <Image src={ErrorImg} centered size='small' />
                <h1>{this.props.subject}</h1>
                <p> {this.props.paragraf} </p>
                <a href={this.props.link}> {this.props.buttonText} </a>
            </Container>
            </div>
        );
    }
}