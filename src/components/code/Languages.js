import React from 'react';
import { Spinner } from 'react-bootstrap';
import useLanguages from '../../hooks/useLanguages';
import LanguagesGrid from '../code/LanguagesGrid';

const Languages = () => {
	const { languages, loading } = useLanguages();

	return (
		<div>
			<h2 className='mb-4 text-center'>
				Select a language to learn more
			</h2>

			{loading ? (
				<Spinner animation='border' role='status'>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			) : (
				<LanguagesGrid languages={languages} />
			)}
		</div>
	);
};

export default Languages;
