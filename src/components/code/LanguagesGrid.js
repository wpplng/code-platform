import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import code from '../../assets/images/code.jpg';

const LanguagesGrid = ({ languages }) => {
	return (
		<>
			<Row>
				{languages.map((item) => (
					<Col sm={6} md={6} lg={4} key={item.id}>
						<Card className='mb-3 bg-dark text-white'>
							<Card.Img
								variant='top'
								src={code}
								alt='Code image'
							/>
							<Card.ImgOverlay>
								<Card.Body>
									<Card.Title className='text-center mt-3'>
										<h3>{item.language}</h3>
									</Card.Title>
								</Card.Body>
							</Card.ImgOverlay>
						</Card>
					</Col>
				))}
			</Row>
		</>
	);
};

export default LanguagesGrid;
