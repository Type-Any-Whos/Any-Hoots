interface Tweet {
	_id: number;
	user: User;
	text: string;
	timestamp: string;
}

interface User {
	_id: number;
	handle: string;
}
