import { JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
	const token = localStorage.getItem('access_token');

	if (!token) {
		return <Navigate to='/auth' replace />;
	}

	return children ? children : <Outlet />;
};
