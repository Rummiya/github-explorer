import { Input } from '@nextui-org/react';
import debounce from 'lodash.debounce';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { SearchStatus } from './components/SearchStatus.tsx';

import { RxCross2 } from 'react-icons/rx';
import { UserCard } from './components/UserCard.tsx';
import {
	clearResults,
	searchUsers,
	selectSearch,
	setQuery,
} from './searchSlice.ts';

export const SearchUsers = () => {
	const dispatch = useAppDispatch();
	const { query, results, status, error } = useAppSelector(selectSearch);
	const [localQuery, setLocalQuery] = useState(query);

	const handleClear = useCallback(() => {
		setLocalQuery('');
		dispatch(clearResults());
	}, [dispatch]);

	const debouncedSearch = useMemo(() => {
		return debounce(async (value: string) => {
			if (value) {
				dispatch(setQuery(value));
				dispatch(searchUsers(value));
			} else {
				handleClear();
			}
		}, 300);
	}, [dispatch, handleClear]);

	useEffect(() => {
		debouncedSearch(localQuery);

		return () => {
			debouncedSearch.cancel();
		};
	}, [localQuery, debouncedSearch]);

	return (
		<div className='max-w-2xl mx-auto mt-10 px-4'>
			<div className='flex gap-3 mb-6 relative'>
				<Input
					fullWidth
					placeholder='Поиск пользователей GitHub'
					value={localQuery}
					onChange={e => setLocalQuery(e.target.value)}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							debouncedSearch.flush();
						}
					}}
				/>
				{localQuery && (
					<button
						onClick={() => handleClear()}
						className='absolute right-2 top-2 rounded-full disabled:opacity-50 disabled:hover:opacity-50 p-0 size-6 flex items-center justify-center bg-default z-20'
						disabled={!localQuery}
					>
						{<RxCross2 size={12} />}
					</button>
				)}
			</div>

			<SearchStatus
				error={error}
				localQuery={localQuery}
				results={results}
				status={status}
			/>

			<div className='flex flex-col gap-4'>
				{results.map(user => (
					<UserCard key={user.login} {...user} />
				))}
			</div>
		</div>
	);
};
