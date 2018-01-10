import React, {Component} from 'react';
import LoaderImg from '../../images/logoloader.svg';
import '../../components/loader/Loader.css';

export default class Loader extends Component {
    render(){
        return(
            <div>
                <div style={{height:'50px'}}>
                <img className='loadingLogo' src={LoaderImg} />
                    <h2 align="center">LOADING...</h2>
                </div>
            </div>
        )
    }
}