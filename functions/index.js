const functions = require( 'firebase-functions' );
const admin     = require( 'firebase-admin' );

admin.initializeApp();

function isEmoji ( string ) {
	// Simplistic way of detecting our emoji.
	return !string.match( /^[0-9a-zA-Z]+$/ );
}

exports.status_update = functions.https.onRequest( async ( request, response ) => {
	// Only accept POST requests.
	if ( request.method !== 'POST' ) {
		return response.status( 405 ).send( 'Only POST requests are accepted.' );
	}

	// Only accept Slack requests that contain a valid token.
	// Hardcoded here for simplicity, as we're not distributing the Slack app.
	// Otherwise, this would need to retrieved through an OAuth flow.
	if ( request.body.team_domain !== 'brightnucleus' || request.body.token !== '7AADksrjqAMw9bvLsqRcoBK6' ) {
		return response.status( 401 ).send( 'Unauthorized request!' );
	}

	// Strip out the emoji from the message.
	const input     = request.body.text;
	let emoji       = '️⚠️';
	let message     = input;
	const firstChar = message.substr( 0, message.indexOf( ' ' ) );

	if ( isEmoji( firstChar ) ) {
		emoji   = firstChar;
		message = message.substr( message.indexOf( ' ' ) + 1 );
	}
	console.log( {
		'input': input,
		'emoji': emoji,
		'message': message,
		'firstChar': firstChar,
	} );

	// Store the update in the Firestore.
	await admin.firestore()
		.collection( 'status-updates' )
		.add( {
			'emoji': emoji,
			'message': message,
			'timestamp': admin.firestore.Timestamp.now(),
			'trigger_id': request.body.trigger_id,
		} );

	return response.contentType( 'json' ).status( 200 ).send( {
		'response_type': 'ephemeral',
		'text': 'Status update sent.',
	} );
} );
