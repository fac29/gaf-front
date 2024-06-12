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
			method: 'GET',
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
