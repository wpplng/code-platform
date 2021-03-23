import React from 'react';
import { Spinner } from 'react-bootstrap';
import useLanguages from '../hooks/useLanguages';
import LanguagesGrid from './code/LanguagesGrid';

const Home = () => {
	const { languages, loading } = useLanguages();
	return (
		<div>
			<h2 className='my-4 text-center'>Code Platform</h2>
			<p>Description about the page</p>

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

export default Home;
