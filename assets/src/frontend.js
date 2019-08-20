import StatusUpdates from './components/StatusUpdates';

document.addEventListener( 'DOMContentLoaded', ( event ) => {
	wp.element.render(
		wp.element.createElement( StatusUpdates ),
		document.querySelector( '.wp-block-fireberg-status-updates' )
	);
} );
