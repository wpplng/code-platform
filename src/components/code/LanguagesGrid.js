import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import code from '../../assets/images/code.jpg';

const LanguagesGrid = ({ languages }) => {
	return (
		<>
			<Row>
				{languages.map((item) => (
					<Col sm={6} md={6} lg={4} key={item.id}>
						<Link to={`/languages/${item.id}`}>
							<Card className='mb-3 text-white language-card'>
								<Card.Img
									className='language-img'
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
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
};

export default LanguagesGrid;
