import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import coverImage from '../../images/cover.png';

const Cover = () => (
    <Image src={coverImage} fluid style={{width:'80%', display:'block', margin:'auto', paddingTop:'30px'}} />
)

export default Cover;