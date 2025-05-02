import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Status } from '../../app/types';

interface AuthState {
	token: string | null;
	status: Status;
	error: string | null;
}

const initialState: AuthState = {
	token: null,
	status: Status.LOADING,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			state.token = null;
			state.status = Status.LOADING;
			state.error = null;

			localStorage.removeItem('access_token');
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getAuthToken.pending, state => {
				state.status = Status.LOADING;
			})
			.addCase(getAuthToken.fulfilled, (state, { payload }) => {
				state.token = payload.token;
				state.status = Status.SUCCESS;

				localStorage.setItem('access_token', payload.token);
			})
			.addCase(getAuthToken.rejected, (state, action) => {
				state.status = Status.ERROR;
				state.error = action.payload ?? 'Неизвестная ошибка';
			});
	},
});

export const getAuthToken = createAsyncThunk<
	{ token: string },
	{ code: string },
	{ rejectValue: string }
>('auth/getAuthToken', async ({ code }, { rejectWithValue }) => {
	const res = await fetch('http://localhost:3000/auth/github', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ code }),
	});

	if (!res.ok) return rejectWithValue(`Error ${res.status}: ${res.statusText}`);

	const data = await res.json();
	return { token: data.access_token };
});

export const selectToken = (state: RootState) => state.auth.token;
export const selectAuth = (state: RootState) => state.auth;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
