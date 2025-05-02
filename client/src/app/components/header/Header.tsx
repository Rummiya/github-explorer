import { Button, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { CiLogout } from 'react-icons/ci';
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../features/auth/authSlice';
import { useAppDispatch } from '../../hooks';

export const Header = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		navigate('/auth');
		dispatch(logout());
	};

	return (
		<Navbar className='bg-background/60 backdrop-blur border-b border-default-200'>
			<NavbarBrand className='gap-2'>
				<FaGithub className='text-2xl text-primary' />
				<p className='font-bold text-xl text-foreground'>Github Profile</p>
			</NavbarBrand>
			<NavbarContent justify='end'>
				<Button
					color='danger'
					variant='flat'
					onPress={handleLogout}
					endContent={<CiLogout />}
				>
					Выйти
				</Button>
			</NavbarContent>
		</Navbar>
	);
};
