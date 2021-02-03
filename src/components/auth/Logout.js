import React, { useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Logout = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	// log out user and navigate to home
	useEffect(() => {
		(async () => {
			await logout();
			navigate('/login');
		})();
	}, [logout, navigate]);

	return (
		<>
			<Row>
				<Col xs={12} md={6} lg={4}>
					<p>Logging out from your account.</p>
					<Spinner animation='border' role='status'>
						<span className='sr-only'>Loading...</span>
					</Spinner>
				</Col>
			</Row>
		</>
	);
};

export default Logout;
