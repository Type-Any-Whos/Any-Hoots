interface Tweet {
	_id: string;
	user: User;
	text: string;
	createdAt: string;
}

interface User {
	_id: string;
	handle: string;
}

interface State {
	user: User | null;
}

interface Action {
	type: 'setUser' | 'unsetUser';
	payload: any;
}

interface IAuthRoute {
	path: string;
	key: string;
	exact?: boolean | null | undefined;
	component: any; //! TEMP
}
