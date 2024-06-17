//import React from 'react';
import './ImgDisplay.css';
import { ImgPropt } from '../../utils/tyBucket';

export default function ImgDisplay({ imgurl, look }: ImgPropt) {
	return <img src={imgurl} alt={look} />;
}
