import {
	BrowserRouter as Router,
	Switch,
	Route,
	RouteComponentProps,
} from 'react-router-dom';
import { AppBar, Grid, Typography } from '@material-ui/core';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import MainBar from './layout/MainBar';
import LeftBar from './layout/LeftBar';
import RightBar from './layout/RightBar';

import AuthPage from './auth/AuthPage';
import LogoutPage from './auth/LogoutPage';
import FeedPage from './feed/FeedPage';
import NotFoundPage from './layout/NotFoundPage';

import StateProvider, { StateContext } from './StateProvider';

import image from './images/logo.svg';

const AUTH_ROUTES = [
	{
		path: '/auth/login',
		key: 'APP_LOGIN',
		exact: true,
		component: () => AuthPage(),
	},
	{
		path: '/auth/register',
		key: 'APP_REGISTER',
		exact: true,
		component: () => AuthPage(),
	},
];

type AuthRoute = {
	path: string;
	key: string;
	exact: boolean;
	component: any; //! TEMP
};

export default function App() {
	const theme = createMuiTheme({
		palette: {
			type: 'dark',
		},
	});

	return (
		<StateProvider>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar position='static' style={{ marginBottom: 24 }}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<a
							href='/'
							style={{
								display: 'flex',
								textDecoration: 'none',
								color: 'white',
								padding: '1rem',
							}}
						>
							<img src={image} style={{ height: '2.5rem' }} />
							<Typography variant='h6' style={{ padding: 12 }}>
								AnyHoots
							</Typography>
						</a>
					</div>
				</AppBar>

				<Router>
					<Switch>
						{AUTH_ROUTES.map((routeObj: AuthRoute) => (
							<Route
								key={routeObj.key}
								exact={routeObj.exact}
								path={routeObj.path}
								component={routeObj.component}
							/>
						))}
						<Route>
							<Grid container>
								<LeftBar />
								<MainBar>
									<Switch>
										<Route path='/' exact>
											<FeedPage />
										</Route>
										<Route path='/auth/logout'>
											<LogoutPage />
										</Route>
										<Route component={NotFoundPage} />
									</Switch>
								</MainBar>
								<RightBar />
							</Grid>
						</Route>
					</Switch>
				</Router>
			</ThemeProvider>
		</StateProvider>
	);
}
