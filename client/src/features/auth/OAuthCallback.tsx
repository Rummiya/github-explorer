import { Spinner } from '@nextui-org/react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAuthToken, selectToken } from './authSlice';

export const OAuthCallback = () => {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const token = useAppSelector(selectToken);

	useEffect(() => {
		if (token) {
			navigate('/profile');
			return;
		}

		const code = params.get('code');
		if (!code) return;

		dispatch(getAuthToken({ code }))
			.unwrap()
			.then(() => {
				navigate('/profile');
			})
			.catch(() => {
				alert('Ошибка авторизации');
			});
	}, [params, navigate, dispatch, token]);

	return (
		<div className='w-full h-screen flex flex-col gap-3 items-center justify-center'>
			<Spinner label='Завершаем вход через GitHub...' color='secondary' />
		</div>
	);
};
