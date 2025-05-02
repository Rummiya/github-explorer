import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Status, User } from '../../app/types';
import { logout } from '../auth/authSlice';

interface UserState {
	user: User | null;
	current: User | null;
	status: {
		fetchStatus: Status;
		updateStatus: Status;
	};
	error: string | null;
}

const initialState: UserState = {
	user: null,
	current: null,
	status: {
		fetchStatus: Status.LOADING,
		updateStatus: Status.SUCCESS,
	},
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setCurrent: (state, action) => {
			state.current = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUser.pending, state => {
				state.status.fetchStatus = Status.LOADING;
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.status.fetchStatus = Status.SUCCESS;
				if (action.meta.arg.id) {
					state.user = action.payload;
				} else {
					state.current = action.payload;
				}
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.status.fetchStatus = Status.ERROR;
				state.error = action.payload ?? 'Неизвестная ошибка';
			})

			.addCase(updateUser.pending, state => {
				state.status.updateStatus = Status.LOADING;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.current = action.payload;
				state.status.updateStatus = Status.SUCCESS;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.status.updateStatus = Status.ERROR;
				state.error = action.payload ?? 'Неизвестная ошибка';
			})

			.addCase(logout, () => initialState);
	},
});

export const fetchUser = createAsyncThunk<
	User,
	{ id?: string },
	{ state: RootState; rejectValue: string }
>('user/fetchUser', async ({ id }, { getState, rejectWithValue }) => {
	const token = getState().auth.token ?? localStorage.getItem('access_token');
	const url = id
		? `https://api.github.com/users/${id}`
		: `https://api.github.com/user`;

	if (!token) return rejectWithValue('Нет токена');

	const res = await fetch(url, {
		headers: { Authorization: `Bearer ${token}` },
	});

	if (!res.ok) return rejectWithValue(`Error ${res.status}: ${res.statusText}`);

	const data = await res.json();
	return data;
});

export const updateUser = createAsyncThunk<
	User,
	Partial<User>,
	{ state: RootState; rejectValue: string }
>('user/updateUser', async (formData, { getState, rejectWithValue }) => {
	const token = getState().auth.token || localStorage.getItem('access_token');

	const res = await fetch(`https://api.github.com/user`, {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});

	if (!res.ok) return rejectWithValue(`Error ${res.status}: ${res.statusText}`);

	const data = await res.json();
	return data;
});

export const selectUser = (state: RootState) => state.user;
export const { setCurrent } = userSlice.actions;
export default userSlice.reducer;
