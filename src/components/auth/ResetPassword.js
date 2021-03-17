import React, { useRef, useState } from 'react';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ResetPassword = () => {
	const emailRef = useRef();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { resetPassword } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		setError(null);

		// await resetPassword and navigate to login
		try {
			setLoading(true);
			await resetPassword(emailRef.current.value);
			navigate('/login');
		} catch (e) {
			setError(
				'Something went wrong. Please check that the email address is correct.'
			);
			setLoading(false);
		}
	};

	return (
		<>
			<Row className='justify-content-center'>
				<Col xs={12} md={6} lg={6}>
					<h3 className='my-4 text-center'>Reset password</h3>

					{error && <Alert variant='danger'>{error}</Alert>}

					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								size='lg'
								type='email'
								ref={emailRef}
								required
								placeholder='Your email address'
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
							Reset password
						</Button>
						<Form.Text className='text-muted mt-4'>
							Please check your email for further instructions.
						</Form.Text>
					</Form>
				</Col>
			</Row>
		</>
	);
};

export default ResetPassword;
