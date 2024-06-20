//file reserved for creating and exporting all required fetch calls

export const deleteProduct = async (id: number) => {
	try {
		const response = await fetch(`http://localhost:3000/product/${id}`, {
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
		const response = await fetch(`http://localhost:3000/product/${id}`, {
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
		const response = await fetch(`http://localhost:3000/products/random`, {
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
		const response = await fetch(`http://localhost:3000/products`, {
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

export const login = async (username: string, password: string) => {
	try {
		const response = await fetch(`http://localhost:3000/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

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
			alert('Unknown error');
		}
	}
};

export const signUp = async (username: string, password: string) => {
	try {
		const response = await fetch(`http://localhost:3000/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

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
			alert('Unknown error');
		}
	}
};

export const fetchReviews = async (productId: number) => {
	try {
		const response = await fetch(`http://localhost:3000/review/${productId}`, {
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
		const response = await fetch(`http://localhost:3000/productscore/${productId}`, {
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
