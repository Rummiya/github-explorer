import { Card, CardBody, Spinner } from '@nextui-org/react';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProfileInfo } from './components/ProfileInfo';

import { BackBtn } from '../../app/components/back-btn/BackBtn';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { EditProfile } from './components/EditProfile';
import { UserInfo } from './components/UserInfo';
import { fetchUser } from './userSlice';

export const UserProfile = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const isOwnProfile = !id;

	const { current, status, user, error } = useAppSelector(state => state.user);
	const [editing, setEditing] = useState(false);

	const currentUser = isOwnProfile ? current : user;

	useEffect(() => {
		if (id) {
			dispatch(fetchUser({ id }));
		}
		if (!current) {
			dispatch(fetchUser({}));
		}
	}, [id, dispatch, current]);

	if (status.fetchStatus === 'loading') {
		return (
			<div className='flex justify-center items-center h-96'>
				<Spinner label='Загрузка профиля...' color='secondary' />
			</div>
		);
	}

	if (!currentUser && error)
		return <p className='text-center text-red-500'>{error}</p>;

	return (
		<>
			{id && <BackBtn />}
			<Card>
				<CardBody className='p-6'>
					<UserInfo
						currentUser={currentUser}
						editing={editing}
						setEditing={() => setEditing(prev => !prev)}
						isOwnProfile={isOwnProfile}
					/>

					{editing ? (
						<EditProfile setEditing={() => setEditing(prev => !prev)} />
					) : (
						<div className='flex flex-col gap-2 p-4'>
							<ProfileInfo
								title='Местоположение'
								info={currentUser?.location}
							/>
							<ProfileInfo title='Компания' info={currentUser?.company} />
							<ProfileInfo title='Биография' info={currentUser?.bio} />
						</div>
					)}
				</CardBody>
			</Card>
		</>
	);
};
