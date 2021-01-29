import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/scss/app.scss';
import { Container } from 'react-bootstrap';
import Navigation from './components/navigation/Navigation';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Signup from './components/auth/Signup';
import ResetPassword from './components/auth/ResetPassword';
import Home from './components/Home';
import NotFound from './components/NotFound';

const App = () => {
	return (
		<Router>
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

					<Route path='*' element={<NotFound />} />
				</Routes>
			</Container>
		</Router>
	);
};

export default App;
