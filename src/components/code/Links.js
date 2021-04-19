import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/app';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

const LinksGrid = ({ links }) => {
	const { currentUser } = useAuth();
	const [selectedLinks, setSelectedLinks] = useState([]);

	// update users for selected links in db
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

	// create date from timestamp
	const getDate = (linkDate) => {
		const date = new Date(linkDate).toLocaleDateString();
		return date;
	};

	// update list of selected links for user
	const handleSelectLink = (link) => {
		let userLinks;

		if (selectedLinks.length === 0) {
			userLinks = [];
		} else {
			userLinks = [...selectedLinks];
		}
		userLinks.push(link);
		setSelectedLinks(userLinks);
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
							<Card.Text className='text-muted small'>
								Added {getDate(link.date)}
							</Card.Text>
							<Card.Text>{link.description}</Card.Text>

							{currentUser &&
								!link.users.includes(currentUser.uid) && (
									<Card.Text>
										<FontAwesomeIcon
											className='add-icon'
											icon={faPlus}
											onClick={() => {
												handleSelectLink(link);
											}}
										/>
										<span className='ml-2 text-muted small'>
											Add to profile
										</span>
									</Card.Text>
								)}
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
	);
};

export default LinksGrid;
