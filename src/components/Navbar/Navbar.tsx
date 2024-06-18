//import React from 'react';
import './Navbar.css';
import Search from '../Search/Search';

type props = {
	hasSearch?: boolean;
};

export default function Navbar({ hasSearch = true}: props) {
	return (
		<div className="navstyle">
			<a href="">Home</a>
			<div className="rightnav">
				{hasSearch && <Search />}
				<a href="">Cart</a>
			</div>
		</div>
	);
}
