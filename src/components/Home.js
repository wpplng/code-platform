import React from 'react';
import { Card, Spinner, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useLanguages from '../hooks/useLanguages';
import ImageGroup from './ImageGroup';

const Home = () => {
	const { languages, loading } = useLanguages();
	const { currentUser } = useAuth();
	return (
		<>
			<h2 className='my-4 text-center'>&lt;/&gt; Code Platform</h2>
			<p className='py-4'>
				Welcome to Code Platform. This is the place for those who want
				to learn to code but doesn't know where to start. We collect all
				the best sites and links where you go and get all you need to
				learn to code. You can create your own profile and save the
				links you like the most and want to check out more and also mark
				as done when you have finished the course etc. This is also the
				place for more experienced coders who want to save all your
				favorite links in one place because you can also create and
				share your own links.{' '}
				{!currentUser && (
					<span>
						<Link to='/signup'>Sign up here!</Link>
					</span>
				)}
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
