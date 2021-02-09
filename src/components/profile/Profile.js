import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
	const { currentUser } = useAuth();

	return (
		<div>Profile for: {currentUser.displayName || currentUser.email}</div>
	);
};

export default Profile;
