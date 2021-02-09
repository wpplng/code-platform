import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/scss/app.scss';
import { Container } from 'react-bootstrap';
import AuthContextProvider from './contexts/AuthContext';
import Navigation from './components/navigation/Navigation';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Signup from './components/auth/Signup';
import ResetPassword from './components/auth/ResetPassword';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Profile from './components/profile/Profile';
import AuthRoute from './components/auth/AuthRoute';
import Username from './components/profile/Username';

const App = () => {
	return (
		<Router>
			<AuthContextProvider>
				<Navigation />

				<Container className='py-4'>
					<Routes>
						<Route path='/'>
							<Home />
						</Route>

						<Route path='/signup'>
							<Signup />
						</Route>

						<Route path='/login'>
							<Login />
						</Route>

						<Route path='/logout'>
							<Logout />
						</Route>

						<Route path='/reset-password'>
							<ResetPassword />
						</Route>

						<Route path='/profile'>
							<AuthRoute path='/'>
								<Profile />
							</AuthRoute>

							<AuthRoute path='/username'>
								<Username />
							</AuthRoute>
						</Route>

						<Route path='*' element={<NotFound />} />
					</Routes>
				</Container>
			</AuthContextProvider>
		</Router>
	);
};

export default App;
