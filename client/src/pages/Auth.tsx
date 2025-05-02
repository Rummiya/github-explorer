import { Button } from '@nextui-org/react';

export const Auth = () => {
	const clientId = import.meta.env.VITE_CLIENT_ID;

	console.log(clientId);

	return (
		<div className='w-full h-screen flex flex-col gap-10 items-center justify-center'>
			<h1 className='font-mono text-2xl'>Пройдите регистрацию</h1>
			<a
				href={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user,repo`}
			>
				<Button>Войти через GitHub</Button>
			</a>
		</div>
	);
};
