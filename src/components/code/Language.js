import React from 'react';
import { useParams } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage';
import { Spinner } from 'react-bootstrap';
import LinksGrid from './LinksGrid';

const Language = () => {
	const { languageId } = useParams();
	const { language, links, loading } = useLanguage(languageId);

	return (
		<>
			<h2 className='my-4 text-center'>
				{language && language.language}
			</h2>

			{loading ? (
				<Spinner animation='border' role='status'>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			) : (
				<LinksGrid links={links} />
			)}
		</>
	);
};

export default Language;
