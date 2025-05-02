import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';

import { Layout } from '../app/components/layout/Layout';

import { OAuthCallback, ProtectedLayout } from '../features/auth';
import { Auth } from '../pages/Auth';
import { Profile } from '../pages/Profile';
import { Repositories } from '../pages/Repositories';
import { Users } from '../pages/Users';

export const AppRouter = () => {
	const router = createBrowserRouter([
		{
			path: '/auth',
			element: <Auth />,
		},
		{
			path: '/oauth-callback',
			element: <OAuthCallback />,
		},
		{
			path: '/',
			element: (
				<ProtectedLayout>
					<Layout />
				</ProtectedLayout>
			),
			children: [
				{
					path: '',
					element: <Navigate to={'/profile'} replace />,
				},
				{
					path: 'profile',
					element: <Profile />,
				},
				{
					path: 'repos',
					element: <Repositories />,
				},
				{
					path: 'user/:id',
					element: <Profile />,
				},
				{
					path: 'user/:id/repos',
					element: <Repositories />,
				},
				{
					path: 'users',
					element: <Users />,
				},
			],
		},
	]);
	return (
		<main className='dark text-foreground bg-background'>
			<RouterProvider router={router} />
		</main>
	);
};
