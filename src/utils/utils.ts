//file reserved for utility functions
export function sanitizeInput(input: string): string[] {
	const sanitizedString = input.replace(/[^\w\s-]/g, '');

	const words = sanitizedString.split(/\s+/);

	return words;
}
