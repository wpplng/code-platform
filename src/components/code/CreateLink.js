import React, { useRef, useState } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { db } from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage';

const CreateLink = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const typeRef = useRef();
	const urlRef = useRef();
	const { languageId } = useParams();
	const navigate = useNavigate();
	const { language } = useLanguage(languageId);

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleDescChange = (e) => {
		setDescription(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const time = Date.now();

		if (title.length < 3 || description.length < 3) {
			return;
		}

		setError(false);
		setLoading(true);

		try {
			const link = {
				title,
				description,
				language: db.collection('languages').doc(languageId),
				type: typeRef.current.value,
				url: urlRef.current.value,
				date: time,
				users: [],
				usersCompleted: [],
			};

			await db.collection('links').add(link);

			navigate(`/languages/${languageId}`);
		} catch (e) {
			console.error(e.message);
			setError(
				'An error occured when trying to create the link. Please try again.'
			);
			setLoading(false);
		}
	};

	return (
		<>
			<Row className='justify-content-center'>
				<Col xs={12} md={6} lg={6}>
					{language && (
						<h3 className='my-4 text-center'>
							Add a new link to {language.language}
						</h3>
					)}

					<Alert className='alert-light'>
						<p>
							If you have a pro tip and want to help others
							learning to code, please add that link below.
						</p>
						<hr />
						<p>
							Please add a title to your link, a short
							description, choose what type it is and enter the
							url.
						</p>
					</Alert>

					{error && <Alert variant='danger'>{error}</Alert>}

					<Form onSubmit={handleSubmit}>
						<Form.Group id='title'>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type='title'
								onChange={handleTitleChange}
								value={title}
								required
								placeholder='Title'
							/>
							{title && title.length < 3 && (
								<Form.Text className='text-muted'>
									Must contain at least 3 characters
								</Form.Text>
							)}
						</Form.Group>

						<Form.Group id='description'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								onChange={handleDescChange}
								value={description}
								required
								placeholder='Description'
							/>
							{description && description.length < 3 && (
								<Form.Text className='text-muted'>
									Must contain at least 3 characters
								</Form.Text>
							)}
						</Form.Group>

						<Form.Group controlId='type'>
							<Form.Label>Type</Form.Label>
							<Form.Control ref={typeRef} as='select'>
								<option value='Tutorial'>Tutorial</option>
								<option value='Online course'>
									Online course
								</option>
								<option value='Article'>Article</option>
							</Form.Control>
						</Form.Group>

						<Form.Group id='url'>
							<Form.Label>Url</Form.Label>
							<Form.Control
								type='url'
								ref={urlRef}
								required
								placeholder='https://example.com'
								pattern='https://.*'
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
							Create Link
						</Button>
					</Form>
				</Col>
			</Row>
		</>
	);
};

export default CreateLink;
