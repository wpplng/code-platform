import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import firebase from 'firebase/app';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';

const LinksGrid = ({ links }) => {
	const { currentUser } = useAuth();
	const [selectedLinks, setSelectedLinks] = useState([]);

	useEffect(() => {
		if (selectedLinks.length > 0) {
			selectedLinks.forEach((linkItem) => {
				db.collection('links')
					.doc(linkItem.id)
					.update({
						users: firebase.firestore.FieldValue.arrayUnion(
							currentUser.uid
						),
					});
			});
		}
		// eslint-disable-next-line
	}, [selectedLinks]);

	const getDate = (linkDate) => {
		const date = new Date(linkDate).toLocaleDateString();
		return date;
	};

	const handleSelectLink = (e, link) => {
		let userLinks;

		console.log(e.target.checked);

		if (e.target.checked) {
			if (selectedLinks.length === 0) {
				userLinks = [];
			} else {
				userLinks = [...selectedLinks];
			}
			userLinks.push(link);
			setSelectedLinks(userLinks);
		}
	};

	return (
		<Row className='my-3'>
			{links.map((link) => (
				<Col xs={12} md={6} lg={4} className='mt-3' key={link.id}>
					<Card className='h-100 link-card'>
						<Card.Header className='link-header' as='h5'>
							{link.type}
						</Card.Header>
						<Card.Body>
							<Card.Title as='h4'>{link.title}</Card.Title>
							<Card.Text className='text-muted'>
								Added {getDate(link.date)}
							</Card.Text>
							<Card.Text>{link.description}</Card.Text>

							{currentUser &&
								!link.users.includes(currentUser.uid) && (
									<Card.Text>
										<input
											type='checkbox'
											name='select-link'
											id={link.id}
											onClick={(e) => {
												handleSelectLink(e, link);
											}}
										/>
										<label
											className='ml-2 text-muted small'
											htmlFor={link.id}
										>
											Select to profile
										</label>
									</Card.Text>
								)}
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
