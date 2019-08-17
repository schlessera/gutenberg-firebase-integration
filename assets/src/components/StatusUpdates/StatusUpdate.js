import {Component, RawHTML} from '@wordpress/element';
import {escapeHTML} from '@wordpress/escape-html';

import css from './style.css';
import TimestampRenderer from "./TimestampRenderer";

class StatusUpdate extends Component {
	constructor ( props ) {
		super( props );

		this.state = {
			suid: props.suid,
			emoji: props.emoji,
			message: props.message,
			timestamp: props.timestamp,
			loading: false,
		};
	}

	render () {
		// Add HTML line breaks.
		const message = escapeHTML( this.state.message )
			.replace( '\\n', '<br/>' );

		return (
			<article className="message is-danger">
				<p className="message-header">{new TimestampRenderer().render( this.state.timestamp )}</p>
				<div className="message-body media">
					<div className="media-left status-emoji">
						<p>{this.state.emoji}</p>
					</div>
					<div className="media-content">
						<div className="content">
							<RawHTML>{message}</RawHTML>
						</div>
					</div>
				</div>
			</article>
		);
	}
}

export default StatusUpdate;
