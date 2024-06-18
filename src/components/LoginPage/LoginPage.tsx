import './LoginPage.css';
import { useState } from 'react';
import Button from '../Button/Button';

export default function LoginPage() {
	const [userName, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(`Username: ${userName}`);
		console.log(`Password: ${password}`);
	};

	return (
		<div>
			<h1>Login page</h1>

			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						value={userName}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<Button btnText="Login" btnclassName="login-button" />
			</form>
		</div>
	);
}
