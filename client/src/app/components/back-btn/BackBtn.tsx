import { Button } from '@nextui-org/react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const BackBtn = () => {
	const navigate = useNavigate();

	return (
		<Button
			className='text-default-500 flex items-center gap-2 mb-10 cursor-pointer'
			onPress={() => navigate(-1)}
		>
			<FaRegArrowAltCircleLeft />
			Назад
		</Button>
	);
};
