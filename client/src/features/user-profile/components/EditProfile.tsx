import { Button, Input, Textarea } from '@nextui-org/react';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser, updateUser } from '../userSlice';

const fields = [
	{ name: 'name', label: 'Имя' },
	{ name: 'company', label: 'Компания' },
	{ name: 'location', label: 'Местоположение' },
] as const;

export const EditProfile = ({ setEditing }: { setEditing: () => void }) => {
	const dispatch = useAppDispatch();
	const { status, current } = useAppSelector(selectUser);

	const [formData, setFormData] = useState({
		name: current?.name || '',
		bio: current?.bio || '',
		company: current?.company || '',
		location: current?.location || '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		dispatch(updateUser(formData))
			.unwrap()
			.then(() => setEditing());
	};

	return (
		<div>
			<p className='text-lg  text-gray-300 my-3 text-center'>
				Редактировать данные
			</p>
			<form className='space-y-4' onSubmit={handleSubmit}>
				{fields.map(({ name, label }) => (
					<Input
						key={name}
						label={label}
						name={name}
						value={formData[name]}
						onChange={handleChange}
					/>
				))}
				<Textarea
					label='Биография'
					name='bio'
					value={formData.bio}
					onChange={handleChange}
				/>
				<Button
					type='submit'
					color='primary'
					isLoading={status.updateStatus === 'loading'}
				>
					Сохранить изменения
				</Button>
			</form>
		</div>
	);
};
