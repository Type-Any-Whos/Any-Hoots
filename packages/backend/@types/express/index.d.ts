import { Session, SessionData } from 'express-session';

export declare module 'express-session' {
	interface SessionData {
		userId: string;
	}
}
