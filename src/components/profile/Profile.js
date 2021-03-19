import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';

const Profile = () => {
	const { currentUser } = useAuth();
	const [userLinks, setUserLinks] = useState([]);

	useEffect(() => {
		return db
			.collection('links')
			.get()
			.then((querySnapshot) => {
				const snapshotLinks = [];
				querySnapshot.forEach((doc) => {
					if (doc.data().users.includes(currentUser.uid)) {
						snapshotLinks.push(doc.data());
					}
				});
				setUserLinks(snapshotLinks);
			});
	}, [currentUser.uid]);

	console.log(userLinks);

	return (
		<div>
			<p>Profile for: {currentUser.displayName || currentUser.email}</p>
			<p>My links:</p>
			<ul>
				{userLinks &&
					userLinks.map((link, i) => <li key={i}>{link.title}</li>)}
			</ul>
		</div>
	);
};

export default Profile;
