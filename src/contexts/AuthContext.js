import { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';
import Spinner from 'react-bootstrap/Spinner';

const AuthContext = createContext();

const useAuth = () => {
	return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// signup user
	const signup = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password);
	};

	// login user
	const login = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password);
	};

	// logout user
	const logout = () => {
		return auth.signOut();
	};

	// reset password
	const resetPassword = (email) => {
		return auth.sendPasswordResetEmail(email);
	};

	// update profile
	const updateProfile = (name) => {
		return currentUser.updateProfile({ displayName: name });
	};

	// auth state changed
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	// values for auth context
	const contextValues = {
		currentUser,
		loading,
		login,
		logout,
		signup,
		resetPassword,
		updateProfile,
	};

	return (
		<AuthContext.Provider value={contextValues}>
			{loading && (
				<Spinner animation='border' role='status'>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			)}
			{!loading && props.children}
		</AuthContext.Provider>
	);
};

export { AuthContext, useAuth, AuthContextProvider as default };
