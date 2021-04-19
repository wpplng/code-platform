import { useEffect, useState } from 'react';
import { db } from '../firebase';

const useLanguage = (languageId) => {
	const [language, setLanguage] = useState();
	const [links, setLinks] = useState([]);
	const [loading, setLoading] = useState(true);

	// get language from db
	useEffect(() => {
		db.collection('languages')
			.doc(languageId)
			.get()
			.then((doc) => {
				setLanguage({
					id: doc.id,
					...doc.data(),
				});
			});
	}, [languageId]);

	// listen to changes in links in firestore
	useEffect(() => {
		const unsubscribe = db
			.collection('links')
			.where('language', '==', db.collection('languages').doc(languageId))
			.orderBy('date', 'desc')
			.onSnapshot((snapshot) => {
				setLoading(true);
				const codeLinks = [];

				snapshot.forEach((doc) => {
					codeLinks.push({
						id: doc.id,
						...doc.data(),
					});
				});

				setLinks(codeLinks);
				setLoading(false);
			});

		return unsubscribe;
	}, [languageId]);

	return { language, links, loading };
};

export default useLanguage;
