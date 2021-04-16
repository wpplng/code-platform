import React from 'react';
import { CardGroup, Card } from 'react-bootstrap';
import coding from '../assets/images/coding.jpg';
import codetext from '../assets/images/codetext.jpg';
import computer from '../assets/images/computer.jpg';
import text from '../assets/images/text.jpg';

const ImageGroup = () => {
	return (
		<CardGroup className='home-card py-4'>
			<Card>
				<Card.Img
					className='home-img'
					variant='top'
					src={coding}
					alt='Code image'
				/>
			</Card>
			<Card>
				<Card.Img
					className='home-img'
					variant='top'
					src={computer}
					alt='Computer image'
				/>
			</Card>
			<Card>
				<Card.Img
					className='home-img'
					variant='top'
					src={codetext}
					alt='Code image'
				/>
			</Card>
			<Card>
				<Card.Img
					className='home-img'
					variant='top'
					src={text}
					alt='Telephone with text'
				/>
			</Card>
		</CardGroup>
	);
};

export default ImageGroup;
