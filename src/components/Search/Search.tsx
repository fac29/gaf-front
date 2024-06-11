import React from 'react';
import './Search.css';
import { sanitizeInput } from '../../utils/utils';

export default function Search() {
	const [uinput, setUinput] = React.useState('');

    const handleChange = (e) => {
        setUinput(sanitizeInput(e.target.value));

	;
	return <div>Search</div>;
}
