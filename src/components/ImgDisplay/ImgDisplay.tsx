//import React from 'react';
import './ImgDisplay.css';
import { ImgPropt } from '../../utils/tyBucket';

export default function ImgDisplay({ imgurl, look }: ImgPropt) {
	if (look === 'thumbnail')
		return (
			<img
				src={imgurl}
				style={{ width: '256px', height: '256px', aspectRatio: '3/2' }}
			/>
		);
	if (look === 'heroimage')
		return (
			<img
				src={imgurl}
				style={{ width: '100%', height: '100%', aspectRatio: '3/2' }}
			/>
		);
}
