import { Avatar, Button } from '@nextui-org/react';
import { FC } from 'react';
import { FaMarker } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { HiFolderOpen } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../app/types';

interface Props {
	currentUser: User | null;
	isOwnProfile: boolean;
	editing: boolean;
	setEditing: () => void;
}

export const UserInfo: FC<Props> = ({
	currentUser,
	isOwnProfile,
	editing,
	setEditing,
}) => {
	const navigate = useNavigate();

	return (
		<div className='flex flex-col items-center mb-6'>
			<Avatar src={currentUser?.avatar_url} size='lg' />
			<h2 className='text-xl font-semibold mt-2'>
				{currentUser?.name || currentUser?.login}
			</h2>
			<a
				href={currentUser?.html_url}
				target='_blank'
				rel='noreferrer'
				className='text-blue-500 text-sm'
			>
				@{currentUser?.login}
			</a>
			<div className='mt-5 text-foreground'>
				{isOwnProfile ? (
					<Button
						color='primary'
						onPress={() => setEditing()}
						endContent={!editing && <FaMarker />}
					>
						{editing ? <FaXmark /> : <span>Редактировать</span>}
					</Button>
				) : (
					<Button
						onPress={() => navigate('repos')}
						endContent={<HiFolderOpen />}
					>
						Репозитории
					</Button>
				)}
			</div>
		</div>
	);
};
