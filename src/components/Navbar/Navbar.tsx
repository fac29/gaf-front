import React from 'react';
import './Navbar.css';
import Search from '../Search/Search';

export default function Navbar() {
	return (
		<div className="navstyle">
			<a href="">Home</a>
			<div>
				<Search />

				<a href="">Cart</a>
			</div>
		</div>
	);
}
