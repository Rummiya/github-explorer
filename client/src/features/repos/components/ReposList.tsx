import { Card, CardBody, Spinner } from '@nextui-org/react';
import { FC } from 'react';
import { Repo, Status } from '../../../app/types';

interface Props {
	repos: Repo[] | null;
	status: Status;
	error: string | null;
}

export const ReposList: FC<Props> = ({ repos, status, error }) => {
	if (status === 'loading')
		return (
			<div className='flex items-center justify-center w-full mt-[150px]'>
				<Spinner label='Загрузка репозиториев...' />
			</div>
		);

	if (!repos || !repos.length) return <p>Нет репозиториев</p>;

	if (status === 'error')
		return <p className='text-center text-red-500'>{error}</p>;

	return (
		<div className='space-y-4 mt-4'>
			{repos.map(repo => (
				<Card key={repo.id} shadow='sm'>
					<CardBody>
						<h3 className='text-lg font-semibold'>{repo.name}</h3>
						<p>
							<a
								href={repo.html_url}
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-500 text-sm'
							>
								Перейти к репозиторию
							</a>
						</p>
						<p>
							Владелец:
							<a
								href={repo.owner.html_url}
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-500'
							>
								{' ' + repo.owner.login}
							</a>
						</p>
					</CardBody>
				</Card>
			))}
		</div>
	);
};
