//import React from 'react';
import './ImgDisplay.css';

type ImgDisplayProps = {
	image: string;
	size?: number | 'small' | 'medium' | 'big';
};

const sizeMap = {
	small: 60, //Used for the shopping cart
	medium: 300, //For gallery
	big: 600, //For product card
};

/**
 * ImgDisplay Component
 *
 * @param {string} image - The URL or path of the image to display.
 * @param {number | 'small' | 'medium' | 'big'} [size='medium'] - Optional. The size of the image.
 * @returns The ImgDisplay component
 */

export default function ImgDisplay({
	image,
	size = 'medium',
}: ImgDisplayProps) {
	const getSize = (size: number | 'small' | 'medium' | 'big') => {
		if (typeof size === 'number') {
			return size;
		}
		return sizeMap[size];
	};

	const displaySize = getSize(size);

	return (
		<div
			className="img-display"
			style={{ width: displaySize, height: displaySize }}
		>
			{image ? (
				<img
					src={image}
					alt="Display"
					style={{ width: '100%', height: '100%' }}
				/>
			) : (
				<p>No image provided</p>
			)}
		</div>
	);
}
