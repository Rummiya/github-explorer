import { Outlet } from 'react-router-dom';
import { Container } from '../container/Container';
import { Header } from '../header/Header';
import { Navbar } from '../navbar/Navbar';

export const Layout = () => {
	return (
		<>
			<Header />
			<Container>
				<div className='flex-2'>
					<Navbar />
				</div>
				<div className='flex-1'>
					<Outlet />
				</div>
			</Container>
		</>
	);
};
