import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// get firebase configuration
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// get firebase auth
const auth = firebase.auth();

// get firebase firestore
const db = firebase.firestore();

export { auth, db, firebase as default };
