import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

const LinksGrid = ({ links }) => {
	const getDate = (linkDate) => {
		const date = new Date(linkDate).toDateString();
		return date;
	};
	return (
		<Row className='my-3'>
			{links.map((link) => (
				<Col sm={6} md={4} lg={3} key={link.id}>
					<Card>
						<Card.Header as='h5'>{link.type}</Card.Header>
						<Card.Body>
							<Card.Title>{link.title}</Card.Title>
							<Card.Text>{link.description}</Card.Text>
							<Card.Text className='text-muted'>
								{getDate(link.date)}
							</Card.Text>

							<Button
								className='custom-button mt-4'
								block
								variant='secondary'
								type='submit'
							>
								Go to website
							</Button>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default LinksGrid;
