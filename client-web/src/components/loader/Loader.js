import React, {Component} from 'react';
import LoaderImg from '../../images/loader.png';
import '../../components/loader/Loader.css';

export default class Loader extends Component {
    render(){
        return(
            <div>
                <img className='loadingLogo' src={LoaderImg} />
            </div>
        )
    }
}