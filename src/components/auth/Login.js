import React, { useRef, useState } from 'react';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		setError(null);

		// await login and navigate to home
		try {
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			navigate('/profile');
		} catch (e) {
			// catch possible errrors and set error message
			setError(
				'An error occured when trying to login. Please try again.'
			);
			setLoading(false);
		}
	};

	return (
		<>
			<Row className='justify-content-center custom-form'>
				<Col xs={12} md={6} lg={6}>
					<h3 className='my-4 text-center'>Log in to your account</h3>

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

						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								size='lg'
								type='password'
								ref={passwordRef}
								required
								placeholder='Password'
							/>
						</Form.Group>

						<p>
							<Link to='/reset-password' className='link'>
								Forgot your password?
							</Link>
						</p>

						<Button
							className='custom-button mt-4'
							size='lg'
							block
							variant='secondary'
							type='submit'
							disabled={loading}
						>
							Log in
						</Button>
					</Form>

					<div className='text-center mt-4'>
						<span>Don't have an account? </span>
						<Link to='/signup' className='link'>
							Sign up
						</Link>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default Login;
