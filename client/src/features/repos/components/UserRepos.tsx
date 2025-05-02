import { useEffect, useState } from 'react';
import { BackBtn } from '../../../app/components/back-btn/BackBtn';
import { Repo, Status } from '../../../app/types';
import { ReposList } from './ReposList';

export const UserRepos = ({ id }: { id: string }) => {
	const [foreignRepos, setForeignRepos] = useState<Repo[] | null>(null);
	const [status, setStatus] = useState<Status>(Status.LOADING);

	useEffect(() => {
		if (!id) return;

		const fetchRepos = async () => {
			setStatus('loading');
			try {
				const res = await fetch(`https://api.github.com/users/${id}/repos`);
				const data = await res.json();
				setForeignRepos(data);
				setStatus('success');
			} catch {
				setStatus('error');
			}
		};

		fetchRepos();
	}, [id]);

	return (
		<>
			<BackBtn />
			<ReposList repos={foreignRepos} status={status} />
		</>
	);
};
