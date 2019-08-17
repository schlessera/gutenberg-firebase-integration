/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component} from '@wordpress/element';

import css from './style.css';

class OfflineMessage extends Component {
	render () {
		return (
			<article className="message is-warning">
				<div className="message-body">
					{__( 'Could not connect to the status database, the below information might be stale.', 'fireberg' )}
				</div>
			</article>
		);
	}
}

export default OfflineMessage;
