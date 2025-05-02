import { Spinner } from '@nextui-org/react';
import { FC } from 'react';
import { Status, User } from '../../../app/types';

interface Props {
	localQuery: string;
	results: User[];
	error: string | null;
	status: Status;
}

export const SearchStatus: FC<Props> = ({
	localQuery,
	results,
	error,
	status,
}) => {
	if (!localQuery.trim() && !results.length) {
		return (
			<p className='text-center text-default-500 mt-[100px]'>
				Введите имя пользователя GitHub
			</p>
		);
	}

	if (status === 'loading' && !results.length) {
		return (
			<div className='flex justify-center mt-[100px]'>
				<Spinner label='Ищем пользователей...' color='secondary' />
			</div>
		);
	}

	if (status === 'error') {
		return <p className='text-center text-red-500 mt-[100px]'>{error}</p>;
	}

	if (status === 'success' && results.length === 0) {
		return (
			<p className='text-center text-gray-400 mt-[100px]'>Ничего не найдено</p>
		);
	}

	return null;
};
