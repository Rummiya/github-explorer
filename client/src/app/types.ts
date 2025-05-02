export interface User {
	name: string;
	avatar_url: string;
	login: string;
	html_url: string;
	bio: string;
	company: string;
	location: string;
}

export interface Repo {
	id: number;
	name: string;
	html_url: string;
	owner: {
		login: string;
		html_url: string;
	};
}

export const Status = {
	LOADING: 'loading',
	SUCCESS: 'success',
	ERROR: 'error',
} as const;

export type Status = (typeof Status)[keyof typeof Status];
