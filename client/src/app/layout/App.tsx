import Header from './Header';
import {
	Container,
	createTheme,
	CssBaseline,
	ThemeProvider,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from './LoadingComponent';
import { useAppDispatch } from '../store/configureStore';
import { fetchBasketAsync } from '../../features/basket/basketSlice';
import { getCurrentUser } from '../../features/account/accountSlice';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';

function App() {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(true);

	const initApp = useCallback(async () => {
		try {
			await dispatch(getCurrentUser());
			await dispatch(fetchBasketAsync());
		} catch (error) {
			console.log(error);
		}
	}, [dispatch]);

	useEffect(() => {
		initApp().then(() => setLoading(false));
	}, [initApp]);

	const [darkMode, setDarkMode] = useState(false);
	const pallteType = darkMode ? 'dark' : 'light';
	const theme = createTheme({
		palette: {
			mode: pallteType,
			background: {
				default: pallteType === 'light' ? '#eaeaea' : '#121212',
			},
		},
	});

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};
	if (loading) return <LoadingComponent message='Initializing app ...' />;

	return (
		<ThemeProvider theme={theme}>
			<ToastContainer position='bottom-right' hideProgressBar />
			<CssBaseline />
			<Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
			{loading ? (
				<LoadingComponent message='Initializing app ...' />
			) : location.pathname === '/' ? (
				<HomePage />
			) : (
				<Container sx={{ mt: 3 }}>
					<Outlet />
				</Container>
			)}
		</ThemeProvider>
	);
}

export default App;
