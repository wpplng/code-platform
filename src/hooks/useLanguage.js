import { useEffect, useState } from 'react';
import { db } from '../firebase';

const useLanguage = (languageId) => {
	const [language, setLanguage] = useState();
	const [links, setLinks] = useState([]);
	const [loading, setLoading] = useState(true);

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

	useEffect(() => {
		const unsubscribe = db
			.collection('links')
			.where('language', '==', db.collection('languages').doc(languageId))
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
