import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import auth from './../features/auth/authSlice';
import repos from './../features/repos/reposSlice';
import search from './../features/search-users/searchSlice';
import user from './../features/user-profile/userSlice';

export const store = configureStore({
	reducer: {
		user,
		auth,
		repos,
		search,
	},
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
	ThunkReturnType,
	RootState,
	unknown,
	Action
>;
