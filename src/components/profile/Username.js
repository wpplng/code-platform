import React, { useRef, useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Username = () => {
	const { currentUser, updateProfile } = useAuth();
	const usernameRef = useRef();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		setError(null);

		try {
			setLoading(true);

			// update username if it has been changed
			if (usernameRef.current.value !== currentUser.displayName) {
				await updateProfile(usernameRef.current.value);
			}

			setLoading(false);
			navigate('/');
		} catch (e) {
			setError('Error when updating username. Please try again.');
			setLoading(false);
		}
	};

	return (
		<>
			{error && <Alert variant='danger'>{error}</Alert>}

			<Row className='justify-content-center'>
				<Col xs={12} md={6} lg={6}>
					<h3 className='my-4 text-center'>
						Please select a username
					</h3>
					<Form onSubmit={handleSubmit}>
						<Form.Group id='username'>
							<Form.Label>Username</Form.Label>
							<Form.Control
								size='lg'
								type='text'
								ref={usernameRef}
								required
								placeholder='Select username'
							/>
						</Form.Group>
						<Button
							className='custom-button mt-4'
							size='lg'
							block
							variant='secondary'
							type='submit'
							disabled={loading}
						>
							Select
						</Button>
					</Form>
				</Col>
			</Row>
		</>
	);
};

export default Username;
