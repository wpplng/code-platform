import React from 'react';
import { Spinner } from 'react-bootstrap';
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
			<h2 className='my-4 text-center'>
				{language && language.language}
			</h2>

			{loading ? (
				<Spinner animation='border' role='status'>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			) : (
				<Links links={links} />
			)}

			{currentUser && (
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
