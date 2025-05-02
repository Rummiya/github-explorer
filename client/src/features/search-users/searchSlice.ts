import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Status, User } from '../../app/types';

interface SearchState {
	query: string;
	results: User[];
	status: Status;
	error: string | null;
}

const initialState: SearchState = {
	query: '',
	results: [],
	status: Status.LOADING,
	error: null,
};

export const searchUsers = createAsyncThunk<
	User[],
	string,
	{ rejectValue: string }
>('search/searchUsers', async (query, { rejectWithValue }) => {
	const res = await fetch(`https://api.github.com/search/users?q=${query}`);
	if (!res.ok) {
		return rejectWithValue(`Ошибка ${res.status}: ${res.statusText}`);
	}

	const data = await res.json();
	return data.items; // массив пользователей
});

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setQuery: (state, action) => {
			state.query = action.payload;
		},
		clearResults: state => {
			state.results = [];
			state.query = '';
			state.status = Status.LOADING;
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(searchUsers.pending, state => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(searchUsers.fulfilled, (state, action) => {
				state.status = 'success';
				state.results = action.payload;
			})
			.addCase(searchUsers.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.payload ?? 'Неизвестная ошибка';
			});
	},
});

export const { setQuery, clearResults } = searchSlice.actions;
export const selectSearch = (state: RootState) => state.search;
export default searchSlice.reducer;
