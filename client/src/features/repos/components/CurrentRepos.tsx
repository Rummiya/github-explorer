import { Tab, Tabs } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import { fetchRepos, selectRepos } from './../reposSlice';
import { ReposList } from './ReposList';

type ActiveTab = 'public' | 'private';

export const CurrentRepos = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();

	const { privateRepos, publicRepos, status, error } =
		useAppSelector(selectRepos);
	const [activeTab, setActiveTab] = useState<ActiveTab>('public');

	useEffect(() => {
		if (!publicRepos || !publicRepos.length) {
			dispatch(fetchRepos({ type: 'public', id }));
		}
	}, [dispatch, id, publicRepos]);

	const onSelectionChange = (key: ActiveTab) => {
		setActiveTab(key);
		if (
			(key === 'public' && !publicRepos?.length) ||
			(key === 'private' && !privateRepos?.length)
		) {
			dispatch(fetchRepos({ type: key as string, id }));
		}
	};

	return (
		<div>
			<Tabs
				fullWidth
				selectedKey={activeTab}
				onSelectionChange={key => onSelectionChange(key as ActiveTab)}
			>
				<Tab key='public' title='Публичные'>
					{<ReposList repos={publicRepos} status={status} error={error} />}
				</Tab>
				{!id && (
					<Tab key='private' title='Приватные'>
						{<ReposList repos={privateRepos} status={status} error={error} />}
					</Tab>
				)}
			</Tabs>
		</div>
	);
};
