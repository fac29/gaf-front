jest.mock('../components/UserContextProvider', () => ({
	__esModule: true,
	default: ({ children }: { children: React.ReactNode }) => children,
	useUserContext: () => ({
		user: null,
		setUser: jest.fn(),
	}),
}));

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import UserContextProvider from '../components/UserContextProvider';

test('demo test', () => {
	expect(true).toBe(true);
});

test('Renders the main page', () => {
	render(
		<UserContextProvider>
			<App />
		</UserContextProvider>,
	);
	expect(true).toBeTruthy();
});

test('Renders main page and navbar elements', () => {
	render(
		<UserContextProvider>
			<App />
		</UserContextProvider>,
	);

	// check for the navigation
	expect(screen.getByRole('navigation')).toBeInTheDocument();

	// Check for the Home link
	const homeLink = screen.getByRole('link', { name: /home/i });
	expect(homeLink).toBeInTheDocument();
	expect(homeLink).toHaveAttribute('href', '#');
});

test('Login form submission', () => {
	render(
		<UserContextProvider>
			<App />
		</UserContextProvider>,
	);
	fireEvent.click(screen.getByRole('button', { name: /log in/i }));
	fireEvent.change(screen.getByLabelText(/email/i), {
		target: { value: 'testuser' },
	});
	fireEvent.change(screen.getByLabelText(/password/i), {
		target: { value: 'password123' },
	});
	const loginButton = screen.getByText('Log In!');
	expect(loginButton).toBeInTheDocument();
	fireEvent.click(loginButton);

	// Add expectations based on what should happen after login
});
