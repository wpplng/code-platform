import React, { useState } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { db } from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';

const CreateLink = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [type, setType] = useState('Video tutorial');
	const [url, setUrl] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { languageId } = useParams();

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleDescChange = (e) => {
		setDescription(e.target.value);
	};

	const handleTypeChange = (e) => {
		setType(e.target.value);
	};

	const handleUrlChange = (e) => {
		setUrl(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const time = Date.now();
		console.log('languageid', languageId);

		if (title.length < 3 || description.length < 3) {
			return;
		}

		if (title.length < 3) {
			return;
		}

		setError(false);
		setLoading(true);

		try {
			await db.collection('links').add({
				title,
				description,
				language: db.collection('languages').doc(languageId),
				type,
				url,
				date: time,
			});
			navigate(`/languages`);
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
					<h3 className='my-4 text-center'>Add a new link</h3>
					<Alert variant='light'>
						<p>
							If you have a pro tip and want to help others
							learning to code, please add that link below.
						</p>
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
							<Form.Control
								onChange={handleTypeChange}
								as='select'
							>
								<option value='Video tutorial'>
									Video tutorial
								</option>
								<option value='Online course'>
									Online course
								</option>
								<option value='Text tutorial'>
									Text tutorial
								</option>
							</Form.Control>
						</Form.Group>

						<Form.Group id='url'>
							<Form.Label>Url</Form.Label>
							<Form.Control
								type='url'
								onChange={handleUrlChange}
								value={url}
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
