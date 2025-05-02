import { Avatar, Card, CardBody } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { User } from '../../../app/types';

export const UserCard = (user: User) => {
	return (
		<Card key={user.login} shadow='sm'>
			<CardBody>
				<div className='flex items-center gap-4'>
					<Avatar src={user.avatar_url} />
					<div>
						<p className='font-semibold'>{user.login}</p>
						<a
							href={user.html_url}
							className='text-sm text-blue-500'
							target='_blank'
							rel='noreferrer'
						>
							GitHub профиль →
						</a>
						<div>
							<Link to={`/user/${user.login}`} className='text-sm text-primary'>
								Посмотреть в приложении →
							</Link>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};
