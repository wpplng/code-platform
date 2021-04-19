import React from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage';
import Links from './Links';
import { useAuth } from '../../contexts/AuthContext';

const Language = () => {
	const { languageId } = useParams();
	const { language, links, loading } = useLanguage(languageId);
	const { currentUser } = useAuth();

	return (
		<>
			{loading ? (
				<Spinner animation='border' role='status'>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			) : language && language.language ? (
				<>
					<h2 className='my-4 text-center'>
						{language && language.language}
					</h2>
					<Links links={links} />
				</>
			) : (
				<Alert variant='warning'>Sorry, the page does not exist.</Alert>
			)}

			{currentUser && language && language.language && (
				<div className='mt-5 text-center'>
					<span>Want to add your own link? </span>
					<Link to='create' className='link'>
						Click here to find out how
					</Link>
				</div>
			)}
		</>
	);
};

export default Language;
