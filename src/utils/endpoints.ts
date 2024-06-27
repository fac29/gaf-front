//file reserved for creating and exporting all required fetch calls

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const deleteProduct = async (id: number) => {
	try {
		const response = await fetch(`${API_URL}/product/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const contentType = response.headers.get('Content-Type');
		if (contentType && contentType.includes('application/json')) {
			// If the response is JSON, parse it
			const result = await response.json();
			return result;
		} else {
			// If the response is not JSON, return the response text
			const result = await response.text();
			return result;
		}
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message);
		} else {
			alert('An unexpected error occurred');
		}
	}
};

export const singleProduct = async (id: number) => {
	try {
		const response = await fetch(`${API_URL}/product/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const contentType = response.headers.get('Content-Type');
		if (contentType && contentType.includes('application/json')) {
			// If the response is JSON, parse it
			const result = await response.json();
			return result;
		} else {
			// If the response is not JSON, return the response text
			const result = await response.text();
			return result;
		}
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message);
		} else {
			alert('An unexpected error occurred');
		}
	}
};

export const randomProducts = async () => {
	try {
		const response = await fetch(`${API_URL}/products/random`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const contentType = response.headers.get('Content-Type');
		if (contentType && contentType.includes('application/json')) {
			// If the response is JSON, parse it
			const result = await response.json();
			return result;
		} else {
			// If the response is not JSON, return the response text
			const result = await response.text();
			return result;
		}
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message);
		} else {
			alert('An unexpected error occurred');
		}
	}
};

export const SearchProducts = async (userInput: Array<string>) => {
	try {
		const response = await fetch(`${API_URL}/products`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userInput),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const contentType = response.headers.get('Content-Type');
		if (contentType && contentType.includes('application/json')) {
			// If the response is JSON, parse it
			const result = await response.json();
			return result;
		} else {
			// If the response is not JSON, return the response text
			const result = await response.text();
			return result;
		}
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message);
		} else {
			alert('An unexpected error occurred');
		}
	}
};

export const login = async (email: string, password: string) => {
	try {
		const response = await fetch(`${API_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});

		const contentType = response.headers.get('Content-Type');

		if (!response.ok) {
			let errorMessage = 'Failed to log in';

			if (contentType && contentType.includes('application/json')) {
				const result = await response.json();
				errorMessage = result.message || errorMessage;
			} else {
				const text = await response.text();
				errorMessage = text || errorMessage;
			}
			throw new Error(errorMessage);
		}
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message);
			throw error;
		} else {
			alert('Unknown error');
		}
	}
};

export const signUp = async (name: string, email: string, password: string) => {
	try {
		const response = await fetch(`${API_URL}/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, email, password }),
		});

		const contentType = response.headers.get('Content-Type');

		if (!response.ok) {
			let errorMessage = 'Failed to sign up';

			if (contentType && contentType.includes('application/json')) {
				const data = await response.json();
				errorMessage = data.message || errorMessage;
			} else {
				const text = await response.text();
				errorMessage = text || errorMessage;
			}
			throw new Error(errorMessage);
		}
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message);
			throw error;
		} else {
			alert('Unknown error');
		}
	}
};

export const fetchReviews = async (productId: number) => {
	try {
		const response = await fetch(`${API_URL}/review/${productId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		// if (!response.ok) {
		// 	throw new Error(`HTTP error! status: ${response.status}`);
		// }

		const contentType = response.headers.get('Content-Type');
		if (contentType && contentType.includes('application/json')) {
			const result = await response.json();
			return result;
		} else {
			const result = await response.text();
			return result;
		}
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message);
		} else {
			alert('An unexpected error occurred');
		}
	}
};

export const fetchProductScore = async (productId: number) => {
	try {
		const response = await fetch(`${API_URL}/productscore/${productId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const contentType = response.headers.get('Content-Type');
		if (contentType && contentType.includes('application/json')) {
			const result = await response.json();
			if (Array.isArray(result) && result.length > 0) {
				return result[0]; // Return the first element of the array
			} else {
				throw new Error('Invalid response format');
			}
		} else {
			const result = await response.text();
			throw new Error(
				`Unexpected response content type: ${contentType} ${result}`,
			);
		}
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message);
		} else {
			alert('An unexpected error occurred');
		}
		throw error;
	}
};

export const fetchCreateCart = async (userID: number) => {
	try {
		const response = await fetch(`${API_URL}/cart`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userID }),
		});
		const contentType = response.headers.get('Content-Type');
		if (contentType && contentType.includes('application/json')) {
			const result = await response.json();
			return result.id;
		}
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message);
		} else {
			alert('An unexpected error occurred');
		}
	}
};

import { CartItem } from './tyBucket';
export const fetchUpdateCart = async (
	cartId: number,
	userCartItems: Array<CartItem>,
) => {
	try {
		const response = await fetch(`${API_URL}/cart/${cartId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userCartItems),
		});
		const contentType = response.headers.get('Content-Type');
		if (contentType && contentType.includes('application/json')) {
			const result = await response.json();
			return result;
		}
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message);
		} else {
			alert('An unexpected error occurred');
		}
	}
};
