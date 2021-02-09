import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navigation = () => {
	const { currentUser } = useAuth();
	return (
		<>
			<Navbar id='nav' variant='dark' expand='md'>
				<Container>
					<Link to='/' className='navbar-brand'>
						Code Platform
					</Link>

					<Navbar.Toggle aria-controls='responsive-navbar-nav' />

					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav className='ml-auto'>
							{currentUser ? (
								<NavDropdown
									title={
										currentUser.displayName ||
										currentUser.email
									}
									id='collasible-nav-dropdown'
								>
									<NavLink
										to='/profile'
										className='dropdown-item'
									>
										My Profile
									</NavLink>
									<NavLink
										to='/logout'
										className='dropdown-item'
									>
										Log out
									</NavLink>
								</NavDropdown>
							) : (
								<NavLink to='/login' className='nav-link'>
									Log in
								</NavLink>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default Navigation;
