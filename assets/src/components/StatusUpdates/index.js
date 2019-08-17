import {Component} from '@wordpress/element';

import {withFirebase} from '../../infrastructure/firebase';
import OfflineMessage from './OfflineMessage';
import StatusUpdate from "./StatusUpdate";

class StatusUpdates extends Component {
	constructor ( props ) {
		super( props );

		this.state = {
			loading: false,
			statusUpdates: [],
			offline: false,
		};
	}

	componentDidMount () {
		this.setState( { loading: true } );

		// We subscribe our listener to the Firebase instance and use the
		// preset query to retrieve the collection of documents we need.
		// The return value is the function we need call to unsubscribe again.
		this.unsubscribe = this.props.firebase
			.statusUpdates()
			.onSnapshot( { includeMetadataChanges: true }, snapshot => {
				// For each status update we receive through our listener, we
				// add it in a certain format to an array so it can be easily
				// passed through React components.
				let statusUpdates = [];
				snapshot.forEach( doc =>
					statusUpdates.push( { ...doc.data(), id: doc.id } )
				);

				// We set not only the state of the status updates, but also
				// whether we are currently offline. This is why
				// `includeMetadataChanges: true` above is needed.
				this.setState( {
					statusUpdates,
					loading: false,
					offline: snapshot.metadata.fromCache,
				} );
			} );
	}

	componentWillUnmount () {
		// We need to make sure we cut the realtime listener again when the
		// component unmounts.
		this.unsubscribe();
	}

	render () {
		// On render, we iterate over our status updates, and render each of
		// them as a `<StatusUpdate>` component.
		const statusUpdates = this.state.statusUpdates.map( ( statusUpdate ) =>
			<StatusUpdate key={statusUpdate.id}
			              suid={statusUpdate.id}
			              emoji={statusUpdate.emoji}
			              message={statusUpdate.message}
			              timestamp={statusUpdate.timestamp}
			/>
		);

		// We not only return our status messages, but also an offline notice
		// in case this state is detected.
		return (
			<div>
				{this.state.offline && <OfflineMessage/>}
				{statusUpdates}
			</div>
		);
	}
}

// Inject the Firebase dependency while exporting.
export default withFirebase( StatusUpdates );
