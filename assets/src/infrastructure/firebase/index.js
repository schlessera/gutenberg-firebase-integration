import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import config from "./config";

class FirebaseInstance {
	constructor () {
		// Initialization should only be done once, and you pass in the config
		// values that you can get from the Firebase console.
		if ( !firebaseApp.apps.length ) {
			firebaseApp.initializeApp( config );
		}

		this.db = firebaseApp.firestore();
	}

	// This is our query into Firebase to fetch the collection of status update
	// documents, ordered by latest first, and limited to 50.
	statusUpdates = () => this.db.collection( 'status-updates' )
		.orderBy( 'timestamp', 'desc' )
		.limit( 50 );
}

const firebase = new FirebaseInstance;

// We also provide a helper to inject the firebase dependency into components.
export const withFirebase = Component => props => (
	<Component {...props} firebase={firebase}/>
);

export default firebase;
