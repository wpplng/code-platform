import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const Navigation = () => {
	return (
		<>
			<Navbar id='nav' variant='dark'>
				<Container>
					<Link to='/' className='navbar-brand'>
						Code Platform
					</Link>

					<Navbar.Toggle aria-controls='basic-navbar-nav' />

					<Nav className='ml-auto'>
						<NavLink to='/signup' className='nav-link'>
							Sign up
						</NavLink>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};

export default Navigation;
