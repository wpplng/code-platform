import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';

const Profile = () => {
	const { currentUser } = useAuth();
	const [userLinks, setUserLinks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		return db
			.collection('links')
			.get()
			.then((querySnapshot) => {
				setLoading(true);
				const snapshotLinks = [];
				querySnapshot.forEach((doc) => {
					if (doc.data().users.includes(currentUser.uid)) {
						snapshotLinks.push({ id: doc.id, ...doc.data() });
					}
				});
				setUserLinks(snapshotLinks);
				setLoading(false);
			});
	}, [currentUser.uid]);

	const getDate = (linkDate) => {
		const date = new Date(linkDate).toLocaleDateString();
		return date;
	};

	console.log(userLinks);

	return (
		<>
			<h4 className='my-4'>
				Welcome {currentUser.displayName || currentUser.email}
			</h4>
			{loading ? (
				<Spinner animation='border' role='status'>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			) : userLinks.length > 0 ? (
				<Row className='my-3'>
					{userLinks.map((link) => (
						<Col
							xs={12}
							md={4}
							lg={3}
							className='mt-3'
							key={link.id}
						>
							<Card className='h-100 link-card'>
								<Card.Header className='link-header' as='h5'>
									{link.type}
								</Card.Header>
								<Card.Body>
									<Card.Title as='h4'>
										{link.title}
									</Card.Title>
									<Card.Text className='text-muted small'>
										Added {getDate(link.date)}
									</Card.Text>
									<Card.Text>{link.description}</Card.Text>
								</Card.Body>
								<Card.Footer>
									<a href={link.url}>
										Visit website
										<FontAwesomeIcon
											className='ml-2'
											icon={faExternalLinkAlt}
										/>
									</a>
								</Card.Footer>
							</Card>
						</Col>
					))}
				</Row>
			) : (
				<p>
					Start browsing the content and add things you like and want
					to check out more to your profile!
				</p>
			)}
		</>
	);
};

export default Profile;
