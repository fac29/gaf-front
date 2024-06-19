//file reserved for utility functions
export function sanitizeInput(input: string): string[] {
	const sanitizedString = input.replace(/[^\w\s-]/g, '');

	const words = sanitizedString.split(/\s+/);

	return words;
}

export function renderStars(score: number): JSX.Element[] {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < score) {
            stars.push(<span key={i} className="star filled">★</span>);
        } else {
            stars.push(<span key={i} className="star">☆</span>);
        }
    }
    return stars;
}