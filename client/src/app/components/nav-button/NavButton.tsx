import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
	href: string;
	icon?: React.ReactNode;
	children: React.ReactNode;
}

export const NavButton: React.FC<Props> = ({ href, icon, children }) => {
	const location = useLocation();
	const isActive = location.pathname === href;

	return (
		<Link
			to={href}
			className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors ${
				isActive ? 'bg-primary text-white' : 'bg-zinc-600'
			}`}
		>
			{icon}
			<span className='font-medium'>{children}</span>
		</Link>
	);
};
