import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navigation = () => {
	const { currentUser } = useAuth();
	return (
		<>
			<Navbar id='nav' variant='dark'>
				<Container>
					<Link to='/' className='navbar-brand'>
						Code Platform
					</Link>

					<Navbar.Toggle aria-controls='basic-navbar-nav' />

					<Nav className='ml-auto'>
						{currentUser ? (
							<NavLink to='/logout' className='nav-link'>
								Log out
							</NavLink>
						) : (
							<NavLink to='/login' className='nav-link'>
								Log in
							</NavLink>
						)}
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};

export default Navigation;
