interface Tweet {
    _id: number;
    user: User;
    text: string;
    createdAt: string;
}

interface User {
    _id: number;
    handle: string;
}
