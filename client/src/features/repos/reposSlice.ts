import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Repo, Status } from '../../app/types';
import { logout } from '../auth/authSlice';
import { RootState } from './../../app/store';

interface FetchReposParams {
	id?: string;
	type: string;
}

interface ReposState {
	privateRepos: Repo[] | null;
	publicRepos: Repo[] | null;
	status: Status;
	error: string | null;
}

const initialState: ReposState = {
	privateRepos: null,
	publicRepos: null,
	status: Status.LOADING,
	error: null,
};

const reposSlice = createSlice({
	name: 'repos',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchRepos.pending, state => {
				state.status = Status.LOADING;
			})
			.addCase(fetchRepos.fulfilled, (state, action) => {
				state.status = Status.SUCCESS;

				if (action.meta.arg.type === 'public') {
					state.publicRepos = action.payload;
				} else {
					state.privateRepos = action.payload;
				}
			})
			.addCase(fetchRepos.rejected, (state, action) => {
				state.status = Status.ERROR;
				state.error = action.payload ?? 'Неизвестная ошибка';
			})

			.addCase(logout, () => initialState);
	},
});

export const fetchRepos = createAsyncThunk<
	Repo[],
	FetchReposParams,
	{ state: RootState; rejectValue: string }
>('repos/fetchRepos', async (params, { getState, rejectWithValue }) => {
	const { id, type } = params;
	const token = getState().auth.token ?? localStorage.getItem('access_token');

	let url;
	if (!id) {
		url = `https://api.github.com/user/repos?visibility=${type}`;
	} else {
		if (type === 'private') return;
		url = `https://api.github.com/users/${id}/repos`;
	}

	if (!token) return rejectWithValue('Нет токена');

	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) return rejectWithValue(`Error ${res.status}: ${res.statusText}`);

	const data = await res.json();
	return data;
});

export const selectRepos = (state: RootState) => state.repos;
export default reposSlice.reducer;
