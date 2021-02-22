import { useEffect, useState } from 'react';
import { db } from '../firebase';

const useLanguages = () => {
	const [languages, setLanguages] = useState([]);
	const [loading, setLoading] = useState(true);

	// listen to changes in languages in firestore
	useEffect(() => {
		const unsubscribe = db
			.collection('languages')
			.orderBy('language')
			.onSnapshot((snapshot) => {
				setLoading(true);
				const snapshotLanguages = [];
				snapshot.forEach((doc) => {
					snapshotLanguages.push({
						id: doc.id,
						...doc.data(),
					});
				});
				setLanguages(snapshotLanguages);
				setLoading(false);
			});
		return unsubscribe;
	}, []);

	return { languages, loading };
};

export default useLanguages;
