export const getPattern = (patternName: string): RegExp => {
	const patterns = {
		'email': /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
		'text': /^[a-zA-Zа-яА-ЯёЁ\s-]{2,30}$/,
		'phone': /^\+?\d{10,15}$/,
		'password': /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
		'url': /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
		'number': /^\d+$/,
		'date': /^\d{4}-\d{2}-\d{2}$/,
	};

	const pattern = patterns[patternName as keyof typeof patterns];
	return pattern ? pattern : /^[a-zA-Zа-яА-ЯёЁ\s-]{2,30}$/;
};
