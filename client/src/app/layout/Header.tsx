import { ShoppingCart } from '@mui/icons-material';
import {
	AppBar,
	Badge,
	IconButton,
	List,
	ListItem,
	Switch,
	Toolbar,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';
import SignedInMenu from './SignedInMenu';

interface Props {
	darkMode: boolean;
	toggleDarkMode: () => void;
}

const midLinks = [
	{ title: 'Catalog', path: '/catalog' },
	{ title: 'About', path: '/about' },
	{ title: 'Contact', path: '/contact' },
];

const rightLinks = [
	{ title: 'Login', path: '/login' },
	{ title: 'Register', path: '/register' },
];

const navStyles = {
	color: 'inherit',
	textDecoration: 'none',
	typography: 'h6',
	'&:hover': {
		color: 'grey.500',
	},
	'&.active': {
		color: 'text.secondary',
	},
};

export default function Header({ darkMode, toggleDarkMode }: Props) {
	const { basket } = useAppSelector((state) => state.basket);
	const { user } = useAppSelector((state) => state.account);
	const itemCount = basket?.items.reduce(
		(count, item) => count + item.quantity,
		0
	);

	return (
		<AppBar position='static'>
			<Toolbar
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					// backgroundColor: '#ff6c37',
				}}>
				<Box display='flex' alignItems='center'>
					<Typography variant='h6' component={NavLink} to='/' sx={navStyles}>
						Simba Store
					</Typography>
					<Switch checked={darkMode} onChange={toggleDarkMode} />
				</Box>

				<List sx={{ display: 'flex' }}>
					{midLinks.map(({ title, path }) => (
						<ListItem component={NavLink} to={path} key={path} sx={navStyles}>
							{title.toUpperCase()}
						</ListItem>
					))}
					{user && user.roles?.includes('Admin') && (
						<ListItem component={NavLink} to={'/inventory'} sx={navStyles}>
							INVENTORY
						</ListItem>
					)}
				</List>

				<Box display='flex' alignItems='center'>
					<IconButton
						component={Link}
						to='/basket'
						size='large'
						sx={{ color: 'inherit' }}>
						<Badge badgeContent={itemCount} color='secondary'>
							<ShoppingCart />
						</Badge>
					</IconButton>
					{user ? (
						<SignedInMenu />
					) : (
						<List sx={{ display: 'flex' }}>
							{rightLinks.map(({ title, path }) => (
								<ListItem
									component={NavLink}
									to={path}
									key={path}
									sx={navStyles}>
									{title.toUpperCase()}
								</ListItem>
							))}
						</List>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
}
