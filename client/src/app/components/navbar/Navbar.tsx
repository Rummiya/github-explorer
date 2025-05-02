import { Card, CardBody } from '@nextui-org/react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { HiFolderOpen } from 'react-icons/hi';
import { NavButton } from '../nav-button/NavButton';

export const Navbar = () => {
	return (
		<Card radius='lg' className='w-full max-w-xs'>
			<CardBody className='p-6'>
				<nav>
					<ul className='flex flex-col gap-4'>
						<li>
							<NavButton href='/profile' icon={<FaUser className='text-lg' />}>
								Профиль
							</NavButton>
						</li>
						<li>
							<NavButton
								href='/repos'
								icon={<HiFolderOpen className='text-lg' />}
							>
								Репозитории
							</NavButton>
						</li>
						<li>
							<NavButton href='/users' icon={<FaSearch className='text-lg' />}>
								Пользователи
							</NavButton>
						</li>
					</ul>
				</nav>
			</CardBody>
		</Card>
	);
};
