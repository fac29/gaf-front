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

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const contentType = response.headers.get('Content-Type');
		if (contentType && contentType.includes('application/json')) {
			const result = await response.json();
			// Trigger state update (remove Create Account and log in buttons, Show log out)
			return result;
		} else {
			const result = await response.text();
			return result;
		}
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message);
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
			credentials: 'include', // Ensure cookies are included
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const contentType = response.headers.get('Content-Type');
		if (contentType && contentType.includes('application/json')) {
			const result = await response.json();

			// Trigger state update (remove Create Account and log in buttons, Show log out)
			return result;
		} else {
			const result = await response.text();
			return result;
		}
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message);
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
			throw new Error(`Unexpected response content type: ${contentType} ${result}`);
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
