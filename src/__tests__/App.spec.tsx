jest.mock('../components/UserContextProvider', () => ({
	__esModule: true,
	default: ({ children }: { children: React.ReactNode }) => children,
	useUserContext: () => ({
		user: null,
		setUser: jest.fn(),
	}),
}));

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';
import UserContextProvider from '../components/UserContextProvider';

test('demo', () => {
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

test('Renders main UI elements', () => {
	render(
		<UserContextProvider>
			<App />
		</UserContextProvider>,
	);
	expect(screen.getByRole('navigation')).toBeInTheDocument(); // Navbar
	// expect(screen.getByRole('heading', { name: /welcome/i })).toBeInTheDocument(); // Assuming there's a welcome heading
});
