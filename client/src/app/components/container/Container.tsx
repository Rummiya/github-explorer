import React from 'react';

interface Props {
	children: React.ReactElement[] | React.ReactElement;
}

export const Container: React.FC<Props> = ({ children }) => {
	return (
		<div className='flex gap-16 max-w-screen-xl mx-auto mt-10'>{children}</div>
	);
};
