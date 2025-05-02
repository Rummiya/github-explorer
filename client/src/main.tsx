import { NextUIProvider } from '@nextui-org/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './router/AppRouter.tsx';

import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<NextUIProvider>
			<Provider store={store}>
				<AppRouter />
			</Provider>
		</NextUIProvider>
	</StrictMode>
);
