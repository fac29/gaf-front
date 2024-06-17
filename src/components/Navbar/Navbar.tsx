//import React from 'react';
import './Navbar.css';
import Search from '../Search/Search';

export default function Navbar() {
	return (
		<div className="container">
			<ul>
				<li>
					<a href={`/contacts/1`}>Home</a>
				</li>
				<li>
					<Search />
				</li>
				<li className="right">
					<a href={`/contacts/1`}>Cart</a>
				</li>
			</ul>
		</div>
	);
}
