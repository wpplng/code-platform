import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import firebase from 'firebase/app';

const useUserLinks = (completedLinks) => {
	const [userLinks, setUserLinks] = useState([]);
	const [loading, setLoading] = useState(true);
	const { currentUser } = useAuth();

	useEffect(() => {
		// update user completed in db
		if (completedLinks.length > 0) {
			completedLinks.forEach((linkItem) => {
				db.collection('links')
					.doc(linkItem.id)
					.update({
						usersCompleted: firebase.firestore.FieldValue.arrayUnion(
							currentUser.uid
						),
					});
			});
		}
		// listen to changes in links in firestore
		const unsubscribe = db
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
		return unsubscribe;
	}, [completedLinks, currentUser.uid]);

	return { userLinks, loading };
};

export default useUserLinks;
