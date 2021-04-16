import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Spinner, Row, Col } from 'react-bootstrap';
import useLanguages from '../hooks/useLanguages';
import ImageGroup from './ImageGroup';

const Home = () => {
	const { languages, loading } = useLanguages();
	return (
		<>
			<h2 className='my-4 text-center'>&lt;/&gt; Code Platform</h2>
			<p className='py-4'>
				Lorem Ipsum är en utfyllnadstext från tryck- och
				förlagsindustrin. Lorem ipsum har varit standard ända sedan
				1500-talet, när en okänd boksättare tog att antal bokstäver och
				blandade dem för att göra ett provexemplar av en bok. Lorem
				ipsum har inte bara överlevt fem århundraden, utan även
				övergången till elektronisk typografi utan större förändringar.
				Det blev allmänt känt på 1960-talet i samband med lanseringen av
				Letraset-ark med avsnitt av Lorem Ipsum, och senare med
				mjukvaror som Aldus PageMaker
			</p>

			<ImageGroup />

			{loading ? (
				<Spinner animation='border' role='status'>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			) : (
				<div className='home-languages'>
					<h4 className='pt-5'>Things you can learn about</h4>
					<Row>
						{languages.map((language) => (
							<Col sm={6} md={6} lg={4} key={language.id}>
								<Card className='my-2'>
									<Link to={`/languages/${language.id}`}>
										<Card.Header as='h5' className='py-4'>
											{language.language}
										</Card.Header>
									</Link>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			)}
		</>
	);
};

export default Home;
