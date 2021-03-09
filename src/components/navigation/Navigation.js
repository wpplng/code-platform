import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Dropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import useLanguages from '../../hooks/useLanguages';

const Navigation = () => {
	const { currentUser } = useAuth();
	const { languages } = useLanguages();

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
							<NavDropdown
								title='Languages'
								id='collasible-nav-dropdown'
							>
								<NavLink
									to={'/languages'}
									className='dropdown-item font-weight-bold'
								>
									All Languages
								</NavLink>
								<Dropdown.Divider />
								{languages.map((item) => (
									<NavLink
										key={item.id}
										to={`/languages/${item.id}`}
										className='dropdown-item'
									>
										{item.language}
									</NavLink>
								))}
							</NavDropdown>
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
