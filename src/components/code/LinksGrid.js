import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const LinksGrid = ({ links }) => {
	const getDate = (linkDate) => {
		const date = new Date(linkDate).toLocaleDateString();
		return date;
	};

	return (
		<Row className='my-3 justify-content-center'>
			{links.map((link) => (
				<Col xs={12} md={6} lg={4} className='mt-3'>
					<Card className='h-100 link-card' key={link.id}>
						<Card.Header className='link-header' as='h5'>
							{link.type}
						</Card.Header>
						<Card.Body>
							<Card.Title as='h4'>{link.title}</Card.Title>
							<Card.Text className='text-muted'>
								Added {getDate(link.date)}
							</Card.Text>
							<Card.Text>{link.description}</Card.Text>
						</Card.Body>
						<Card.Footer>
							<a href={link.url}>Go to website -&gt;</a>
						</Card.Footer>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default LinksGrid;
